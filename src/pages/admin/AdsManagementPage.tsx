import { useState } from 'react';
import { ads as initialAds, Ad } from '@/data/ads';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Trash2, Edit } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdForm = ({ ad, onSave, onCancel }: { ad?: Ad | null, onSave: (ad: Ad) => void, onCancel: () => void }) => {
  const [headline, setHeadline] = useState(ad?.headline || '');
  const [subtext, setSubtext] = useState(ad?.subtext || '');
  const [imageUrl, setImageUrl] = useState(ad?.imageUrl || '');
  const [targetUrl, setTargetUrl] = useState(ad?.targetUrl || '');
  const [duration, setDuration] = useState(ad?.duration || 10);

  const handleSubmit = () => {
    const newAd: Ad = {
      id: ad?.id || `ad${Date.now()}`,
      headline,
      subtext,
      imageUrl,
      targetUrl,
      duration,
      status: ad?.status || 'active',
    };
    onSave(newAd);
  };

  return (
    <div className="space-y-4 py-4">
      <div>
        <Label htmlFor="headline">Headline</Label>
        <Input id="headline" value={headline} onChange={e => setHeadline(e.target.value)} className="bg-secondary/50" />
      </div>
      <div>
        <Label htmlFor="subtext">Subtext</Label>
        <Input id="subtext" value={subtext} onChange={e => setSubtext(e.target.value)} className="bg-secondary/50" />
      </div>
      <div>
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input id="imageUrl" value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="bg-secondary/50" />
      </div>
      <div>
        <Label htmlFor="targetUrl">Target URL</Label>
        <Input id="targetUrl" value={targetUrl} onChange={e => setTargetUrl(e.target.value)} className="bg-secondary/50" />
      </div>
      <div>
        <Label htmlFor="duration">Duration (seconds)</Label>
        <Input id="duration" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} className="bg-secondary/50" />
      </div>
      <DialogFooter>
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button onClick={handleSubmit}>Save Ad</Button>
      </DialogFooter>
    </div>
  );
};


const AdsManagementPage = () => {
  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);

  const handleSaveAd = (adToSave: Ad) => {
    const exists = ads.some(ad => ad.id === adToSave.id);
    if (exists) {
      setAds(ads.map(ad => ad.id === adToSave.id ? adToSave : ad));
    } else {
      setAds([...ads, adToSave]);
    }
    setIsFormOpen(false);
    setEditingAd(null);
  };

  const handleDeleteAd = (id: string) => {
    setAds(ads.filter(ad => ad.id !== id));
  };
  
  const toggleStatus = (id: string) => {
    setAds(ads.map(ad => ad.id === id ? { ...ad, status: ad.status === 'active' ? 'inactive' : 'active' } : ad));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold font-heading">Ads Management</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingAd(null); setIsFormOpen(true); }}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Ad
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-black/20 backdrop-blur-xl border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>{editingAd ? 'Edit Ad' : 'Add New Ad'}</DialogTitle>
              <DialogDescription>Fill in the details for the cinematic ad.</DialogDescription>
            </DialogHeader>
            <AdForm 
              ad={editingAd}
              onSave={handleSaveAd}
              onCancel={() => { setIsFormOpen(false); setEditingAd(null); }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Headline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ads.map(ad => (
              <TableRow key={ad.id}>
                <TableCell className="font-medium">{ad.headline}</TableCell>
                <TableCell>
                  <Badge variant={ad.status === 'active' ? 'default' : 'secondary'} className={ad.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>
                    {ad.status}
                  </Badge>
                </TableCell>
                <TableCell>{ad.duration}s</TableCell>
                <TableCell className="text-right space-x-2">
                  <Switch
                    checked={ad.status === 'active'}
                    onCheckedChange={() => toggleStatus(ad.id)}
                  />
                  <Button variant="ghost" size="icon" onClick={() => { setEditingAd(ad); setIsFormOpen(true); }}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => handleDeleteAd(ad.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdsManagementPage;