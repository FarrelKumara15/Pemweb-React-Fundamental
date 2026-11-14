import { useEffect, useRef } from 'react';

export default function Modal({ titleId, descriptionId, onClose, children, className = '' }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <dialog ref={dialogRef} className={`modal ${className}`} aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <button type="button" className="close-button" onClick={onClose} aria-label="Tutup dialog">×</button>
      {children}
    </dialog>
  );
}
