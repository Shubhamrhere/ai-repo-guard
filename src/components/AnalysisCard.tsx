import { Bot, Sparkles } from "lucide-react";

interface AnalysisCardProps {
  analysis: string;
}

const AnalysisCard = ({ analysis }: AnalysisCardProps) => {
  return (
    <div className="glass-card p-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative">
          <Bot className="w-5 h-5 text-primary" />
          <Sparkles className="w-3 h-3 text-primary absolute -top-1 -right-1" />
        </div>
        <h3 className="font-semibold text-foreground">Gemini AI Analysis</h3>
      </div>
      <div className="relative">
        <p className="text-muted-foreground leading-relaxed pl-4 border-l-2 border-primary/30">
          {analysis}
        </p>
      </div>
    </div>
  );
};

export default AnalysisCard;
