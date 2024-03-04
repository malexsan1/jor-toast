import React from "react";

export const ToastContext = React.createContext();

export const useToastContext = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }

  return context;
};

function ToastProvider({ children }) {
  const [toasts, setToasts] = React.useState([]);

  const addToast = React.useCallback(({ message, variant }) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { message, variant, id: crypto.randomUUID() },
    ]);
  }, []);

  const removeToast = React.useCallback((toastId) => {
    setToasts((prevToasts) =>
      prevToasts.filter((toast) => toast.id !== toastId)
    );
  }, []);

  const providerValue = React.useMemo(
    () => ({ toasts, addToast, removeToast }),
    [toasts, addToast, removeToast]
  );

  React.useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setToasts([]);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <ToastContext.Provider value={providerValue}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
