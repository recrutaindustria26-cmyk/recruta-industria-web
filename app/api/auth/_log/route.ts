import { NextResponse } from 'next/server';

export async function POST() {
  // Handler vazio para evitar erro 404
  return NextResponse.json({ status: 'ok' });
}

export async function GET() {
  // Handler vazio para evitar erro 404
  return NextResponse.json({ status: 'ok' });
}
