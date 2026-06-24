# 📊 ANÁLISE COMPLETA - CAMPOS DE CADASTRO PROFISSIONAL

**Data:** 10/03/2026  
**Status:** 🔍 ANÁLISE CONCLUÍDA  
**Problema:** Dados do formulário não são salvos no banco de dados

---

## 🎯 RESUMO EXECUTIVO

O formulário de cadastro profissional (`/app/professional/register/page.tsx`) coleta **40+ campos** do usuário, mas a API de registro (`/api/auth/register/route.ts`) **não está salvando nenhum desses dados no banco**. 

Atualmente, apenas o User é criado com email e nome. O Profile não está sendo atualizado com os dados do formulário.

---

## 📋 LISTA COMPLETA DE CAMPOS DO FORMULÁRIO

### 1. **Dados Pessoais** (10 campos)
- ✅ `nome` - Texto (já usado no User.name)
- ❌ `cpf` - Formatted string (validado mas não salvo)
- ❌ `dataNascimento` - String (DD/MM/YYYY)
- ❌ `idade` - Texto
- ❌ `sexoBiologico` - Select (Masculino/Feminino/Outro)
- ❌ `identidadeGenero` - Select (Cisgênero/Transgênero/Não-binário/Outro)
- ❌ `orientacaoSexual` - Select (Heterossexual/Homossexual/Bissexual/Outro)
- ❌ `estadoCivil` - Select (Solteiro/Casado/Divorciado/Viúvo)
- ❌ `religiao` - Select (Católico/Protestante/Espírita/Ateu/Outro)
- ❌ `antecedentes` - Select (Sim/Não)

**Status BD:** Nenhum desses campos existe no Profile

---

### 2. **Filhos** (3 campos)
- ❌ `possuiFilhos` - Select (Sim/Não)
- ❌ `quantidadeFilhos` - Select (1/2/3/4+)
- ❌ `faixaEtariaFilhos` - Array de checkboxes (Menos de 1, 1-3, 3-5, 5-7, 7-9, 9-12, Acima de 12)

**Status BD:** Nenhum desses campos existe no Profile

---

### 3. **Contato** (4 campos)
- ✅ `email` - Salvo no User.email, também deveria estar no Profile
- ❌ `telefone` - Formatted string (existe em Profile.phone mas não é preenchido)
- ❌ `telefone2` - Formatted string (não existe)
- ❌ `whatsapp` - Formatted string (existe em Profile.whatsapp mas não é preenchido)

**Status BD:** 
- `Profile.phone` existe mas vazio
- `Profile.whatsapp` existe mas vazio
- `telefone2` não existe no Profile

---

### 4. **Localização** (3 campos)
- ❌ `estado` - Select (UF - AC/AL/AP/...)
- ❌ `cidade` - Select (obtida via IBGE API)
- ❌ `disponibilidadeMudanca` - Select (Sim/Não/Dependendo)

**Status BD:** 
- `Profile.location` existe mas não armazena estado separadamente
- Nenhum campo para mudança

---

### 5. **Formação** (2 campos)
- ❌ `escolaridade` - Select (Fundamental/Médio/Técnico/Superior/Pós)
- ❌ `cursosCertificacoes` - Array de inputs dinâmicos (Ex: Eletricista, Soldador)

**Status BD:** 
- `Profile.fullDescription` usa genericamente
- Nenhum campo estruturado para educação

---

### 6. **Profissional** (7 campos)
- ❌ `situacaoProfissional` - Select (Empregado/Desempregado/Primeiro emprego/Jovem Aprendiz)
- ❌ `areaInteresse` - Select (Automotivo/Aviação/Construção/etc - 50+ opções)
- ❌ `cargoDesejado` - Texto livre
- ❌ `trabalhouIndustria` - Select (Não/Primeiro emprego/Jovem aprendiz/Sim)
- ❌ `tempoExperiencia` - Select (<1 ano/1-2/3-5/6-10/>10 anos)
- ❌ `experiencias` - Array de objects: {nome, cargo, dataInicio, dataFim}
- ❌ `turnoDisponivel` - Select (Manhã/Tarde/Noite/Integral)

**Status BD:** 
- `Profile.title` (cargo/profissão apenas)
- `Profile.experience` (descrição genérica)
- Nenhuma estrutura para histórico de empresas

---

### 7. **Recolocação e Salário** (2 campos)
- ❌ `recolocacao` - Select (Sim/Não/Dependendo)
- ❌ `pretensaoSalarial` - Faixa salarial (Até 1k, 1-2k, 2-3k, etc)

**Status BD:** Nenhum existe

---

### 8. **Disponibilidade** (1 campo)
- ❌ `disponibilidadeInicio` - Select (Imediata/15 dias/30 dias/2 meses)

**Status BD:** Não existe

---

