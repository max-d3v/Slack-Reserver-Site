"use client"

import React from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export interface SlackButtonProps {
  className?: string;
}

export const SlackButton = ({className}: SlackButtonProps) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  // Redirecionar para login se não estiver autenticado
  if (status === "unauthenticated") {
    return (
      <div className={`${className}`}>
        <button
          onClick={() => router.push("/signIn")}
          className=" add-to-slack-btn group relative inline-flex items-center justify-center overflow-hidden"
          style={{
            alignItems: "center",
            backgroundColor: "#4A154B",
            border: 0,
            borderRadius: "4px",
            color: "#fff",
            display: "inline-flex",
            fontFamily: "Lato, sans-serif",
            fontSize: "18px",
            fontWeight: 600,
            height: "56px",
            justifyContent: "center",
            textDecoration: "none",
            width: "276px",
            transition: "all 0.3s ease",
            position: "relative",
          }}
        >
          {/* Animated background */}
          <span
            className="absolute inset-0 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] bg-[length:200%_100%]"
            style={{
              animation: "gradientFlow 3s ease infinite",
              opacity: 0,
              transition: "opacity 0.3s ease"
            }}
          />
  
          {/* Button content with SVG */}
          <span className="relative flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "24px", width: "24px", marginRight: "12px" }} viewBox="0 0 122.8 122.8">
              <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path>
              <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path>
              <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path>
              <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path>
            </svg>
            Get Started
          </span>
        </button>
      </div>
    )
  }
  
  // URL de autorização do Slack incluindo o userId
  const userId = (session?.user as any)?.id;
  const authUrl = `https://slack.com/oauth/v2/authorize?scope=app_mentions%3Aread%2Ccanvases%3Aread%2Ccanvases%3Awrite%2Cchannels%3Ahistory%2Cchat%3Awrite%2Ccommands%2Cemoji%3Aread%2Ctriggers%3Aread&user_scope=&redirect_uri=https%3A%2F%2Flocalhost%3A3000%2Fapi%2Fslack-auth&client_id=8320946706706.8320960407410&state=${userId || ''}`;

  return (
    <div className={`${className}`}>
      <a
        href={authUrl}
        className="add-to-slack-btn group relative inline-flex items-center justify-center overflow-hidden"
        target="_blank"
        style={{
          alignItems: "center",
          backgroundColor: "#4A154B",
          border: 0,
          borderRadius: "4px",
          color: "#fff",
          display: "inline-flex",
          fontFamily: "Lato, sans-serif",
          fontSize: "18px",
          fontWeight: 600,
          height: "56px",
          justifyContent: "center",
          textDecoration: "none",
          width: "276px",
          transition: "all 0.3s ease",
          position: "relative",
        }}
      >
        {/* Animated background */}
        <span
          className="absolute inset-0 bg-gradient-to-r from-[#4A154B] via-[#5F1B61] to-[#4A154B] bg-[length:200%_100%]"
          style={{
            animation: "gradientFlow 3s ease infinite",
            opacity: 0,
            transition: "opacity 0.3s ease"
          }}
        />

        {/* Button content with SVG */}
        <span className="relative flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" style={{ height: "24px", width: "24px", marginRight: "12px" }} viewBox="0 0 122.8 122.8">
            <path d="M25.8 77.6c0 7.1-5.8 12.9-12.9 12.9S0 84.7 0 77.6s5.8-12.9 12.9-12.9h12.9v12.9zm6.5 0c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9v32.3c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V77.6z" fill="#e01e5a"></path>
            <path d="M45.2 25.8c-7.1 0-12.9-5.8-12.9-12.9S38.1 0 45.2 0s12.9 5.8 12.9 12.9v12.9H45.2zm0 6.5c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H12.9C5.8 58.1 0 52.3 0 45.2s5.8-12.9 12.9-12.9h32.3z" fill="#36c5f0"></path>
            <path d="M97 45.2c0-7.1 5.8-12.9 12.9-12.9s12.9 5.8 12.9 12.9-5.8 12.9-12.9 12.9H97V45.2zm-6.5 0c0 7.1-5.8 12.9-12.9 12.9s-12.9-5.8-12.9-12.9V12.9C64.7 5.8 70.5 0 77.6 0s12.9 5.8 12.9 12.9v32.3z" fill="#2eb67d"></path>
            <path d="M77.6 97c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9-12.9-5.8-12.9-12.9V97h12.9zm0-6.5c-7.1 0-12.9-5.8-12.9-12.9s5.8-12.9 12.9-12.9h32.3c7.1 0 12.9 5.8 12.9 12.9s-5.8 12.9-12.9 12.9H77.6z" fill="#ecb22e"></path>
          </svg>
          Add to Slack
        </span>
      </a>
    </div>
  )
}

