"use client";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function UseClientSession({
  initialSession,
}: {
  initialSession: Session | null;
}) {
  const { data: session, status } = useSession();
  const [currentSesion, setCurentSession] = useState(initialSession);
  useEffect(() => {
    if (session) {
      setCurentSession(session);
    }
  }, [session]);
  useEffect(() => {
    if (initialSession) setCurentSession(initialSession);
  }, [initialSession]);
  return { data: currentSesion, status };
}
