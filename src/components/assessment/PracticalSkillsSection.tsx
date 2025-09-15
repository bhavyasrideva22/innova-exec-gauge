import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, CheckSquare, Mail, GitBranch, BarChart3, Ticket } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";

interface PracticalSkillsSectionProps {
  onNext: (data: any) => void;
  onPrevious?: () => void;
}

const tasks = [
  {
    id: "task-a",
    title: "Task A: Project Prioritization",
    icon: CheckSquare,
    description: "Given a list of innovation tasks and execution deadlines, prioritize and assign tasks.",
    prompt: "You have the following tasks to prioritize:\n\n1. Complete user research for new AI feature (Innovation) - Due in 2 weeks\n2. Fix critical security vulnerability (Execution) - Due in 3 days\n3. Prototype voice interface (Innovation) - Due in 1 week\n4. Update legacy API documentation (Execution) - Due in 1 week\n5. Research competitor analysis (Innovation) - Due in 10 days\n\nRank these tasks by priority (1-5) and explain your reasoning."
  },
  {
    id: "task-b", 
    title: "Task B: Stakeholder Communication",
    icon: Mail,
    description: "Write an email responding to stakeholder concerns over delayed deliverables due to innovation pivots.",
    prompt: "Context: Your team pivoted to explore a new technology mid-sprint, causing a 2-week delay in the planned feature release. The VP of Product is concerned about timeline commitments.\n\nWrite a professional email response that:\n- Acknowledges the concern\n- Explains the current status\n- Outlines next steps\n- Maintains stakeholder confidence"
  },
  {
    id: "task-c",
    title: "Task C: Process Mapping", 
    icon: GitBranch,
    description: "Fill gaps in a process flowchart showing innovation idea intake through to delivery execution.",
    prompt: "Current Process Flow:\n1. Idea Submission → 2. [MISSING STEP] → 3. Technical Feasibility → 4. [MISSING STEP] → 5. Development → 6. [MISSING STEP] → 7. Release\n\nIdentify what's missing in steps 2, 4, and 6, and explain why these steps are critical for balancing innovation and execution."
  },
  {
    id: "task-d",
    title: "Task D: Metrics Analysis",
    icon: BarChart3, 
    description: "Use data to track Innovation Metrics vs Delivery KPIs and suggest insights.",
    prompt: "Given the following quarterly data:\n\nInnovation Metrics:\n- New ideas submitted: 45\n- Ideas prototyped: 12\n- Ideas moved to production: 3\n\nDelivery KPIs:\n- Features planned: 20\n- Features delivered: 14\n- Features delivered on time: 9\n\nAnalyze this data and provide insights on the innovation-execution balance. What recommendations would you make?"
  },
  {
    id: "task-e",
    title: "Task E: Client Issue Resolution",
    icon: Ticket,
    description: "Respond to a client ticket reporting issues from a recent feature release.",
    prompt: "Client Ticket: 'The new dashboard feature released last week is causing performance issues. Our page load times have increased by 300%. This is affecting our daily operations. We need this fixed immediately or we'll need to consider other options.'\n\nProvide your response including:\n- Immediate actions\n- Investigation steps\n- Communication plan\n- Prevention measures"
  }
];

export const PracticalSkillsSection = ({ onNext, onPrevious }: PracticalSkillsSectionProps) => {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [activeTask, setActiveTask] = useState("task-a");

  const handleResponseChange = (taskId: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [taskId]: value
    }));
  };

  const completedTasks = Object.keys(responses).filter(taskId => responses[taskId]?.trim()).length;
  const canProceed = completedTasks >= 3; // Require at least 3 tasks completed

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="mb-4">
          🧰 Practical Skills Assessment
        </Badge>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text-execution">Practical Skills</span>
        </h1>
        <p className="text-muted-foreground">
          Complete real-world tasks demonstrating your ability to balance innovation and execution
        </p>
      </div>

      <div className="grid md:grid-cols-4 gap-4 mb-6">
        {tasks.map((task) => {
          const isCompleted = responses[task.id]?.trim();
          const isActive = activeTask === task.id;
          
          return (
            <Card 
              key={task.id}
              className={`cursor-pointer transition-all ${
                isActive ? "ring-2 ring-primary" : ""
              } ${isCompleted ? "bg-success-light" : ""}`}
              onClick={() => setActiveTask(task.id)}
            >
              <CardContent className="p-4 text-center">
                <task.icon className={`h-6 w-6 mx-auto mb-2 ${
                  isCompleted ? "text-success" : "text-muted-foreground"
                }`} />
                <p className="text-sm font-medium">{task.title}</p>
                {isCompleted && (
                  <Badge variant="outline" className="mt-2 text-xs">
                    Complete
                  </Badge>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="assessment-card-elevated">
        <Tabs value={activeTask} onValueChange={setActiveTask}>
          <TabsList className="grid w-full grid-cols-5">
            {tasks.map((task) => (
              <TabsTrigger 
                key={task.id} 
                value={task.id}
                className="text-xs"
              >
                Task {task.id.split('-')[1].toUpperCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          {tasks.map((task) => (
            <TabsContent key={task.id} value={task.id} className="space-y-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <task.icon className="h-5 w-5 text-primary" />
                  <Badge variant="outline">{task.title}</Badge>
                </div>
                <CardTitle className="text-xl">{task.title}</CardTitle>
                <CardDescription className="text-base">
                  {task.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="bg-accent/30 p-4 rounded-lg">
                  <Label className="text-sm font-medium mb-2 block">Task Scenario:</Label>
                  <pre className="text-sm whitespace-pre-wrap font-mono">{task.prompt}</pre>
                </div>

                <div>
                  <Label htmlFor={`response-${task.id}`} className="text-base font-medium mb-2 block">
                    Your Response:
                  </Label>
                  <Textarea
                    id={`response-${task.id}`}
                    value={responses[task.id] || ""}
                    onChange={(e) => handleResponseChange(task.id, e.target.value)}
                    placeholder="Provide your detailed response to this task..."
                    className="min-h-[200px]"
                  />
                </div>
              </CardContent>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <div className="bg-accent/20 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Progress: {completedTasks} of {tasks.length} tasks completed
          </span>
          <span className="text-sm text-muted-foreground">
            Complete at least 3 tasks to continue
          </span>
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Scenarios
        </Button>

        <Button
          onClick={() => onNext(responses)}
          disabled={!canProceed}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          Continue to Time Management
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};