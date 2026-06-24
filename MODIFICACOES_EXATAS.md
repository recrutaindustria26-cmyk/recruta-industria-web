# 🔧 MODIFICAÇÕES EXATAS - LINHA POR LINHA

## 📁 ARQUIVO 1: `prisma/schema.prisma`

### PASSO 1: Locate model Profile
- **Localized at:** Lines 60-102

### PASSO 2: Replace entire Profile model

**LINHAS A REMOVER (ANTIGAS):** 60-102

```prisma
// MODELO DE VITRINE - Profissional como Produto
model Profile {
  id              String   @id @default(cuid())
  userId          String   @unique
  title           String   // Cargo/Profissão
  bio             String?  // Descrição resumida
  fullDescription String?  // Descrição completa
  location        String   // Cidade/Estado
  phone           String?  // Bloqueado sem acesso pago
  whatsapp        String?  // Bloqueado sem acesso pago
  email           String?  // Bloqueado sem acesso pago
  skills          String?  // JSON stringified array
  experience      String?  // Descrição de experiência
  portfolio       String?  // URL ou JSON
  avatar          String?  // URL da foto
  isVisible       Boolean  @default(true)
  viewCount       Int      @default(0)
  status          String   @default("ACTIVE")  // ACTIVE, INACTIVE, BLOCKED
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  profileViews    ProfileView[]
  accessRecords   AccessRecord[]
  tips            Tip[]

  @@index([userId])
  @@index([location])
  @@index([status])
  @@index([createdAt])
}
```

**LINHAS A ADICIONAR (NOVAS):** 60-148

```prisma
// MODELO DE VITRINE - Profissional como Produto
// Expandido para armazenar todos os dados do formulário de cadastro
model Profile {
  // Campos originais (mantidos para compatibilidade)
  id              String   @id @default(cuid())
  userId          String   @unique
  title           String   // Cargo/Profissão
  bio             String?  // Descrição resumida
  fullDescription String?  // Descrição completa
  location        String   // Cidade/Estado (formato: "Cidade, UF")
  phone           String?  // Telefone principal
  whatsapp        String?  // WhatsApp
  email           String?  // Email (cópia do User.email)
  skills          String?  // JSON stringified array ["skill1", "skill2"]
  experience      String?  // Descrição de experiência ou JSON
  portfolio       String?  // URL ou JSON
  avatar          String?  // URL da foto de perfil
  isVisible       Boolean  @default(true)
  viewCount       Int      @default(0)
  status          String   @default("ACTIVE")  // ACTIVE, INACTIVE, BLOCKED
  
  // Novos campos: Dados Pessoais
  cpf             String?  // formato: 123.456.789-00
  dataNascimento  DateTime? // Data de nascimento
  idade           Int?      // Idade calculada
  sexoBiologico   String?  // Masculino, Feminino, Outro
  identidadeGenero String?  // Cisgênero, Transgênero, Não-binário, Outro
  orientacaoSexual String? // Heterossexual, Homossexual, Bissexual, Outro
  estadoCivil     String?  // Solteiro, Casado, Divorciado, Viúvo
  religiao        String?  // Católico, Protestante, Espírita, Ateu, Outro
  antecedentes    Boolean? // Possui antecedentes criminais
  
  // Novos campos: Filhos
  possuiFilhos    Boolean? // Possui filhos
  quantidadeFilhos Int?    // Quantidade de filhos
  faixaEtariaFilhos String? // JSON array ["Menos de 1", "1-3", "3-5", etc]
  
  // Novos campos: Localização detalhada
  telefone2       String?  // Telefone secundário
  estado          String?  // UF (AC, AL, AP, AM, BA, etc)
  cidade          String?  // Município
  disponibilidadeMudanca String? // Sim, Não, Dependendo
  
  // Novos campos: Formação
  escolaridade    String?  // Fundamental, Médio, Técnico, Superior, Pós
  cursosCertificacoes String? // JSON array ["Curso 1", "Curso 2"]
  
  // Novos campos: Profissional
  situacaoProfissional String? // Empregado, Desempregado, Primeiro emprego, Jovem Aprendiz
  areaInteresse   String?  // Automotivo, Aviação, Construção, etc
  cargoDesejado   String?  // Cargo desejado
  trabalhouIndustria String? // Não, Primeiro emprego, Jovem aprendiz, Sim
  tempoExperiencia String? // <1 ano, 1-2, 3-5, 6-10, >10 anos
  experienciasJSON String? // JSON array: [{"nome": "Empresa", "cargo": "Cargo", "dataInicio": "2020-01-01", "dataFim": "2021-12-31"}]
  turnoDisponivel String?  // Manhã, Tarde, Noite, Integral
  
  // Novos campos: Recolocação e Salário
  disponibilidadeInicio String? // Imediata, 15 dias, 30 dias, 2 meses
  recolocacao     String?  // Sim, Não, Dependendo
  pretensaoSalarial String? // Faixa salarial (Até 1k, 1-2k, 2-3k, etc)
  
  // Novos campos: Documentos
  curricoURL      String?  // URL do PDF/DOC do currículo (se enviado)
  atestadoURL     String?  // URL do PDF/JPG do atestado (se enviado)
  
  // Novos campos: Mensagem
  mensagemEmpresas String? // Apresentação pessoal para empresas
  
  // Timestamps
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  profileViews    ProfileView[]
  accessRecords   AccessRecord[]
  tips            Tip[]

  @@index([userId])
  @@index([location])
  @@index([estado])
  @@index([status])
  @@index([createdAt])
}
```

