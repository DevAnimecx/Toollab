import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
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
        <p className="text-muted-foreground">
          Welcome to the Admin Panel. Full tool management features will be built here in the next phase.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;