export async function selectDirectory() {
    const directoryHandle = await window.showDirectoryPicker();
    return directoryHandle;
}

export async function readFiles(directoryHandle) {
    const files = [];
    const recurseDirectory = async (directoryHandle, path = '') => {
        for await (const entry of directoryHandle.values()) {
            if (entry.kind === 'file') {
                const file = await entry.getFile();
                const relativePath = `${path}/${entry.name}`;
                files.push({ file, relativePath });
            } else if (entry.kind === 'directory') {
                const subDirectoryHandle = await directoryHandle.getDirectoryHandle(entry.name);
                await recurseDirectory(subDirectoryHandle, `${path}/${entry.name}`);
            }
        }
    };
    await recurseDirectory(directoryHandle);
    return files;
}

export async function generateFatFile(files) {
    const fatFileContent = [];
    for (const { file, relativePath } of files) {
        const content = await file.text();
        fatFileContent.push(`File: ${relativePath}\n\n${content}\n\n`);
    }
    return fatFileContent.join('');
}
