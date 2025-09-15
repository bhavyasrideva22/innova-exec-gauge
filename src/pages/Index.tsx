import { useState } from "react";
import { AssessmentIntro } from "@/components/assessment/AssessmentIntro";
import { ScenarioSection } from "@/components/assessment/ScenarioSection";
import { PracticalSkillsSection } from "@/components/assessment/PracticalSkillsSection";
import { TimeManagementSection } from "@/components/assessment/TimeManagementSection";
import { ProblemSolvingSection } from "@/components/assessment/ProblemSolvingSection";
import { ResultsDashboard } from "@/components/assessment/ResultsDashboard";
import { AssessmentProgress } from "@/components/assessment/AssessmentProgress";

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [assessmentData, setAssessmentData] = useState({
    scenarios: {},
    practicalSkills: {},
    timeManagement: {},
    problemSolving: {},
    pearl: { P: 0, E: 0, A: 0, R: 0, L: 0 }
  });

  const sections = [
    { id: 'intro', title: 'Introduction', component: AssessmentIntro },
    { id: 'scenarios', title: 'Scenario Analysis', component: ScenarioSection },
    { id: 'practical', title: 'Practical Skills', component: PracticalSkillsSection },
    { id: 'time', title: 'Time Management', component: TimeManagementSection },
    { id: 'problem', title: 'Problem Solving', component: ProblemSolvingSection },
    { id: 'results', title: 'Results', component: ResultsDashboard }
  ];

  const handleNext = (sectionData?: any) => {
    if (sectionData) {
      setAssessmentData(prev => ({
        ...prev,
        [sections[currentSection].id]: sectionData
      }));
    }
    setCurrentSection(prev => Math.min(prev + 1, sections.length - 1));
  };

  const handlePrevious = () => {
    setCurrentSection(prev => Math.max(prev - 1, 0));
  };

  const CurrentComponent = sections[currentSection].component;
  const isIntro = currentSection === 0;
  const isResults = currentSection === sections.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {!isIntro && !isResults && (
        <AssessmentProgress 
          currentSection={currentSection - 1} 
          totalSections={sections.length - 2}
          sections={sections.slice(1, -1)}
        />
      )}
      
      <div className="container mx-auto px-4 py-8">
        <CurrentComponent
          onNext={handleNext}
          onPrevious={currentSection > 0 ? handlePrevious : undefined}
          data={assessmentData}
        />
      </div>
    </div>
  );
};

export default Index;