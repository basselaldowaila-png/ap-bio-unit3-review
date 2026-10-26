let topic="all", view="guide";
let state={}; try{state=JSON.parse(localStorage.getItem("apbio3")||"{}")}catch(e){}
function save(){try{localStorage.setItem("apbio3",JSON.stringify(state))}catch(e){}}
let order=Q.map((_,i)=>i);
let cardOrder=CARDS.map((_,i)=>i), ci=0;

const chips=document.getElementById("chips");
TOPICS.forEach(([k,l])=>{const b=document.createElement("button");b.className="chip";b.textContent=l;b.dataset.k=k;if(k!=="all")b.dataset.t=k;b.setAttribute("aria-pressed",k===topic);b.onclick=()=>{topic=k;chips.querySelectorAll(".chip").forEach(c=>c.setAttribute("aria-pressed",c.dataset.k===k));render()};chips.appendChild(b)});

const pill=document.querySelector(".t-tabs-pill");
function moveTo(tab,animate){if(!animate){const prev=pill.style.transition;pill.style.transition="none";pill.style.transform=`translateX(${tab.offsetLeft}px)`;pill.style.width=`${tab.offsetWidth}px`;void pill.offsetWidth;pill.style.transition=prev}else{pill.style.transform=`translateX(${tab.offsetLeft}px)`;pill.style.width=`${tab.offsetWidth}px`}}
const activeTab=()=>document.querySelector('.t-tab[aria-selected="true"]');
addEventListener("resize",()=>moveTo(activeTab(),false));
document.querySelectorAll(".tab").forEach(t=>t.onclick=()=>{view=t.dataset.view;moveTo(t,true);document.querySelectorAll(".tab").forEach(x=>x.setAttribute("aria-selected",x===t));["guide","quiz","cards","frq"].forEach(v=>document.getElementById("v-"+v).hidden=v!==view);try{localStorage.setItem("apbio3view",view)}catch(e){}render();window.scrollTo({top:0})});

const esc=s=>s.replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c]));
const inTopic=t=>topic==="all"||t===topic;

function renderGuide(){document.querySelectorAll("#v-guide .topic").forEach(s=>s.hidden=!inTopic(s.dataset.t))}

function renderQuiz(){
  const list=document.getElementById("qlist");list.innerHTML="";
  let n=0,ans=0,right=0;
  order.forEach(i=>{const [t,stem,opts,c,why]=Q[i];if(!inTopic(t))return;n++;
    const picked=state[i];
    const d=document.createElement("div");d.className="q";d.dataset.t=t;
    d.innerHTML=`<div class="meta">Q${n} · Topic ${t}</div><div class="stem">${esc(stem)}</div><div class="opts"></div>`;
    const o=d.querySelector(".opts");
    opts.forEach((txt,j)=>{const b=document.createElement("button");b.className="opt";b.innerHTML=`<span class="l">${"ABCD"[j]}</span><span>${esc(txt)}</span>`;
      if(picked!==undefined){b.disabled=true;if(j===c)b.classList.add("right");else if(j===picked)b.classList.add("wrong")}
      b.onclick=()=>{state[i]=j;save();renderQuiz()};o.appendChild(b)});
    if(picked!==undefined){ans++;if(picked===c)right++;
      const w=document.createElement("div");w.className="why "+(picked===c?"ok":"no");
      w.innerHTML=`<b>${picked===c?"Correct.":"Not quite. Answer: "+"ABCD"[c]+"."}</b>${esc(why)}`;d.appendChild(w)}
    list.appendChild(d)});
  document.getElementById("score").textContent=`${ans} / ${n} answered · ${right} correct`+(ans?` (${Math.round(right/ans*100)}%)`:"");
}
document.getElementById("shuffle").onclick=()=>{order.sort(()=>Math.random()-.5);renderQuiz()};
document.getElementById("reset").onclick=()=>{Q.forEach((q,i)=>{if(inTopic(q[0]))delete state[i]});save();renderQuiz()};

function cardsIn(){return cardOrder.filter(i=>inTopic(CARDS[i][0]))}
function renderCards(){const cs=cardsIn();if(ci>=cs.length)ci=0;const [t,term,def]=CARDS[cs[ci]];
  document.getElementById("fc").classList.remove("flip");document.getElementById("fc").dataset.t=t;
  document.getElementById("fcTopic").textContent="TOPIC "+t;document.getElementById("fcTerm").textContent=term;document.getElementById("fcDef").textContent=def;
  document.getElementById("fcCount").textContent=`${ci+1} / ${cs.length}`}
document.getElementById("fc").onclick=e=>e.currentTarget.classList.toggle("flip");
document.getElementById("next").onclick=()=>{ci=(ci+1)%cardsIn().length;renderCards()};
document.getElementById("prev").onclick=()=>{const n=cardsIn().length;ci=(ci-1+n)%n;renderCards()};
document.getElementById("fcShuffle").onclick=()=>{cardOrder.sort(()=>Math.random()-.5);ci=0;renderCards()};
document.addEventListener("keydown",e=>{if(view!=="cards"||e.target.tagName==="TEXTAREA")return;
  if(e.key==="ArrowRight")document.getElementById("next").click();
  else if(e.key==="ArrowLeft")document.getElementById("prev").click();
  else if(e.key===" "&&e.target.id!=="fc"){e.preventDefault();document.getElementById("fc").click()}});

function renderFrq(){const l=document.getElementById("frqlist");l.innerHTML="";let n=0;
  FRQ.forEach(([t,p,a],i)=>{if(!inTopic(t))return;n++;const d=document.createElement("div");d.className="q frq";d.dataset.t=t;
    d.innerHTML=`<div class="meta">Free response ${n} · Topic ${t}</div><div class="stem">${esc(p)}</div><label class="meta" for="frq${i}">Your answer (saved on this device)</label><textarea id="frq${i}"></textarea><details><summary>Show model answer</summary><p style="margin-top:8px">${esc(a)}</p></details>`;
    const ta=d.querySelector("textarea");ta.value=state["f"+i]||"";ta.oninput=()=>{state["f"+i]=ta.value;save()};l.appendChild(d)})}

function render(){({guide:renderGuide,quiz:renderQuiz,cards:renderCards,frq:renderFrq})[view]()}
try{const v=localStorage.getItem("apbio3view");if(v)document.querySelector(`.tab[data-view="${v}"]`).click();else render()}catch(e){render()}
moveTo(activeTab(),false);
