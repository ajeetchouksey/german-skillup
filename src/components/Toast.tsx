interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 right-6 z-50 rounded-lg border border-success bg-card px-5 py-3 text-sm shadow-card transition-all duration-300 ${
        message ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2.5 opacity-0"
      }`}
    >
      {message}
    </div>
  );
}
