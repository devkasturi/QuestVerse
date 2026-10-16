// PROTOTYPE DATA: all places, events, ratings and people below are demo content for this student project, not live listings.
export type Cat='Historical'|'Culture'|'Nature'|'Food'|'Photography'
export interface Trail{id:string;name:string;tag:string;km:number;xp:number;cat:Cat;x:number;y:number;lat:number;lng:number;img:string;alt:string;rating:number;desc:string;verifiedPhoto:boolean;place:string;lp:'t'|'b'|'l'|'r'}
export interface Guild{id:string;name:string;tag:string;members:number;cap:number;pool:number;level:string;current:string;icon:'book'|'trees'|'camera'|'food'}
export interface Ev{id:string;name:string;cat:string;date:string;time:string;place:string;cost:string;cap:number;reg:number;xp:number;icon:'temple'|'food'|'museum'|'bird';img:string;alt:string}
export interface Note{id:string;title:string;body:string;time:string;icon:'sparkle'|'user'|'temple'|'star'}
export interface Entry{id:string;title:string;place:string;date:string;tags:string;notes:string}
export const CATS:Cat[]=['Historical','Culture','Nature','Food','Photography']
// Real Wikimedia Commons photographs, verified reachable. Where a photo is not of the exact spot, verifiedPhoto is false and the UI must say so.
// Special:FilePath is Wikimedia's documented hotlinking endpoint — it redirects to the current
// upload.wikimedia.org file for a given title, so it stays correct even if the file is renamed.
const SHANIWAR='https://commons.wikimedia.org/wiki/Special:FilePath/Pune_ShaniwarWada_DelhiGate.jpg?width=800'
const SINHAGAD='https://commons.wikimedia.org/wiki/Special:FilePath/Sinhgad_entrance.jpg?width=800'
const VADAPAV='https://commons.wikimedia.org/wiki/Special:FilePath/Crunchy_Crispy_Vada_pav.jpg?width=800'
export const TRAILS:Trail[]=[
{id:'t1',name:'The Peshwa Trail',tag:'Walk in the footsteps of empire',km:2.3,xp:450,cat:'Historical',x:200,y:150,lat:18.5195,lng:73.8553,img:SHANIWAR,alt:'The Delhi Gate of Shaniwar Wada, Pune',rating:4.6,desc:'Shaniwar Wada and the lanes of old Pune.',verifiedPhoto:true,place:'Shaniwar Wada',lp:'t'},
{id:'t2',name:'The Tekdi Trail',tag:'Into the green heart of the city',km:4.1,xp:600,cat:'Nature',x:120,y:90,lat:18.5089,lng:73.8070,img:SINHAGAD,alt:'Representative hill-fort entrance in the Sahyadri range (not this exact hill)',rating:4.3,desc:'Hill-top walk with city views.',verifiedPhoto:false,place:'Vetal Tekdi',lp:'l'},
{id:'t3',name:'The Old City Scroll',tag:"Decode the bazaar's ancient secrets",km:1.8,xp:380,cat:'Culture',x:230,y:190,lat:18.5158,lng:73.8567,img:SHANIWAR,alt:'Representative Peshwa-era gateway in old Pune (not this exact bazaar)',rating:4.4,desc:'Peth-area markets and wadas.',verifiedPhoto:false,place:'Old City Peths',lp:'r'},
{id:'t4',name:'The Riverside Discovery',tag:'Where the waters carry old tales',km:1.2,xp:300,cat:'Nature',x:170,y:210,lat:18.5236,lng:73.8636,img:SINHAGAD,alt:'Representative Sahyadri landscape photograph (not this riverside)',rating:4.1,desc:'Ghats along the Mula-Mutha.',verifiedPhoto:false,place:'Mula-Mutha Ghats',lp:'b'},
{id:'t5',name:'The Fortress Trail',tag:'Climb where legends were forged',km:12.4,xp:2000,cat:'Historical',x:60,y:290,lat:18.3664,lng:73.7556,img:SINHAGAD,alt:'The entrance to Sinhagad Fort near Pune',rating:4.7,desc:'Round-trip fort climb.',verifiedPhoto:true,place:'Sinhagad Fort',lp:'b'},
{id:'t6',name:'The FC Road Chronicles',tag:'A caffeinated cultural crawl',km:2,xp:350,cat:'Food',x:110,y:170,lat:18.5184,lng:73.8410,img:VADAPAV,alt:'A plate of vada pav, a Maharashtrian street-food staple',rating:4.5,desc:'Cafés and street food.',verifiedPhoto:true,place:'FC Road',lp:'l'},
{id:'t7',name:'Light & Shadow in Koregaon',tag:'Chase the golden hour',km:2.2,xp:420,cat:'Photography',x:290,y:230,lat:18.5362,lng:73.8935,img:SHANIWAR,alt:'Representative heritage-architecture photograph (not this location)',rating:4.2,desc:'Green lanes at sunrise.',verifiedPhoto:false,place:'Koregaon Park',lp:'b'},
{id:'t8',name:'The Cave Temple Quest',tag:'A shrine carved from a single rock',km:1.5,xp:320,cat:'Culture',x:165,y:100,lat:18.5268,lng:73.8495,img:SHANIWAR,alt:'Representative Pune heritage photograph (not Pataleshwar Caves)',rating:4.5,desc:'The 8th-century rock-cut Pataleshwar cave temple off JM Road.',verifiedPhoto:false,place:'Pataleshwar Caves',lp:'t'},
{id:'t9',name:'The Freedom Palace Walk',tag:'Where history held its breath',km:6.5,xp:480,cat:'Historical',x:300,y:110,lat:18.5524,lng:73.9015,img:SHANIWAR,alt:'Representative heritage-architecture photograph (not Aga Khan Palace)',rating:4.6,desc:'Aga Khan Palace, its gardens and freedom-movement memorial.',verifiedPhoto:false,place:'Aga Khan Palace',lp:'t'},
{id:'t10',name:'The Hilltop Temple Climb',tag:'108 steps to a sunset view',km:3,xp:400,cat:'Historical',x:200,y:265,lat:18.4975,lng:73.8475,img:SINHAGAD,alt:'Representative Sahyadri hillside photograph (not Parvati Hill)',rating:4.4,desc:'Stone steps up to the Peshwa-era temples on Parvati Hill.',verifiedPhoto:false,place:'Parvati Hill',lp:'b'},
{id:'t11',name:'The Lakeside Lens Walk',tag:'Birds, mist and still water',km:8,xp:380,cat:'Photography',x:55,y:50,lat:18.5340,lng:73.7860,img:SINHAGAD,alt:'Representative Sahyadri landscape photograph (not Pashan Lake)',rating:4.2,desc:'Early-morning birdwatching and reflections at Pashan Lake.',verifiedPhoto:false,place:'Pashan Lake',lp:'b'},
{id:'t12',name:'The Camp Bakery Crawl',tag:'Irani cafés and buttery bun maska',km:3.2,xp:340,cat:'Food',x:275,y:165,lat:18.5190,lng:73.8780,img:VADAPAV,alt:'Representative Maharashtrian street-food photograph (not a Camp bakery)',rating:4.6,desc:'Old bakeries and Irani cafés around MG Road, Camp.',verifiedPhoto:false,place:'Camp (MG Road)',lp:'t'}]
// Map label for a trail's pin: place name placed on the side given by lp so neighbouring labels don't overlap.
export function pinLabel(t:Trail,r=12):{x:number;y:number;a:'middle'|'end'|'start'}{const o=r+6;return t.lp==='t'?{x:t.x,y:t.y-o,a:'middle'}:t.lp==='b'?{x:t.x,y:t.y+o+6,a:'middle'}:t.lp==='l'?{x:t.x-o,y:t.y+3,a:'end'}:{x:t.x+o,y:t.y+3,a:'start'}}
export const GUILDS:Guild[]=[
{id:'g1',name:'Pune Historians Guild',tag:"Uncovering Pune's heritage sites.",members:8,cap:12,pool:24800,level:'Veteran',current:'The Peshwa Trail',icon:'book'},
{id:'g2',name:'Tekdi Trekkers',tag:'Every weekend, a new trail.',members:15,cap:20,pool:38200,level:'Adventurer',current:'Sinhagad Expedition',icon:'trees'},
{id:'g3',name:'Pune Lens Club',tag:'Capturing Pune one frame at a time.',members:22,cap:30,pool:31500,level:'Adventurer',current:'Golden Hour Photography',icon:'camera'},
{id:'g4',name:'Puneri Food Explorers',tag:'Tasting every hidden gem.',members:31,cap:50,pool:15600,level:'Novice',current:'FC Road Chronicles',icon:'food'}]
export const EVENTS:Ev[]=[
{id:'e1',name:'Peshwa Heritage Walk',cat:'Heritage',date:'2026-10-10',time:'7:00–9:30 AM',place:'Shaniwar Wada, Old Pune',cost:'Free',cap:40,reg:24,xp:200,icon:'temple',img:SHANIWAR,alt:'The Delhi Gate of Shaniwar Wada, Pune'},
{id:'e2',name:'FC Road Food Festival',cat:'Food',date:'2026-10-15',time:'4:00–10:00 PM',place:'FC Road, Pune',cost:'Free entry',cap:500,reg:180,xp:150,icon:'food',img:VADAPAV,alt:'A plate of vada pav, a Maharashtrian street-food staple'},
{id:'e3',name:'Masterpieces of Maratha Craft',cat:'Exhibition',date:'2026-10-20',time:'10 AM–5 PM',place:'Museum (sample)',cost:'₹100',cap:120,reg:60,xp:100,icon:'museum',img:SHANIWAR,alt:'Representative Maratha-era architecture photograph (not this museum)'},
{id:'e4',name:'Vetal Tekdi Bird Survey',cat:'Nature',date:'2026-10-17',time:'6:00–8:00 AM',place:'Vetal Tekdi',cost:'Free',cap:25,reg:25,xp:120,icon:'bird',img:SINHAGAD,alt:'Representative Sahyadri hillside photograph (not this reserve)'}]
export const NOTES:Note[]=[
{id:'n1',title:'New Quest Discovered!',body:'"The Hidden Shrine of Pataleshwar" has been revealed near your location.',time:'2 min ago',icon:'sparkle'},
{id:'n2',title:'Aisha K. joined your trail',body:'Aisha Kulkarni has started The Peshwa Trail — say hello!',time:'18 min ago',icon:'user'},
{id:'n3',title:'Event Tomorrow: Heritage Walk',body:'Begins 7:00 AM at Shaniwar Wada.',time:'1 hr ago',icon:'temple'},
{id:'n4',title:'Weekly XP Report',body:'You earned 840 XP this week — top 12% of Pune explorers.',time:'3 hr ago',icon:'star'}]
export const LEADERS=[['Aisha K.',5210],['Arjun M. (you)',4820],['Rohan D.',4400],['Meera S.',3980]] as [string,number][]
// Approximate public coordinates for manual location search fallback (used only if geolocation is denied/unavailable).
export const PLACES:{name:string;lat:number;lng:number}[]=[
{name:'Pune city centre',lat:18.5204,lng:73.8567},{name:'Koregaon Park',lat:18.5362,lng:73.8935},
{name:'Kothrud',lat:18.5074,lng:73.8077},{name:'Hinjawadi',lat:18.5912,lng:73.7389},
{name:'Viman Nagar',lat:18.5679,lng:73.9143},{name:'Swargate',lat:18.5008,lng:73.8586}]
export function distanceKm(a:{lat:number;lng:number},b:{lat:number;lng:number}){
 const R=6371,dLat=(b.lat-a.lat)*Math.PI/180,dLng=(b.lng-a.lng)*Math.PI/180
 const s=Math.sin(dLat/2)**2+Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLng/2)**2
 return R*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s))
}
export const FAQ:{cat:string;q:string;a:string;link?:string}[]=[
{cat:'Travel Planning',q:'How do I plan a weekend trip?',a:'Open the Map tab, use "Explore Near Me" or search a place, filter by interest and distance, then save destinations to build a rough plan. A full day-wise trip planner is on our roadmap.'},
{cat:'Travel Planning',q:'How much might this trip cost?',a:'Event and item prices you see (like ₹100 for the museum) are demo figures for this prototype, not live pricing. Check the official site for real costs before you go.'},
{cat:'Destinations',q:'What places can I visit near me?',a:'Tap "Explore Near Me" on the Map tab to see destinations sorted by distance from you, or search by name if you prefer not to share your location.',link:'map'},
{cat:'Destinations',q:'How can I reach this destination?',a:'Open a destination card and use "Get Directions" — it opens the location in your maps app for real turn-by-turn directions.'},
{cat:'Safety',q:'Is it safe to trek alone?',a:'For longer fort treks like Sinhagad, going with a guild or group is safer than alone, especially in monsoon when trails get slippery. Carry water, a charged phone and tell someone your plan.'},
{cat:'Gear',q:'What should I pack for a trek?',a:'Sturdy trekking shoes with grip, a light raincoat in monsoon, a refillable water bottle, sunscreen and a power bank are the basics for most Pune-area treks.'},
{cat:'Events',q:'How do I register for an event?',a:'Open the Events tab, pick an event, and tap "Register & Get XP Bonus". You can cancel anytime from the same card before it fills up.',link:'events'},
{cat:'Account Help',q:'How do I reset my saved data?',a:'Open Accessibility & Settings (the gear icon) and tap "Reset demo data" — this clears everything stored on this device and starts fresh.'}]
