import { Shield } from "lucide-react";

const Header = () => {
  return (
    <header className="w-full py-6 px-4">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Shield className="w-10 h-10 text-primary glow-text" />
            <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          </div>
          <div>
            <h1 className="text-xl font-semibold tracking-tight">
              <span className="gradient-text">Gemini AI</span>
              <span className="text-foreground"> Repo Security</span>
            </h1>
          </div>
        </div>
        
        <div className="glass-card px-3 py-1.5 flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none">
            <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#4285F4"/>
            <path d="M2 17l10 5 10-5" stroke="#34A853" strokeWidth="2"/>
            <path d="M2 12l10 5 10-5" stroke="#FBBC05" strokeWidth="2"/>
          </svg>
          <span className="text-xs text-muted-foreground font-medium">
            Powered by <span className="text-foreground">Google Gemini</span>
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
