import { useEffect, useRef } from 'react';

export default function Modal({ titleId, descriptionId, onClose, children, className = '' }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    dialog.showModal();
    dialog.querySelector('[data-initial-focus]')?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  function handleKeyDown(event) {
    if (event.key !== 'Tab') return;
    const controls = Array.from(dialogRef.current.querySelectorAll('button, input, select, textarea, a[href], [tabindex]'))
      .filter((element) => !element.disabled && element.tabIndex >= 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }

  return (
    <dialog ref={dialogRef} className={`modal ${className}`} aria-labelledby={titleId}
      aria-describedby={descriptionId} onKeyDown={handleKeyDown}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <button type="button" className="close-button" onClick={onClose} aria-label="Tutup dialog">×</button>
      {children}
    </dialog>
  );
}
