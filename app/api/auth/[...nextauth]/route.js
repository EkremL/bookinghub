import { authOptions } from "@/utils/authOptions";
import NextAuth from "next-auth";

//[...nextAuth] => catch all

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
