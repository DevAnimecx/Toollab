import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

interface AdminLoginModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const AdminLoginModal = ({ open, onOpenChange }: AdminLoginModalProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password, passcode);
    if (success) {
      onOpenChange(false);
      navigate('/admin/dashboard');
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`bg-black/20 backdrop-blur-xl border-white/10 text-white ${isShaking ? 'animate-shake' : ''}`}>
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Admin Access</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your credentials to access the admin panel.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-secondary/50" />
          </div>
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} className="bg-secondary/50" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-8 text-muted-foreground">
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <div>
            <Label htmlFor="passcode">Passcode</Label>
            <Input id="passcode" type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} className="bg-secondary/50" />
          </div>
          <Button type="submit" className="w-full">Authenticate</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};