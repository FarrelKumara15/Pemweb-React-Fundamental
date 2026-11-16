const variants = {
  primary: 'border-brand bg-brand text-white hover:border-blue-800 hover:bg-blue-800',
  outline: 'border-brand bg-white text-brand hover:bg-blue-50',
  danger: 'border-red-600 bg-red-600 text-white hover:border-red-700 hover:bg-red-700',
  dangerOutline: 'border-red-400 bg-white text-red-600 hover:bg-red-50',
};

export function buttonStyles(variant = 'primary', className = '') {
  return `inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border px-5 py-2.5 text-base font-semibold leading-6 transition-colors motion-reduce:transition-none disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`;
}

export default function Button({ variant = 'primary', className = '', type = 'button', ...props }) {
  return <button type={type} className={buttonStyles(variant, className)} {...props} />;
}
