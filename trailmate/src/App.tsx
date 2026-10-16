import {useEffect,useMemo,useState} from 'react'
import {Compass,Map as MapI,Swords,Bell,Landmark,BookOpen,Plus,Minus,Home,Search,Settings,X,
  Trees,UtensilsCrossed,Camera,ScrollText,Navigation,Star,MessageCircle,Send,Trash2,
  Sparkles,UserRound,Building2,Bird as BirdIcon,Bookmark,ExternalLink,ChevronRight,AlertCircle,Gamepad2,Backpack,Menu,WifiOff} from 'lucide-react'
import {CATS,TRAILS,GUILDS,EVENTS,NOTES,LEADERS,PLACES,FAQ,Cat,Entry,distanceKm,pinLabel} from './data'
import {Logo,Photo,useQ,Play,Plan,QuestProfile,A11yExtras} from './quest'

function useLS<T>(k:string,init:T){const [v,s]=useState<T>(()=>{try{const r=localStorage.getItem('tm_'+k);return r?JSON.parse(r):init}catch{return init}})
useEffect(()=>{try{localStorage.setItem('tm_'+k,JSON.stringify(v))}catch{}},[v,k]);return [v,s] as const}
const toggle=(a:string[],id:string)=>a.includes(id)?a.filter(x=>x!==id):[...a,id]
type Tab='map'|'exp'|'disc'|'events'|'journal'|'play'|'plan'|'more'
const TABS:[Tab,string,typeof MapI][]=[['map','Map',MapI],['play','Play',Gamepad2],['plan','Plan',Backpack],['exp','Expeditions',Swords],['events','Events',Landmark],['journal','Journal',BookOpen]]
const CAT_ICON:Record<Cat,typeof Trees>={Historical:Landmark,Culture:ScrollText,Nature:Trees,Food:UtensilsCrossed,Photography:Camera}
const GUILD_ICON={book:ScrollText,trees:Trees,camera:Camera,food:UtensilsCrossed} as const
const EVENT_ICON={temple:Landmark,food:UtensilsCrossed,museum:Building2,bird:BirdIcon} as const
const NOTE_ICON={sparkle:Sparkles,user:UserRound,temple:Landmark,star:Star} as const
const Head=({t,sub,Icon}:{t:string;sub:string;Icon:typeof MapI})=><header className="px-4 py-3 border-b border-gold/20"><h1 className="flex items-center gap-2 font-serif text-xl text-gold"><Icon size={20} aria-hidden/>{t}</h1><p className="italic text-sm text-muted">{sub}</p></header>

