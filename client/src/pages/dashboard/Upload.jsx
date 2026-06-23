import { useRef, useState } from 'react';
import { LANGUAGES } from '../../utils/constants';
import { validateFiles, formatFileSize } from '../../utils/fileValidation';
import { useToast } from '../../contexts/ToastContext';

export default function Upload() {
  const [selectedLang, setSelectedLang] = useState('python');
  const [acceptedFiles, setAcceptedFiles] = useState([]);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef(null);
  const { showToast } = useToast();

  const processFiles = (fileList) => {
    const { valid, errors } = validateFiles(fileList);
    errors.forEach(msg => showToast(msg, 'red'));
    if (valid.length) {
      setAcceptedFiles(prev => {
        const names = new Set(prev.map(f => f.name));
        const merged = [...prev, ...valid.filter(f => !names.has(f.name))];
        return merged;
      });
      showToast(`${valid.length} file(s) accepted for upload`, 'green');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files.length) processFiles(e.dataTransfer.files);
  };

  const clearFiles = () => setAcceptedFiles([]);

  return (
    <div className="upload-page">
      <div className="upload-page-inner">
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Select Programming Language</div>
          <div className="lang-chips">
            {LANGUAGES.map(lang => (
              <button
                key={lang.id}
                type="button"
                className={`lang-chip${selectedLang === lang.id ? ' selected' : ''}`}
                onClick={() => setSelectedLang(lang.id)}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className={`upload-zone${dragging ? ' drag' : ''}`}
          onClick={() => inputRef.current?.click()}
          onDragOver={e => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="upload-icon"><i className="fas fa-cloud-arrow-up" /></div>
          <div className="upload-title">Drop your source files here</div>
          <div className="upload-sub">
            Supports .py, .js, and .java files only<br />
            Max file size: 50MB per file
          </div>
          <input
            ref={inputRef}
            type="file"
            style={{ display: 'none' }}
            multiple
            accept=".py,.js,.java"
            onChange={e => { if (e.target.files.length) processFiles(e.target.files); e.target.value = ''; }}
          />
          <button className="btn btn-blue" style={{ marginTop: 14 }} type="button" onClick={e => { e.stopPropagation(); inputRef.current?.click(); }}>
            <i className="fas fa-folder-open" /> Browse Files
          </button>
        </div>

        {acceptedFiles.length > 0 && (
          <div className="upload-progress" style={{ display: 'block' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>
                {acceptedFiles.length} file(s) ready
              </span>
              <button className="btn btn-red" type="button" onClick={clearFiles} style={{ padding: '3px 8px', fontSize: 11 }}>
                Clear
              </button>
            </div>
            <div className="upload-file-list">
              {acceptedFiles.map(file => (
                <div key={file.name + file.size} className="upload-file-item">
                  <i className="fas fa-file-code" style={{ color: 'var(--blue)' }} />
                  <span style={{ flex: 1, fontWeight: 500 }}>{file.name}</span>
                  <span style={{ color: 'var(--text2)' }}>{formatFileSize(file.size)}</span>
                  <i className="fas fa-check-circle" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
