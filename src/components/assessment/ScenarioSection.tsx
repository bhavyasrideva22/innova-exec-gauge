import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Lightbulb, Target } from "lucide-react";

interface ScenarioSectionProps {
  onNext: (data: any) => void;
  onPrevious?: () => void;
}

const scenarios = [
  {
    id: 1,
    title: "Product Feature Expansion",
    description: "Your team is asked to add a new innovative feature requested by marketing. The feature idea is exciting but lacks a clear implementation plan, and the current release deadline is tight.",
    options: [
      { id: "A", text: "Prioritize adding the feature now, delay other deliverables" },
      { id: "B", text: "Postpone feature to next release, focus on current commitments" },
      { id: "C", text: "Build a minimal prototype and gather feedback before full commitment" },
      { id: "D", text: "Reject the feature until full requirements are defined" }
    ],
    followUp: "What information do you need next?"
  },
  {
    id: 2,
    title: "Execution Delay Due to Unforeseen Bug",
    description: "Development is delayed by a critical bug affecting execution, but leadership wants the release on schedule.",
    options: [
      { id: "A", text: "Fix the bug regardless of timeline impact" },
      { id: "B", text: "Release with known bug and patch later" },
      { id: "C", text: "Negotiate timeline extension with stakeholders" },
      { id: "D", text: "Implement temporary workaround for release" }
    ],
    followUp: "Which risks are acceptable to take?"
  },
  {
    id: 3,
    title: "Conflicting Team Priorities",
    description: "R&D wants to explore new technology, but the delivery team insists on completing current backlog first.",
    options: [
      { id: "A", text: "Allocate separate time for R&D exploration" },
      { id: "B", text: "Focus entirely on delivery commitments first" },
      { id: "C", text: "Find ways to incorporate exploration into current work" },
      { id: "D", text: "Split team to handle both priorities simultaneously" }
    ],
    followUp: "How would you balance innovation enthusiasm and execution discipline?"
  }
];

export const ScenarioSection = ({ onNext, onPrevious }: ScenarioSectionProps) => {
  const [currentScenario, setCurrentScenario] = useState(0);
  const [responses, setResponses] = useState<Record<number, { choice: string; followUp: string }>>({});

  const handleChoiceChange = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [scenarios[currentScenario].id]: {
        ...prev[scenarios[currentScenario].id],
        choice: value
      }
    }));
  };

  const handleFollowUpChange = (value: string) => {
    setResponses(prev => ({
      ...prev,
      [scenarios[currentScenario].id]: {
        ...prev[scenarios[currentScenario].id],
        followUp: value
      }
    }));
  };

  const handleNextScenario = () => {
    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(prev => prev + 1);
    } else {
      onNext(responses);
    }
  };

  const handlePreviousScenario = () => {
    if (currentScenario > 0) {
      setCurrentScenario(prev => prev - 1);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const scenario = scenarios[currentScenario];
  const currentResponse = responses[scenario.id] || { choice: "", followUp: "" };
  const canProceed = currentResponse.choice && currentResponse.followUp.trim();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <Badge variant="secondary" className="mb-4">
          🧠 Scenario-Based Application
        </Badge>
        <h1 className="text-3xl font-bold">
          <span className="gradient-text-innovation">Scenario Analysis</span>
        </h1>
        <p className="text-muted-foreground">
          Navigate complex workplace scenarios requiring trade-offs between innovation and execution
        </p>
      </div>

      <div className="flex justify-center gap-2 mb-6">
        {scenarios.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentScenario
                ? "bg-primary"
                : index < currentScenario
                ? "bg-success"
                : "bg-muted"
            }`}
          />
        ))}
      </div>

      <Card className="assessment-card-elevated">
        <CardHeader>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              {currentScenario % 2 === 0 ? (
                <Lightbulb className="h-5 w-5 text-innovation" />
              ) : (
                <Target className="h-5 w-5 text-execution" />
              )}
              <Badge variant="outline">Scenario {scenario.id}</Badge>
            </div>
          </div>
          <CardTitle className="text-xl">{scenario.title}</CardTitle>
          <CardDescription className="text-base leading-relaxed">
            {scenario.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div>
            <Label className="text-base font-medium mb-4 block">
              Select the best course of action:
            </Label>
            <RadioGroup
              value={currentResponse.choice}
              onValueChange={handleChoiceChange}
              className="space-y-3"
            >
              {scenario.options.map((option) => (
                <div key={option.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50">
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <Label
                    htmlFor={option.id}
                    className="text-sm leading-relaxed cursor-pointer flex-1"
                  >
                    <span className="font-medium">{option.id})</span> {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <Label htmlFor="follow-up" className="text-base font-medium mb-2 block">
              {scenario.followUp}
            </Label>
            <Textarea
              id="follow-up"
              value={currentResponse.followUp}
              onChange={(e) => handleFollowUpChange(e.target.value)}
              placeholder="Provide your reasoning and next steps..."
              className="min-h-[100px]"
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          onClick={handlePreviousScenario}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {currentScenario === 0 ? "Back" : "Previous Scenario"}
        </Button>

        <Button
          onClick={handleNextScenario}
          disabled={!canProceed}
          className="flex items-center gap-2 bg-primary hover:bg-primary/90"
        >
          {currentScenario === scenarios.length - 1 ? "Continue to Practical Skills" : "Next Scenario"}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};