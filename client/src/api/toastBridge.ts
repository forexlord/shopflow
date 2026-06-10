export type ToastVariant = "success" | "error";

type ToastNotifier = (message: string, variant: ToastVariant) => void;

let notifier: ToastNotifier | null = null;

export function registerToastNotifier(fn: ToastNotifier): void {
  notifier = fn;
}

export function notifyToast(
  message: string,
  variant: ToastVariant = "success"
): void {
  notifier?.(message, variant);
}
