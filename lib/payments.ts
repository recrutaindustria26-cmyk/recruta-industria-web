import { prisma } from './db'
import { randomUUID } from 'crypto'

type PaymentRecord = {
  id: string
  externalId?: string
  amount: number
  currency: string
  method: string
  customer?: any
  status: string
  meta?: any
  createdAt: string
  updatedAt: string
}

export async function createPayment(payload: {
  amount: number
  currency?: string
  method: string
  customer?: any
  meta?: any
}) {
  const now = new Date().toISOString()
  
  const payment = await prisma.paymentRecord.create({
    data: {
      reference: randomUUID(),
      amount: payload.amount,
      currency: payload.currency || 'BRL',
      method: payload.method,
      customer: JSON.stringify(payload.customer || {}),
      status: 'PENDING',
      meta: JSON.stringify(payload.meta || {}),
    },
  })

  return {
    id: payment.id,
    amount: payment.amount,
    currency: payment.currency,
    method: payment.method,
    customer: JSON.parse(payment.customer || '{}'),
    status: payment.status,
    meta: JSON.parse(payment.meta || '{}'),
    createdAt: payment.createdAt.toISOString(),
    updatedAt: payment.updatedAt.toISOString(),
  }
}

export async function updatePayment(id: string, patch: Partial<PaymentRecord>) {
  try {
    const payment = await prisma.paymentRecord.update({
      where: { id },
      data: {
        ...(patch.amount && { amount: patch.amount }),
        ...(patch.currency && { currency: patch.currency }),
        ...(patch.method && { method: patch.method }),
        ...(patch.customer && { customer: JSON.stringify(patch.customer) }),
        ...(patch.status && { status: patch.status }),
        ...(patch.meta && { meta: JSON.stringify(patch.meta) }),
      },
    })

    return {
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      method: payment.method,
      customer: JSON.parse(payment.customer || '{}'),
      status: payment.status,
      meta: JSON.parse(payment.meta || '{}'),
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
    }
  } catch {
    return null
  }
}

export async function findPayment(id: string) {
  try {
    const payment = await prisma.paymentRecord.findFirst({
      where: {
        OR: [
          { id },
          { reference: id },
        ],
      },
    })

    if (!payment) return null

    return {
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      method: payment.method,
      customer: JSON.parse(payment.customer || '{}'),
      status: payment.status,
      meta: JSON.parse(payment.meta || '{}'),
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
    }
  } catch {
    return null
  }
}

export async function findPaymentByExternal(externalId: string) {
  try {
    const payment = await prisma.paymentRecord.findFirst({
      where: { id: externalId },
    })

    if (!payment) return null

    return {
      id: payment.id,
      amount: payment.amount,
      currency: payment.currency,
      method: payment.method,
      customer: JSON.parse(payment.customer || '{}'),
      status: payment.status,
      meta: JSON.parse(payment.meta || '{}'),
      createdAt: payment.createdAt.toISOString(),
      updatedAt: payment.updatedAt.toISOString(),
    }
  } catch {
    return null
  }
}

export async function readAll(): Promise<PaymentRecord[]> {
  try {
    const payments = await prisma.paymentRecord.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return payments.map(p => ({
      id: p.id,
      amount: p.amount,
      currency: p.currency,
      method: p.method,
      customer: JSON.parse(p.customer || '{}'),
      status: p.status,
      meta: JSON.parse(p.meta || '{}'),
      createdAt: p.createdAt.toISOString(),
      updatedAt: p.updatedAt.toISOString(),
    }))
  } catch {
    return []
  }
}
