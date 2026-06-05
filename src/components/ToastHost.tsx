import { useToasts } from "../store/toasts";

/** Renders reward toasts (XP gained, level up, badge unlocked) in a stack. */
export function ToastHost() {
  const { toasts, dismiss } = useToasts();
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <button
          key={t.id}
          className={`toast toast--${t.kind}`}
          onClick={() => dismiss(t.id)}
          title="Dismiss"
        >
          <span className="toast__emoji" aria-hidden="true">{t.emoji}</span>
          <span className="toast__text">
            <span className="toast__title">{t.title}</span>
            {t.detail && <span className="toast__detail">{t.detail}</span>}
          </span>
        </button>
      ))}
    </div>
  );
}
