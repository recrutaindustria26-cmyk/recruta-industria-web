"use client"

import React from "react";
import Link from "next/link";

const securityModules = [
	"SHA-256 (Senha criptografada)",
	"Validação CPF/CNPJ (módulo-11)",
	"Rate Limiting (5 tentativas/15min)",
	"Auditoria de Acesso",
	"Sanitização de Inputs (XSS)",
	"Validação de Força de Senha",
	"Headers de Segurança",
	"Bloqueio de Conta após tentativas",
	"Detecção de Login Suspeito",
	"Timeout de Sessão",
	"Token por E-mail",
	"Math CAPTCHA",
	"Bloqueio de IP",
	"Log de Atividades"
];

export default function Home() {
	return (
		<main style={{ background: "#f0f4f8", minHeight: "100vh", padding: 0 }}>
			{/* Header */}
			<div style={{
				position: 'relative',
				padding: 'clamp(10px, 2vw, 18px)', // padding reduzido
				color: '#fff',
				textAlign: 'center',
				fontWeight: 'bold',
				letterSpacing: '1px',
				borderBottom: '2px solid #1e40af',
				overflow: 'hidden',
				minHeight: 90, // altura mínima reduzida
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<div style={{
					position: 'absolute',
					inset: 0,
					background: 'linear-gradient(rgba(30,64,175,0.82), rgba(30,64,175,0.82)), url("/empresa.jpg") center/cover no-repeat',
					zIndex: 0
				}} />
				<div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
					<h1 style={{ fontSize: 'clamp(1.8rem, 6vw, 2.7rem)', margin: 0, fontWeight: 900, letterSpacing: '2px' }}>
						RECRUTA INDÚSTRIA
					</h1>
					<p style={{ fontSize: 'clamp(0.8rem, 2vw, 1.1rem)', margin: 0, fontWeight: 400 }}>
						Conectamos profissionais industriais qualificados a empresas que valorizam experiência e competência.
					</p>
				</div>
			</div>

			{/* Cards */}
			<div style={{
				display: 'flex',
				flexWrap: 'nowrap',
				justifyContent: 'center',
				alignItems: 'flex-start',
				gap: 'clamp(8px, 1vw, 18px)',
				margin: 'clamp(32px, 5vw, 48px) auto', // Aumenta o espaço entre header e cards
				maxWidth: 1600,
				minWidth: 0,
			}}>
				{/* Card Profissional */}
				<div style={{
					background: '#fff',
					borderRadius: '18px',
					boxShadow: '0 6px 18px rgba(0,0,0,0.10)',
					transition: 'transform 0.3s ease, box-shadow 0.3s ease',
					display: 'flex',
					flexDirection: 'column',
					cursor: 'pointer',
					padding: '24px 40px',
					margin: '0 12px',
					border: '2px solid #1e40af',
					width: 'min(700px, 94vw)'
				}}>
					<div style={{
						height: 'clamp(150px, 28vw, 220px)',
						backgroundImage: 'url("/profissional.jpg")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						borderRadius: '12px',
						marginBottom: '4px'
					}} />
					<div style={{ padding: '4px 0 0 0', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
						<h2 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#1e40af', marginBottom: '4px', fontWeight: 'bold', textDecoration: 'underline', textTransform: 'uppercase' }}>
							Sou Profissional
						</h2>
						<p style={{ fontSize: 'clamp(0.62rem, 1vw, 0.75rem)', color: '#555', marginBottom: '4px', lineHeight: '1.2' }}>
							<strong>Cadastre seu perfil, destaque suas qualificações técnicas e seja encontrado por empresas que realmente valorizam sua experiência industrial.</strong>
						</p>
						<Link href="/login?tipo=profissional" style={{
							display: 'inline-block',
							padding: '6px 14px',
							background: '#1e40af',
							color: '#fff',
							textDecoration: 'none',
							borderRadius: '6px',
							fontWeight: 'bold',
							fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
							cursor: 'pointer',
							transition: 'all 0.3s ease',
							border: 'none',
							marginTop: '2px'
						}}>
							ACESSAR CADASTRO
						</Link>
					</div>
				</div>

				{/* Card Empresa */}
				<div style={{
					background: '#fff',
					borderRadius: '18px',
					boxShadow: '0 6px 18px rgba(0,0,0,0.10)',
					transition: 'transform 0.3s ease, box-shadow 0.3s ease',
					display: 'flex',
					flexDirection: 'column',
					cursor: 'pointer',
					padding: '24px 40px',
					margin: '0 12px',
					border: '2px solid #1e40af',
					width: 'min(700px, 94vw)'
				}}>
					<div style={{
						height: 'clamp(150px, 28vw, 220px)',
						backgroundImage: 'url("/empresa.jpg")',
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						borderRadius: '12px',
						marginBottom: '4px'
					}} />
					<div style={{ padding: '4px 0 0 0', textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
						<h2 style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#1e40af', marginBottom: '4px', fontWeight: 'bold', textDecoration: 'underline', textTransform: 'uppercase' }}>
							Sou Empresa
						</h2>
						<p style={{ fontSize: 'clamp(0.62rem, 1vw, 0.75rem)', color: '#555', marginBottom: '4px', lineHeight: '1.2' }}>
							<strong>Encontre profissionais prontos para atuar na indústria, com filtros inteligentes, segurança de dados e processos claros de seleção.</strong>
						</p>
						<Link href="/login?tipo=empresa" style={{
							display: 'inline-block',
							padding: '6px 14px',
							background: '#1e40af',
							color: '#fff',
							textDecoration: 'none',
							borderRadius: '6px',
							fontWeight: 'bold',
							fontSize: 'clamp(0.7rem, 1vw, 0.85rem)',
							cursor: 'pointer',
							transition: 'all 0.3s ease',
							border: 'none',
							marginTop: '2px'
						}}>
							CONTRATAR TALENTOS
						</Link>
					</div>
				</div>
			</div>

			{/* Explanatory Card Section */}
			<div style={{ display: 'flex', justifyContent: 'center', margin: 'clamp(32px, 5vw, 36px) 0 clamp(18px, 3vw, 28px) 0' }}>
				<div style={{
					maxWidth: 1150,
					width: '100%',
					backgroundColor: '#fff',
					border: '3px solid #1e40af',
					borderRadius: '15px',
					boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
					textAlign: 'center',
				}}>
					<div style={{ fontSize: 'clamp(0.6rem, 1.2vw, 0.75rem)', color: '#333', lineHeight: '1.6' }}>
						<p style={{ marginTop: 0, marginBottom: '6px' }}>
							<strong>O Recruta Indústria nasceu para resolver um problema real da indústria: encontrar mão de obra qualificada, confiável e pronta para o chão de fábrica.</strong>
						</p>
						<p style={{ marginTop: 0, marginBottom: '6px' }}>
							<strong>Aqui, profissionais industriais criam um perfil completo com experiência, cursos e certificações, enquanto empresas acessam talentos filtrados por área, função e nível de qualificação.</strong>
						</p>
						<p style={{ marginTop: 0, marginBottom: 0 }}>
							<strong>Tudo isso em uma plataforma pensada exclusivamente para o setor industrial — sem ruído, sem currículos genéricos e sem perda de tempo.</strong>
						</p>
					</div>
				</div>
			</div>

			{/* Slogan Band */}
			<div style={{
				position: 'relative',
				marginTop: 'clamp(18px, 3vw, 28px)',
				padding: 'clamp(10px, 2.5vw, 22px)',
				color: '#fff',
				textAlign: 'center',
				fontWeight: 600,
				fontSize: 'clamp(1rem, 2.2vw, 1.35rem)',
				letterSpacing: '1px',
				overflow: 'hidden',
				minHeight: 80,
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
				<div style={{
					position: 'absolute',
					inset: 0,
					background: 'linear-gradient(rgba(30,64,175,0.82), rgba(30,64,175,0.82)), url("/empresa.jpg") center/cover no-repeat',
					zIndex: 0
				}} />
				<span style={{ position: 'relative', zIndex: 1, width: '100%' }}>
					Conectando Talentos ao Futuro da Indústria
				</span>
			</div>

			{/* Security Modules Section */}
			<div style={{
				padding: 'clamp(4px, 1vw, 10px)',
				background: '#f0f4f8',
				display: 'flex',
				flexWrap: 'wrap',
				justifyContent: 'center',
				gap: '2px',
				maxWidth: 1600,
				margin: '0 auto 2px auto',
			}}>
				{/* Security Title */}
				<div style={{ width: '100%', textAlign: 'center', margin: '4px 0 0 0' }}>
					<span style={{ fontSize: '0.72rem', color: '#1e40af', fontWeight: 600, letterSpacing: '1px' }}>
						<span role="img" aria-label="cadeado" style={{ marginRight: 4 }}>🔒</span>SEGURANÇA DO SITE
					</span>
				</div>

				{securityModules.map((mod, i) => (
					<div key={i} style={{
						background: '#fff',
						border: '1px solid #1e40af',
						borderRadius: '4px',
						padding: '1px 5px',
						fontSize: '0.62rem',
						color: '#1e40af',
						fontWeight: 500,
						minWidth: 0,
						maxWidth: 120,
						textAlign: 'center',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						height: '18px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						boxShadow: 'none'
					}}>
						{mod}
					</div>
				))}
			</div>

			{/* Footer */}
			<footer style={{
				background: '#fff',
				color: '#1e40af',
				textAlign: 'center',
				fontSize: 'clamp(0.7rem, 1.2vw, 0.85rem)',
				padding: '5px 20px',
				borderTop: '1px solid #e5e7eb',
				marginTop: 6
			}}>
				© {new Date().getFullYear()} Recruta Indústria. Todos os direitos reservados.
			</footer>
		</main>
	);
}