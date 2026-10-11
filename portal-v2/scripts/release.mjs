import {spawnSync} from 'node:child_process';
import {randomBytes} from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {resolve} from 'node:path';

const origin='https://autonord-engagement.jacobnitter.workers.dev';
function execute(program,args,input){const options={cwd:fileURLToPath(new URL('..',import.meta.url)),env:process.env,stdio:input?['pipe','inherit','inherit']:'inherit',input};const result=spawnSync(program,args,options);if(result.error)throw result.error;if(result.status!==0)throw new Error(`Kommandoen ${program} ${args.join(' ')} fejlede. Udgivelsen er stoppet.`);}
export async function release({run=execute,request=fetch,log=console.log,random=()=>randomBytes(32).toString('hex')}={}){
  run('npm',['run','deploy:check']);
  run('npm',['run','db:migrate']);
  let initialized=false;
  try{const result=await request(origin+'/api/session',{cache:'no-store',signal:AbortSignal.timeout(10000)});if(result.ok)initialized=(await result.json()).initialized===true;}catch{}
  let key;
  if(!initialized){key=random();run(process.execPath,[fileURLToPath(new URL('../node_modules/wrangler/bin/wrangler.js',import.meta.url)),'secret','put','SETUP_TOKEN','--config','wrangler.jsonc'],key);}
  run('npm',['run','deploy']);
  log('\nAutonord People er udgivet.');
  if(key){log('Åbn dette opsætningslink, og vælg din e-mail og adgangskode. Ingen nøgle skal indtastes:');log(origin+'/#setup='+encodeURIComponent(key));log('Linket er privat og kan kun oprette den første administratorkonto.');}
  else log('Åbn portalen og log ind: '+origin);
}
if(process.argv[1]&&resolve(process.argv[1])===fileURLToPath(import.meta.url))release().catch(error=>{console.error(error.message);process.exitCode=1;});
