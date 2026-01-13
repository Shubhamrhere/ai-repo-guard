import { Check, Copy, ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface Tool {
  name: string;
  description: string;
  command?: string;
  url?: string;
}

interface ToolCardProps {
  tool: Tool;
  index: number;
}

const ToolCard = ({ tool, index }: ToolCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (tool.command) {
      navigator.clipboard.writeText(tool.command);
      setCopied(true);
      toast.success("Command copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="glass-card p-4 animate-fade-in-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{tool.name}</h4>
            {tool.url && (
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{tool.description}</p>
          {tool.command && (
            <div className="mt-3 flex items-center gap-2">
              <code className="flex-1 text-xs font-mono bg-secondary/50 text-primary px-3 py-2 rounded-md overflow-x-auto">
                {tool.command}
              </code>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleCopy}
                className="shrink-0 h-8 w-8 p-0 hover:bg-primary/10 hover:text-primary"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-primary" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ToolCard;
