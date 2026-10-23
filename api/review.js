const g=require('./_gh');
module.exports=async(req,res)=>{try{
if(req.method!=='POST')return res.status(405).json({error:'POST only'});
const b=req.body||{},n=String(b.n||'').trim().slice(0,40),t=String(b.t||'').trim().slice(0,400);
if(!n||!t)return res.status(400).json({error:'Name and message required'});
const p=await g.readJson('data/pending.json');
if(p.list.length>=100)return res.status(429).json({error:'Too many pending reviews'});
p.list.unshift({id:Date.now(),n,t});await g.writeJson('data/pending.json',p.list,'New review');res.json({ok:1})}catch(e){res.status(500).json({error:e.message})}};
