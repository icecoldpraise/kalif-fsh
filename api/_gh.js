// Reads and writes files in your GitHub repo (this is the "git database")
const R=process.env.GITHUB_REPO,B=process.env.GITHUB_BRANCH||'main',T=process.env.GITHUB_TOKEN;
const h={Authorization:'Bearer '+T,Accept:'application/vnd.github+json','User-Agent':'kalif-fsh'};
const u=p=>`https://api.github.com/repos/${R}/contents/${p}`;
async function get(p){const r=await fetch(u(p)+'?ref='+B,{headers:h});if(r.status===404)return{sha:null,data:null};if(!r.ok)throw new Error('GitHub read failed ('+r.status+'). Check GITHUB_TOKEN and GITHUB_REPO in Vercel, then redeploy.');const j=await r.json();return{sha:j.sha,data:Buffer.from(j.content,'base64').toString('utf8')}}
async function put(p,content,msg,sha,isB64){const body={message:msg,branch:B,content:isB64?content:Buffer.from(content).toString('base64')};if(sha)body.sha=sha;const r=await fetch(u(p),{method:'PUT',headers:h,body:JSON.stringify(body)});if(!r.ok)throw new Error('GitHub write failed ('+r.status+'). Check the token has Contents: Read and write.')}
async function readJson(p){const g=await get(p);return{list:g.data?JSON.parse(g.data):[]}}
async function writeJson(p,list,msg){const g=await get(p);await put(p,JSON.stringify(list,null,2)+'\n',msg,g.sha)}
module.exports={readJson,writeJson,put};
