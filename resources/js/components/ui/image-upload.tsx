import { DndContext, DragOverlay, closestCenter } from '@dnd-kit/core';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './form';
import { useDragAndDrop } from '@/hooks/use-drag-drop';
import { SortableFilePreview } from './image-upload/preview';
import { DropzoneArea } from './image-upload/dropzone-area';
import type { Control, FieldValues } from 'react-hook-form';

export function ImageUpload({
  control,
  name,
  label,
  description,
  maxFiles = 5,
  accept = 'image/*',
  multiple = true,
}: {
  control: Control<FieldValues>;
  name: string;
  label?: string;
  description?: string;
  maxFiles?: number;
  accept?: string;
  multiple?: boolean;
}) {
  const { files, activeId, error, onDrop, handleDragEnd, handleRemove, setActiveId } =
    useDragAndDrop(control, name, accept, maxFiles);


  return (
    <FormItem>
      {label && <FormLabel>{label}</FormLabel>}
      <FormField
        control={control}
        name={name}
        render={() => (
            <FormControl>
                <DndContext
                    modifiers={[restrictToVerticalAxis]}
                    collisionDetection={closestCenter}
                    onDragStart={({ active }) => setActiveId(active.id as string)}
                    onDragEnd={handleDragEnd}
                    onDragCancel={() => setActiveId(null)}
                >
                    <div className="space-y-4">
                        <DropzoneArea
                            name={name}
                            accept={accept}
                            multiple={multiple}
                            onDrop={e => onDrop(Array.from(e.target.files || []))}
                        />
                        <SortableContext items={files.map(f => f.name)} strategy={verticalListSortingStrategy}>
                            <div className="space-y-2">
                                {files.map((file, index) => (
                                    <SortableFilePreview
                                        key={file.name}
                                        id={file.name}
                                        file={file}
                                        index={index}
                                        onRemove={() => handleRemove(index)}
                                    />
                                ))}
                            </div>
                        </SortableContext>
                    </div>
                    <DragOverlay>
                        {activeId ? (
                        <SortableFilePreview
                            id={activeId}
                            file={files.find(f => f.name === activeId)!}
                            index={files.findIndex(f => f.name === activeId)}
                        />
                        ) : null}
                    </DragOverlay>
                </DndContext>
            </FormControl>
        )}
        />
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage>{error?.message || (files.length >= maxFiles && `Maximum ${maxFiles} files uploaded`)}</FormMessage>
    </FormItem>
  );
}
