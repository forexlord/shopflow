import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import { registerToastNotifier, type ToastVariant } from "../api/toastBridge";
import { Icon, Text } from "../design-system";
import { cx } from "../design-system/utils/cx";
import styles from "./ToastContext.module.css";

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const toastIcons: Record<ToastVariant, string> = {
  success: "check_circle",
  error: "error",
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = "success") => {
      const id = Date.now();
      setToasts((current) => [...current, { id, message, variant }]);

      window.setTimeout(() => {
        setToasts((current) => current.filter((toast) => toast.id !== id));
      }, 4000);
    },
    []
  );

  useEffect(() => {
    registerToastNotifier(showToast);
  }, [showToast]);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className={styles.container} aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cx(
              styles.toast,
              toast.variant === "error" && styles.error
            )}
          >
            <Icon
              name={toastIcons[toast.variant]}
              size="sm"
              className={cx(
                styles.icon,
                toast.variant === "error" && styles.iconError
              )}
            />
            <Text variant="label-md">{toast.message}</Text>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within ToastProvider");
  }
  return context;
}
