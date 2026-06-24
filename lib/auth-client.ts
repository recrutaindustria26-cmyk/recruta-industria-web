import { createAuthClient } from "next-auth/client"

export const { useSession, signIn, signOut } = createAuthClient()
