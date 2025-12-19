import { useEffect, useState } from 'react';
import { useParams } from 'wouter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PublicSessionDetail = () => {
  const params = useParams();
  const sessionId = params.sessionId;
  const [session, setSession] = useState<any>(null);
  const [week, setWeek] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      loadSessionData();
    }
  }, [sessionId]);

  const loadSessionData = async () => {
    setLoading(false);
  };

  const getVideoEmbedUrl = (url: string) => {
    const vimeoRegex = /vimeo\.com\/(\d+)/;
    const vimeoMatch = url.match(vimeoRegex);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    
    const descriptRegex = /share\.descript\.com\/view\/([a-zA-Z0-9]+)/;
    const descriptMatch = url.match(descriptRegex);
    if (descriptMatch) {
      return `https://share.descript.com/view/${descriptMatch[1]}`;
    }
    
    return url;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Session not found or not available.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <h2 className="text-2xl font-semibold">Preview Session</h2>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-4xl font-bold mb-2">{session.title}</h1>
          {week && (
            <p className="text-muted-foreground">Week {week.week_number}: {week.title}</p>
          )}
        </div>

        {session.description && (
          <Card className="wellness-card mb-6">
            <CardHeader>
              <CardTitle className="text-lg">About this session</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{session.description}</p>
            </CardContent>
          </Card>
        )}

        {session.video_url && (
          <Card className="wellness-card mb-6">
            <CardContent className="p-0">
              <div className="aspect-video">
                <iframe
                  src={getVideoEmbedUrl(session.video_url)}
                  className="w-full h-full rounded-t-lg"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CardContent>
          </Card>
        )}

        {session.journal_prompt && (
          <Card className="wellness-card">
            <CardHeader>
              <CardTitle className="text-lg">Reflection Prompt</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground italic">{session.journal_prompt}</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default PublicSessionDetail;
