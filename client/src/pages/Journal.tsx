import { useEffect, useState } from 'react';
import { useSearch, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Trash2, BookOpen } from 'lucide-react';
import { VITALITY_RESET_WEEKS } from '@/lib/vitality-reset-content';
import { BottomNav } from '@/components/BottomNav';
import { safeStorage } from "@/lib/safeStorage";

interface JournalEntry {
  id: string;
  title: string;
  body: string;
  sessionId?: string;
  sessionTitle?: string;
  createdAt: string;
}

const Journal = () => {
  const searchString = useSearch();
  const searchParams = new URLSearchParams(searchString);
  const [, setLocation] = useLocation();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState(searchParams.get('prompt') || '');
  const [selectedSession, setSelectedSession] = useState(searchParams.get('session') || '');
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);

  // Build sessions list from centralized content
  const sessions = VITALITY_RESET_WEEKS.flatMap((week) =>
    week.sessions.map((session) => ({
      id: session.id,
      title: `Week ${week.weekNumber}: ${session.title}`,
      journalPrompt: session.journalPrompt,
    }))
  );

  useEffect(() => {
    loadJournalEntries();
  }, []);

  const loadJournalEntries = () => {
    const saved = safeStorage.getItem('journalEntries');
    if (saved) {
      const parsed = JSON.parse(saved);
      setEntries(parsed.sort((a: JournalEntry, b: JournalEntry) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !body.trim()) {
      alert('Please fill in both title and entry');
      return;
    }

    const session = sessions.find(s => s.id === selectedSession);
    
    const newEntry: JournalEntry = {
      id: Date.now().toString(),
      title: title.trim(),
      body: body.trim(),
      sessionId: selectedSession || undefined,
      sessionTitle: session?.title,
      createdAt: new Date().toISOString(),
    };

    const updatedEntries = [newEntry, ...entries];
    setEntries(updatedEntries);
    safeStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    setTitle('');
    setBody('');
    setSelectedSession('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this entry?')) {
      const updatedEntries = entries.filter(e => e.id !== id);
      setEntries(updatedEntries);
      safeStorage.setItem('journalEntries', JSON.stringify(updatedEntries));
  
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => setLocation('/app')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Journal</h1>
          <p className="text-muted-foreground">
            Grab your journal - yes, we're going old school! This is where you capture your reflections 
            and track how your body and energy respond throughout Vitality Reset.
          </p>
        </div>

        <Card className="wellness-card mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              New Entry
            </CardTitle>
            <CardDescription>
              Write from the heart. There's no right or wrong here - just honest reflection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your entry a title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="session">Related Session (Optional)</Label>
                <select
                  id="session"
                  value={selectedSession}
                  onChange={(e) => setSelectedSession(e.target.value)}
                  className="w-full px-3 py-2 border border-input bg-background rounded-md"
                >
                  <option value="">None</option>
                  {sessions.map((session) => (
                    <option key={session.id} value={session.id}>
                      {session.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="body">Entry</Label>
                <Textarea
                  id="body"
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Write your thoughts..."
                  className="min-h-[200px]"
                  required
                />
              </div>

              <Button type="submit" className="w-full">Save Entry</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Previous Entries ({entries.length})</h2>
          
          {entries.length === 0 && (
            <Card className="wellness-card">
              <CardContent className="py-8 text-center text-muted-foreground">
                No journal entries yet. Write your first one above!
              </CardContent>
            </Card>
          )}

          {entries.map((entry) => (
            <Card 
              key={entry.id} 
              className="wellness-card-hover cursor-pointer"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1" onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}>
                    <CardTitle className="text-lg">{entry.title}</CardTitle>
                    <CardDescription>
                      {new Date(entry.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {entry.sessionTitle && ` • ${entry.sessionTitle}`}
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(entry.id);
                    }}
                    className="ml-2"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent onClick={() => setExpandedEntry(expandedEntry === entry.id ? null : entry.id)}>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {expandedEntry === entry.id 
                    ? entry.body 
                    : entry.body.substring(0, 200) + (entry.body.length > 200 ? '...' : '')
                  }
                </p>
                {entry.body.length > 200 && (
                  <p className="text-sm text-primary mt-2">
                    {expandedEntry === entry.id ? 'Click to collapse' : 'Click to read more'}
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Journal;