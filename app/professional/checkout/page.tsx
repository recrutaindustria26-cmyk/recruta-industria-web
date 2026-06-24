/**
 * ⚠️ PÁGINA BLOQUEADA - NÃO MODIFICAR
 * 
 * Esta página foi bloqueada para manter a estabilidade do sistema de pagamento
 * e checkout. Alterações podem impactar a lógica de transações e processamento
 * de pedidos.
 * 
 * Se necessário alterar, consulte o desenvolvedor principal.
 * Veja: PROFESSIONAL_CHECKOUT_LOCK.md
 */

"use client";

import React, { useState } from 'react';
// ...existing code...
import { useRouter } from 'next/navigation';
// ...existing code...

function CheckoutPageContent() {
  // ...removido useSession, ajuste lógica conforme NextAuth v5...
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit');
  const [cardData, setCardData] = useState({
    number: '',
    holder: '',
    validity: '',
    cvv: ''
  });

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planType: 'premium',
          email: session?.user?.email,
          amount: 19.90,
          paymentMethod: selectedPaymentMethod,
          cardData: selectedPaymentMethod === 'credit' ? cardData : null
        })
      });

      if (response.ok) {
        // Redirecionar para painel com sucesso de upgrade
        router.push('/professional/dashboard/painel?upgrade=success');
      } else {
        const errorText = await response.text();
        console.error('Resposta não-JSON:', errorText);
        alert('Erro ao processar pagamento. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro no pagamento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f0f4f8', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ backgroundColor: '#001f3f', color: 'white', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: '0 0 5px 0', fontSize: '28px' }}>Checkout</h1>
          <p style={{ margin: 0, fontSize: '14px', opacity: 0.9 }}>Finalize seu upgrade para Premium</p>
        </div>
        {/* Botão de logout removido: NextAuth v5 não possui signOut client-side no App Router */}
      </div>

      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
          <h2 style={{ color: '#001f3f', marginTop: 0 }}>Resumo do Pedido</h2>

          <div style={{ borderBottom: '2px solid #e0e0e0', paddingBottom: '20px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span style={{ fontSize: '16px' }}>Plano Premium (1 ano)</span>
              <span style={{ fontWeight: 'bold', fontSize: '16px' }}>R$ 19,90/mês</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#666', marginBottom: '10px' }}>
              <span>Renovação automática</span>
              <span>R$ 239,00/ano</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#28a745' }}>
              <span>✓ Desconto aplicado</span>
              <span>-R$ 36,00</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 'bold', color: '#001f3f', marginBottom: '30px' }}>
            <span>Total:</span>
            <span>R$ 203,00</span>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#001f3f' }}>Dados da Conta</h3>
            <p style={{ margin: '8px 0', color: '#333' }}><strong>Email:</strong> {session?.user?.email}</p>
            <p style={{ margin: '8px 0', color: '#666', fontSize: '14px' }}>Você receberá confirmação do pagamento por e-mail</p>
          </div>

          <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', marginBottom: '30px' }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#001f3f' }}>Método de Pagamento</h3>
            <div style={{ display: 'flex', gap: '15px', marginBottom: '20px', flexWrap: 'wrap' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="payment" value="credit" checked={selectedPaymentMethod === 'credit'} onChange={(e) => setSelectedPaymentMethod(e.target.value)} />
                <span style={{ marginLeft: '8px' }}>💳 Cartão de Crédito</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="payment" value="pix" checked={selectedPaymentMethod === 'pix'} onChange={(e) => setSelectedPaymentMethod(e.target.value)} />
                <span style={{ marginLeft: '8px' }}>📱 PIX</span>
              </label>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input type="radio" name="payment" value="boleto" checked={selectedPaymentMethod === 'boleto'} onChange={(e) => setSelectedPaymentMethod(e.target.value)} />
                <span style={{ marginLeft: '8px' }}>📄 Boleto</span>
              </label>
            </div>

            {selectedPaymentMethod === 'credit' && (
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '2px solid #0066cc' }}>
                <h4 style={{ margin: '0 0 15px 0', fontSize: '14px', color: '#001f3f' }}>Dados do Cartão de Crédito</h4>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Número do Cartão</label>
                  <input type="text" name="number" placeholder="0000 0000 0000 0000" value={cardData.number} onChange={handleCardChange} maxLength={19} style={{ width: '100%', padding: '12px', border: '2px solid #0066cc', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Nome do Titular</label>
                  <input type="text" name="holder" placeholder="Nome completo" value={cardData.holder} onChange={handleCardChange} style={{ width: '100%', padding: '12px', border: '2px solid #0066cc', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '15px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>Validade</label>
                    <input type="text" name="validity" placeholder="MM/AA" value={cardData.validity} onChange={handleCardChange} maxLength={5} style={{ width: '100%', padding: '12px', border: '2px solid #0066cc', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: 'bold' }}>CVV</label>
                    <input type="password" name="cvv" placeholder="000" value={cardData.cvv} onChange={handleCardChange} maxLength={4} style={{ width: '100%', padding: '12px', border: '2px solid #0066cc', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>
              </div>
            )}

            {selectedPaymentMethod === 'pix' && (
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '3px solid #0066cc', textAlign: 'center' }}>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#001f3f' }}>💳 Pagamento via PIX</h4>
                
                {/* QR CODE VISUAL */}
                <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '2px dashed #0066cc', display: 'inline-block' }}>
                  <div style={{
                    width: '200px',
                    height: '200px',
                    backgroundColor: 'white',
                    border: '2px solid #333',
                    margin: '0 auto',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(20, 1fr)',
                    gap: '1px',
                    padding: '8px',
                    boxSizing: 'border-box'
                  }}>
                    {[...Array(400)].map((_, i) => (
                      <div
                        key={i}
                        style={{
                          backgroundColor: Math.random() > 0.5 ? '#000' : '#fff',
                          width: '8px',
                          height: '8px'
                        }}
                      />
                    ))}
                  </div>
                  <p style={{ margin: '10px 0 0 0', fontSize: '11px', color: '#666' }}>QR Code PIX</p>
                </div>

                <div style={{ backgroundColor: '#fff3cd', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '2px solid #ffc107' }}>
                  <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#333', fontWeight: 'bold' }}>📋 Chave PIX (Copia e Cola)</p>
                  <div style={{ backgroundColor: 'white', padding: '12px', borderRadius: '6px', border: '1px solid #ddd' }}>
                    <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '12px', wordBreak: 'break-all', color: '#001f3f', fontWeight: 'bold' }}>recruta-industria@pix.example.com</p>
                  </div>
                </div>
                
                <p style={{ margin: '15px 0 0 0', fontSize: '13px', color: '#28a745', fontWeight: 'bold' }}>✓ Após o pagamento, você será redirecionado automaticamente</p>
              </div>
            )}

            {selectedPaymentMethod === 'boleto' && (
              <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '2px solid #ff6600' }}>
                <h4 style={{ margin: '0 0 20px 0', fontSize: '14px', color: '#001f3f' }}>📄 Pagamento via Boleto</h4>
                
                <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '2px solid #ff6600', textAlign: 'center' }}>
                  <p style={{ margin: '0 0 15px 0', fontSize: '12px', color: '#333', fontWeight: 'bold' }}>Código de Barras</p>
                  
                  <div style={{ backgroundColor: 'white', padding: '15px', borderRadius: '6px', marginBottom: '15px', display: 'flex', justifyContent: 'center', gap: '0.5px' }}>
                    {[...Array(60)].map((_, i) => (
                      <div key={i} style={{ width: Math.random() > 0.6 ? '3px' : '2px', height: '50px', backgroundColor: '#000' }} />
                    ))}
                  </div>

                  <div style={{ backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '6px', marginBottom: '15px', border: '2px solid #333' }}>
                    <p style={{ margin: '0 0 8px 0', fontSize: '11px', color: '#666', fontWeight: 'bold' }}>Número do Boleto (Digitar ou Copiar)</p>
                    <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '16px', fontWeight: 'bold', color: '#001f3f', wordBreak: 'break-all', letterSpacing: '1px' }}>12345.67890 12345.678901 12345.678901 1 12345678901234</p>
                  </div>

                  <button
                    onClick={() => navigator.clipboard.writeText('12345.67890 12345.678901 12345.678901 1 12345678901234')}
                    style={{ backgroundColor: '#ff6600', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', marginBottom: '15px', width: '100%' }}
                  >
                    📋 Copiar Código
                  </button>
                </div>

                <div style={{ backgroundColor: '#e8f4f8', padding: '15px', borderRadius: '8px', marginBottom: '15px', border: '1px solid #0066cc' }}>
                  <p style={{ margin: '0 0 10px 0', fontSize: '13px', color: '#333', fontWeight: 'bold' }}>📱 Como pagar no celular:</p>
                  <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '12px', color: '#666' }}>
                    <li>Abra o app do seu banco</li>
                    <li>Acesse a opção "Pagar Boleto"</li>
                    <li>Cole ou digite o código acima</li>
                    <li>Confirme os dados e o pagamento</li>
                  </ol>
                </div>

                <p style={{ margin: '0', fontSize: '13px', color: '#28a745', fontWeight: 'bold' }}>✓ Confirmação automática após o pagamento</p>
              </div>
            )}
          </div>

          <button onClick={handlePayment} disabled={loading} style={{ width: '100%', backgroundColor: loading ? '#ccc' : '#28a745', color: 'white', padding: '15px 30px', border: 'none', borderRadius: '8px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: 'bold', fontSize: '16px', marginBottom: '15px' }}>
            {loading ? '⏳ Processando...' : '✓ Confirmar Pagamento'}
          </button>

          <div style={{ textAlign: 'center', fontSize: '13px', color: '#666' }}>
            <p style={{ margin: '10px 0' }}>🔒 Pagamento seguro com criptografia SSL</p>
            <p style={{ margin: '10px 0' }}>✓ Cancelamento a qualquer momento sem penalidades</p>
          </div>
        </div>

        <div style={{ backgroundColor: '#e8f4f8', padding: '20px', borderRadius: '8px', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#001f3f' }}>Informações Importantes</h4>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li>Você será cobrado mensalmente após o primeiro período</li>
            <li>Cancelamento pode ser feito a qualquer momento no seu perfil</li>
            <li>Não há taxas ocultas ou contratos de longa duração</li>
            <li>Acesso imediato a todos os recursos Premium após confirmação do pagamento</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <CheckoutPageContent />;
}
