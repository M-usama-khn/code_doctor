import { ALLOWED_EXTENSIONS, MAX_FILE_SIZE } from './constants';

export function getFileExtension(filename) {
  const dot = filename.lastIndexOf('.');
  return dot >= 0 ? filename.slice(dot).toLowerCase() : '';
}

export function isAllowedFile(file) {
  const ext = getFileExtension(file.name);
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { valid: false, reason: `"${file.name}" is not allowed. Only .py, .js, and .java files are supported.` };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, reason: `"${file.name}" exceeds the 50MB size limit.` };
  }
  return { valid: true };
}

export function validateFiles(fileList) {
  const valid = [];
  const errors = [];

  Array.from(fileList).forEach(file => {
    const result = isAllowedFile(file);
    if (result.valid) valid.push(file);
    else errors.push(result.reason);
  });

  return { valid, errors };
}

export function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}
