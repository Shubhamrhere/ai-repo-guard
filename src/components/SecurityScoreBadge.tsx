import { cn } from "@/lib/utils";

interface SecurityScoreBadgeProps {
  grade: "A" | "B" | "C" | "D" | "F";
}

const gradeColors = {
  A: "from-grade-a to-emerald-400 shadow-[0_0_30px_hsl(130_100%_45%/0.5)]",
  B: "from-grade-b to-teal-400 shadow-[0_0_30px_hsl(160_100%_45%/0.5)]",
  C: "from-grade-c to-amber-400 shadow-[0_0_30px_hsl(45_100%_51%/0.5)]",
  D: "from-grade-d to-orange-400 shadow-[0_0_30px_hsl(30_100%_51%/0.5)]",
  F: "from-grade-f to-red-400 shadow-[0_0_30px_hsl(0_72%_51%/0.5)]",
};

const gradeLabels = {
  A: "Excellent",
  B: "Good",
  C: "Fair",
  D: "Poor",
  F: "Critical",
};

const SecurityScoreBadge = ({ grade }: SecurityScoreBadgeProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-xl">🔒</span>
        <span className="text-sm font-medium uppercase tracking-widest">Security Score</span>
      </div>
      <div
        className={cn(
          "w-24 h-24 rounded-2xl bg-gradient-to-br flex items-center justify-center",
          "transition-all duration-500",
          gradeColors[grade]
        )}
      >
        <span className="text-5xl font-bold text-primary-foreground drop-shadow-lg">
          {grade}
        </span>
      </div>
      <span className="text-sm font-medium text-muted-foreground">
        {gradeLabels[grade]}
      </span>
    </div>
  );
};

export default SecurityScoreBadge;
