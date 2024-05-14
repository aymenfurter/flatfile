import { codingEnvironments } from './codingEnvironments';

export function applyIgnorePatterns(files, environmentId) {
    const { ignorePatterns } = codingEnvironments.find(env => env.id === environmentId) || {};
    ignorePatterns.push('idx');
    ignorePatterns.push('pack');
    ignorePatterns.push('.png');
    ignorePatterns.push('.jpg');
    ignorePatterns.push('.jpeg');
    ignorePatterns.push('.gif');
    ignorePatterns.push('.svg');
    ignorePatterns.push('.ico');
    ignorePatterns.push('.webp');
    ignorePatterns.push('.bmp');
    ignorePatterns.push('.tiff');
    ignorePatterns.push('.pdf');
    ignorePatterns.push('.doc');
    ignorePatterns.push('.docx');
    ignorePatterns.push('.xls');
    ignorePatterns.push('.xlsx');
    ignorePatterns.push('.ppt');
    ignorePatterns.push('.pptx');
    ignorePatterns.push('.odt');
    ignorePatterns.push('.ods');
    ignorePatterns.push('.odp');
    ignorePatterns.push('.odg');
    if (!ignorePatterns) return files;
    return files.filter(file => !ignorePatterns.some(pattern => file.relativePath.includes(pattern)));
}

export function enforceSizeLimit(content, chatApp) {
    const maxSize = chatApp === 'claude' ? 2 * 1024 * 1024 : chatApp === 'chatgpt' ? 15000 : 10000;
    return content.slice(0, maxSize);
}