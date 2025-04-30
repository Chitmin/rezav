import { validateFiles } from '@/lib/file-utils';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useCallback, useState } from 'react';
import type { Control, FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

type FileWithPreview = File & { preview?: string };

export const useDragAndDrop = (control: Control<FieldValues>, name: string, accept: string, maxFiles: number) => {
    const {
        field,
        fieldState: { error },
    } = useController({
        control,
        name,
        rules: { validate: (value) => validateFiles(value, accept, maxFiles) },
    });

    const [files, setFiles] = useState<FileWithPreview[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            const newFiles = acceptedFiles
                .slice(0, maxFiles - files.length)
                .map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }));
            setFiles((prev) => [...prev, ...newFiles]);
            field.onChange([...files, ...newFiles]);
        },
        [files, maxFiles, field],
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;
        if (!active.id || !over?.id) {
            return;
        }

        if (active.id !== over.id) {
            setFiles((items) => {
                const oldIndex = items.findIndex((item) => item.name === active.id);
                const newIndex = items.findIndex((item) => item.name === over.id);
                const newItems = arrayMove(items, oldIndex, newIndex);
                field.onChange(newItems);
                return newItems;
            });
        }
    };

    const handleRemove = (index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        setFiles(newFiles);
        field.onChange(newFiles);
    };

    return { files, activeId, error, onDrop, handleDragEnd, handleRemove, setActiveId };
};
