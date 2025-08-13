import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';

const AdminDashboardPage = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/status');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!isAuthenticated) {
    return null; // or a loading spinner
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="p-8 rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-heading">Admin Dashboard</h1>
          <Button onClick={handleLogout} variant="destructive">Logout</Button>
        </div>
        <div className="space-y-4">
          <p className="text-muted-foreground">
            Welcome to the Admin Panel. Use the links below to manage the site.
          </p>
          <Button asChild>
            <Link to="/admin/ads">Manage Cinematic Ads</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;