import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface AssessmentProgressProps {
  currentSection: number;
  totalSections: number;
  sections: Array<{ id: string; title: string }>;
}

export const AssessmentProgress = ({ 
  currentSection, 
  totalSections, 
  sections 
}: AssessmentProgressProps) => {
  const progressPercentage = ((currentSection + 1) / totalSections) * 100;
  
  return (
    <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="outline" className="text-sm">
            Section {currentSection + 1} of {totalSections}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {Math.round(progressPercentage)}% Complete
          </span>
        </div>
        
        <div className="space-y-2">
          <Progress value={progressPercentage} className="h-2" />
          <p className="text-sm font-medium text-foreground">
            {sections[currentSection]?.title || "Assessment Section"}
          </p>
        </div>
      </div>
    </div>
  );
};