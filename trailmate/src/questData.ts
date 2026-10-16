// DEMO CONTENT: costs, accessibility notes and facts are illustrative sample data — verify locally before travelling.
export type TaskKind='photo'|'memory'
export interface Task{id:string;kind:TaskKind;title:string;hint:string;xp:number;emoji:string}
export const TASKS:Task[]=[
{id:'photo',kind:'photo',emoji:'📸',title:'Snap the scene',hint:'Take or upload a photo from the place you visited.',xp:100},
{id:'landmark',kind:'photo',emoji:'🗿',title:'Find a landmark',hint:'Spot a gate, plaque, statue or viewpoint and photograph it.',xp:120},
{id:'food',kind:'photo',emoji:'🍛',title:'Taste the local',hint:'Photograph a local dish or snack you tried nearby.',xp:80},
{id:'memory',kind:'memory',emoji:'✍️',title:'Write a travel memory',hint:'A few lines about what you saw, heard or felt.',xp:60}]
export const INFO:Record<string,{cost:number;stepFree:boolean;access:string[]}>={
t1:{cost:200,stepFree:false,access:['Uneven stone paths in old lanes','Benches inside the fort grounds','Restrooms near the main gate']},
t2:{cost:150,stepFree:false,access:['Steep, unpaved hill sections','Carry water — few shops on trail','Best in daylight']},
t3:{cost:100,stepFree:false,access:['Crowded narrow lanes','Limited seating','Mostly flat walking']},
t4:{cost:0,stepFree:true,access:['Mostly level riverside paths','Some ghat steps (optional)','Shaded benches']},
t5:{cost:500,stepFree:false,access:['Long, steep climb (12 km round trip)','Vehicle access to upper section','Not suited to limited mobility']},
t6:{cost:400,stepFree:true,access:['Level pavements','Cafés with step-free entry (varies)','Public transport nearby']},
t7:{cost:300,stepFree:true,access:['Flat, tree-lined lanes','Plenty of seating in cafés','Easy auto/cab drop-off']},
t8:{cost:0,stepFree:false,access:['A few steps down into the cave','Shaded courtyard','Footwear removed inside the shrine']},
t9:{cost:50,stepFree:true,access:['Level garden paths','Benches throughout the grounds','Restrooms near the entrance']},
t10:{cost:0,stepFree:false,access:['Long flight of stone steps','Few shaded rest points','Best early morning or at sunset']},
t11:{cost:0,stepFree:true,access:['Flat lakeside path','Little shade — go early','Limited food stalls nearby']},
t12:{cost:350,stepFree:true,access:['Level, busy pavements','Small cafés can be crowded','Easy auto/cab drop-off']}}
export const LEVELS:[number,string][]=[[0,'Wanderer'],[200,'Trailblazer'],[500,'Pathfinder'],[1000,'Voyager'],[2000,'Legend']]
export const FACTS=[
{id:'f1',tag:'History',front:'Who built Shaniwar Wada?',back:'Peshwa Bajirao I began it in 1732. A great fire in 1828 destroyed most of the palace interior — today the stone walls and gates remain.'},
{id:'f2',tag:'History',front:"What was Sinhagad's old name?",back:'Kondhana. The fort was the setting of the 1670 Battle of Sinhagad, where Tanaji Malusare fell.'},
{id:'f3',tag:'Nature',front:'Which rivers meet in Pune?',back:'The Mula and Mutha. Together they form the Mula-Mutha river, a tributary of the Bhima.'},
{id:'f4',tag:'Culture',front:'What is vada pav?',back:'A Maharashtrian street snack: a spiced potato fritter in a soft bread roll, served with chutneys and fried chilli.'},
{id:'f5',tag:'Culture',front:'What is Pataleshwar?',back:'An 8th-century rock-cut cave temple in Pune, carved from a single basalt rock and dedicated to Shiva.'},
{id:'f6',tag:'Nature',front:'What is the Sahyadri?',back:'Another name for the northern Western Ghats — a UNESCO-recognised biodiversity hotspot that Pune’s hill forts sit in.'}]
export const QUIZ=[
{q:'Who began building Shaniwar Wada in 1732?',o:['Peshwa Bajirao I','Akbar','Tipu Sultan','Aurangzeb'],a:0,t:'History',e:'Peshwa Bajirao I, the Maratha Peshwa, laid the foundation in 1732.'},
{q:'What was the older name of Sinhagad fort?',o:['Raigad','Kondhana','Purandar','Torna'],a:1,t:'History',e:'Sinhagad was known as Kondhana before it was renamed.'},
{q:'In which year did a fire destroy most of Shaniwar Wada’s interior?',o:['1732','1947','1828','1600'],a:2,t:'History',e:'The 1828 fire left only the stone walls, gates and foundations.'},
{q:'Pataleshwar Caves are a rock-cut temple dedicated to…',o:['Vishnu','Shiva','Ganesha','Buddha'],a:1,t:'Culture',e:'Pataleshwar is an 8th-century Shiva temple cut from a single rock.'},
{q:'The key filling inside a vada pav is…',o:['Paneer','Chicken','Spiced potato','Egg'],a:2,t:'Culture',e:'A spiced potato fritter (vada) sits inside the pav bread roll.'},
{q:'Sinhagad sits in which mountain range?',o:['Aravalli','Himalaya','Eastern Ghats','Sahyadri'],a:3,t:'Nature',e:'The Sahyadri is the northern stretch of the Western Ghats.'}]
export const GEAR:Record<string,[string,string][]>={
base:[['Refillable water bottle','Stay hydrated — refill points can be rare'],['Power bank','Maps, tickets and photos drain batteries'],['Sunscreen & cap','Pune sun is strong outside monsoon'],['Light rain jacket','Showers are common June–Sept'],['Saved tickets / ID copy','Works offline']],
Nature:[['Grip-sole trekking shoes','Trails get slippery when wet'],['Small first-aid kit','Blisters and scrapes happen'],['Trail snacks','Little food available on hills']],
Historical:[['Comfortable walking shoes','Old stone lanes are uneven']],
Food:[['Hand sanitiser','Handy before street food'],['Small cash','Many stalls are cash-first']],
Photography:[['Lens cloth & phone grip','Dust and sweat on lenses']],
Culture:[['Modest, breathable clothing','Respectful for temples and shrines']]}