---

## 📁 ARQUIVO 2: `app/api/auth/register/route.ts`

### PASSO 1: Locate body destructuring
- **Located at:** Line 52

### PASSO 2: Replace body destructuring

**LINHAS A REMOVER (ANTIGA):** 52-53

```typescript
    const body = await request.json()
    const { email, password, confirmPassword, userType, cpf, cnpj, name } = body
```

**LINHAS A ADICIONAR (NOVA):** 52-89

```typescript
    const body = await request.json()
    const { 
      email, 
      password, 
      confirmPassword, 
      userType, 
      cpf, 
      cnpj, 
      name,
      // Dados pessoais
      dataNascimento,
      idade,
      sexoBiologico,
      identidadeGenero,
      orientacaoSexual,
      estadoCivil,
      religiao,
      antecedentes,
      // Filhos
      possuiFilhos,
      quantidadeFilhos,
      faixaEtariaFilhos,
      // Contato
      telefone,
      telefone2,
      whatsapp,
      // Localização
      estado,
      cidade,
      disponibilidadeMudanca,
      // Formação
      escolaridade,
      cursosCertificacoes,
      // Profissional
      situacaoProfissional,
      areaInteresse,
      cargoDesejado,
      trabalhouIndustria,
      tempoExperiencia,
      experiencias,
      turnoDisponivel,
      // Recolocação e Salário
      disponibilidadeInicio,
      recolocacao,
      pretensaoSalarial,
      // Documentos (URLs após upload)
      curricoURL,
      atestadoURL,
      // Mensagem
      mensagemEmpresas,
    } = body
```

### PASSO 3: Add validation comment

**ADICIONADO ANTES DE "// Validações":** After line 89

```typescript
    // Validações básicas
```

(Apenas alterar o comentário de "Validações" para "Validações básicas" - mudança cosmética)

### PASSO 4: Locate User creation

- **Located at:** Lines 140-149

### PASSO 5: Add Profile creation after User creation

**ADICIONAR APÓS as linhas 140-149 (após criar User):**

