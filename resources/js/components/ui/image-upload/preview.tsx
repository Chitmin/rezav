import * as React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '../button';

export const SortableFilePreview = React.memo(({ id, file, index, onRemove }: {
  id: string;
  file: FileWithPreview;
  index: number;
  onRemove?: () => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  React.useEffect(() => () => {
    if (file.preview) URL.revokeObjectURL(file.preview);
  }, [file]);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-4 p-4 border rounded-lg transition-shadow
        bg-background hover:shadow-md"
      data-dragging={isDragging}
      {...attributes}
      {...listeners}
    >
      {file.type.startsWith('image/') ? (
        <img
          src={file.preview}
          alt={file.name}
          className="h-16 w-16 rounded-md object-cover"
        />
      ) : (
        <div className="h-16 w-16 rounded-md bg-muted flex items-center justify-center">
          <span className="text-sm">{file.type.split('/')[1]}</span>
        </div>
      )}
      <div className="flex-1">
        <div className="font-medium">{file.name}</div>
        <div className="text-sm text-muted-foreground">
          {(file.size / 1024 / 1024).toFixed(2)} MB
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-destructive"
        onClick={onRemove}
      >
        Remove
      </Button>
    </div>
  );
});
