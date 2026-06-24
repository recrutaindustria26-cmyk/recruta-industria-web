import { NextRequest, NextResponse } from 'next/server';

function handleLogout(request: NextRequest) {
  const response = NextResponse.redirect(new URL('/login?tipo=profissional', request.url), {
    status: 302,
  });

  // Limpar todos os cookies de autenticação do NextAuth
  response.cookies.delete('next-auth.session-token');
  response.cookies.delete('next-auth.callback-url');
  response.cookies.delete('next-auth.csrf-token');
  response.cookies.delete('__Secure-next-auth.session-token');
  response.cookies.delete('__Host-next-auth.csrf-token');

  return response;
}

export async function POST(request: NextRequest) {
  try {
    return handleLogout(request);
  } catch (error) {
    console.error('Erro no logout:', error);
    return NextResponse.redirect(new URL('/login?tipo=profissional', request.url));
  }
}

export async function GET(request: NextRequest) {
  try {
    return handleLogout(request);
  } catch (error) {
    console.error('Erro no logout:', error);
    return NextResponse.redirect(new URL('/login?tipo=profissional', request.url));
  }
}


