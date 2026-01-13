import { Github, Search, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

interface RepoInputProps {
  onAnalyze: (url: string) => void;
  isLoading: boolean;
}

const RepoInput = ({ onAnalyze, isLoading }: RepoInputProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onAnalyze(url.trim());
    }
  };

  return (
    <div className="glass-card p-8 glow-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-lg bg-primary/10">
          <Github className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Repository Analysis</h2>
          <p className="text-sm text-muted-foreground">Scan any public GitHub repository for security vulnerabilities</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <Input
            type="url"
            placeholder="https://github.com/username/repository"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="h-14 pl-12 pr-4 text-base bg-secondary/50 border-border/50 focus:border-primary focus:ring-primary/20 placeholder:text-muted-foreground/50"
          />
          <Github className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        </div>

        <Button
          type="submit"
          disabled={isLoading || !url.trim()}
          className="w-full h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground pulse-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:animate-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Analyzing Repository...
            </>
          ) : (
            <>
              <Search className="w-5 h-5 mr-2" />
              Analyze Security
            </>
          )}
        </Button>
      </form>
    </div>
  );
};

export default RepoInput;
