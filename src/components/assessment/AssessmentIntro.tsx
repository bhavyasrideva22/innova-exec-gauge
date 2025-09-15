import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Clock, Users, BarChart3, CheckCircle } from "lucide-react";

interface AssessmentIntroProps {
  onNext: () => void;
}

export const AssessmentIntro = ({ onNext }: AssessmentIntroProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <Badge variant="secondary" className="mb-4">
            🧭 Professional Assessment
          </Badge>
          <h1 className="text-5xl font-bold tracking-tight">
            <span className="gradient-text-primary">Innovation vs Execution</span>
          </h1>
          <h2 className="text-3xl font-semibold text-muted-foreground">
            Applied Skills & Real-World Readiness Assessment
          </h2>
        </div>
        
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          In modern workplaces, balancing innovation and execution is critical. While innovation drives new ideas and strategic direction, execution ensures those ideas become tangible outcomes.
        </p>
      </div>

      {/* What This Measures */}
      <Card className="assessment-card-elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            What This Assessment Measures
          </CardTitle>
          <CardDescription className="text-base">
            This assessment evaluates your ability to navigate the balance between creative innovation and reliable execution in real-world scenarios.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground">
            Real-world success demands flexibility: you must innovate effectively without losing focus on execution, and execute without stifling creativity. This test evaluates your decision-making in ambiguous, fast-changing scenarios where you face trade-offs between ideation and delivery.
          </p>
          <p className="text-foreground">
            The results can guide your career readiness for roles that require both strategic thinking and disciplined delivery, helping you thrive in dynamic, outcome-driven environments.
          </p>
        </CardContent>
      </Card>

      {/* Assessment Sections */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="assessment-card">
          <CardHeader>
            <Brain className="h-8 w-8 text-innovation mb-2" />
            <CardTitle className="text-lg">Scenario Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Navigate complex workplace scenarios requiring trade-offs between innovation and execution
            </p>
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardHeader>
            <CheckCircle className="h-8 w-8 text-execution mb-2" />
            <CardTitle className="text-lg">Practical Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Complete real-world tasks including project management, stakeholder communication, and process optimization
            </p>
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardHeader>
            <Clock className="h-8 w-8 text-warning mb-2" />
            <CardTitle className="text-lg">Time Management</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Demonstrate ability to prioritize competing demands and manage deadlines effectively
            </p>
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardHeader>
            <Users className="h-8 w-8 text-success mb-2" />
            <CardTitle className="text-lg">Problem Solving</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Analyze complex organizational challenges and propose balanced solutions
            </p>
          </CardContent>
        </Card>

        <Card className="assessment-card">
          <CardHeader>
            <BarChart3 className="h-8 w-8 text-primary mb-2" />
            <CardTitle className="text-lg">PEARL Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Evaluation across Practical Intelligence, Execution, Adaptability, Reliability, and Learning Agility
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Start Button */}
      <div className="text-center pt-6">
        <Button 
          onClick={onNext} 
          size="lg" 
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
        >
          Begin Assessment
        </Button>
        <p className="text-sm text-muted-foreground mt-3">
          Estimated completion time: 25-30 minutes
        </p>
      </div>
    </div>
  );
};