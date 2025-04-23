export const validateFiles = (files: File[], accept: string, maxFiles: number) => {
    if (files.length > maxFiles) return `Maximum ${maxFiles} files allowed`;

    const invalidFiles = files.filter(
        (file) =>
            !accept.split(',').some((pattern) => {
                const regex = new RegExp(pattern.replace('*', '.*').replace('/', '/'));
                return regex.test(file.type);
            }),
    );

    return invalidFiles.length > 0 ? 'Invalid file type' : true;
};

export const generatePreview = (file: File) => Object.assign(file, { preview: URL.createObjectURL(file) });