export default function App(){
 const [seen,setSeen]=useLS('seen',false)
 const [interests,setInterests]=useLS<Cat[]>('interests',[])
 const [onboarded,setOnboarded]=useLS('onboarded',false)
 const [tab,setTab]=useState<Tab>('map')
 const [textStep,setTextStep]=useLS('textStep',0) // 0,1,2
 const [hc,setHc]=useLS('hc',false);const [rm,setRm]=useLS('rm',false);const [dys,setDys]=useLS('dys',false)
 const [screen,setScreen]=useState<'app'|'access'|'chat'>('app')
 const [toast,setToast]=useState('');const say=(m:string)=>{setToast(m);setTimeout(()=>setToast(''),2400)}
 useEffect(()=>{document.documentElement.style.setProperty('--fs',['16px','18.5px','21px'][textStep])},[textStep])
 const q=useQ();const [off,setOff]=useState(!navigator.onLine)
 useEffect(()=>{const a=()=>setOff(true),b=()=>setOff(false);addEventListener('offline',a);addEventListener('online',b);return()=>{removeEventListener('offline',a);removeEventListener('online',b)}},[])
 const cls=`${hc?'hc':''} ${rm?'rm':''} ${dys?'dys':''} ${q.s.prefs.big?'big':''}`
 const navTabs=q.s.prefs.simple?TABS.filter(([k])=>['map','play','plan'].includes(k)).concat([['more','More',Menu]]):TABS

 if(!seen)return <div className={`relative flex min-h-screen flex-col items-center justify-center gap-5 overflow-hidden bg-gradient-to-b from-espresso via-[#5a2d3e] to-terra p-6 text-center ${cls}`}><div className="absolute -bottom-24 h-64 w-[140%] rounded-[50%] bg-forest/60" aria-hidden/><div className="rise relative flex flex-col items-center gap-4"><Logo s={130}/><h1 className="font-serif text-4xl text-gold">QuestVerse</h1><p className="italic text-cream">Every trail tells a story. Every step is a quest.</p><button className="btn font-serif tracking-widest flex items-center gap-2" onClick={()=>setSeen(true)}><Compass size={18}/> BEGIN YOUR QUEST</button><p className="max-w-xs text-xs text-cream/80">Prototype: all places, events and people are fictional sample data. Progress is stored only on this device.</p></div></div>

 if(seen&&!onboarded)return <Onboarding cls={cls} interests={interests} setInterests={setInterests} finish={()=>setOnboarded(true)}/>

 return <div className={`mx-auto flex min-h-screen max-w-md md:max-w-2xl flex-col bg-espresso ${cls}`}>
  <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-gold/30 bg-espresso/95 px-3 py-2 backdrop-blur"><Logo s={34}/><span className="font-serif text-lg text-gold">QuestVerse</span><span className="ml-auto rounded-full bg-gold/20 px-3 py-1 text-xs" aria-label={`Level ${q.lvl.i+1} ${q.lvl.name}, ${q.xp} experience points`}>Lv.{q.lvl.i+1} · {q.xp} XP</span><button aria-label="Discoveries" className="btn2 !px-2" onClick={()=>setTab('disc')}><Bell size={18}/></button><button aria-label="Accessibility and display settings" className="btn2 !px-2" onClick={()=>setScreen('access')}><Settings size={18}/></button></header>
  {off&&<p role="status" className="flex items-center justify-center gap-2 bg-terra p-1 text-center text-xs text-white"><WifiOff size={14}/>You’re offline — saved quests, facts and journal still work.</p>}
  <main className="flex-1 pb-24 rise" key={tab}>
   {tab==='map'&&<MapScreen say={say} openSet={()=>setScreen('access')} interests={interests}/>}
   {tab==='play'&&<Play/>}{tab==='plan'&&<Plan/>}{tab==='more'&&<More go={setTab}/>}{tab==='exp'&&<Exp say={say}/>}{tab==='disc'&&<Disc/>}{tab==='events'&&<Events say={say}/>}
   {tab==='journal'&&<Journal say={say} openSet={()=>setScreen('access')}/>}
  </main>
  {toast&&<div role="status" className="fixed bottom-24 left-1/2 -translate-x-1/2 rounded-xl bg-cream px-4 py-2 text-espresso shadow-xl">{toast}</div>}
  <button aria-label="Open QuestVerse Assistant chatbot" onClick={()=>setScreen('chat')} className="fixed bottom-24 right-3 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-espresso shadow-xl"><MessageCircle/></button>
  {screen==='access'&&<Accessibility textStep={textStep} setTextStep={setTextStep} hc={hc} setHc={setHc} rm={rm} setRm={setRm} dys={dys} setDys={setDys} interests={interests} setInterests={setInterests} close={()=>setScreen('app')}/>}
  {screen==='chat'&&<Chatbot close={()=>setScreen('app')} goTab={t=>{setTab(t);setScreen('app')}}/>}
  <nav aria-label="Main" className="fixed bottom-0 left-1/2 flex w-full max-w-md md:max-w-2xl -translate-x-1/2 justify-around rounded-t-3xl border-t border-gold/40 bg-cream/95 p-2">
   {navTabs.map(([k,l,I])=><button key={k} aria-current={tab===k?'page':undefined} onClick={()=>{setTab(k);setScreen('app')}} className={`flex min-h-[52px] flex-1 flex-col items-center justify-center rounded-xl text-[11px] ${tab===k?'bg-gold/30 text-yellow-900 font-bold':'text-stone-700'}`}><I size={20} aria-hidden/>{l}</button>)}
  </nav></div>}

function More({go}:{go:(t:Tab)=>void}){return <div className="rise"><Head t="More" sub="Everything else in QuestVerse" Icon={Menu}/><ul className="space-y-2 p-3">{([['exp','Expeditions',Swords],['events','Events',Landmark],['disc','Discoveries',Bell],['journal','Journal & progress',BookOpen]] as [Tab,string,typeof MapI][]).map(([k,l,I])=><li key={k}><button className="card flex w-full items-center gap-3 text-left" onClick={()=>go(k)}><I aria-hidden/>{l}</button></li>)}</ul></div>}

function Onboarding({cls,interests,setInterests,finish}:{cls:string;interests:Cat[];setInterests:(v:Cat[])=>void;finish:()=>void}){
 return <div className={`min-h-screen bg-espresso p-5 text-cream ${cls}`}><Head t="Your interests" sub="Pick what you enjoy so QuestVerse can recommend better — you can change this anytime" Icon={Sparkles}/>
 <fieldset className="mt-4 grid grid-cols-2 gap-3"><legend className="sr-only">Travel interests</legend>
 {CATS.map(c=>{const I=CAT_ICON[c],on=interests.includes(c);return <button key={c} type="button" aria-pressed={on} onClick={()=>setInterests(toggle(interests,c) as Cat[])} className={`card flex flex-col items-center gap-2 !p-4 ${on?'ring-2 ring-gold':''}`}><I size={26} aria-hidden/>{c}</button>})}
 </fieldset>
 <div className="mt-6 flex gap-3"><button className="btn2 flex-1" onClick={finish}>Skip for now</button><button className="btn flex-1" onClick={finish}>Save & continue</button></div></div>}

function Accessibility(props:{textStep:number;setTextStep:(n:number)=>void;hc:boolean;setHc:(b:boolean)=>void;rm:boolean;setRm:(b:boolean)=>void;dys:boolean;setDys:(b:boolean)=>void;interests:Cat[];setInterests:(v:Cat[])=>void;close:()=>void}){
 const {textStep,setTextStep,hc,setHc,rm,setRm,dys,setDys,interests,setInterests,close}=props
 return <div role="dialog" aria-modal="true" aria-label="Accessibility and display settings" className="fixed inset-0 z-20 overflow-y-auto bg-espresso p-4 text-cream">
  <div className="mx-auto max-w-md space-y-4"><div className="flex items-center justify-between"><h1 className="flex items-center gap-2 font-serif text-xl text-gold"><Settings size={20} aria-hidden/>Accessibility &amp; Display</h1><button aria-label="Close settings" className="btn2" onClick={close}><X/></button></div>

  <section className="card space-y-3"><h2 className="font-serif text-gold">Text size</h2><div className="flex gap-2" role="group" aria-label="Text size">{['Small','Default','Large'].map((l,i)=><button key={l} aria-pressed={textStep===i} className="chip" onClick={()=>setTextStep(i)}>{l}</button>)}</div></section>

  <section className="card space-y-2"><h2 className="font-serif text-gold">Modes</h2>
   <label className="flex min-h-[44px] items-center justify-between"><span>Dyslexia-friendly font &amp; spacing</span><input type="checkbox" className="h-6 w-6" checked={dys} onChange={e=>setDys(e.target.checked)}/></label>
   <label className="flex min-h-[44px] items-center justify-between"><span>High-contrast mode</span><input type="checkbox" className="h-6 w-6" checked={hc} onChange={e=>setHc(e.target.checked)}/></label>
   <label className="flex min-h-[44px] items-center justify-between"><span>Reduce motion</span><input type="checkbox" className="h-6 w-6" checked={rm} onChange={e=>setRm(e.target.checked)}/></label>
   <p className="text-xs text-muted">These apply everywhere in QuestVerse, including the map, cards and the chatbot, and are saved on this device.</p></section>

  <A11yExtras/>

  <section className="card space-y-2"><h2 className="font-serif text-gold">Your travel interests</h2><p className="text-xs text-muted">Used only to explain and rank "Recommended for you" suggestions.</p>
   <div className="grid grid-cols-2 gap-2">{CATS.map(c=>{const on=interests.includes(c);return <button key={c} aria-pressed={on} className="chip" onClick={()=>setInterests(toggle(interests,c) as Cat[])}>{c}</button>})}</div></section>

  <section className="card space-y-2"><h2 className="font-serif text-gold">Screen-reader notes</h2><p className="text-sm">Every icon-only button has a text label read by screen readers. Map information (distance, directions, ratings) is always repeated as plain text below the map, so nothing depends on the illustrated map alone. Colour is never the only signal — status is also shown as a word or icon.</p></section>

  <button className="btn2 w-full" onClick={()=>{if(confirm('Reset all QuestVerse demo data on this device? This clears saved places, trips, journal entries and preferences.')){Object.keys(localStorage).filter(k=>k.startsWith('tm_')).forEach(k=>localStorage.removeItem(k));location.reload()}}}>Reset demo data</button>
 </div></div>}

function Chatbot({close,goTab}:{close:()=>void;goTab:(t:Tab)=>void}){
 type Msg={who:'bot'|'me';text:string;link?:Tab}
 const [msgs,setMsgs]=useLS<Msg[]>('chat',[{who:'bot',text:"Hi, I'm the QuestVerse Assistant. Ask me about planning, destinations, safety, gear, or events — I answer from a fixed set of QuestVerse FAQs, not a live AI service."}])
 const [cat,setCat]=useState('Travel Planning');const [q,setQ]=useState('')
 const cats=[...new Set(FAQ.map(f=>f.cat))]
 const ask=(text:string)=>{const hit=FAQ.find(f=>f.q.toLowerCase()===text.toLowerCase())
  const best=hit||FAQ.find(f=>f.q.toLowerCase().split(' ').some(w=>w.length>3&&text.toLowerCase().includes(w)))
  const reply:Msg=best?{who:'bot',text:best.a,link:best.link as Tab|undefined}:{who:'bot',text:"I don't have a preset answer for that yet. Try one of the suggested questions below, or check Accessibility & Settings for account help."}
  setMsgs([...msgs,{who:'me',text},reply]);setQ('')}
 return <div role="dialog" aria-modal="true" aria-label="QuestVerse Assistant chat" className="fixed inset-0 z-20 flex flex-col bg-espresso text-cream">
  <div className="flex items-center justify-between border-b border-gold/30 p-3"><h1 className="flex items-center gap-2 font-serif text-lg text-gold"><MessageCircle size={20} aria-hidden/>QuestVerse Assistant</h1>
   <div className="flex gap-2"><button aria-label="Clear conversation" className="btn2" onClick={()=>setMsgs([msgs[0]])}><Trash2 size={16}/></button><button aria-label="Close chat" className="btn2" onClick={close}><X size={16}/></button></div></div>
  <div className="flex gap-2 overflow-x-auto border-b border-gold/20 p-2">{cats.map(c=><button key={c} className="chip" aria-pressed={cat===c} onClick={()=>setCat(c)}>{c}</button>)}</div>
  <div className="flex-1 space-y-3 overflow-y-auto p-3">{msgs.map((m,i)=><div key={i} className={`max-w-[85%] rounded-xl p-3 text-sm ${m.who==='bot'?'bg-panel':'ml-auto bg-gold text-espresso'}`}>{m.text}{m.link&&<button className="mt-2 flex items-center gap-1 text-xs underline" onClick={()=>goTab(m.link!)}>Go there <ChevronRight size={14}/></button>}</div>)}</div>
  <div className="flex flex-wrap gap-2 border-t border-gold/20 p-2">{FAQ.filter(f=>f.cat===cat).map(f=><button key={f.q} className="chip" onClick={()=>ask(f.q)}>{f.q}</button>)}</div>
  <form className="flex gap-2 p-3" onSubmit={e=>{e.preventDefault();if(q.trim())ask(q)}}><input aria-label="Type a message" value={q} onChange={e=>setQ(e.target.value)} placeholder="Type your question…" className="min-h-[44px] flex-1 rounded-xl border border-gold/30 bg-panel px-3"/><button aria-label="Send" className="btn"><Send size={18}/></button></form>
 </div>}

