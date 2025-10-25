import Layout from '../components/Layout'; import Link from 'next/link';
export default function Home(){return (<Layout>
  <section className="text-center py-16">
    <h1 className="text-4xl font-extrabold">Automatize bots de assinatura no Telegram com PIX</h1>
    <p className="mt-3 text-slate-600">A Orddex permite que cada criador conecte seu próprio token PushinPay e venda acesso ao seu grupo premium.</p>
    <div className="mt-6 flex gap-3 justify-center">
      <Link href="/planos" className="px-6 py-3 rounded bg-slate-900 text-white">Testar checkout</Link>
      <Link href="/login" className="px-6 py-3 rounded border">Entrar</Link>
    </div>
  </section>
</Layout>);}
