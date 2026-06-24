"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// ...existing code...

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // useAuth removido: NextAuth v5 App Router não suporta
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        ⏳ Carregando...
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return <>{children}</>;
}
