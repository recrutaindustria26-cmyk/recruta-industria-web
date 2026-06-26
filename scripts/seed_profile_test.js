const { PrismaClient } = require('@prisma/client');
(async () => {
  const prisma = new PrismaClient();
  try {
    const email = 'test.dev@example.com';
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      console.error('Usuário não encontrado:', email);
      process.exit(1);
    }
    const profileData = {
      userId: user.id,
      title: 'Engenheiro de Teste',
      bio: 'Profissional de testes automatizados',
      fullDescription: 'Experiência em automação, testes unitários e integração',
      location: 'São Paulo, SP',
      phone: '(11) 99999-0000',
      whatsapp: '(11) 99999-0000',
      email: user.email,
      skills: JSON.stringify(['Testes', 'Node.js', 'Prisma']),
      experience: '5 anos em QA',
      avatar: null,
      portfolio: null,
      curricoURL: null,
      atestadoURL: null
    };

    await prisma.profile.upsert({
      where: { userId: user.id },
      update: profileData,
      create: profileData
    });

    await prisma.professional.upsert({
      where: { userId: user.id },
      update: { title: profileData.title },
      create: { userId: user.id, title: profileData.title }
    });

    console.log('Perfil de teste inserido/atualizado com sucesso.');
    process.exit(0);
  } catch (err) {
    console.error('Erro ao inserir perfil:', err);
    process.exit(1);
  }
})();
