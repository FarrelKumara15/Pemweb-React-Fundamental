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
    <dialog ref={dialogRef} className={`m-auto max-h-[calc(100dvh-2.5rem)] w-[calc(100%-2rem)] max-w-md overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-ink shadow-2xl backdrop:bg-slate-950/40 backdrop:backdrop-blur-sm sm:p-7 ${className}`} aria-labelledby={titleId}
      aria-describedby={descriptionId} onKeyDown={handleKeyDown}
      onCancel={(event) => { event.preventDefault(); onClose(); }}>
      <button type="button" className="absolute top-3 right-3 grid size-10 place-items-center rounded-lg text-3xl leading-none text-slate-500 hover:bg-slate-100" onClick={onClose} aria-label="Tutup dialog">×</button>
      {children}
    </dialog>
  );
}
