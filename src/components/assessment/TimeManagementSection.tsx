import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Clock, AlertTriangle, Brain, Presentation } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

interface TimeManagementSectionProps {
  onNext: (data: any) => void;
  onPrevious?: () => void;
}

const miniScenario = {
  title: "Juggling Innovation and Delivery",
  description: "You have 3 competing tasks with different time sensitivities and strategic importance.",
  tasks: [
    {
      id: "prototype",
      title: "Finalize Innovative Prototype",
      description: "Complete the AI-powered feature prototype for next week's stakeholder demo",
      icon: Brain,
      urgency: "Medium",
      importance: "High",
      estimatedTime: "6 hours"
    },
    {
      id: "bugs",
      title: "Fix Urgent Bugs",
      description: "Critical bugs are delaying the current release scheduled for tomorrow",
      icon: AlertTriangle,
      urgency: "Critical",
      importance: "High", 
      estimatedTime: "4 hours"
    },
    {
      id: "presentation",
      title: "Leadership Presentation",
      description: "Prepare quarterly innovation vs execution metrics for the board meeting",
      icon: Presentation,
      urgency: "Medium",
      importance: "Medium",
      estimatedTime: "3 hours"
    }
  ]
};

const selfReflectiveStatements = [
  "I can balance exploratory work and focused execution effectively",
  "I plan contingencies for unexpected changes in priorities", 
  "I follow through on tasks even when innovation distracts me",
  "I adjust deadlines when innovation requires extra time",
  "I communicate timeline changes proactively to stakeholders"
];

export const TimeManagementSection = ({ onNext, onPrevious }: TimeManagementSectionProps) => {
  const [taskPriorities, setTaskPriorities] = useState<Record<string, number>>({});
  const [rationale, setRationale] = useState("");
  const [selfAssessment, setSelfAssessment] = useState<Record<number, number>>({});

  const handlePriorityChange = (taskId: string, priority: number) => {
    setTaskPriorities(prev => ({
      ...prev,
      [taskId]: priority
    }));
  };

  const handleSelfAssessmentChange = (statementIndex: number, value: number[]) => {
    setSelfAssessment(prev => ({
      ...prev,
      [statementIndex]: value[0]
    }));
  };

  const allTasksPrioritized = miniScenario.tasks.every(task => taskPriorities[task.id] > 0);
  const allStatementsRated = selfReflectiveStatements.every((_, index) => selfAssessment[index] > 0);
  const canProceed = allTasksPrioritized && rationale.trim() && allStatementsRated;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="mb-4">
          ⏱️ Time & Task Management
        </Badge>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text-primary">Time Management</span>
        </h1>
        <p className="text-muted-foreground">
          Demonstrate your ability to prioritize competing demands and manage deadlines effectively
        </p>
      </div>

      {/* Mini Scenario */}
      <Card className="assessment-card-elevated">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-warning" />
            <Badge variant="outline">Priority Scenario</Badge>
          </div>
          <CardTitle className="text-xl">{miniScenario.title}</CardTitle>
          <CardDescription className="text-base">
            {miniScenario.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-4">
            {miniScenario.tasks.map((task) => (
              <Card key={task.id} className="border-l-4 border-l-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <task.icon className="h-5 w-5 text-primary" />
                      <div>
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-muted-foreground">{task.description}</p>
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <Badge variant={task.urgency === "Critical" ? "destructive" : "secondary"}>
                        {task.urgency}
                      </Badge>
                      <p className="text-muted-foreground mt-1">{task.estimatedTime}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium mb-2 block">
                      Priority Ranking (1 = Highest, 3 = Lowest):
                    </Label>
                    <div className="flex items-center gap-4">
                      <Slider
                        value={[taskPriorities[task.id] || 1]}
                        onValueChange={(value) => handlePriorityChange(task.id, value[0])}
                        max={3}
                        min={1}
                        step={1}
                        className="flex-1"
                      />
                      <span className="text-sm font-medium w-12">
                        {taskPriorities[task.id] || 1}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div>
            <Label className="text-base font-medium mb-2 block">
              Explain your prioritization rationale:
            </Label>
            <Textarea
              value={rationale}
              onChange={(e) => setRationale(e.target.value)}
              placeholder="Explain why you prioritized the tasks in this order. Consider urgency, importance, dependencies, and strategic impact..."
              className="min-h-[120px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Self-Reflective Assessment */}
      <Card className="assessment-card">
        <CardHeader>
          <CardTitle className="text-lg">Self-Assessment</CardTitle>
          <CardDescription>
            Rate yourself on the following statements (1 = Strongly Disagree, 5 = Strongly Agree)
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {selfReflectiveStatements.map((statement, index) => (
            <div key={index} className="space-y-3">
              <Label className="text-sm leading-relaxed">{statement}</Label>
              <div className="flex items-center gap-4">
                <span className="text-xs text-muted-foreground">Strongly Disagree</span>
                <Slider
                  value={[selfAssessment[index] || 3]}
                  onValueChange={(value) => handleSelfAssessmentChange(index, value)}
                  max={5}
                  min={1}
                  step={1}
                  className="flex-1"
                />
                <span className="text-xs text-muted-foreground">Strongly Agree</span>
                <span className="text-sm font-medium w-8">
                  {selfAssessment[index] || 3}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Practical Skills
        </Button>

        <Button
          onClick={() => onNext({ taskPriorities, rationale, selfAssessment })}
          disabled={!canProceed}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          Continue to Problem Solving
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};