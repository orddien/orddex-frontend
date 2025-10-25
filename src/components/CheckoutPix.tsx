import { useState } from 'react'; import axios from 'axios';
const PLANOS=[{code:'BASIC',name:'Básico',price:1990},{code:'PLUS',name:'Plus',price:5970},{code:'PRO',name:'Pro',price:11940}];
export default function CheckoutPix(){
  const [telegramId,setTelegramId]=useState(''); const [merchantKey,setMerchantKey]=useState('');
  const [loading,setLoading]=useState(false); const [qrcode,setQrcode]=useState<string|null>(null); const [pixCode,setPixCode]=useState<string|null>(null);
  const backend=process.env.NEXT_PUBLIC_BACKEND_URL;
  const pagar=async(plan_code:string)=>{
    if(!telegramId||!merchantKey){alert('Informe seu Telegram ID e a API Key do merchant.');return;}
    setLoading(true);
    try{const {data}=await axios.post(`${backend}/checkout?merchant=${merchantKey}`,{plan_code,telegram_id:telegramId});
      setQrcode(data.qrcode_base64||null); setPixCode(data.pix_code||null);
    }catch(e:any){alert(e?.response?.data?.erro||'Falha ao gerar PIX');}finally{setLoading(false);} };
  return (<div className="grid gap-6">
    <div className="p-4 border rounded-xl bg-white">
      <h2 className="font-semibold text-lg mb-2">Dados para pagamento</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <div><label className="text-sm text-slate-600">Telegram ID</label>
          <input className="border rounded px-3 py-2 w-full" placeholder="Ex.: 123456789" value={telegramId} onChange={e=>setTelegramId(e.target.value)}/>
          <p className="text-xs text-slate-500 mt-1">Dica: use @userinfobot no Telegram para ver seu ID numérico.</p></div>
        <div><label className="text-sm text-slate-600">Merchant API Key</label>
          <input className="border rounded px-3 py-2 w-full" placeholder="ok_xxxxx" value={merchantKey} onChange={e=>setMerchantKey(e.target.value)}/>
          <p className="text-xs text-slate-500 mt-1">Cada criador tem sua própria chave e token PushinPay.</p></div>
      </div>
    </div>
    <div className="grid md:grid-cols-3 gap-4">
      {PLANOS.map(p=>(<div key={p.code} className="p-4 border rounded-xl bg-white"><div className="font-semibold">{p.name}</div>
        <div className="text-2xl mt-1">R$ {(p.price/100).toFixed(2)}</div>
        <button disabled={loading} onClick={()=>pagar(p.code)} className="mt-3 px-4 py-2 rounded bg-slate-900 text-white">Pagar com PIX</button></div>))}
    </div>
    {(qrcode||pixCode)&&(<div className="p-4 border rounded-xl bg-white"><h3 className="font-semibold mb-2">Finalize no seu banco</h3>
      {qrcode&&<img src={`data:image/png;base64,${qrcode}`} alt="QR Code PIX" className="w-64 h-64"/>}
      {pixCode&&(<div className="mt-3"><label className="text-sm text-slate-600">Copia e Cola:</label>
        <textarea className="w-full border rounded p-2" rows={3} value={pixCode} readOnly/></div>)}
      <p className="text-sm text-slate-500 mt-2">Após a confirmação do pagamento (webhook), o bot enviará o convite do Telegram.</p></div>)}
  </div>);
}
