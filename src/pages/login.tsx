import { useState } from 'react'; import axios from 'axios'; import { useRouter } from 'next/router'; import Layout from '../components/Layout';
export default function Login(){ const [email,setEmail]=useState(''); const [senha,setSenha]=useState(''); const [loading,setLoading]=useState(false);
const router=useRouter(); const backend=process.env.NEXT_PUBLIC_BACKEND_URL;
const submit=async(e:any)=>{e.preventDefault(); setLoading(true);
  try{const {data}=await axios.post(`${backend}/auth/login`,{email,senha}); localStorage.setItem('orddex_token',data.token); localStorage.setItem('orddex_api_key',data.api_key); router.push('/dashboard');}
  catch(err:any){alert(err?.response?.data?.erro||'Falha no login');} finally{setLoading(false);} };
return (<Layout><div className="min-h-[60vh] flex items-center justify-center">
  <form onSubmit={submit} className="w-full max-w-sm bg-white border rounded-2xl p-6 shadow-sm">
    <div className="text-center mb-6"><div className="text-2xl font-bold">Orddex</div><div className="text-slate-500">Entre para acessar seu painel</div></div>
    <label className="text-sm">E-mail</label><input className="border rounded px-3 py-2 w-full mb-3" type="email" value={email} onChange={e=>setEmail(e.target.value)} required/>
    <label className="text-sm">Senha</label><input className="border rounded px-3 py-2 w-full mb-4" type="password" value={senha} onChange={e=>setSenha(e.target.value)} required/>
    <button className="w-full py-2 rounded bg-slate-900 text-white" disabled={loading}>{loading?'Entrando...':'Entrar'}</button>
    <div className="text-center text-sm mt-3"><a href="/register" className="text-slate-600 underline">Criar conta</a></div>
  </form></div></Layout>);}
