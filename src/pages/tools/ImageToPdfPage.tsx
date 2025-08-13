import { useState } from 'react';
import ToolPageLayout from '@/components/tool/ToolPageLayout';
import { tools } from '@/data/tools';
import { Button } from '@/components/ui/button';
import { UploadCloud, Trash2 } from 'lucide-react';
import jsPDF from 'jspdf';
import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, rectSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { showSuccess } from '@/utils/toast';

interface ImageFile {
  id: string;
  src: string;
  file: File;
}

const SortableImage = ({ image }: { image: ImageFile }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="relative group border rounded-lg overflow-hidden touch-none">
      <img src={image.src} alt="upload preview" className="w-full h-auto" />
    </div>
  );
};

const ImageToPdfPage = () => {
  const tool = tools.find((t) => t.path === '/tools/image-to-pdf')!;
  const [images, setImages] = useState<ImageFile[]>([]);
  const sensors = useSensors(useSensor(PointerSensor));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages: ImageFile[] = Array.from(files).map(file => ({
        id: `${file.name}-${Date.now()}`,
        src: URL.createObjectURL(file),
        file,
      }));
      setImages(prev => [...prev, ...newImages]);
    }
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const generatePdf = () => {
    const doc = new jsPDF();
    images.forEach((image, index) => {
      if (index > 0) doc.addPage();
      const img = new Image();
      img.src = image.src;
      img.onload = () => {
        const imgWidth = img.width;
        const imgHeight = img.height;
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = doc.internal.pageSize.getHeight();
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;
        doc.addImage(image.src, 'JPEG', (pdfWidth - width) / 2, (pdfHeight - height) / 2, width, height);
        if (index === images.length - 1) {
          doc.save('images.pdf');
          showSuccess('PDF generated!');
        }
      };
    });
  };

  return (
    <ToolPageLayout tool={tool}>
      <div className="space-y-6">
        <div className="relative border-2 border-dashed border-muted rounded-lg p-12 text-center">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium text-foreground">Upload Images</h3>
          <p className="mt-1 text-sm text-muted-foreground">Drag and drop or click to select files.</p>
          <input type="file" accept="image/*" multiple onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
        </div>

        {images.length > 0 && (
          <>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={images} strategy={rectSortingStrategy}>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {images.map(image => <SortableImage key={image.id} image={image} />)}
                </div>
              </SortableContext>
            </DndContext>
            <div className="flex justify-center items-center gap-4">
              <Button onClick={generatePdf} size="lg">Generate PDF</Button>
              <Button onClick={() => setImages([])} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Clear All
              </Button>
            </div>
          </>
        )}
      </div>
    </ToolPageLayout>
  );
};

export default ImageToPdfPage;