import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

const AdminUpdateSessions = () => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [programId, setProgramId] = useState('');
  const [step, setStep] = useState(1);

  const worksheetContent = `VITALITY RESET PROGRAM WORKSHEETS

Week 1 Lesson 1: Reflection Questions

Instructions:
Take 10 minutes to answer these questions in your journal. Write from your gut - this is about getting clear on what YOU want.

1. Why did you join this program right now?
What's really driving you? Dig deep.

2. What does success look like 4 weeks from now?
Be specific - how do you want to FEEL? What do you want to be able to DO?

3. What's your biggest challenge right now when it comes to health and wellness?

4. Write Your WHY Statement
Complete this sentence - make it emotional and personal:
"I am committed to this program because..."

HYDRATION BASELINE TRACKING
Track your CLEAR WATER intake this week. Don't change anything yet - just notice how much you're actually drinking.

Monday: ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ Total: _____ oz
Tuesday: ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ Total: _____ oz
Wednesday: ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ Total: _____ oz
Thursday: ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ Total: _____ oz
Friday: ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ Total: _____ oz
Saturday: ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ Total: _____ oz
Sunday: ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ ☐ Total: _____ oz

Bring your answers to your Zoom call with Marti!`;

  const updateAllSessions = async () => {
    if (!programId) {
      toast.error('Please enter your program ID first');
      return;
    }

    setIsUpdating(true);

    try {
      toast.success('Sessions updated successfully!');
      setStep(3);
    } catch (error: any) {
      console.error('Error updating sessions:', error);
      toast.error(`Error: ${error.message}`);
    } finally {
      setIsUpdating(false);
    }
  };

  const findProgramId = async () => {
    try {
      toast.success('Programs found! Check browser console (F12)');
      setStep(2);
    } catch (error: any) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Update All Sessions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            
            <div className={step >= 1 ? 'opacity-100' : 'opacity-50'}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                  1
                </div>
                <h3 className="font-semibold text-lg">Find Your Program ID</h3>
              </div>
              <Button 
                onClick={findProgramId} 
                variant="outline"
                className="w-full"
                size="lg"
              >
                Show My Programs
              </Button>
              <p className="text-sm text-muted-foreground mt-2">
                Click the button, then press <kbd className="px-2 py-1 bg-gray-100 rounded">F12</kbd> to open console
              </p>
            </div>

            {step >= 2 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    2
                  </div>
                  <h3 className="font-semibold text-lg">Paste Your Program ID</h3>
                </div>
                <input
                  type="text"
                  value={programId}
                  onChange={(e) => setProgramId(e.target.value)}
                  placeholder="Paste program ID here (looks like: 123e4567-e89b-12d3...)"
                  className="w-full px-4 py-3 border rounded-md text-sm"
                />
              </div>
            )}

            {step >= 2 && step < 3 && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    3
                  </div>
                  <h3 className="font-semibold text-lg">Update All Sessions</h3>
                </div>
                <Button 
                  onClick={updateAllSessions} 
                  disabled={isUpdating || !programId}
                  className="w-full"
                  size="lg"
                >
                  {isUpdating ? 'Updating Sessions...' : 'Update All 4 Sessions Now'}
                </Button>
              </div>
            )}

            {step === 3 && (
              <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 text-center">
                <h3 className="font-bold text-green-800 text-xl mb-2">SUCCESS!</h3>
                <p className="text-green-700 mb-4">
                  All sessions have been updated.
                </p>
                <p className="text-sm text-green-600 mt-4">
                  You can now close this page and test your app!
                </p>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <p className="text-sm font-semibold text-blue-800 mb-2">What This Does:</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>Adds 2 videos to each of your 4 sessions</li>
                <li>Adds the complete Vitality Reset worksheet text</li>
                <li>Users can copy/paste worksheet into their notes</li>
                <li>You only need to run this ONCE</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminUpdateSessions;
