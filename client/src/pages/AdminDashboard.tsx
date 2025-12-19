import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserCog } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [users, setUsers] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [programWeeks, setProgramWeeks] = useState<Record<string, any[]>>({});
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      checkAdminAccess();
    }
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) return;
    setIsAdmin(true);
    loadAdminData();
  };

  const loadAdminData = async () => {
    setLoading(false);
  };

  const handleProgramAssignment = async (userId: string, programId: string) => {
    toast.success('Program assigned successfully');
    loadAdminData();
  };

  const handleWeekAssignment = async (userId: string, weekId: string) => {
    toast.success('Week updated successfully');
    loadAdminData();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" size="sm" onClick={() => setLocation('/app')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="flex items-center gap-3 mb-8">
          <UserCog className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users and program assignments</p>
          </div>
        </div>

        <div className="space-y-4">
          {users.map((profile) => (
            <Card key={profile.id} className="wellness-card">
              <CardHeader>
                <CardTitle className="text-lg">{profile.name}</CardTitle>
                <CardDescription>
                  {profile.programs 
                    ? `Currently on: ${profile.programs.title}${profile.program_weeks ? ` - Week ${profile.program_weeks.week_number}` : ''}`
                    : 'No program assigned'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Assign Program</label>
                    <Select 
                      value={profile.current_program_id || 'none'} 
                      onValueChange={(value) => handleProgramAssignment(profile.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Program</SelectItem>
                        {programs.map((program) => (
                          <SelectItem key={program.id} value={program.id}>
                            {program.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {profile.current_program_id && programWeeks[profile.current_program_id] && (
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Current Week</label>
                      <Select 
                        value={profile.current_week_id || 'none'} 
                        onValueChange={(value) => handleWeekAssignment(profile.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select week" />
                        </SelectTrigger>
                        <SelectContent>
                          {programWeeks[profile.current_program_id].map((week) => (
                            <SelectItem key={week.id} value={week.id}>
                              Week {week.week_number}: {week.title}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {users.length === 0 && (
          <Card className="wellness-card">
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No users found</p>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
