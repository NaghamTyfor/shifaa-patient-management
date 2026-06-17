import { useState, useEffect } from "react";

export const useToast = () => {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const hideToast = () => setToast(null);

  return { toast, showToast, hideToast };
};