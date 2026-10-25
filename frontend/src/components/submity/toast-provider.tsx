'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

type Tone = 'success' | 'error';
type ToastState = { message: string; tone: Tone } | null;
type NotifyFn = (toast: { message: string; tone?: Tone }) => void;

const NotifyContext = createContext<NotifyFn>(() => {});

export const useNotify = () => useContext(NotifyContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastState>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismiss = useCallback(() => setToast(null), []);

  const notify = useCallback<NotifyFn>(({ message, tone = 'success' }) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ message, tone });
    timer.current = setTimeout(() => setToast(null), 4500);
  }, []);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      {toast && (
        <div className={`toast-message ${toast.tone}`} role="status" aria-live="polite">
          {toast.tone === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          <span>{toast.message}</span>
          <button onClick={dismiss} aria-label="Dismiss notification"><X size={15} /></button>
        </div>
      )}
    </NotifyContext.Provider>
  );
}
