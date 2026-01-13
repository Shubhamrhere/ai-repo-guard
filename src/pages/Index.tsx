import { useState } from "react";
import Header from "@/components/Header";
import RepoInput from "@/components/RepoInput";
import ResultsPanel from "@/components/ResultsPanel";
import { analyzeRepository, type AnalysisResult } from "@/lib/gemini";
import { toast } from "sonner";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<AnalysisResult | null>(null);
  const [analyzedUrl, setAnalyzedUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async (url: string) => {
    setIsLoading(true);
    setResults(null);
    setError(null);
    setAnalyzedUrl(url);

    try {
      // Validate URL format
      if (!url.match(/github\.com\/[^\/]+\/[^\/]+/)) {
        throw new Error("Please enter a valid GitHub repository URL (e.g., https://github.com/username/repo)");
      }

      // Show loading toast
      toast.loading("Fetching repository information...", { id: "analyze" });

      // Analyze repository using Gemini AI
      const analysisResult = await analyzeRepository(url);

      setResults(analysisResult);
      toast.success("Analysis complete!", { id: "analyze" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to analyze repository. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage, { id: "analyze", duration: 5000 });
      console.error("Analysis error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10">
        <Header />

        <main className="max-w-2xl mx-auto px-4 py-8 space-y-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="gradient-text">AI-Powered</span>
              <span className="text-foreground"> Security Analysis</span>
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Get instant security insights and tool recommendations for any GitHub repository
            </p>
          </div>

          <RepoInput onAnalyze={handleAnalyze} isLoading={isLoading} />

          {error && !isLoading && (
            <div className="glass-card p-6 border-destructive/50 border-2 animate-fade-in-up">
              <div className="flex items-start gap-3">
                <div className="text-destructive text-xl">⚠️</div>
                <div className="flex-1">
                  <h3 className="font-semibold text-destructive mb-1">Analysis Failed</h3>
                  <p className="text-sm text-muted-foreground">{error}</p>
                  {error.includes("API_KEY") && (
                    <div className="mt-3 p-3 bg-secondary/50 rounded-md">
                      <p className="text-xs text-muted-foreground mb-2">
                        To fix this, create a <code className="text-primary">.env</code> file in the project root with:
                      </p>
                      <code className="text-xs text-primary block">
                        VITE_GEMINI_API_KEY=your_api_key_here
                      </code>
                      <p className="text-xs text-muted-foreground mt-2">
                        Get your API key from:{" "}
                        <a
                          href="https://makersuite.google.com/app/apikey"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline"
                        >
                          Google AI Studio
                        </a>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="glass-card p-8 animate-fade-in-up">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-full border-4 border-secondary border-t-primary animate-spin" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-primary/20" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-foreground font-medium">Scanning repository...</p>
                  <p className="text-sm text-muted-foreground">Analyzing dependencies and security patterns</p>
                </div>
                <div className="w-full max-w-xs space-y-2">
                  <div className="h-2 rounded-full shimmer" />
                  <div className="h-2 rounded-full shimmer w-3/4 mx-auto" />
                </div>
              </div>
            </div>
          )}

          {results && !isLoading && (
            <ResultsPanel results={results} repoUrl={analyzedUrl} />
          )}
        </main>

        <footer className="text-center py-8 text-sm text-muted-foreground">
          <p>Built with Gemini AI for intelligent security analysis</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
