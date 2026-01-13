import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
const getGeminiClient = () => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set in environment variables");
  }
  return new GoogleGenerativeAI(apiKey);
};

export interface AnalysisResult {
  grade: "A" | "B" | "C" | "D" | "F";
  analysis: string;
  tools: Array<{
    name: string;
    description: string;
    command?: string;
    url?: string;
  }>;
}

/**
 * Fetches repository information from GitHub API
 */
export const fetchRepoInfo = async (repoUrl: string): Promise<string> => {
  try {
    // Extract owner and repo from URL
    const urlMatch = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
    if (!urlMatch) {
      throw new Error("Invalid GitHub repository URL");
    }

    const [, owner, repo] = urlMatch;
    const repoName = repo.replace(/\.git$/, "");

    // Fetch repository data from GitHub API
    const repoResponse = await fetch(`https://api.github.com/repos/${owner}/${repoName}`);
    if (!repoResponse.ok) {
      throw new Error(`GitHub API error: ${repoResponse.statusText}`);
    }

    const repoData = await repoResponse.json();

    // Fetch package.json if it exists (for npm projects)
    let packageJsonContent = "";
    try {
      const packageJsonResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/contents/package.json`
      );
      if (packageJsonResponse.ok) {
        const packageJsonData = await packageJsonResponse.json();
        if (packageJsonData.content) {
          packageJsonContent = atob(packageJsonData.content);
        }
      }
    } catch (e) {
      // package.json not found, that's okay
    }

    // Fetch README if it exists
    let readmeContent = "";
    try {
      const readmeResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/readme`
      );
      if (readmeResponse.ok) {
        const readmeData = await readmeResponse.json();
        if (readmeData.content) {
          readmeContent = atob(readmeData.content).substring(0, 2000); // Limit to 2000 chars
        }
      }
    } catch (e) {
      // README not found, that's okay
    }

    // Compile repository information
    const repoInfo = {
      name: repoData.full_name,
      description: repoData.description || "No description",
      language: repoData.language || "Unknown",
      stars: repoData.stargazers_count,
      forks: repoData.forks_count,
      createdAt: repoData.created_at,
      updatedAt: repoData.updated_at,
      topics: repoData.topics || [],
      packageJson: packageJsonContent,
      readme: readmeContent,
      defaultBranch: repoData.default_branch,
      size: repoData.size,
      hasIssues: repoData.has_issues,
      hasProjects: repoData.has_projects,
      hasWiki: repoData.has_wiki,
    };

    return JSON.stringify(repoInfo, null, 2);
  } catch (error) {
    throw new Error(`Failed to fetch repository info: ${error instanceof Error ? error.message : "Unknown error"}`);
  }
};

/**
 * Analyzes a GitHub repository using Gemini AI
 */
export const analyzeRepository = async (repoUrl: string): Promise<AnalysisResult> => {
  try {
    // Fetch repository information
    const repoInfo = await fetchRepoInfo(repoUrl);

    // Initialize Gemini
    const genAI = getGeminiClient();
    // Using gemini-pro as it's stable and widely available
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    // Create prompt for security analysis
    const prompt = `You are a cybersecurity expert specializing in GitHub repository security analysis. Analyze the following repository information and provide a detailed security assessment.

Repository Information:
${repoInfo}

IMPORTANT: You must respond with ONLY valid JSON in this exact format (no markdown, no code blocks, no explanations before or after):
{
  "grade": "A",
  "analysis": "Your detailed security analysis here in 2-4 sentences covering key security concerns, vulnerabilities, and recommendations.",
  "tools": [
    {
      "name": "Tool Name",
      "description": "Why this tool is recommended for this repository",
      "command": "npx tool-name",
      "url": "https://tool-website.com"
    }
  ]
}

Grading Criteria (choose the most appropriate):
- A: Excellent security - up-to-date dependencies, proper security configurations, no known critical vulnerabilities
- B: Good security - minor issues, some outdated dependencies, but generally secure
- C: Fair security - some vulnerabilities present, missing security measures, needs attention
- D: Poor security - multiple vulnerabilities, outdated dependencies, security gaps
- F: Critical security - severe vulnerabilities, highly outdated dependencies, major security flaws

Analysis Focus Areas:
1. Check package.json dependencies for known vulnerabilities (if available)
2. Repository age and last update date (older repos may have more vulnerabilities)
3. Security features enabled (Dependabot, security policies, etc.)
4. Repository size and complexity
5. Language/framework specific security concerns

Recommended Tools (select 3-4 most relevant):
- Snyk: "Comprehensive npm dependency scanning with automatic fix PRs" | command: "npx snyk test" | url: "https://snyk.io"
- Trivy: "Fast vulnerability scanner for Docker images and filesystems" | command: "trivy fs --security-checks vuln ." | url: "https://trivy.dev"
- GitHub Dependabot: "Automatic pull requests for dependency updates" | url: "https://github.com/dependabot"
- Socket.dev: "Detect malicious and hijacked packages" | command: "npx socket-security scan" | url: "https://socket.dev"
- npm audit: "Built-in npm vulnerability scanner" | command: "npm audit"
- Semgrep: "Static analysis for security vulnerabilities" | url: "https://semgrep.dev"
- CodeQL: "GitHub's code analysis engine" | url: "https://codeql.github.com"

CRITICAL: Return ONLY the JSON object, nothing else. No markdown, no code fences, no explanations.`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response (remove markdown code blocks if present)
    let jsonText = text.trim();
    
    // Remove markdown code blocks
    if (jsonText.includes("```json")) {
      const jsonMatch = jsonText.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        jsonText = jsonMatch[1].trim();
      }
    } else if (jsonText.includes("```")) {
      const codeMatch = jsonText.match(/```\s*([\s\S]*?)\s*```/);
      if (codeMatch) {
        jsonText = codeMatch[1].trim();
      }
    }
    
    // Try to extract JSON if there's extra text
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonText = jsonMatch[0];
    }

    // Parse JSON response
    let parsedResult: AnalysisResult;
    try {
      parsedResult = JSON.parse(jsonText) as AnalysisResult;
    } catch (parseError) {
      console.error("Failed to parse JSON:", jsonText);
      throw new Error(`Invalid JSON response from Gemini: ${parseError instanceof Error ? parseError.message : "Unknown error"}`);
    }

    // Validate the result
    if (!parsedResult.grade || !parsedResult.analysis || !parsedResult.tools) {
      throw new Error("Invalid response format from Gemini API");
    }

    // Ensure grade is valid
    if (!["A", "B", "C", "D", "F"].includes(parsedResult.grade)) {
      parsedResult.grade = "C"; // Default to C if invalid
    }

    return parsedResult;
  } catch (error) {
    // If there's an error, provide a fallback response
    console.error("Error analyzing repository:", error);
    
    // Check if it's an API key error
    if (error instanceof Error && error.message.includes("API_KEY")) {
      throw new Error("Gemini API key is not configured. Please add VITE_GEMINI_API_KEY to your .env file.");
    }

    // Check if it's a parsing error
    if (error instanceof SyntaxError) {
      throw new Error("Failed to parse Gemini API response. Please try again.");
    }

    throw error;
  }
};
