import { NextRequest, NextResponse } from 'next/server'
import { createUser, findUserByEmail } from '@/lib/users'
import { isValidEmail, isValidCPF, isValidCNPJ } from '@/lib/security'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, confirmPassword, userType, cpf, cnpj, nome, telefone } = body

    // Validações
    if (!email || !password || !userType) {
      return NextResponse.json(
        { error: 'Email, senha e tipo de usuário são obrigatórios' },
        { status: 400 }
      )
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Senha deve ter no mínimo 8 caracteres' },
        { status: 400 }
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: 'Senhas não conferem' },
        { status: 400 }
      )
    }

    // Validações específicas por tipo de usuário
    if (userType === 'professional' && cpf) {
      const cpfLimpo = cpf.replace(/\D/g, '')
      if (!isValidCPF(cpfLimpo)) {
        return NextResponse.json(
          { error: 'CPF inválido' },
          { status: 400 }
        )
      }
    }

    if (userType === 'company' && cnpj) {
      const cnpjLimpo = cnpj.replace(/\D/g, '')
      if (!isValidCNPJ(cnpjLimpo)) {
        return NextResponse.json(
          { error: 'CNPJ inválido' },
          { status: 400 }
        )
      }
    }

    // Verificar se email já existe
    if (findUserByEmail(email)) {
      return NextResponse.json(
        { error: 'Email já cadastrado' },
        { status: 409 }
      )
    }

    // Criar usuário
    const user = createUser(email, password, userType as 'professional' | 'company')
    
    // Retornar usuário criado (sem senha)
    return NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          userType: user.userType,
          createdAt: user.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error: any) {
    console.error('Erro no registro:', error)
    return NextResponse.json(
      { error: error?.message || 'Erro ao registrar usuário' },
      { status: 500 }
    )
  }
}
