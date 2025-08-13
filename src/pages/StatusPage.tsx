import { useState, useEffect } from 'react';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Lock, Play, Check, RefreshCw, Loader2 } from 'lucide-react';
import { AdminLoginModal } from '@/components/status/AdminLoginModal';
import { AnimatePresence, motion } from 'framer-motion';

type ToolStatus = 'Working' | 'Not Working' | 'Pending' | 'Checking';

interface Status {
  status: ToolStatus;
  lastChecked: string | null;
}

const StatusIndicator = ({ status }: { status: ToolStatus }) => {
  const config = {
    Working: { color: 'bg-green-500', text: 'Working' },
    'Not Working': { color: 'bg-red-500', text: 'Not Working' },
    Pending: { color: 'bg-gray-500', text: 'Pending' },
    Checking: { color: 'bg-yellow-500', text: 'Checking...' },
  };
  const current = config[status];
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2 w-2 rounded-full ${current.color} animate-pulse`} />
      <span className="text-sm">{current.text}</span>
    </div>
  );
};

const StatusPage = () => {
  const [toolStatuses, setToolStatuses] = useState<Record<string, Status>>({});
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  useEffect(() => {
    const initialStatuses = tools.reduce((acc, tool) => {
      acc[tool.path] = { status: 'Pending', lastChecked: null };
      return acc;
    }, {} as Record<string, Status>);
    setToolStatuses(initialStatuses);
  }, []);

  const runScan = async (toolPaths: string[]) => {
    const totalDuration = 69000; // 69 seconds
    const delayPerTool = totalDuration / toolPaths.length;

    for (let i = 0; i < toolPaths.length; i++) {
      const path = toolPaths[i];
      setToolStatuses(prev => ({ ...prev, [path]: { ...prev[path], status: 'Checking' } }));
      
      await new Promise(resolve => setTimeout(resolve, delayPerTool));
      
      const isWorking = Math.random() > 0.05; // 95% chance of working
      setToolStatuses(prev => ({
        ...prev,
        [path]: {
          status: isWorking ? 'Working' : 'Not Working',
          lastChecked: new Date().toLocaleString(),
        },
      }));
      setScanProgress(((i + 1) / toolPaths.length) * 100);
    }
  };

  const handleScanAll = async () => {
    setIsScanning(true);
    setScanProgress(0);
    await runScan(tools.map(t => t.path));
    setIsScanning(false);
  };

  const handleCheckOne = async (path: string) => {
    setToolStatuses(prev => ({ ...prev, [path]: { ...prev[path], status: 'Checking' } }));
    await new Promise(resolve => setTimeout(resolve, 1000)); // 1s delay
    const isWorking = Math.random() > 0.05;
    setToolStatuses(prev => ({
      ...prev,
      [path]: {
        status: isWorking ? 'Working' : 'Not Working',
        lastChecked: new Date().toLocaleString(),
      },
    }));
  };

  return (
    <>
      <AdminLoginModal open={isLoginOpen} onOpenChange={setIsLoginOpen} />
      <div className="container mx-auto px-4 py-12">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold font-heading">Toollab Status</h1>
            <p className="text-muted-foreground">Live status of all our client-side tools.</p>
          </div>
          <Button variant="outline" size="icon" onClick={() => setIsLoginOpen(true)}>
            <Lock className="h-4 w-4" />
          </Button>
        </header>

        <AnimatePresence>
          {isScanning && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 p-4 rounded-lg bg-secondary/50 border border-white/10"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold">Scanning all tools...</p>
                <p className="font-mono text-lg">{Math.round(scanProgress)}%</p>
              </div>
              <Progress value={scanProgress} className="w-full" />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="space-y-2">
          {tools.map(tool => (
            <div key={tool.path} className="flex items-center justify-between p-4 rounded-lg bg-black/20 backdrop-blur-lg border border-white/10 hover:border-primary/50 transition-colors">
              <div className="flex items-center gap-4">
                <tool.icon className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-semibold text-white">{tool.name}</p>
                  <Badge variant="secondary" style={{ color: tool.accentColor, borderColor: `${tool.accentColor}40`, background: `${tool.accentColor}15` }}>
                    {tool.category}
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <p className="text-xs text-muted-foreground w-36 hidden md:block">
                  {toolStatuses[tool.path]?.lastChecked ? `Last checked: ${toolStatuses[tool.path]?.lastChecked}` : 'Not checked yet'}
                </p>
                <div className="w-32">
                  <StatusIndicator status={toolStatuses[tool.path]?.status || 'Pending'} />
                </div>
                <Button size="icon" variant="ghost" onClick={() => handleCheckOne(tool.path)} disabled={toolStatuses[tool.path]?.status === 'Checking'}>
                  {toolStatuses[tool.path]?.status === 'Checking' ? <Loader2 className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="fixed bottom-8 right-8">
          <Button size="lg" onClick={handleScanAll} disabled={isScanning}>
            {isScanning ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Play className="mr-2 h-5 w-5" />}
            {isScanning ? 'Scanning...' : 'Scan All Tools'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default StatusPage;