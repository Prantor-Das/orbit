"use client";

import React, { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { UI } from "@/lib/constants/ui";
import { UIAsset } from "@/components/custom/UIAsset";

function SignInContent() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const urlError = searchParams.get("error");

  const [oauthLoading, setOauthLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(
    urlError === "OAuthSignin" || urlError === "OAuthCallback"
      ? "Error connecting with OAuth provider. Please check your credentials."
      : null,
  );

  const handleOAuthSignIn = (provider: "google" | "github") => {
    setOauthLoading(provider);
    setError(null);
    signIn(provider, { callbackUrl });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <Link href="/" style={styles.badge}>
            ← Back to Home
          </Link>
          <h1 style={styles.title}>Welcome Back</h1>
          <p style={styles.subtitle}>
            Sign in with your preferred provider to access your account.
          </p>
        </div>

        {error && (
          <div style={styles.errorAlert}>
            <span>⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <div style={styles.oauthGroup}>
          <button
            type="button"
            onClick={() => handleOAuthSignIn("google")}
            disabled={!!oauthLoading}
            style={styles.googleButton}
          >
            <UIAsset asset={UI.icons.google} style={styles.oauthIcon} />
            {oauthLoading === "google" ? "Connecting..." : "Continue with Google"}
          </button>

          <button
            type="button"
            onClick={() => handleOAuthSignIn("github")}
            disabled={!!oauthLoading}
            style={styles.githubButton}
          >
            <UIAsset asset={UI.icons.github} style={styles.oauthIcon} />
            {oauthLoading === "github" ? "Connecting..." : "Continue with GitHub"}
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Don&apos;t have an account?{" "}
            <Link href="/sign-up" style={styles.footerLink}>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div style={styles.loadingContainer}>Loading...</div>}>
      <SignInContent />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--background)",
    color: "var(--foreground)",
    fontFamily: "var(--font-sans)",
    padding: "1.5rem",
    boxSizing: "border-box",
  },
  loadingContainer: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--background)",
    color: "var(--muted-foreground)",
    fontFamily: "var(--font-sans)",
  },
  card: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "16px",
    padding: "2.5rem",
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  badge: {
    display: "inline-block",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: "var(--muted-foreground)",
    textDecoration: "none",
    marginBottom: "1.25rem",
    padding: "0.35rem 0.85rem",
    borderRadius: "9999px",
    backgroundColor: "var(--muted)",
    border: "1px solid var(--border)",
  },
  title: {
    fontSize: "1.75rem",
    fontWeight: 700,
    letterSpacing: "-0.025em",
    margin: "0 0 0.5rem 0",
    color: "var(--foreground)",
  },
  subtitle: {
    fontSize: "0.875rem",
    color: "var(--muted-foreground)",
    lineHeight: 1.5,
    margin: 0,
  },
  errorAlert: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    padding: "0.75rem 1rem",
    borderRadius: "8px",
    backgroundColor: "color-mix(in oklch, var(--destructive) 8%, var(--background))",
    border: "1px solid color-mix(in oklch, var(--destructive) 25%, var(--border))",
    color: "var(--destructive)",
    fontSize: "0.875rem",
    marginBottom: "1.5rem",
  },
  oauthGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  googleButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "10px",
    backgroundColor: "var(--card)",
    color: "var(--card-foreground)",
    border: "1px solid var(--input)",
    fontSize: "0.925rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s, border-color 0.2s",
  },
  githubButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    width: "100%",
    padding: "0.85rem 1rem",
    borderRadius: "10px",
    backgroundColor: "var(--primary)",
    color: "var(--primary-foreground)",
    border: "1px solid var(--primary)",
    fontSize: "0.925rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "background-color 0.2s",
  },
  oauthIcon: {
    width: "20px",
    height: "20px",
  },
  footer: {
    marginTop: "1.5rem",
    textAlign: "center",
  },
  footerText: {
    fontSize: "0.875rem",
    color: "var(--muted-foreground)",
    margin: 0,
  },
  footerLink: {
    color: "var(--primary)",
    textDecoration: "none",
    fontWeight: 600,
  },
};
