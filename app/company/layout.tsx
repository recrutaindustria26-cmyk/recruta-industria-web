'use client';

// ...existing code...

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      {/* SessionProvider removido: NextAuth v5 App Router não suporta */}
    </>
  );
}
