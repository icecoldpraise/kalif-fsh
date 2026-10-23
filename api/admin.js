const g=require('./_gh');
module.exports=async(req,res)=>{try{
if(req.method!=='POST')return res.status(405).json({error:'POST only'});
const b=req.body||{};
if(!process.env.ADMIN_PASS||b.user!==process.env.ADMIN_USER||b.pass!==process.env.ADMIN_PASS)return res.status(401).json({error:'Wrong username or password'});
const a=b.action;
if(a==='login')return res.json({ok:1});
if(a==='pending')return res.json({pending:(await g.readJson('data/pending.json')).list});
if(a==='save'&&['products','reviews'].includes(b.file)&&Array.isArray(b.data)){await g.writeJson('data/'+b.file+'.json',b.data,'Update '+b.file);return res.json({ok:1})}
if(a==='upload'&&b.base64){const n=Date.now()+'.jpg';await g.put('img/'+n,b.base64,'Add image',null,true);return res.json({url:'/img/'+n})}
if(a==='approve'||a==='drop'){const p=await g.readJson('data/pending.json');const it=p.list.find(x=>x.id==b.id);if(!it)return res.json({ok:1});
if(a==='approve'){const r=await g.readJson('data/reviews.json');r.list.unshift({id:it.id,n:it.n,t:it.t});await g.writeJson('data/reviews.json',r.list,'Approve review')}
await g.writeJson('data/pending.json',p.list.filter(x=>x.id!=b.id),'Update pending reviews');return res.json({ok:1})}
res.status(400).json({error:'Unknown action'})}catch(e){res.status(500).json({error:e.message})}};
