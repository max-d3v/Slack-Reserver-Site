"use client"

import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useEffect } from "react";
import loggerService from "@/lib/utils/logger";

export function Toaster() {
  const { toasts } = useToast()


  useEffect(() => {
    toasts.forEach(toast => {
      if (toast.variant === 'destructive') {
        loggerService.critical('ui-toast', 
          'Critical error toast displayed to user', 
          { 
            title: toast.title,
            description: toast.description,
            timestamp: new Date().toISOString()
          }
        );
      }
    });
  }, [toasts]);

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
