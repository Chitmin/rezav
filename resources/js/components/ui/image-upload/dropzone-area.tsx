import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function DropzoneArea({ name, accept, multiple, onDrop }: {
    name: string;
    accept: string;
    multiple: boolean;
    onDrop: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) {
    return <div className="border-2 border-dashed rounded-lg p-8 text-center transition-colors
      data-[drag-active=true]:border-primary data-[drag-active=true]:bg-primary/5">
      <div className="flex flex-col items-center gap-4">
        <Upload className="h-8 w-8 text-muted-foreground" />
        <div className="text-sm text-muted-foreground">
          Drag & drop files here, or click to browse
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => document.getElementById(name)?.click()}
        >
          Select Files
        </Button>
        <input
          id={name}
          type="file"
          className="hidden"
          accept={accept}
          multiple={multiple}
          onChange={onDrop}
        />
      </div>
    </div>
  };
