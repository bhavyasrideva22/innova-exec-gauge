import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Lightbulb, AlertCircle, Users } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProblemSolvingSectionProps {
  onNext: (data: any) => void;
  onPrevious?: () => void;
}

const cases = [
  {
    id: "case-1",
    title: "Innovation Pipeline Bottleneck",
    icon: Lightbulb,
    description: "An innovative idea pipeline is full but execution resources are constrained, causing delays.",
    context: "Your company has a robust innovation program that generates 15-20 new ideas monthly. However, your development team can only prototype 3-4 ideas and move 1-2 to production. This bottleneck is causing frustration among innovators and concern from leadership about missed opportunities.",
    tasks: [
      "Identify root causes of the bottleneck",
      "Suggest solutions balancing innovation momentum and execution feasibility"
    ]
  },
  {
    id: "case-2", 
    title: "Sudden Market Change Forces Pivot",
    icon: AlertCircle,
    description: "A competitor launches a disruptive product. Your team must innovate quickly but cannot compromise delivery quality.",
    context: "A major competitor just launched an AI-powered feature that directly threatens your market position. Your leadership wants an immediate response, but your team is mid-way through delivering critical customer-requested features. You need to pivot quickly while maintaining quality and existing commitments.",
    tasks: [
      "Plan next steps under uncertainty",
      "Balance rapid innovation with quality delivery"
    ]
  },
  {
    id: "case-3",
    title: "Cross-Functional Conflict",
    icon: Users,
    description: "Innovation and delivery teams disagree on priorities, causing project delays.",
    context: "The Innovation team wants to explore emerging technologies for next-generation products, while the Delivery team insists on fixing technical debt and improving current product stability. Both have valid points, but the conflict is paralyzing decision-making and affecting team morale.",
    tasks: [
      "Analyze conflict sources and underlying interests",
      "Propose resolution framework for ongoing collaboration"
    ]
  }
];

export const ProblemSolvingSection = ({ onNext, onPrevious }: ProblemSolvingSectionProps) => {
  const [responses, setResponses] = useState<Record<string, { rootCauses: string; solutions: string }>>({});
  const [activeCase, setActiveCase] = useState("case-1");

  const handleResponseChange = (caseId: string, field: string, value: string) => {
    setResponses(prev => ({
      ...prev,
      [caseId]: {
        ...prev[caseId],
        [field]: value
      }
    }));
  };

  const completedCases = Object.keys(responses).filter(caseId => {
    const response = responses[caseId];
    return response?.rootCauses?.trim() && response?.solutions?.trim();
  }).length;

  const canProceed = completedCases >= 2; // Require at least 2 cases completed

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="mb-4">
          🧪 Real-World Problem Solving
        </Badge>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text-primary">Problem Solving</span>
        </h1>
        <p className="text-muted-foreground">
          Analyze complex organizational challenges and propose balanced solutions
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-6">
        {cases.map((case_) => {
          const isCompleted = responses[case_.id]?.rootCauses?.trim() && responses[case_.id]?.solutions?.trim();
          const isActive = activeCase === case_.id;
          
          return (
            <Card 
              key={case_.id}
              className={`cursor-pointer transition-all ${
                isActive ? "ring-2 ring-primary" : ""
              } ${isCompleted ? "bg-success-light" : ""}`}
              onClick={() => setActiveCase(case_.id)}
            >
              <CardContent className="p-4 text-center">
                <case_.icon className={`h-6 w-6 mx-auto mb-2 ${
                  isCompleted ? "text-success" : "text-muted-foreground"
                }`} />
                <p className="text-sm font-medium">{case_.title}</p>
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
        <Tabs value={activeCase} onValueChange={setActiveCase}>
          <TabsList className="grid w-full grid-cols-3">
            {cases.map((case_) => (
              <TabsTrigger 
                key={case_.id} 
                value={case_.id}
                className="text-xs"
              >
                Case {case_.id.split('-')[1]}
              </TabsTrigger>
            ))}
          </TabsList>

          {cases.map((case_) => (
            <TabsContent key={case_.id} value={case_.id} className="space-y-4">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <case_.icon className="h-5 w-5 text-primary" />
                  <Badge variant="outline">{case_.title}</Badge>
                </div>
                <CardTitle className="text-xl">{case_.title}</CardTitle>
                <CardDescription className="text-base">
                  {case_.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="bg-accent/30 p-4 rounded-lg">
                  <Label className="text-sm font-medium mb-2 block">Context:</Label>
                  <p className="text-sm leading-relaxed">{case_.context}</p>
                  
                  <Label className="text-sm font-medium mb-2 block mt-4">Your Tasks:</Label>
                  <ul className="text-sm space-y-1">
                    {case_.tasks.map((task, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`root-causes-${case_.id}`} className="text-base font-medium mb-2 block">
                      Root Cause Analysis:
                    </Label>
                    <Textarea
                      id={`root-causes-${case_.id}`}
                      value={responses[case_.id]?.rootCauses || ""}
                      onChange={(e) => handleResponseChange(case_.id, "rootCauses", e.target.value)}
                      placeholder="Identify and analyze the underlying causes of this problem..."
                      className="min-h-[150px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`solutions-${case_.id}`} className="text-base font-medium mb-2 block">
                      Proposed Solutions:
                    </Label>
                    <Textarea
                      id={`solutions-${case_.id}`}
                      value={responses[case_.id]?.solutions || ""}
                      onChange={(e) => handleResponseChange(case_.id, "solutions", e.target.value)}
                      placeholder="Provide specific, actionable solutions that balance innovation and execution..."
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
              </CardContent>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      <div className="bg-accent/20 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">
            Progress: {completedCases} of {cases.length} cases completed
          </span>
          <span className="text-sm text-muted-foreground">
            Complete at least 2 cases to continue
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
          Back to Time Management
        </Button>

        <Button
          onClick={() => onNext(responses)}
          disabled={!canProceed}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          View Results
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};