"use client";
import { SessionProvider } from "next-auth/react";

//!ÖNEMLİ
//!Normalde session provider, main layoutumuzu sarmalayacaktı ve client komponente dönüştürecekti,
//!ancak bu yapıyı AuthProvider componenti ile de yapabiliriz. Böylece layouttaki server komponent yapısını koruruz.

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
