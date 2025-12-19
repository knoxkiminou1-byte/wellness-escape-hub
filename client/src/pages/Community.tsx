import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, Trash2, Users } from 'lucide-react';
import { BottomNav } from '@/components/BottomNav';
import { safeStorage } from "@/lib/safeStorage";

interface CommunityPost {
  id: string;
  userName: string;
  content: string;
  createdAt: string;
}

const Community = () => {
  const [, setLocation] = useLocation();
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    loadCommunityPosts();
    loadUserName();
  }, []);

  const loadUserName = () => {
    const saved = safeStorage.getItem('userName');
    if (!saved) {
      const name = prompt('What name would you like to use in the community?') || 'Anonymous';
      safeStorage.setItem('userName', name);
      setUserName(name);
    } else {
      setUserName(saved);
    }
  };

  const loadCommunityPosts = () => {
    const saved = safeStorage.getItem('communityPosts');
    if (saved) {
      const parsed = JSON.parse(saved);
      setPosts(parsed.sort((a: CommunityPost, b: CommunityPost) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      alert('Please write something to post');
      return;
    }

    const newPost: CommunityPost = {
      id: Date.now().toString(),
      userName: userName || 'Anonymous',
      content: content.trim(),
      createdAt: new Date().toISOString(),
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    safeStorage.setItem('communityPosts', JSON.stringify(updatedPosts));

   
    setContent('');
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this post?')) {
      const updatedPosts = posts.filter(p => p.id !== id);
      setPosts(updatedPosts);
      safeStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
      
    }
  };

  const handleChangeName = () => {
    const newName = prompt('Enter your new display name:', userName) || userName;
    safeStorage.setItem('userName', newName);
    setUserName(newName);
    alert('Name updated!');
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => setLocation('/app')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
          <Button variant="outline" size="sm" onClick={handleChangeName}>
            Change Name
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
            <h1 className="text-4xl font-bold">Community</h1>
            <p className="text-muted-foreground">Posting as: <span className="font-semibold">{userName}</span></p>
          </div>
          <p className="text-muted-foreground">
            You're not doing this alone. Share your wins, ask questions, and support other women 
            on the same journey. We're all in this together.
          </p>
        </div>

        <Card className="wellness-card mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Share with the Community
            </CardTitle>
            <CardDescription>
              Celebrate a win, ask for advice, or just say hi. This is your safe space.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share your thoughts, wins, challenges, or questions..."
                className="min-h-[100px]"
                required
              />
              <Button type="submit" className="w-full">Post</Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Community Posts ({posts.length})</h2>
          
          {posts.length === 0 && (
            <Card className="wellness-card">
              <CardContent className="py-8 text-center text-muted-foreground">
                No posts yet. Be the first to share something!
              </CardContent>
            </Card>
          )}

          {posts.map((post) => (
            <Card key={post.id} className="wellness-card">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-semibold">{post.userName}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(post.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                  {post.userName === userName && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(post.id)}
                      className="ml-2"
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{post.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <BottomNav />
    </div>
  );
};

export default Community;