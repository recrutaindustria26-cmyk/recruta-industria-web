import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
// ... outras importações de providers se tiver

export const authOptions = {
  // aqui dentro ficam as suas configurações de provedores e session
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // ... resto da configuração
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };