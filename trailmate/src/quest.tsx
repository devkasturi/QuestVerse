import {createContext,useContext,useEffect,useState,ReactNode} from 'react'
import {Camera,Check,X,Bookmark,Trophy,Upload,Loader2,AlertCircle,RotateCw,MapPin,ExternalLink,Brain} from 'lucide-react'
import {TRAILS,pinLabel} from './data'
import {TASKS,INFO,LEVELS,FACTS,QUIZ,GEAR,Task} from './questData'

// ---------- state ----------
export interface Memory{id:string;dest:string;task:string;kind:'photo'|'memory';img?:string;caption:string;time:string}
export interface S{mem:Memory[];facts:string[];bonus:number;best:number;trip:{ids:string[];days:number;budget:number};packed:string[];packDone:boolean;prefs:{low:boolean;big:boolean;simple:boolean;cap:boolean}}
const DEF:S={mem:[],facts:[],bonus:0,best:0,trip:{ids:[],days:2,budget:99999},packed:[],packDone:false,prefs:{low:false,big:false,simple:false,cap:false}}
export const xpOf=(s:S)=>s.mem.reduce((a,m)=>a+(TASKS.find(t=>t.id===m.task)?.xp||0),0)+s.bonus
export const levelOf=(xp:number)=>{let i=0;LEVELS.forEach(([m],k)=>{if(xp>=m)i=k});const nx=LEVELS[i+1];return{i,name:LEVELS[i][1],from:LEVELS[i][0],next:nx?nx[0]:null}}
const doneDests=(s:S)=>TRAILS.filter(t=>new Set(s.mem.filter(m=>m.dest===t.id).map(m=>m.task)).size===TASKS.length).length
export const BADGES:{id:string;emoji:string;name:string;desc:string;ok:(s:S)=>boolean}[]=[
{id:'b1',emoji:'👣',name:'First Footprint',desc:'Complete any quest task',ok:s=>s.mem.length>=1},
{id:'b2',emoji:'📷',name:'Shutterbug',desc:'Submit 3 photo tasks',ok:s=>s.mem.filter(m=>m.kind==='photo').length>=3},
{id:'b3',emoji:'📜',name:'Storyteller',desc:'Write 2 travel memories',ok:s=>s.mem.filter(m=>m.kind==='memory').length>=2},
{id:'b4',emoji:'💡',name:'Curious Mind',desc:'Save 3 facts',ok:s=>s.facts.length>=3},
{id:'b5',emoji:'🧠',name:'Scholar',desc:'Score 5+ on the Quest Quiz',ok:s=>s.best>=5},
{id:'b6',emoji:'🎒',name:'Ready to Roam',desc:'Finish a packing checklist',ok:s=>s.packDone},
{id:'b7',emoji:'🏆',name:'Quest Master',desc:'Finish all 4 tasks at one destination',ok:s=>doneDests(s)>=1}]
interface Ctx{s:S;xp:number;lvl:ReturnType<typeof levelOf>;up:(p:Partial<S>)=>void;commit:(n:S,label:string,gain:number)=>void;setPref:(k:keyof S['prefs'],v:boolean)=>void;dest:string|null;setDest:(id:string|null)=>void;saveErr:boolean}
const C=createContext<Ctx>(null as unknown as Ctx);export const useQ=()=>useContext(C)

export function QuestProvider({children}:{children:ReactNode}){
 const [s,setS]=useState<S>(()=>{try{const r=localStorage.getItem('tm_qv');if(!r)return DEF;const p=JSON.parse(r);return{...DEF,...p,prefs:{...DEF.prefs,...p.prefs},trip:{...DEF.trip,...p.trip}}}catch{return DEF}})
 const [saveErr,setSaveErr]=useState(false);const [dest,setDest]=useState<string|null>(null)
 const [rw,setRw]=useState<{label:string;gain:number;badges:string[];lvl?:string}|null>(null)
 useEffect(()=>{try{localStorage.setItem('tm_qv',JSON.stringify(s));setSaveErr(false)}catch{setSaveErr(true)}},[s])
 const xp=xpOf(s)
 const commit=(n:S,label:string,gain:number)=>{const b=BADGES.filter(x=>x.ok(n)&&!x.ok(s)).map(x=>x.emoji+' '+x.name);const l0=levelOf(xpOf(s)).i,l1=levelOf(xpOf(n))
  setS(n);if(gain>0||b.length)setRw({label,gain,badges:b,lvl:l1.i>l0?l1.name:undefined})}
 const ctx:Ctx={s,xp,lvl:levelOf(xp),saveErr,dest,setDest,up:p=>setS({...s,...p}),commit,setPref:(k,v)=>setS({...s,prefs:{...s.prefs,[k]:v}})}
 return <C.Provider value={ctx}>{children}
  {dest&&<Dest id={dest} close={()=>setDest(null)}/>}
  {rw&&<div role="dialog" aria-modal="true" aria-label="Reward" className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"><div className="card pop w-full max-w-sm space-y-3 text-center">
   <div className="text-5xl" aria-hidden>🎉</div><h2 className="font-serif text-xl text-gold">{rw.label}</h2>
   {rw.gain>0&&<p className="text-3xl font-bold" role="status">+{rw.gain} XP</p>}
   {rw.lvl&&<p className="rounded-xl bg-forest/40 p-2 font-semibold">Level up! You are now a {rw.lvl}</p>}
   {rw.badges.map(b=><p key={b} className="pop rounded-xl border border-gold p-2 font-semibold">Badge unlocked: {b}</p>)}
   <button autoFocus className="btn w-full" onClick={()=>setRw(null)}>Continue exploring</button></div></div>}
  {saveErr&&<p role="alert" className="fixed left-2 right-2 top-14 z-50 rounded-xl bg-terra p-2 text-center text-sm text-white">Storage is full — new progress won’t persist after reload. Delete some journal photos.</p>}
 </C.Provider>}

// ---------- shared bits ----------
export const Logo=({s=64}:{s?:number})=>{const [bad,setBad]=useState(false)
 // Drop your real logo at public/questverse-logo.png — it is used automatically. The SVG below is a placeholder.
 return bad?<svg width={s} height={s} viewBox="0 0 64 64" role="img" aria-label="QuestVerse logo"><circle cx="32" cy="32" r="30" fill="#FBF3E4" stroke="#C8553D" strokeWidth="3"/><circle cx="32" cy="26" r="11" fill="#F59E4B"/><path d="M6 48l16-22 10 12 8-10 18 20z" fill="#3F7D4E"/><path d="M4 50c14-6 22 4 56-2v6c-30 8-42-4-56 0z" fill="#7A4B2A"/><path d="M32 3l3 8h-6z" fill="#2A1830"/></svg>
 :<img src="/questverse-logo.png" width={s} height={s} alt="QuestVerse logo" style={{objectFit:'contain'}} onError={()=>setBad(true)}/>}
export function Photo({src,alt,verified,cls=''}:{src:string;alt:string;verified?:boolean;cls?:string}){
 const {s}=useQ();const [broken,setBroken]=useState(false);const [load,setLoad]=useState(false);const hide=s.prefs.low&&!load
 return <figure className="mb-2">
  {hide?<div className={`imgcard flex flex-col items-center justify-center gap-1 bg-panel p-2 text-center text-xs text-muted ${cls}`} role="img" aria-label={alt}><Camera size={22} aria-hidden/>Image hidden (low-data mode)<button className="btn2 !min-h-[32px] !px-2" onClick={()=>setLoad(true)}>Load image</button></div>
  :broken?<div className={`imgcard flex items-center justify-center bg-panel text-muted ${cls}`} role="img" aria-label={alt}><Camera size={28} aria-hidden/></div>
  :<img src={src} alt={alt} loading="lazy" className={`imgcard ${cls}`} onError={()=>setBroken(true)}/>}
  {(s.prefs.cap||verified===false)&&<figcaption className="mt-1 text-[11px] italic text-muted">{s.prefs.cap&&alt}{verified===false&&<> · Representative photo — not the exact location</>}</figcaption>}
 </figure>}
const Bar=({v,max,label}:{v:number;max:number;label:string})=><div className="h-3 overflow-hidden rounded bg-black/40" role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={max} aria-label={label}><div className="h-3 rounded bg-gradient-to-r from-gold to-terra transition-all" style={{width:Math.min(100,v/max*100)+'%'}}/></div>
const compress=(f:File)=>new Promise<string>((res,rej)=>{if(!f.type.startsWith('image/'))return rej('Please choose an image file.');if(f.size>12e6)return rej('That image is over 12 MB — pick a smaller one.')
 const u=URL.createObjectURL(f),i=new Image();i.onload=()=>{const k=Math.min(1,720/Math.max(i.width,i.height)),c=document.createElement('canvas');c.width=i.width*k;c.height=i.height*k;c.getContext('2d')!.drawImage(i,0,0,c.width,c.height);URL.revokeObjectURL(u);res(c.toDataURL('image/jpeg',.6))};i.onerror=()=>rej('Could not read that image.');i.src=u})

// ---------- destination page + quest tasks ----------
function TaskForm({tid,task,onDone}:{tid:string;task:Task;onDone:()=>void}){
 const q=useQ();const [img,setImg]=useState('');const [cap,setCap]=useState('');const [here,setHere]=useState(false);const [err,setErr]=useState('');const [busy,setBusy]=useState(false)
 const photo=task.kind==='photo'
 const pick=async(f?:File)=>{if(!f)return;setErr('');setBusy(true);try{setImg(await compress(f))}catch(e){setErr(String(e));setImg('')}setBusy(false)}
 const submit=()=>{if(photo&&!img)return setErr('Add a photo first.');if(cap.trim().length<(photo?3:20))return setErr(photo?'Add a short caption (3+ characters).':'Write at least 20 characters.');if(!here)return setErr('Please confirm you visited this place (honour system — location is not verified).')
  const m:Memory={id:String(Date.now()),dest:tid,task:task.id,kind:task.kind,img:img||undefined,caption:cap.trim(),time:new Date().toLocaleDateString()}
  const mem=[m,...q.s.mem],full=new Set(mem.filter(x=>x.dest===tid).map(x=>x.task)).size===TASKS.length
  q.commit({...q.s,mem,bonus:q.s.bonus+(full?100:0)},full?'Destination quest complete!':task.title+' — done!',task.xp+(full?100:0));onDone()}
 return <div className="mt-2 space-y-2 rise">
  {photo&&<><label className="btn2 flex cursor-pointer items-center justify-center gap-2"><Upload size={18} aria-hidden/>Take or choose a photo<input type="file" accept="image/*" capture="environment" className="sr-only" onChange={e=>pick(e.target.files?.[0])}/></label>
   {busy&&<p className="flex items-center gap-2 text-sm" role="status"><Loader2 className="animate-spin" size={16}/>Preparing preview…</p>}
   {img&&<img src={img} alt="Preview of your photo" className="h-40 w-full rounded-xl object-cover"/>}</>}
  <textarea aria-label={photo?'Photo caption':'Your travel memory'} value={cap} onChange={e=>setCap(e.target.value)} rows={photo?1:4} placeholder={photo?'Caption your photo…':'What will you remember about this place?'} className="w-full rounded-xl border border-gold/30 bg-espresso p-3"/>
  <label className="flex min-h-[44px] items-center gap-2 text-sm"><input type="checkbox" className="h-6 w-6" checked={here} onChange={e=>setHere(e.target.checked)}/>I visited this place (self-reported — no GPS check)</label>
  {err&&<p role="alert" className="flex items-center gap-1 text-sm text-red-300"><AlertCircle size={16}/>{err}</p>}
  <div className="flex gap-2"><button className="btn flex-1" disabled={busy} onClick={submit}>Submit quest</button><button className="btn2" onClick={onDone}>Cancel</button></div>
  <p className="text-[11px] text-muted">Demo: photos are compressed and stored only on this device — nothing is uploaded.</p></div>}

function Dest({id,close}:{id:string;close:()=>void}){
 const q=useQ();const t=TRAILS.find(x=>x.id===id)!;const info=INFO[id];const [open,setOpen]=useState<string|null>(null)
 const mine=q.s.mem.filter(m=>m.dest===id);const n=new Set(mine.map(m=>m.task)).size
 return <div role="dialog" aria-modal="true" aria-label={t.name} className="fixed inset-0 z-30 overflow-y-auto bg-espresso text-cream rise"><div className="mx-auto max-w-md pb-10 md:max-w-2xl">
  <div className="relative"><Photo src={t.img} alt={t.alt} verified={t.verifiedPhoto} cls="!h-56 !rounded-none !border-0"/>
   <button aria-label="Close destination" className="btn2 absolute right-3 top-3 bg-espresso/80" onClick={close}><X/></button></div>
  <div className="space-y-3 px-4">
   <div><h1 className="font-serif text-2xl text-gold">{t.name}</h1><p className="italic text-muted">{t.tag}</p><p className="mt-1 text-sm">{t.desc} {t.km} km · {t.cat} · {t.rating}★ (sample)</p></div>
   <section className="card space-y-2"><h2 className="font-serif text-gold">Budget &amp; accessibility <span className="rounded border border-gold/50 px-1 text-[10px]">DEMO INFO</span></h2>
    <p className="text-sm">Estimated cost: <b>{info.cost?'≈ ₹'+info.cost+' per person':'Free'}</b> · {info.stepFree?'♿ Mostly step-free':'⚠ Not fully step-free'}</p>
    <ul className="list-disc pl-5 text-sm">{info.access.map(a=><li key={a}>{a}</li>)}</ul><p className="text-[11px] text-muted">Sample details for this prototype — verify with the venue.</p>
    <div className="flex flex-wrap gap-2"><button className="btn2 flex items-center gap-1" onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}`,'_blank')}><ExternalLink size={16}/>Get directions</button>
     <button className="btn2" onClick={()=>{q.up({trip:{...q.s.trip,ids:q.s.trip.ids.includes(id)?q.s.trip.ids:[...q.s.trip.ids,id]}});close()}}>Add to trip plan</button></div></section>
   <section className="space-y-2"><div className="flex items-baseline justify-between"><h2 className="font-serif text-lg text-gold">Quest tasks</h2><span className="text-sm">{n}/{TASKS.length} done</span></div><Bar v={n} max={TASKS.length} label="Quest progress"/>
    <p className="text-xs text-muted">Complete all four for a +100 XP destination bonus.</p>
    {TASKS.map(k=>{const m=mine.find(x=>x.task===k.id);return <div key={k.id} className={`card ${m?'border-forest':''}`}>
     <div className="flex items-start gap-3"><span className="text-2xl" aria-hidden>{k.emoji}</span><div className="flex-1"><b className="text-gold">{k.title}</b> <span className="text-xs">+{k.xp} XP</span><p className="text-sm text-muted">{k.hint}</p></div>
      {m?<span className="flex items-center gap-1 rounded bg-forest/50 px-2 py-1 text-xs font-semibold"><Check size={14}/>Completed</span>:<button className="btn2 !px-3" aria-expanded={open===k.id} onClick={()=>setOpen(open===k.id?null:k.id)}>{open===k.id?'Close':'Start'}</button>}</div>
     {m&&<div className="mt-2 flex gap-2">{m.img&&<img src={m.img} alt={m.caption} className="h-16 w-16 rounded-lg object-cover"/>}<p className="text-sm italic">“{m.caption}”</p></div>}
     {!m&&open===k.id&&<TaskForm tid={id} task={k} onDone={()=>setOpen(null)}/>}</div>})}</section></div></div></div>}

// ---------- Play: flip & discover + quiz ----------
export function Play(){
 const q=useQ();const [tab,setTab]=useState<'flip'|'quiz'>('flip');const [on,setOn]=useState<string|null>(null)
 return <div className="rise"><header className="px-4 py-3 border-b border-gold/20"><h1 className="font-serif text-xl text-gold">Play &amp; Discover</h1><p className="italic text-sm text-muted">Flip a card. Learn a fact. Earn XP.</p></header>
  <div className="flex gap-2 p-3" role="group" aria-label="Activity">{([['flip','Flip & Discover'],['quiz','Quest Quiz']] as const).map(([k,l])=><button key={k} className="chip flex-1" aria-pressed={tab===k} onClick={()=>setTab(k)}>{l}</button>)}</div>
  {tab==='flip'?<div className="grid grid-cols-2 gap-3 px-3 md:grid-cols-3">{FACTS.map(f=>{const o=on===f.id,sv=q.s.facts.includes(f.id)
   return <div key={f.id} className={`flip ${o?'on':''}`}><div className="in" style={{height:250}}>
    <button className="face card flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-panel to-terra/60 text-center" tabIndex={o?-1:0} aria-hidden={o} aria-expanded={o} onClick={()=>setOn(f.id)}><span className="text-3xl" aria-hidden>🗺️</span><span className="text-xs uppercase tracking-widest text-gold">{f.tag}</span><b className="font-serif">{f.front}</b><span className="text-xs text-muted">Tap to reveal</span></button>
    <div className="face bk card flex flex-col gap-2 overflow-y-auto bg-cream !text-espresso" aria-hidden={!o}><p className="flex-1 text-sm">{f.back}</p>
     {o&&<div className="flex flex-col gap-1"><button className="btn !min-h-[40px] text-sm" onClick={()=>q.up({facts:sv?q.s.facts.filter(x=>x!==f.id):[...q.s.facts,f.id]})}><Bookmark size={14} className={`mr-1 inline ${sv?'fill-current':''}`}/>{sv?'Saved ✓':'Save fact'}</button>
      <button className="btn2 !min-h-[40px] !text-espresso !border-espresso text-sm" onClick={()=>setTab('quiz')}>Take a quiz</button><button className="text-xs underline" onClick={()=>setOn(null)}>Flip back</button></div>}</div></div></div>})}</div>
  :<Quiz/>}</div>}

function Quiz(){
 const q=useQ();const [i,setI]=useState(0);const [pick,setPick]=useState<number|null>(null);const [score,setScore]=useState(0);const [fin,setFin]=useState(false);const [gain,setGain]=useState(0)
 const k=QUIZ[i]
 const next=()=>{if(i<QUIZ.length-1){setI(i+1);setPick(null);return}
  const g=Math.max(0,score-q.s.best)*20;setGain(g);setFin(true);q.commit({...q.s,best:Math.max(q.s.best,score),bonus:q.s.bonus+g},'Quiz complete: '+score+'/'+QUIZ.length,g)}
 if(fin)return <div className="card pop mx-3 space-y-2 text-center"><div className="text-4xl" aria-hidden>🧠</div><h2 className="font-serif text-xl text-gold">You scored {score}/{QUIZ.length}</h2><p>{gain>0?`+${gain} XP earned`:'No new XP — beat your best score of '+q.s.best+' to earn more.'}</p><button className="btn w-full" onClick={()=>{setI(0);setPick(null);setScore(0);setFin(false)}}><RotateCw size={16} className="mr-1 inline"/>Play again</button></div>
 return <div className="card mx-3 space-y-3"><div className="flex justify-between text-xs text-muted"><span>Question {i+1} of {QUIZ.length} · {k.t}</span><span>Score {score}</span></div><Bar v={i+(pick!==null?1:0)} max={QUIZ.length} label="Quiz progress"/>
  <h2 className="font-serif text-lg">{k.q}</h2>
  <div className="space-y-2" role="group" aria-label="Answers">{k.o.map((o,j)=>{const ok=pick!==null&&j===k.a,bad=pick===j&&j!==k.a
   return <button key={o} disabled={pick!==null} onClick={()=>{setPick(j);if(j===k.a)setScore(score+1)}} className={`card flex w-full items-center justify-between text-left !py-3 ${ok?'!border-forest bg-forest/40':''} ${bad?'!border-terra bg-terra/40':''}`}>{o}{ok&&<span className="flex items-center gap-1 text-sm"><Check size={16}/>Correct</span>}{bad&&<span className="flex items-center gap-1 text-sm"><X size={16}/>Not quite</span>}</button>})}</div>
  {pick!==null&&<div role="status" className="rise rounded-xl bg-black/30 p-3 text-sm"><b>{pick===k.a?'Nice! ':'The answer is “'+k.o[k.a]+'”. '}</b>{k.e}<button className="btn mt-2 w-full" onClick={next}>{i<QUIZ.length-1?'Next question':'See results'}</button></div>}</div>}

// ---------- Plan: trip + packing ----------
export function Plan(){
 const q=useQ();const {trip}=q.s;const [flat,setFlat]=useState(false)
 const set=(p:Partial<S['trip']>)=>q.up({trip:{...trip,...p}})
 const vis=TRAILS.filter(t=>INFO[t.id].cost<=trip.budget&&(!flat||INFO[t.id].stepFree)),sel=TRAILS.filter(t=>trip.ids.includes(t.id))
 const per=Math.max(1,Math.ceil(sel.length/trip.days)),total=sel.reduce((a,t)=>a+INFO[t.id].cost,0)
 const items=[...GEAR.base,...[...new Set(sel.map(t=>t.cat))].flatMap(c=>GEAR[c]||[])],ps=items.filter(([n])=>q.s.packed.includes(n)).length
 return <div className="rise"><header className="px-4 py-3 border-b border-gold/20"><h1 className="font-serif text-xl text-gold">Trip Planner</h1><p className="italic text-sm text-muted">Pick places, set a budget, pack smart</p></header>
  <div className="space-y-3 p-3">
   <section className="card space-y-2"><h2 className="font-serif text-gold">1 · Choose</h2><div className="flex flex-wrap gap-2">
    <select aria-label="Budget" value={trip.budget} onChange={e=>set({budget:Number(e.target.value)})} className="chip bg-espresso">{[[0,'Free only'],[300,'Up to ₹300'],[1000,'Up to ₹1,000'],[99999,'Any budget']].map(([v,l])=><option key={v} value={v}>{l}</option>)}</select>
    <select aria-label="Trip length" value={trip.days} onChange={e=>set({days:Number(e.target.value)})} className="chip bg-espresso">{[1,2,3].map(d=><option key={d} value={d}>{d} day{d>1?'s':''}</option>)}</select>
    <button className="chip" aria-pressed={flat} onClick={()=>setFlat(!flat)}>♿ Step-free only</button></div>
    {vis.length===0&&<p className="text-sm">No destinations match these filters.</p>}
    <ul className="space-y-2">{vis.map(t=>{const on=trip.ids.includes(t.id);return <li key={t.id} className="flex items-center gap-2"><label className="card flex min-h-[48px] flex-1 items-center gap-3 !p-2"><input type="checkbox" className="h-6 w-6" checked={on} onChange={()=>set({ids:on?trip.ids.filter(x=>x!==t.id):[...trip.ids,t.id]})}/><span className="flex-1 text-sm"><b className="text-gold">{t.name}</b><br/><span className="text-xs text-muted">{INFO[t.id].cost?'≈ ₹'+INFO[t.id].cost:'Free'} · {INFO[t.id].stepFree?'♿ step-free':'not step-free'}</span></span></label><button className="btn2 !px-2" aria-label={'Open '+t.name} onClick={()=>q.setDest(t.id)}><MapPin size={16}/></button></li>})}</ul></section>
   <section className="card space-y-2"><h2 className="font-serif text-gold">2 · Itinerary</h2>{sel.length===0?<p className="text-sm text-muted">Select destinations above to build your itinerary.</p>:<>
    {Array.from({length:trip.days},(_,d)=>sel.slice(d*per,d*per+per)).map((day,d)=><p key={d} className="text-sm"><b>Day {d+1}:</b> {day.length?day.map(t=>t.name).join(' → '):'Free day'}</p>)}<p className="text-sm">Estimated total: <b>{total?'≈ ₹'+total:'Free'}</b> per person (sample figures)</p></>}</section>
   <section className="card space-y-2"><h2 className="font-serif text-gold">3 · Packing &amp; gear</h2><Bar v={ps} max={items.length} label="Packing progress"/><p className="text-xs">{ps}/{items.length} packed</p>
    <ul>{items.map(([n,w])=><li key={n}><label className="flex min-h-[48px] items-center gap-3"><input type="checkbox" className="h-6 w-6" checked={q.s.packed.includes(n)} onChange={()=>q.up({packed:q.s.packed.includes(n)?q.s.packed.filter(x=>x!==n):[...q.s.packed,n]})}/><span className="text-sm"><b>{n}</b><br/><span className="text-xs text-muted">{w}</span></span></label></li>)}</ul>
    <button className="btn w-full" disabled={q.s.packDone||ps<items.length||sel.length===0} onClick={()=>q.commit({...q.s,packDone:true,bonus:q.s.bonus+150},'Packing checklist complete!',150)}>{q.s.packDone?'Checklist complete ✓':sel.length===0?'Choose a destination first':ps<items.length?`Pack ${items.length-ps} more to finish`:'Complete checklist (+150 XP)'}</button></section></div></div>}

// ---------- profile: progress, badges, exploration map, travel journal ----------
export function QuestProfile(){
 const q=useQ();const {lvl,xp,s}=q;const vis=new Set(s.mem.map(m=>m.dest))
 return <div className="space-y-3">
  <section className="card"><h2 className="font-serif text-xl text-gold">Quest progress · Lv.{lvl.i+1} {lvl.name}</h2><Bar v={xp-lvl.from} max={lvl.next?lvl.next-lvl.from:1} label="XP to next level"/><p className="text-xs">{xp} XP earned{lvl.next?` · ${lvl.next-xp} to next level`:' · max level!'}</p></section>
  <section className="card"><h2 className="mb-2 flex items-center gap-2 font-serif text-gold"><Trophy size={18} aria-hidden/>Badges</h2><ul className="grid grid-cols-2 gap-2">{BADGES.map(b=>{const ok=b.ok(s);return <li key={b.id} className={`rounded-xl border p-2 text-sm ${ok?'border-gold bg-gold/10':'border-gold/20 opacity-60'}`}><span className="text-2xl" aria-hidden>{ok?b.emoji:'🔒'}</span> <b>{b.name}</b><br/><span className="text-xs">{ok?'Unlocked':'Locked'} · {b.desc}</span></li>})}</ul></section>
  <section className="card"><h2 className="font-serif text-gold">My exploration map</h2><svg viewBox="0 0 360 340" role="img" aria-label={`Exploration map: ${vis.size} of ${TRAILS.length} destinations explored`} className="w-full rounded-xl bg-gradient-to-br from-amber-100 to-orange-300"><path d="M0 60l50-40 50 30 60-40 70 40 60-30 70 40v300H0z" fill="#3F7D4E" opacity=".25"/><path d="M0 170C90 150 180 200 360 160" stroke="#5b8fb0" strokeWidth="10" fill="none" opacity=".6"/><path d="M0 300l60-30 60 20 70-25 60 20 110-30v85H0z" fill="#7A4B2A" opacity=".3"/>
   {TRAILS.map(t=>{const v=vis.has(t.id);return <g key={t.id}><circle cx={t.x} cy={t.y} r={v?13:9} fill={v?'#3F7D4E':'#C8553D'} opacity={v?1:.45} stroke="#2A1830" strokeWidth="2"/>{v&&<text x={t.x} y={t.y+4} textAnchor="middle" fontSize="12" fill="#fff" aria-hidden>✓</text>}{(l=>(<text x={l.x} y={l.y} textAnchor={l.a} fontSize="9" fontWeight="700" fill="#2A1830" stroke="#FBF3E4" strokeWidth="3" paintOrder="stroke" aria-hidden>{t.place}</text>))(pinLabel(t,v?13:9))}</g>})}</svg>
   <ul className="mt-2 text-sm">{TRAILS.map(t=><li key={t.id}>{vis.has(t.id)?'✓ Explored':'○ Not yet'} — {t.name}</li>)}</ul></section>
  <section className="card space-y-2"><h2 className="font-serif text-gold">Travel journal · photos &amp; memories</h2>{s.mem.length===0&&<p className="text-sm text-muted">Nothing yet. Open a destination from the Map and complete a quest task.</p>}
   <ul className="grid grid-cols-2 gap-2">{s.mem.map(m=><li key={m.id} className="rounded-xl border border-gold/20 p-2 text-sm">{m.img&&<img src={m.img} alt={m.caption} className="mb-1 h-24 w-full rounded-lg object-cover"/>}<b className="text-gold">{TRAILS.find(t=>t.id===m.dest)?.name}</b><p className="italic">“{m.caption}”</p><span className="text-[11px] text-muted">{m.time} · saved on this device</span>
    <button className="btn2 mt-1 !min-h-[36px] w-full text-xs" onClick={()=>{if(confirm('Delete this memory? Its XP will be removed too.'))q.up({mem:s.mem.filter(x=>x.id!==m.id)})}}>Delete</button></li>)}</ul>
   {s.facts.length>0&&<><h3 className="flex items-center gap-1 pt-2 font-semibold"><Brain size={16} aria-hidden/>Saved facts (available offline)</h3><ul className="space-y-1 text-sm">{FACTS.filter(f=>s.facts.includes(f.id)).map(f=><li key={f.id}><b>{f.front}</b> {f.back}</li>)}</ul></>}</section></div>}

export function A11yExtras(){
 const {s,setPref}=useQ();const row=(k:keyof S['prefs'],l:string,d:string)=><label className="flex min-h-[44px] items-center justify-between gap-3"><span>{l}<br/><span className="text-xs text-muted">{d}</span></span><input type="checkbox" className="h-6 w-6 shrink-0" checked={s.prefs[k]} onChange={e=>setPref(k,e.target.checked)}/></label>
 return <section className="card space-y-2"><h2 className="font-serif text-gold">More ways to use QuestVerse</h2>
  {row('big','Large touch targets','Bigger buttons, chips and inputs')}{row('simple','Simplified navigation','Four big tabs; the rest under “More”')}{row('cap','Show photo captions','Visible text description under every photo')}{row('low','Low-data mode','Hides photos until you tap “Load image”')}
  <p className="text-xs text-muted">Saved quests, facts and journal entries are stored on this device, so they stay readable offline. Photos from the web need a connection unless already cached.</p></section>}
