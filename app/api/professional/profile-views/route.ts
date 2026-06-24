import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth.config';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    // Buscar o usuário e seu perfil
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { profile: true }
    });

    if (!user || !user.profile) {
      return NextResponse.json({ 
        profileViews: [],
        totalViews: 0,
        uniqueCompanies: 0
      });
    }

    // Buscar as visualizações do perfil
    const profileViews = await prisma.profileView.findMany({
      where: { profileId: user.profile.id },
      orderBy: { createdAt: 'desc' }
    });

    // Contar empresas únicas que visualizaram
    const uniqueCompanies = new Set(profileViews.map(view => view.companyUserId)).size;

    return NextResponse.json({ 
      profileViews,
      totalViews: profileViews.length,
      uniqueCompanies
    });
  } catch (error) {
    console.error('Erro ao buscar visualizações:', error);
    return NextResponse.json(
      { error: 'Erro ao buscar visualizações' },
      { status: 500 }
    );
  }
}