function MapScreen({say,openSet,interests}:{say:(m:string)=>void;openSet:()=>void;interests:Cat[]}){
 const [q,setQ]=useState('');const [f,setF]=useState<Cat|'All'>('All');const [list,setList]=useState(false);const [z,setZ]=useState(1);const [sel,setSel]=useState<string|null>(null);const [done,setDone]=useLS<string[]>('done',[])
 const [saved,setSaved]=useLS<string[]>('saved',[]);const {setDest}=useQ()
 const [pos,setPos]=useState<{lat:number;lng:number}|null>(null);const [locStatus,setLocStatus]=useState<'idle'|'pending'|'granted'|'denied'>('idle')
 const [manual,setManual]=useState('');const [maxKm,setMaxKm]=useState(8);const [mode,setMode]=useState<'walking'|'driving'|'transit'>('walking');const [sort,setSort]=useState<'distance'|'rating'>('distance')

 const requestLoc=()=>{ if(!navigator.geolocation){say('Location is not supported on this device/browser.');return}
  setLocStatus('pending')
  navigator.geolocation.getCurrentPosition(p=>{setPos({lat:p.coords.latitude,lng:p.coords.longitude});setLocStatus('granted')},()=>{setLocStatus('denied');say('Location permission was denied — you can search a place name instead.')},{enableHighAccuracy:false,timeout:8000})}
 const useManual=()=>{const hit=PLACES.find(p=>p.name.toLowerCase().includes(manual.toLowerCase()))
  if(!hit){say('No matching area found — try Koregaon Park, Kothrud, Swargate…');return}
  setPos({lat:hit.lat,lng:hit.lng});setLocStatus('granted');say('Using approximate location for '+hit.name)}

 const res=TRAILS.filter(t=>(f==='All'||t.cat===f)&&(t.name+t.tag).toLowerCase().includes(q.toLowerCase()));const s=TRAILS.find(t=>t.id===sel)
 const speed={walking:4.5,driving:22,transit:16}[mode]
 const nearby=useMemo(()=>{if(!pos)return []
  return TRAILS.map(t=>({...t,d:distanceKm(pos,t)})).filter(t=>t.d<=maxKm).sort((a,b)=>sort==='distance'?a.d-b.d:b.rating-a.rating)},[pos,maxKm,sort])
 const recommended=useMemo(()=>TRAILS.filter(t=>interests.length===0?false:interests.includes(t.cat)).slice(0,3),[interests])

 return <div>
  <div className="flex items-center gap-2 p-3"><div className="relative flex-1"><Search className="absolute left-3 top-3 text-gold" size={18} aria-hidden/><input aria-label="Search quests, places, trails" value={q} onChange={e=>setQ(e.target.value)} placeholder="Search quests, places, trails…" className="min-h-[44px] w-full rounded-xl border border-gold/30 bg-panel pl-10 pr-2"/></div><button aria-label="Accessibility and display settings" className="btn2" onClick={openSet}><Settings size={18}/></button></div>

  <div className="mx-3 mb-3 card">
   <h2 className="flex items-center gap-2 font-serif text-gold"><Navigation size={18} aria-hidden/>Explore Near Me</h2>
   {locStatus!=='granted'?<><p className="text-sm">QuestVerse can use your device location to find nearby trails and estimate real distances. Nothing is tracked continuously — this is a single one-time check.</p>
    <button className="btn mt-2 w-full" onClick={requestLoc}>{locStatus==='pending'?'Requesting…':'Allow location access'}</button>
    <p className="mt-2 text-xs text-muted">Prefer not to share it? Search an area instead:</p>
    <div className="mt-1 flex gap-2"><input aria-label="Search your area" value={manual} onChange={e=>setManual(e.target.value)} placeholder="e.g. Koregaon Park" className="min-h-[44px] flex-1 rounded-xl border border-gold/30 bg-espresso px-3"/><button className="btn2" onClick={useManual}>Use</button></div>
    {locStatus==='denied'&&<p role="alert" className="mt-2 flex items-center gap-1 text-sm text-amber-300"><AlertCircle size={16}/>Location denied — search above works just as well.</p>}
   </>:<>
    <div className="mt-2 flex flex-wrap gap-2 text-sm"><span className="chip" aria-pressed>Location set ✓</span>
     <select aria-label="Maximum distance" value={maxKm} onChange={e=>setMaxKm(Number(e.target.value))} className="chip bg-espresso">{[2,5,8,12,15].map(k=><option key={k} value={k}>Within {k} km</option>)}</select>
     <select aria-label="Travel mode" value={mode} onChange={e=>setMode(e.target.value as any)} className="chip bg-espresso"><option value="walking">Walking</option><option value="driving">Driving</option><option value="transit">Public transport</option></select>
     <select aria-label="Sort by" value={sort} onChange={e=>setSort(e.target.value as any)} className="chip bg-espresso"><option value="distance">Sort: Distance</option><option value="rating">Sort: Rating</option></select></div>
    {nearby.length===0?<p className="mt-3 text-sm">No sample destinations within {maxKm} km. Try a larger distance.</p>:
    <ul className="mt-3 space-y-2">{nearby.map(t=>{const I=CAT_ICON[t.cat];return <li key={t.id} className="rounded-xl border border-gold/20 p-2">
      <Photo src={t.img} alt={t.alt} verified={t.verifiedPhoto}/>
      <div className="flex items-center gap-2"><I size={16} aria-hidden/><b className="text-gold">{t.name}</b></div>
      <p className="text-xs text-muted">{t.d.toFixed(1)} km · ~{Math.round(t.d/speed*60)} min {mode} (estimated) · <Star size={12} className="inline"/> {t.rating} (sample rating)</p>
      <div className="mt-1 flex gap-2"><button className="btn !min-h-[36px] !px-2 text-xs" onClick={()=>setDest(t.id)}>Quests</button><button className="btn2 !min-h-[36px] !px-2 text-xs" onClick={()=>{setSel(t.id)}}>View on map</button>
       <button className="btn2 !min-h-[36px] !px-2 text-xs flex items-center gap-1" onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${t.lat},${t.lng}`,'_blank')}><ExternalLink size={12}/>Get directions</button>
       <button className="btn2 !min-h-[36px] !px-2 text-xs" onClick={()=>{setSaved(toggle(saved,t.id));say(saved.includes(t.id)?'Removed from saved':'Saved')}}><Bookmark size={12} className={saved.includes(t.id)?'fill-gold':''}/></button></div></li>})}</ul>}
   </>}
  </div>

  {interests.length>0&&<div className="mx-3 mb-3"><h2 className="mb-1 font-serif text-sm text-gold">Recommended for you</h2>
   <div className="flex gap-2 overflow-x-auto pb-1">{recommended.map(t=><div key={t.id} className="card !w-44 shrink-0 !p-2"><Photo src={t.img} alt={t.alt} verified={t.verifiedPhoto}/><b className="text-sm text-gold">{t.name}</b><p className="text-[11px] text-muted">Because you enjoy {t.cat}</p></div>)}</div></div>}

  <div className="flex gap-2 overflow-x-auto px-3 pb-2">{['All',...CATS].map(c=><button key={c} className="chip" aria-pressed={f===c} onClick={()=>setF(c as Cat|'All')}>{c}</button>)}</div>
  <div className="flex gap-2 px-3 pb-2"><button className="btn2 flex-1" onClick={()=>setList(!list)}>{list?'Show illustrated map':'Show list (screen-reader friendly)'}</button>
  {!list&&<><button aria-label="Zoom in" className="btn2" onClick={()=>setZ(Math.min(2,z+.25))}><Plus size={18}/></button><button aria-label="Zoom out" className="btn2" onClick={()=>setZ(Math.max(.75,z-.25))}><Minus size={18}/></button><button aria-label="Reset view" className="btn2" onClick={()=>{setZ(1);setSel(null)}}><Home size={18}/></button></>}</div>

  {res.length===0?<div className="card m-3 text-center">No trails match "{q}". Try another word or clear filters.<br/><button className="btn mt-3" onClick={()=>{setQ('');setF('All')}}>Clear filters</button></div>
  :list?<ul className="space-y-2 px-3">{res.map(t=>{const I=CAT_ICON[t.cat];return <li key={t.id}><button onClick={()=>{setSel(t.id);setList(false)}} className="card flex w-full items-center gap-3 text-left"><I size={26} aria-hidden className="text-gold"/><span><b className="font-serif text-gold">{t.name.toUpperCase()}</b><br/><i className="text-muted text-sm">{t.tag}</i><br/><span className="text-xs text-muted">{t.km} km · <b className="text-gold">+{t.xp} XP</b> · {t.rating}★ (sample)</span></span></button></li>})}</ul>
  :<div className="mx-3 overflow-hidden rounded-xl border border-gold/40 bg-gradient-to-br from-amber-200 to-amber-500"><svg viewBox="0 0 360 340" role="img" aria-label="Illustrated sample map of Pune with trail markers" style={{transform:`scale(${z})`,transition:'transform .2s'}} className="w-full"><path d="M0 70l50-40 50 30 60-40 70 40 60-30 70 40v40H0z" fill="#3F7D4E" opacity=".3"/><path d="M0 300l60-30 60 20 70-25 60 20 110-30v85H0z" fill="#7A4B2A" opacity=".3"/><circle cx="320" cy="40" r="18" fill="#F59E4B" opacity=".8"/><path d="M0 170C90 150 180 200 360 160" stroke="#5b8fb0" strokeWidth="10" fill="none" opacity=".6"/>
   {res.map((t,i)=>i>0&&<line key={t.id} x1={res[i-1].x} y1={res[i-1].y} x2={t.x} y2={t.y} stroke="#3d2a17" strokeDasharray="4 4" opacity=".5"/>)}
   {res.map(t=><g key={t.id} tabIndex={0} role="button" aria-label={t.name} onClick={()=>setSel(t.id)} onKeyDown={e=>e.key==='Enter'&&setSel(t.id)} className="cursor-pointer"><circle cx={t.x} cy={t.y} r={sel===t.id?16:12} fill={done.includes(t.id)?'#3f7d4e':'#7a1f1f'} stroke="#1a110d" strokeWidth="2"/>{(l=>(<text x={l.x} y={l.y} textAnchor={l.a} fontSize="9" fontWeight="700" fill="#2A1830" stroke="#FBF3E4" strokeWidth="3" paintOrder="stroke" aria-hidden>{t.place}</text>))(pinLabel(t,sel===t.id?16:12))}</g>)}
   {pos&&<circle cx={180} cy={170} r="9" fill="#2a6fdb" stroke="#fff" strokeWidth="2"><title>Your approximate location</title></circle>}</svg></div>}
  {!list&&!sel&&res.length>0&&<p className="p-3 text-center text-sm italic text-muted">Tap a marker to explore · Sample illustrated map, not live imagery</p>}
  {s&&<div className="card m-3"><Photo src={s.img} alt={s.alt} verified={s.verifiedPhoto}/><h2 className="font-serif text-lg text-gold">{s.name}</h2><p className="text-sm">{s.desc} {s.km} km · {s.cat} · +{s.xp} XP · {s.rating}★ (sample rating)</p>
   <div className="mt-2 flex flex-wrap gap-2"><button className="btn" onClick={()=>setDest(s.id)}>Open destination &amp; quests</button><button className="btn2" onClick={()=>{setDone(toggle(done,s.id));say(done.includes(s.id)?'Quest un-completed':'Quest completed! +'+s.xp+' XP')}}>{done.includes(s.id)?'✓ Completed — tap to undo':'Complete quest'}</button>
   <button className="btn2 flex items-center gap-1" onClick={()=>{setSaved(toggle(saved,s.id));say(saved.includes(s.id)?'Removed from saved':'Saved to your list')}}><Bookmark size={16} className={saved.includes(s.id)?'fill-gold':''}/>Save</button>
   <button className="btn2 flex items-center gap-1" onClick={()=>window.open(`https://www.google.com/maps/dir/?api=1&destination=${s.lat},${s.lng}`,'_blank')}><ExternalLink size={16}/>Get directions</button></div></div>}
 </div>}

function Exp({say}:{say:(m:string)=>void}){const [j,setJ]=useLS<string[]>('guilds',['g1']);const [v,setV]=useState<string|null>(null)
 return <div><Head t="Expeditions" sub="Journey with fellow explorers" Icon={Swords}/><div className="space-y-3 p-3">{GUILDS.map(g=>{const on=j.includes(g.id);const I=GUILD_ICON[g.icon];return <div key={g.id} className="card"><div className="flex gap-3"><I size={30} aria-hidden className="text-gold"/><div><h2 className="font-serif text-gold">{g.name}{on&&<span className="ml-2 rounded border border-green-400 px-1 text-xs text-green-300">JOINED</span>}</h2><p className="italic text-sm text-muted">{g.tag}</p><p className="text-xs">{g.members+(on&&g.id!=='g1'?1:0)}/{g.cap} members · {g.pool.toLocaleString()} XP pool · {g.level}</p></div></div>
  {v===g.id&&<p className="mt-2 text-sm">Current: {g.current}. (Sample group)</p>}
  <div className="mt-3 flex gap-2"><button className="btn flex-1" onClick={()=>{if(on){if(confirm('Leave '+g.name+'?')){setJ(toggle(j,g.id));say('Left guild')}}else{setJ(toggle(j,g.id));say('Joined '+g.name)}}}>{on?'✓ In Guild — tap to leave':'Join Guild'}</button><button className="btn2" aria-expanded={v===g.id} onClick={()=>setV(v===g.id?null:g.id)}>View</button></div></div>})}</div></div>}

function Disc(){const [r,setR]=useLS<string[]>('read',['n4']);return <div><div className="flex items-center justify-between pr-3"><Head t="Discoveries" sub="What the world has whispered to you" Icon={Bell}/><button className="btn2" onClick={()=>setR(NOTES.map(n=>n.id))}>Mark all read</button></div>
 <ul className="space-y-2 p-3">{NOTES.map(n=>{const u=!r.includes(n.id);const I=NOTE_ICON[n.icon];return <li key={n.id}><button className={`card flex w-full gap-3 text-left ${u?'border-gold':''}`} onClick={()=>setR([...new Set([...r,n.id])])}><I size={22} aria-hidden className="text-gold"/><span className="flex-1"><b className="text-gold">{n.title}</b>{u&&<span className="ml-2 text-xs">● unread</span>}<br/><span className="text-sm">{n.body}</span><br/><span className="text-xs text-muted">{n.time}</span></span></button></li>})}</ul></div>}

function Events({say}:{say:(m:string)=>void}){const [f,setF]=useState('All');const [reg,setReg]=useLS<string[]>('events',[])
 return <div><Head t="Events" sub="Discover what Pune has to offer (sample events)" Icon={Landmark}/><div className="flex gap-2 overflow-x-auto p-3">{['All','Heritage','Food','Exhibition','Nature'].map(c=><button key={c} className="chip" aria-pressed={f===c} onClick={()=>setF(c)}>{c}</button>)}</div>
 <div className="space-y-3 px-3">{EVENTS.filter(e=>f==='All'||e.cat===f).map(e=>{const on=reg.includes(e.id),full=e.reg>=e.cap&&!on;const I=EVENT_ICON[e.icon];return <div key={e.id} className="card"><Photo src={e.img} alt={e.alt}/><h2 className="flex items-center gap-2 font-serif text-gold"><I size={18} aria-hidden/>{e.name} <span className="rounded border border-gold/50 px-1 text-[10px]">DEMO</span></h2><p className="text-sm">{e.date} · {e.time}<br/>{e.place}</p><p className="text-xs text-muted">+{e.xp} XP · {e.reg+(on?1:0)}/{e.cap} registered · {e.cost}</p>
  <button disabled={full} className="btn mt-2 w-full" onClick={()=>{setReg(toggle(reg,e.id));say(on?'Registration cancelled':'Registered! (demo)')}}>{full?'Full':on?'Registered ✓ — tap to cancel':'Register & Get XP Bonus'}</button></div>})}</div></div>}

function Journal({say,openSet}:{say:(m:string)=>void;openSet:()=>void}){const [es,setEs]=useLS<Entry[]>('entries',[]);const [f,setF]=useState({title:'',place:'',date:'',tags:'',notes:''});const [err,setErr]=useState('');const [done]=useLS<string[]>('done',[]);const [saved]=useLS<string[]>('saved',[])
 const add=()=>{if(!f.title.trim()||!f.place.trim()){setErr('Please add a title and a location before saving.');return}setErr('');setEs([{id:String(Date.now()),...f},...es]);setF({title:'',place:'',date:'',tags:'',notes:''});say('Entry saved')}
 const st=[['127 km','Distance'],[String(saved.length),'Saved places'],['312','Photos'],[String(done.length),'Quests done']]
 return <div><Head t="Explorer's Journal" sub="Your story in this world" Icon={BookOpen}/><div className="space-y-3 p-3">
  <QuestProfile/>
  <div className="card"><h2 className="font-serif text-xl text-gold">Arjun Mehta · Lv.12</h2><div className="h-3 rounded bg-black/40" role="progressbar" aria-valuenow={4820} aria-valuemax={5500} aria-label="Experience"><div className="h-3 rounded bg-gold" style={{width:'88%'}}/></div><p className="text-xs">4,820 / 5,500 XP · 7-day streak (sample profile)</p></div>
  <div className="grid grid-cols-4 gap-2 text-center">{st.map(([a,b])=><div key={b} className="card !p-2"><b className="font-serif text-gold">{a}</b><br/><span className="text-[10px]">{b}</span></div>)}</div>
  <div className="card space-y-2"><h2 className="font-serif text-gold">New entry</h2>{(['title','place','date','tags'] as const).map(k=><input key={k} aria-label={k} type={k==='date'?'date':'text'} placeholder={k[0].toUpperCase()+k.slice(1)} value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})} className="min-h-[44px] w-full rounded-lg border border-gold/30 bg-espresso px-3"/>)}<textarea aria-label="notes" placeholder="Notes" value={f.notes} onChange={e=>setF({...f,notes:e.target.value})} className="w-full rounded-lg border border-gold/30 bg-espresso p-3"/>{err&&<p role="alert" className="text-red-300">{err}</p>}<button className="btn w-full" onClick={add}>Save entry</button></div>
  {es.map(e=><div key={e.id} className="card"><b className="text-gold">{e.title}</b> — {e.place} <span className="text-xs text-muted">{e.date} {e.tags}</span><p className="text-sm">{e.notes}</p><button className="btn2 mt-1" onClick={()=>{if(confirm('Delete this entry?')){setEs(es.filter(x=>x.id!==e.id));say('Entry deleted')}}}>Delete</button></div>)}
  <div className="card"><h2 className="font-serif text-gold">Leaderboard (fictional users)</h2>{LEADERS.map(([n,x],i)=><p key={n} className="flex justify-between text-sm"><span>{i+1}. {n}</span><span>{x} XP</span></p>)}</div>
  <button className="btn2 flex w-full items-center justify-center gap-2" onClick={openSet}><Settings size={16}/>Accessibility &amp; settings</button></div></div>}
