import { ReactNode } from 'react';
import Link from 'next/link';
export default function Layout({ children }:{children:ReactNode}){
  return (<div className="min-h-screen bg-slate-50 text-slate-800">
    <header className="border-b bg-white">
      <div className="max-w-5xl mx-auto p-4 flex items-center justify-between">
        <Link href="/" className="font-extrabold text-xl">Orddex</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/planos">Planos</Link>
          <Link href="/login">Entrar</Link>
          <Link href="/register" className="px-3 py-1 rounded bg-slate-900 text-white">Criar conta</Link>
        </nav>
      </div>
    </header>
    <main className="max-w-5xl mx-auto p-4">{children}</main>
  </div>);
}