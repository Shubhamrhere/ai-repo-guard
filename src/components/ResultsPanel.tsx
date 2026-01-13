import { Wrench } from "lucide-react";
import SecurityScoreBadge from "./SecurityScoreBadge";
import AnalysisCard from "./AnalysisCard";
import ToolCard from "./ToolCard";

interface Tool {
  name: string;
  description: string;
  command?: string;
  url?: string;
}

interface ResultsData {
  grade: "A" | "B" | "C" | "D" | "F";
  analysis: string;
  tools: Tool[];
}

interface ResultsPanelProps {
  results: ResultsData;
  repoUrl: string;
}

const ResultsPanel = ({ results, repoUrl }: ResultsPanelProps) => {
  const repoName = repoUrl.split("/").slice(-2).join("/");

  return (
    <div className="glass-card p-8 animate-fade-in-up">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/50 text-sm text-muted-foreground mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Analysis Complete
        </div>
        <h3 className="font-mono text-sm text-primary truncate max-w-md mx-auto">
          {repoName}
        </h3>
      </div>

      <div className="flex justify-center mb-8">
        <SecurityScoreBadge grade={results.grade} />
      </div>

      <div className="space-y-6">
        <AnalysisCard analysis={results.analysis} />

        <div>
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Recommended Tools</h3>
          </div>
          <div className="grid gap-3">
            {results.tools.map((tool, index) => (
              <ToolCard key={tool.name} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPanel;
