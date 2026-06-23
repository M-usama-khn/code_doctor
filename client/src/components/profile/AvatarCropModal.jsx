import { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import 'react-easy-crop/react-easy-crop.css';
import { getCroppedImageBlob } from '../../utils/cropImage';

export default function AvatarCropModal({ imageSrc, onClose, onSave, saving }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const onCropComplete = useCallback((_area, pixels) => {
    setCroppedArea(pixels);
  }, []);

  const handleSave = async () => {
    if (!croppedArea) return;
    try {
      const blob = await getCroppedImageBlob(imageSrc, croppedArea);
      const file = new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
      await onSave(file);
    } catch {
      // parent handles toast
    }
  };

  return (
    <div className="crop-modal-overlay" onClick={onClose}>
      <div className="crop-modal" onClick={e => e.stopPropagation()}>
        <div className="crop-modal-hd">
          <span className="crop-modal-title">Adjust Profile Photo</span>
          <button type="button" className="crop-modal-close" onClick={onClose} aria-label="Close">
            <i className="fas fa-xmark" />
          </button>
        </div>

        <div className="crop-modal-body">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>

        <div className="crop-modal-controls">
          <i className="fas fa-magnifying-glass-minus" style={{ color: 'var(--text2)', fontSize: 12 }} />
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={e => setZoom(Number(e.target.value))}
            className="crop-zoom-slider"
          />
          <i className="fas fa-magnifying-glass-plus" style={{ color: 'var(--text2)', fontSize: 12 }} />
        </div>

        <p className="crop-modal-hint">Drag to reposition · Use slider to zoom</p>

        <div className="crop-modal-actions">
          <button type="button" className="btn" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="button" className="btn btn-blue" onClick={handleSave} disabled={saving || !croppedArea}>
            <i className="fas fa-check" /> {saving ? 'Saving…' : 'Save Photo'}
          </button>
        </div>
      </div>
    </div>
  );
}
