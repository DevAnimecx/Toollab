import { useState } from 'react';
import { ads as initialAds, Ad } from '@/data/ads';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Trash2, Edit, Eye, GripVertical } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AdPreviewModal } from '@/components/admin/AdPreviewModal';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const AdForm = ({ ad, onSave, onCancel }: { ad?: Ad | null, onSave: (ad: Ad) => void, onCancel: () => void }) => {
  const [headline, setHeadline] = useState(ad?.headline || '');
  const [subtext, setSubtext] = useState(ad?.subtext || '');
  const [background, setBackground] = useState(ad?.background || 'bg-gradient-to-br from-gray-700 to-gray-900');
  const [targetUrl, setTargetUrl] = useState(ad?.targetUrl || '');
  const [duration, setDuration] = useState(ad?.duration || 10);

  const handleSubmit = () => {
    const newAd: Ad = {
      id: ad?.id || `ad${Date.now()}`,
      headline,
      subtext,
      background,
      targetUrl,
      duration,
      status: ad?.status || 'active',
    };
    onSave(newAd);
  };

  return (
    <div className="space-y-4 py-4">
      <div><Label htmlFor="headline">Headline</Label><Input id="headline" value={headline} onChange={e => setHeadline(e.target.value)} className="bg-secondary/50" /></div>
      <div><Label htmlFor="subtext">Subtext</Label><Input id="subtext" value={subtext} onChange={e => setSubtext(e.target.value)} className="bg-secondary/50" /></div>
      <div><Label htmlFor="background">Background Class</Label><Input id="background" value={background} onChange={e => setBackground(e.target.value)} className="bg-secondary/50" placeholder="e.g., bg-gradient-to-br from-blue-500 to-purple-600" /></div>
      <div><Label htmlFor="targetUrl">Target URL</Label><Input id="targetUrl" value={targetUrl} onChange={e => setTargetUrl(e.target.value)} className="bg-secondary/50" /></div>
      <div><Label htmlFor="duration">Duration (seconds)</Label><Input id="duration" type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} className="bg-secondary/50" /></div>
      <DialogFooter><Button variant="ghost" onClick={onCancel}>Cancel</Button><Button onClick={handleSubmit}>Save Ad</Button></DialogFooter>
    </div>
  );
};

const SortableAdRow = ({ ad, toggleStatus, onEdit, onDelete, onPreview }: { ad: Ad, toggleStatus: (id: string) => void, onEdit: (ad: Ad) => void, onDelete: (id: string) => void, onPreview: (ad: Ad) => void }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: ad.id });
  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="w-12">
        <Button variant="ghost" size="icon" {...attributes} {...listeners} className="cursor-grab active:cursor-grabbing">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </Button>
      </TableCell>
      <TableCell className="font-medium">{ad.headline}</TableCell>
      <TableCell><Badge variant={ad.status === 'active' ? 'default' : 'secondary'} className={ad.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-500/30' : ''}>{ad.status}</Badge></TableCell>
      <TableCell>{ad.duration}s</TableCell>
      <TableCell className="text-right space-x-2">
        <Switch checked={ad.status === 'active'} onCheckedChange={() => toggleStatus(ad.id)} />
        <Button variant="ghost" size="icon" onClick={() => onPreview(ad)}><Eye className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" onClick={() => onEdit(ad)}><Edit className="h-4 w-4" /></Button>
        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => onDelete(ad.id)}><Trash2 className="h-4 w-4" /></Button>
      </TableCell>
    </TableRow>
  );
};

const AdsManagementPage = () => {
  const [ads, setAds] = useState<Ad[]>(initialAds);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAd, setEditingAd] = useState<Ad | null>(null);
  const [previewAd, setPreviewAd] = useState<Ad | null>(null);
  const sensors = useSensors(useSensor(PointerSensor));

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

  const handleDeleteAd = (id: string) => setAds(ads.filter(ad => ad.id !== id));
  const toggleStatus = (id: string) => setAds(ads.map(ad => ad.id === id ? { ...ad, status: ad.status === 'active' ? 'inactive' : 'active' } : ad));
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setAds((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <>
      <AdPreviewModal ad={previewAd} open={!!previewAd} onOpenChange={() => setPreviewAd(null)} />
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold font-heading">Ads Management</h1>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild><Button onClick={() => { setEditingAd(null); setIsFormOpen(true); }}><PlusCircle className="mr-2 h-4 w-4" /> Add New Ad</Button></DialogTrigger>
            <DialogContent className="bg-black/20 backdrop-blur-xl border-white/10 text-white">
              <DialogHeader><DialogTitle>{editingAd ? 'Edit Ad' : 'Add New Ad'}</DialogTitle><DialogDescription>Fill in the details for the cinematic ad.</DialogDescription></DialogHeader>
              <AdForm ad={editingAd} onSave={handleSaveAd} onCancel={() => { setIsFormOpen(false); setEditingAd(null); }} />
            </DialogContent>
          </Dialog>
        </div>

        <div className="rounded-2xl bg-black/20 backdrop-blur-xl border border-white/10 p-4">
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Headline</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <SortableContext items={ads} strategy={verticalListSortingStrategy}>
                <TableBody>
                  {ads.map(ad => (
                    <SortableAdRow 
                      key={ad.id} 
                      ad={ad}
                      toggleStatus={toggleStatus}
                      onEdit={(ad) => { setEditingAd(ad); setIsFormOpen(true); }}
                      onDelete={handleDeleteAd}
                      onPreview={setPreviewAd}
                    />
                  ))}
                </TableBody>
              </SortableContext>
            </Table>
          </DndContext>
        </div>
      </div>
    </>
  );
};

export default AdsManagementPage;