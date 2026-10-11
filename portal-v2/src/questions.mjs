// Autonord's own adapted framework. Do not present as licensed Ennova EEI or validated DPQ.
const rows = [
['e1','engagement','Jeg er stolt af at arbejde hos Autonord.','I am proud to work at Autonord.','Autonordimi sulisuunera tulluusimaarutigaara.'],
['e2','engagement','Jeg vil anbefale Autonord som et godt sted at arbejde.','I would recommend Autonord as a good place to work.','Autonordi suliffittut pitsaasutut innersuussutigerusuppara.'],
['e3','engagement','Jeg føler en stærk tilknytning til Autonord.','I feel a strong connection to Autonord.','Autonordimut attuumassuteqarnerma nukittunera misigivara.'],
['e4','engagement','Autonord inspirerer mig til at yde mit bedste.','Autonord inspires me to do my best.','Autonordip sulininni sapinngisannik pitsaanerpaamik sulinissannut isumassarsisittarpaanga.'],
['e5','engagement','Jeg er motiveret til at bidrage til Autonords mål.','I am motivated to contribute to Autonord’s goals.','Autonordip anguniakkaminik angusinissaanut ikiuunnissannut kajumissisittarpaanga.'],
['m1','motivation','Mine opgaver giver mening og gør en forskel.','My work is meaningful and makes a difference.','Suliakka iluaqutaasumik tunniussaqarnissannut periarfissiipput.'],
['m2','motivation','Jeg får anerkendelse, når jeg gør et godt stykke arbejde.','Good work is recognised here.','Pitsaasumik suligaangama nersualaarneqartarpunga.'],
['m3','motivation','Jeg har ansvar og indflydelse på, hvordan jeg løser mine opgaver.','I have responsibility and influence over how I work.','Suliassannik qanoq suliarinninnissannut naleqquttumik akisussaaffeqarlungalu sunniuteqarsinnaavunga.'],
['m4','motivation','Jeg har mulighed for at lære og udvikle mine kompetencer.','I have opportunities to learn and develop my skills.','Piginnaasanik nutaanik ilinniarnissannut atuinissannullu periarfissaqarpunga.'],
['m5','motivation','Jeg er tilfreds med resultaterne af mit arbejde.','I am satisfied with the results of my work.','Sulinerma inerneri takusinnaavakka naammagisimaarlugillu.'],
['h1','hygiene','Min løn og mine ansættelsesvilkår opleves rimelige.','My pay and employment terms feel fair.','Akissarsiakka atorfinitsitaanermilu atugassarititaasut sulinnut naleqquttutut misigivakka.'],
['h2','hygiene','Der er klare roller og tydelige aftaler i arbejdet.','Work is organised with clear roles and agreements.','Sulineq inissisimaffinnik isumaqatigiissutinillu ersarissunik aaqqissuussaavoq.'],
['h3','hygiene','Min leder behandler mig respektfuldt og retfærdigt.','My manager treats me respectfully and fairly.','Aqutsisuma ataqqinnittumik naapertuilluartumillu pissuseqarfigisarpaanga.'],
['h4','hygiene','Vi samarbejder godt på tværs af afdelinger.','We work well together across departments.','Sannavik, biilit saffiugassaannik sannavik, allaffik toqqorsivillu suleqatigiilluartarput.'],
['h5','hygiene','Jeg har gode og sikre fysiske arbejdsforhold.','My physical working conditions are good and safe.','Suliffimmi atugassarititaasut isumannaallisaanerlu naammaginarput.'],
['h6','hygiene','Min arbejdstid og arbejdsbelastning giver plads til restitution og privatliv.','My hours and workload allow recovery and life outside work.','Suliffissaasa suliassamalu qasuersaarneq inuunerlu nammineq periarfissippaat.'],
['h7','hygiene','Jeg får tilstrækkelig information om ændringer, der påvirker mit arbejde.','I receive enough information about changes affecting my work.','Sulinnut sunniuteqartunik allannguutinik naammattumik ilisimatinneqartarpunga.'],
['h8','hygiene','Jeg føler mig tryg ved min ansættelsessituation.','I feel secure about my employment.','Atorfinitsitaaninni inissisimanera toqqissisimaffigivara.']
];
export function questions(){return [...rows.map(([id,theme,da,en,kl])=>({id,theme,type:'scale',da,en,kl,core:theme==='engagement'})),
{id:'enps',theme:'enps',type:'nps',da:'Hvor sandsynligt er det, at du vil anbefale Autonord som arbejdsplads til en ven eller bekendt?',en:'How likely are you to recommend Autonord as an employer to a friend or acquaintance?',kl:'Autonordi suliffittut ikinngummut ilisarisimasamulluunniit qanoq ilimanartigisumik innersuussutigissaviuk?'},
{id:'good',theme:'open',type:'text',da:'Hvad fungerer særligt godt hos Autonord?',en:'What works particularly well at Autonord?',kl:'Autonordimi suut immikkut ingerlalluarpat?'},
{id:'improve',theme:'open',type:'text',da:'Hvilken forbedring bør vi prioritere først?',en:'Which improvement should we prioritise first?',kl:'Suna pitsannguut pingaarnertut salliutissavarput?'},
{id:'why',theme:'open',type:'text',da:'Hvad er den vigtigste grund til din anbefalingsscore?',en:'What is the main reason for your recommendation score?',kl:'Innersuussinermut naliliinerpit pingaarnerpaamik suna pissutigaa?'}];}
export function newSurvey(year=new Date().getUTCFullYear()){return {questions:questions(),klApproved:false,reference:null,description:{da:'Din oplevelse af hverdagen hos Autonord. Vi følger op sammen.',en:'Your experience of everyday work at Autonord. We follow up together.',kl:'Autonordimi ulluinnarni sulineq pillugu misigisatit.'}};}
