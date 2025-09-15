import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Download, User, TrendingUp, CheckCircle, AlertTriangle, Target, Clock, Users, Brain, BarChart3 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ResultsDashboardProps {
  data: any;
  onPrevious?: () => void;
}

// Mock calculation functions - in real app these would analyze the assessment data
const calculateScores = (assessmentData: any) => {
  // This would contain real scoring logic based on responses
  return {
    overall: 78,
    practical: 82,
    execution: 75,
    adaptability: 80,
    reliability: 77,
    learning: 83,
    pearl: {
      P: 82, // Practical Intelligence
      E: 75, // Execution  
      A: 80, // Adaptability
      R: 77, // Reliability
      L: 83  // Learning Agility
    },
    sections: {
      scenarios: 78,
      practicalSkills: 85,
      timeManagement: 72,
      problemSolving: 79
    }
  };
};

const generateRecommendations = (scores: any) => {
  const recommendations = [];
  
  if (scores.execution < 80) {
    recommendations.push({
      type: "execution",
      title: "Strengthen Execution Discipline",
      description: "Focus on improving delivery consistency and deadline management",
      actions: ["Use task checklists", "Set mini-milestones", "Track time more closely"]
    });
  }
  
  if (scores.adaptability < 75) {
    recommendations.push({
      type: "adaptability", 
      title: "Enhance Adaptability",
      description: "Practice handling changing priorities and ambiguous situations",
      actions: ["Scenario planning exercises", "Quick decision-making drills", "Buffer time planning"]
    });
  }

  recommendations.push({
    type: "strength",
    title: "Leverage Learning Agility",
    description: "Your strongest area - use this to accelerate other improvements",
    actions: ["Mentor others", "Lead learning initiatives", "Document lessons learned"]
  });

  return recommendations;
};

export const ResultsDashboard = ({ data, onPrevious }: ResultsDashboardProps) => {
  const scores = calculateScores(data);
  const recommendations = generateRecommendations(scores);

  const pearlDimensions = [
    { name: 'Practical Intelligence', score: scores.pearl.P, color: 'text-primary' },
    { name: 'Execution', score: scores.pearl.E, color: 'text-execution' },
    { name: 'Adaptability', score: scores.pearl.A, color: 'text-innovation' },
    { name: 'Reliability', score: scores.pearl.R, color: 'text-warning' },
    { name: 'Learning Agility', score: scores.pearl.L, color: 'text-success' }
  ];

  const sectionScores = [
    { name: 'Scenarios', score: scores.sections.scenarios },
    { name: 'Practical Skills', score: scores.sections.practicalSkills },
    { name: 'Time Management', score: scores.sections.timeManagement },
    { name: 'Problem Solving', score: scores.sections.problemSolving }
  ];

  const getFitLevel = (score: number) => {
    if (score >= 75) return { level: "Ready", color: "success", icon: CheckCircle };
    if (score >= 50) return { level: "Trainable", color: "warning", icon: Clock };
    return { level: "Not Yet Ready", color: "destructive", icon: AlertTriangle };
  };

  const fitLevel = getFitLevel(scores.overall);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <Badge variant="secondary" className="mb-4">
          📊 Assessment Results
        </Badge>
        <h1 className="text-4xl font-bold">
          <span className="gradient-text-primary">Your Innovation vs Execution Profile</span>
        </h1>
        
        {/* Overall Score */}
        <Card className="assessment-card-elevated max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Trophy className="h-8 w-8 text-primary" />
              <div>
                <h2 className="text-3xl font-bold">{scores.overall}</h2>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <fitLevel.icon className={`h-5 w-5 text-${fitLevel.color}`} />
              <Badge variant={fitLevel.color === "success" ? "default" : "secondary"}>
                {fitLevel.level}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* PEARL Framework */}
      <Card className="assessment-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            PEARL Framework Analysis
          </CardTitle>
          <CardDescription>
            Your performance across the five key dimensions of workplace readiness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {pearlDimensions.map((dimension, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="relative w-24 h-24 mx-auto">
                  <svg className="w-24 h-24 transform -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-muted"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray={`${2 * Math.PI * 40}`}
                      strokeDashoffset={`${2 * Math.PI * 40 * (1 - dimension.score / 100)}`}
                      className={dimension.color}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold">{dimension.score}</span>
                  </div>
                </div>
                <h4 className="font-medium text-sm">{dimension.name}</h4>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Section Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="assessment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-execution" />
              Section Performance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {sectionScores.map((section, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{section.name}</span>
                  <span className="text-sm text-muted-foreground">{section.score}/100</span>
                </div>
                <Progress value={section.score} className="h-3" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-innovation" />
              Innovation vs Execution Balance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Innovation Focus</span>
                  <span className="text-sm text-muted-foreground">75/100</span>
                </div>
                <Progress value={75} className="h-3" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Execution Focus</span>
                  <span className="text-sm text-muted-foreground">{scores.execution}/100</span>
                </div>
                <Progress value={scores.execution} className="h-3" />
              </div>
              
              <p className="text-sm text-muted-foreground mt-4 text-center">
                Your profile shows a {scores.execution > 75 ? "strong execution focus" : "balanced approach"} 
                with moderate innovation orientation.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="assessment-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-success" />
            Personalized Improvement Plan
          </CardTitle>
          <CardDescription>
            Targeted recommendations based on your assessment results
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recommendations.map((rec, index) => (
              <Card key={index} className="border-l-4 border-l-primary/50">
                <CardContent className="p-4">
                  <h4 className="font-semibold text-sm mb-2">{rec.title}</h4>
                  <p className="text-xs text-muted-foreground mb-3">{rec.description}</p>
                  <div className="space-y-1">
                    {rec.actions.map((action, actionIndex) => (
                      <div key={actionIndex} className="flex items-center gap-2">
                        <CheckCircle className="h-3 w-3 text-success" />
                        <span className="text-xs">{action}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Role Readiness */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="assessment-card">
          <CardContent className="p-4 text-center">
            <User className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
            <h4 className="font-semibold mb-1">Trainee Level</h4>
            <p className="text-xs text-muted-foreground mb-2">Structured guidance needed</p>
            <Badge variant={scores.overall < 50 ? "default" : "outline"}>
              {scores.overall < 50 ? "Current Fit" : "0-49 range"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto mb-2 text-warning" />
            <h4 className="font-semibold mb-1">Contributor Level</h4>
            <p className="text-xs text-muted-foreground mb-2">Balanced autonomy</p>
            <Badge variant={scores.overall >= 50 && scores.overall < 75 ? "default" : "outline"}>
              {scores.overall >= 50 && scores.overall < 75 ? "Current Fit" : "50-74 range"}
            </Badge>
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto mb-2 text-success" />
            <h4 className="font-semibold mb-1">Lead/Strategist</h4>
            <p className="text-xs text-muted-foreground mb-2">Drives outcomes</p>
            <Badge variant={scores.overall >= 75 ? "default" : "outline"}>
              {scores.overall >= 75 ? "Current Fit" : "75-100 range"}
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex justify-center gap-4">
        {onPrevious && (
          <Button onClick={onPrevious} variant="outline">
            Retake Assessment
          </Button>
        )}
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Download Results
        </Button>
      </div>
    </div>
  );
};