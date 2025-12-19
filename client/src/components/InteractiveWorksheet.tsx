import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Download, Save } from "lucide-react";
import { safeStorage } from "@/lib/safeStorage";

interface WorksheetQuestion {
  id: string;
  type: "text" | "textarea" | "checklist";
  question: string;
  placeholder?: string;
  options?: string[];
}

interface InteractiveWorksheetProps {
  lessonId: string;
  title: string;
  questions: WorksheetQuestion[];
}

export const InteractiveWorksheet = ({ 
  lessonId, 
  title, 
  questions 
}: InteractiveWorksheetProps) => {
  // Load saved answers from safeStorage
  const [answers, setAnswers] = useState<Record<string, string | string[]>>(() => {
    const saved = safeStorage.getItem(`worksheet-${lessonId}`);
    return saved ? JSON.parse(saved) : {};
  });

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    const updated = { ...answers, [questionId]: value };
    setAnswers(updated);
    safeStorage.setItem(`worksheet-${lessonId}`, JSON.stringify(updated));
  };

  const handleChecklistToggle = (questionId: string, option: string) => {
    const current = answers[questionId] || [];
    const updated = current.includes(option)
      ? current.filter((item: string) => item !== option)
      : [...current, option];
    handleAnswerChange(questionId, updated);
  };

  const handleSave = () => {
    alert("Your answers have been saved!");
  };

  const handleDownload = () => {
    // Create a text version of the worksheet
    let content = `${title}\n${"=".repeat(title.length)}\n\n`;
    
    questions.forEach((q) => {
      content += `${q.question}\n`;
      const answer = answers[q.id];
      
      if (q.type === "checklist" && Array.isArray(answer)) {
        answer.forEach(item => {
          content += `✓ ${item}\n`;
        });
      } else if (answer) {
        content += `${answer}\n`;
      } else {
        content += "[Not answered]\n";
      }
      content += "\n";
    });

    // Create and download file
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title.replace(/\s+/g, "-").toLowerCase()}-worksheet.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="wellness-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSave}
            >
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownload}
            >
              <Download className="w-4 h-4 mr-1" />
              Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map((question) => (
          <div key={question.id} className="space-y-2">
            <label className="text-sm font-medium block">
              {question.question}
            </label>

            {question.type === "text" && (
              <Input
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                placeholder={question.placeholder || "Type your answer..."}
                className="w-full"
              />
            )}

            {question.type === "textarea" && (
              <Textarea
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                placeholder={question.placeholder || "Type your answer..."}
                className="w-full min-h-[100px]"
              />
            )}

            {question.type === "checklist" && question.options && (
              <div className="space-y-2">
                {question.options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={(answers[question.id] || []).includes(option)}
                      onChange={() => handleChecklistToggle(question.id, option)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
};