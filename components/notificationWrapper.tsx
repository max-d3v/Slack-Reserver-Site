"use client";

import { useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

interface NotificationWrapperProps {
  success?: string;
  error?: string;
}

export default function NotificationWrapper({ success, error }: NotificationWrapperProps) {
  const { toast } = useToast();

  const clearParams = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("success");
    url.searchParams.delete("error");
    window.history.replaceState({}, document.title, url.toString());
  }





  useEffect(() => {
    const displayToast = () => {

      if (success) {
        toast({
          title: "All done! Your request was successful.",
          description: success,
          duration: 20000
        });
      } else if (error) {
        toast({
          title: "Uh oh! Something went wrong.",
          description: error,
          variant: "destructive",
        });
      }

      clearParams();
    }
    setTimeout(() => {
      displayToast();
    }, 500);
  }, [success, error, toast]);


  return null;
}