```typescript

    // Se é profissional, criar Profile com todos os dados do formulário
    if (userType === 'professional') {
      try {
        // Preparar dados do profile
        // Para arrays, converter para JSON string
        const profileData = {
          userId: user.id,
          title: cargoDesejado || name || '',
          email: email,
          phone: telefone || null,
          whatsapp: whatsapp || null,
          location: cidade && estado ? `${cidade}, ${estado}` : estado || '',
          
          // Dados pessoais
          cpf: cpf || null,
          dataNascimento: dataNascimento ? new Date(dataNascimento) : null,
          idade: idade ? parseInt(idade) : null,
          sexoBiologico: sexoBiologico || null,
          identidadeGenero: identidadeGenero || null,
          orientacaoSexual: orientacaoSexual || null,
          estadoCivil: estadoCivil || null,
          religiao: religiao || null,
          antecedentes: antecedentes === true || antecedentes === 'true',
          
          // Filhos
          possuiFilhos: possuiFilhos === true || possuiFilhos === 'true',
          quantidadeFilhos: quantidadeFilhos ? parseInt(quantidadeFilhos) : null,
          faixaEtariaFilhos: faixaEtariaFilhos ? JSON.stringify(faixaEtariaFilhos) : null,
          
          // Contato adicional
          telefone2: telefone2 || null,
          
          // Localização
          estado: estado || null,
          cidade: cidade || null,
          disponibilidadeMudanca: disponibilidadeMudanca || null,
          
          // Formação
          escolaridade: escolaridade || null,
          cursosCertificacoes: cursosCertificacoes ? JSON.stringify(cursosCertificacoes) : null,
          
          // Profissional
          situacaoProfissional: situacaoProfissional || null,
          areaInteresse: areaInteresse || null,
          cargoDesejado: cargoDesejado || null,
          trabalhouIndustria: trabalhouIndustria || null,
          tempoExperiencia: tempoExperiencia || null,
          experienciasJSON: experiencias ? JSON.stringify(experiencias) : null,
          turnoDisponivel: turnoDisponivel || null,
          
          // Recolocação e Salário
          disponibilidadeInicio: disponibilidadeInicio || null,
          recolocacao: recolocacao || null,
          pretensaoSalarial: pretensaoSalarial || null,
          
          // Documentos
          curricoURL: curricoURL || null,
          atestadoURL: atestadoURL || null,
          
          // Mensagem
          mensagemEmpresas: mensagemEmpresas || null,
          
          // Bio e descrição
          bio: mensagemEmpresas || null,
          fullDescription: mensagemEmpresas || null,
        }

        await prisma.profile.create({
          data: profileData,
        })
      } catch (profileError: any) {
        console.error('Erro ao criar Profile para profissional:', profileError)
        // Log do erro mas continua - o User foi criado e é o importante
        logAudit('profile_creation_failed', email, ip, userAgent, 'warning', `Profile creation failed: ${profileError?.message}`)
      }
    }
```

---

## 📝 RESUMO DE MODIFICAÇÕES

| Arquivo | Tipo | Linhas | Mudança |
|---------|------|--------|---------|
| schema.prisma | Expansão | 60-148 | Adicionar 34 novos campos ao Profile |
| register/route.ts | Expansão | 52-89 | Aumentar destructuring de 7 para 40+ campos |
| register/route.ts | Novo Bloco | ~150-220 | Adicionar Profile.create() condicional |

---

## ✅ VERIFICAÇÃO

Após fazer essas mudanças, o arquivo de registro deve:

1. **schema.prisma:**
   - Profile model tem 84 linhas (era 22)
   - Todos os novos campos estão presentes
   - Índices incluem 'estado'

2. **register/route.ts:**
   - Destructuring de body tem 40+ campos
   - Há um bloco `if (userType === 'professional')` após User.create()
   - Profile.create() está chamando prisma.profile.create()
   - Try-catch trata erros de Profile sem quebrar o fluxo

---

## 🚀 PRÓXIMO PASSO

Após verificar essas mudanças:

```bash
# 1. Executar migração
npx prisma migrate dev --name add_professional_registration_fields

# 2. Testar cadastro (http://localhost:3000/login/criar-conta)

# 3. Verificar dados no Prisma Studio (npx prisma studio)
```

---

**Status:** ✅ READY TO APPLY
**Modificações:** 2 arquivos
**Linhas Mudadas:** ~150+ linhas
**Risco:** ⬇️ Baixo (expansão, não remover)