### 9. **Documentos** (3 campos)
- ❌ `fotoPerfil` - File (image/*)
- ❌ `curriculo` - File (PDF/DOC/DOCX)
- ❌ `atestado` - File (PDF/JPG/PNG)

**Status BD:** 
- `Profile.avatar` (foto existe)
- `Profile.portfolio` (pode ser usado para CV, mas como string, não arquivo salvo)
- Nenhum campo para atestado

---

### 10. **Mensagem Empresas** (1 campo)
- ❌ `mensagemEmpresas` - Textarea (apresentação pessoal)

**Status BD:** 
- `Profile.bio` (resumida, 500 chars aprox)
- `Profile.fullDescription` (completa)
- Atual implementação usa como apenas descrição, não mensagem direcionada

---

### 11. **Termos** (2 campos)
- ⏹️ `autorizoDados` - Checkbox (informacional, não salvo)
- ⏹️ `declaroVerdadeiro` - Checkbox (informacional, não salvo)

**Status BD:** Não precisam ser salvos (apenas confirmação)

---

## 🗄️ STATUS ATUAL DO SCHEMA.PRISMA

### Modelo Profile (Existente)
```prisma
model Profile {
  id                String
  userId            String @unique
  title             String         // Cargo/Profissão
  bio               String?        // Descrição resumida
  fullDescription   String?        // Descrição completa
  location          String         // Cidade/Estado
  phone             String?        // EXISTE mas vazio
  whatsapp          String?        // EXISTE mas vazio
  email             String?        // EXISTE mas vazio
  skills            String?        // JSON array
  experience        String?        // Descrição
  portfolio         String?        // URL ou JSON
  avatar            String?        // URL da foto
  isVisible         Boolean @default(true)
  viewCount         Int @default(0)
  status            String @default("ACTIVE")
  createdAt         DateTime
  updatedAt         DateTime
}
```

### Campos que EXISTEM mas não são preenchidos:
- `phone` (telefone)
- `whatsapp`
- `email`
- `avatar` (foto)
- `portfolio` (pode ser CV URL)

### Campos que FALTAM:
1. `cpf` - String (123.456.789-00)
2. `dataNascimento` - DateTime
3. `idade` - Int
4. `sexoBiologico` - String (enum: Masculino/Feminino/Outro)
5. `identidadeGenero` - String (enum)
6. `orientacaoSexual` - String (enum)
7. `estadoCivil` - String (enum)
8. `religiao` - String (enum)
9. `antecedentes` - Boolean
10. `possuiFilhos` - Boolean
11. `quantidadeFilhos` - Int?
12. `faixaEtariaFilhos` - String (JSON array)
13. `telefone2` - String?
14. `estado` - String (UF)
15. `cidade` - String
16. `disponibilidadeMudanca` - String
17. `escolaridade` - String (enum)
18. `cursosCertificacoes` - String (JSON array)
19. `situacaoProfissional` - String (enum)
20. `areaInteresse` - String
21. `cargoDesejado` - String
22. `trabalhouIndustria` - String (enum)
23. `tempoExperiencia` - String (enum)
24. `experienciasJSON` - String (JSON array de {nome, cargo, dataInicio, dataFim})
25. `turnoDisponivel` - String (enum)
26. `disponibilidadeInicio` - String (enum)
27. `recolocacao` - String (enum)
28. `pretensaoSalarial` - String (faixa)
29. `curricoURL` - String? (para armazenar URL após upload)
30. `atestadoURL` - String? (para armazenar URL após upload)
31. `mensagemEmpresas` - String? (apresentação pessoal)

---

## ❌ PROBLEMA PRINCIPAL

### API de Registro (`/api/auth/register/route.ts`)

**O que está fazendo:**
```typescript
// Criar usuário no banco de dados
const user = await prisma.user.create({
  data: {
    email,
    name: name || email.split('@')[0],
    role: userType.toUpperCase(),
    passwordHash: hashedPassword,
  },
})
```

**O que DEVERIA estar fazendo:**
1. Criar o User (✓ já faz)
2. **Criar o Profile com todos os dados do formulário** (❌ não faz)
3. **Salvar upload de arquivos** (❌ não faz)

### Frontend (`/app/professional/register/page.tsx`)

**O que está fazendo:**
- Coleta 40+ campos do usuário ✅
- Valida dados ✅
- Salva em localStorage para recuperação ✅
- Envia para API com POST ✅

**O que está falhando:**
- API não recebe os dados do formulário além de email/nome/senha ❌
- Dados não são salvos no banco ❌
- Quando profissional faz login, não vê seus dados salvos ❌

---

## ✅ SOLUÇÃO

### PASSO 1: Atualizar schema.prisma
Adicionar todos os campos faltantes ao modelo Profile (sem remover os existentes).

### PASSO 2: Rodar migrations
```bash
npx prisma migrate dev --name add_professional_fields
# Ou, se usar db push:
npx prisma db push
```

### PASSO 3: Atualizar API de Registro
- Modificar `/api/auth/register/route.ts` para:
  1. Receber TODOS os dados do formulário
  2. Após criar User, criar o Profile com esses dados
  3. Salvar currículo/fotos em `/public/uploads/` ou storage externo (optional)

### PASSO 4: Criar API de Update (Optional)
- `/api/professional/profile` (PUT/PATCH) para atualizar dados depois

### PASSO 5: Testar
- Fazer registro profissional com todos os dados
- Fazer login
- Verificar painel se dados estão salvos

---

## 📊 RESUMO DE MUDANÇAS

| Aspecto | Antes | Depois |
|--------|-------|--------|
| **Campos salvos no Profile** | 0 em 40+ | 30+ em 40+ |
| **Dados persistindo ao login** | ❌ Não | ✅ Sim |
| **Painel mostrando informações** | ❌ Vazio | ✅ Completo |
| **Tamanho do schema.prisma** | ~15 campos | ~45 campos |
| **Linhas de código API** | ~170 | ~250+ |

---

## 🎯 PRÓXIMOS PASSOS

1. ✅ Análise concluída (este arquivo)
2. ⏳ Atualizar schema.prisma (PRÓXIMO)
3. ⏳ Atualizar API de registro
4. ⏳ Testar fluxo completo
5. ⏳ Deploy com confiança

