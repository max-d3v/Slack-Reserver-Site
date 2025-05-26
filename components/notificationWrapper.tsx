"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

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
    } else {
      // No params, no toast.
      null;
    }

    clearParams();
  }


  useEffect(() => {
    setTimeout(() => {
      displayToast();
    }, 500);
  }, [toast]);


  return (
    null
  )

}