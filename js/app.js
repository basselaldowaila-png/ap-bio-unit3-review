'use strict';
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const read = (key, fallback) => {try {const value=JSON.parse(localStorage.getItem(key));return value ?? fallback;}catch{return fallback;}};
const write = (key, value) => {try{localStorage.setItem(key,JSON.stringify(value));}catch{}};
let unit, state={}, topic='all', view='guide', order=[], cardOrder=[], ci=0, page=0, quizPool=[];
const pageSize=5;
const views=['videos','guide','models','quiz','cards','frq','test'];
function save(){write(unit.storageKey || `apbio:${unit.id}`,state);updateProgress();}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
const inTopic=t=>topic==='all'||t===topic;
const pickedAnswer=i=>Number.isInteger(state[i])&&state[i]>=0&&state[i]<4?state[i]:undefined;
function updateProgress(){const total=unit.questions.length,answered=unit.questions.filter((_,i)=>pickedAnswer(i)!==undefined).length,correct=unit.questions.filter((q,i)=>pickedAnswer(i)===q[3]).length;
  $('#unitProgress').innerHTML=`<div><span>${unit.questions.length} questions · ${unit.models.length} models</span><span>${answered}/${total} answered · ${correct} correct</span></div><progress max="${total||1}" value="${answered}" aria-label="Questions answered"></progress>`;
}
function selectUnit(id){
  unit=UNITS.get(id)||UNITS.values().next().value;
  state=read(unit.storageKey||`apbio:${unit.id}`,{});if(!state||typeof state!=='object'||Array.isArray(state))state={};
  topic='all';ci=0;page=0;order=unit.questions.map((_,i)=>i);cardOrder=unit.cards.map((_,i)=>i);$('#quizMode').value='enzymes';
  $('#unitTitle').textContent=unit.title;$('#unitEyebrow').textContent='AP Biology · '+unit.label;$('#unitDescription').textContent=unit.description||'';
  document.title=unit.label+' | AP Biology Review';$('#unitSelect').value=unit.id;write('apbio:unit',unit.id);
  $('#unitSources').replaceChildren(...(unit.sourcesTemplate?[document.getElementById(unit.sourcesTemplate).content.cloneNode(true)]:[]));
  $('#guideContent').replaceChildren(document.getElementById(unit.guideTemplate).content.cloneNode(true));
  $('#guideIntro').innerHTML=`<div class="view-heading"><div class="eyebrow">Start with the big idea</div><h2>Build understanding, one topic at a time.</h2><p>${esc(unit.scope||'Choose a topic, read its big idea, then explore and practice.')}</p></div>`;
  $('#guideContent').querySelectorAll('.topic').forEach(section=>{
    const big=section.querySelector('.big');
    if(big){const details=document.createElement('details');details.className='guide-details';const summary=document.createElement('summary');summary.textContent='Read detailed notes';details.append(summary);while(big.nextSibling)details.append(big.nextSibling);section.append(details);}
    const actions=document.createElement('div');actions.className='topic-actions';
    [['models','Explore models'],['quiz','Practice this topic']].forEach(([v,label])=>{const b=document.createElement('button');b.className='btn ghost';b.textContent=label;b.onclick=()=>{if(v==='quiz')$('#quizMode').value='enzymes';setTopic(section.dataset.t);setView(v);};actions.append(b)});section.append(actions);
  });
  $('#chips').replaceChildren();
  unit.topics.forEach(([k,label])=>{const b=document.createElement('button');b.className='chip';b.textContent=label;b.dataset.k=k;if(k!=='all')b.dataset.t=k;b.onclick=()=>setTopic(k);$('#chips').append(b);});
  $('#t-test').hidden=!unit.test;
  rebuildPool();updateProgress();renderChips();
  let last='videos';try{last=localStorage.getItem(unit.viewKey||`apbio:${unit.id}:view`)||'videos';}catch{}
  setView(views.includes(last)&&!(last==='test'&&!unit.test)?last:'videos',false);
}
function renderChips(){$('#chips').querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===topic));}
function setTopic(k){topic=k;ci=0;page=0;renderChips();rebuildPool();render();}
const pill=$('.t-tabs-pill');
function moveTo(tab,animate=true){if(!tab)return;const previous=pill.style.transition;if(!animate)pill.style.transition='none';pill.style.transform=`translateX(${tab.offsetLeft}px)`;pill.style.width=tab.offsetWidth+'px';if(!animate){void pill.offsetWidth;pill.style.transition=previous;}}
function setView(next,scroll=true){view=next;document.querySelectorAll('.tab').forEach(t=>{const selected=t.dataset.view===view;t.setAttribute('aria-selected',selected);t.tabIndex=selected?0:-1;});views.forEach(v=>$('#v-'+v).hidden=v!==view);$('#chips').hidden=view==='test'||view==='videos';try{localStorage.setItem(unit.viewKey||`apbio:${unit.id}:view`,view);}catch{}render();const active=$('.tab[aria-selected="true"]');moveTo(active);if(scroll){window.scrollTo({top:0,behavior:'instant'});active.scrollIntoView({block:'nearest',inline:'nearest'});}}
addEventListener('resize',()=>moveTo($('.tab[aria-selected="true"]'),false));
document.querySelectorAll('.tab').forEach(t=>{t.setAttribute('aria-controls','v-'+t.dataset.view);t.onclick=()=>setView(t.dataset.view);t.onkeydown=e=>{const tabs=[...document.querySelectorAll('.tab')].filter(t=>!t.hidden);let index=tabs.indexOf(t);if(e.key==='ArrowRight')index=(index+1)%tabs.length;else if(e.key==='ArrowLeft')index=(index+tabs.length-1)%tabs.length;else if(e.key==='Home')index=0;else if(e.key==='End')index=tabs.length-1;else return;e.preventDefault();tabs[index].focus();setView(tabs[index].dataset.view,false);};});
views.forEach(v=>{$('#v-'+v).setAttribute('role','tabpanel');$('#v-'+v).setAttribute('aria-labelledby','t-'+v);});
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>setView(b.dataset.go));
function renderGuide(){$('#guideContent').querySelectorAll('.topic').forEach(s=>s.hidden=!inTopic(s.dataset.t));}
function renderModels(){const list=$('#modelList');list.replaceChildren();const models=unit.models.filter(m=>inTopic(m.topic));if(!models.length){list.innerHTML='<p class="empty">No models for this topic yet. Explore the guide or practice questions.</p>';return;}models.forEach(model=>{const host=document.createElement('section');host.className='interactive-model';host.dataset.t=model.topic;list.append(host);mountModel(host,model);});}
function rebuildPool(){const mode=$('#quizMode').value;quizPool=order.filter(i=>inTopic(unit.questions[i][0])&&(mode==='all'||mode==='hard'&&unit.questions[i][5]==='hard'||(mode==='enzymes'||mode==='carriers')&&unit.questions[i][6]===mode||mode==='unanswered'&&pickedAnswer(i)===undefined||mode==='missed'&&pickedAnswer(i)!==undefined&&pickedAnswer(i)!==unit.questions[i][3]));page=0;}
function renderQuiz(){
  const list=$('#qlist');list.replaceChildren();const all=order.filter(i=>inTopic(unit.questions[i][0])),ans=all.filter(i=>pickedAnswer(i)!==undefined).length,right=all.filter(i=>pickedAnswer(i)===unit.questions[i][3]).length;
  $('#score').textContent=`${ans} / ${all.length} answered · ${right} correct${ans?' ('+Math.round(right/ans*100)+'%)':''}`;
  page=Math.min(page,Math.max(0,Math.ceil(quizPool.length/pageSize)-1));
  quizPool.slice(page*pageSize,(page+1)*pageSize).forEach((i,j)=>{
    const [t,stem,opts,c,why]=unit.questions[i],picked=pickedAnswer(i),d=document.createElement('article');d.className='q';d.dataset.t=t;d.dataset.question=i;
    d.innerHTML=`<div class="meta">Question ${page*pageSize+j+1} of ${quizPool.length} · Topic ${t}${unit.questions[i][5]==='hard'?' · <span class="hard-tag">AP level</span>':''}</div><h3 class="stem">${esc(stem)}</h3><div class="opts"></div>`;
    opts.forEach((txt,index)=>{const b=document.createElement('button');b.className='opt';b.innerHTML=`<span class="l">${'ABCD'[index]}</span><span>${esc(txt)}</span>`;if(picked!==undefined){b.disabled=true;if(index===c)b.classList.add('right');else if(index===picked)b.classList.add('wrong');}b.onclick=()=>{state[i]=index;save();renderQuiz();const feedback=$(`[data-question="${i}"] .why`);feedback.focus({preventScroll:true});};d.querySelector('.opts').append(b);});
    if(picked!==undefined){const explanation=document.createElement('div');explanation.tabIndex=-1;explanation.className='why '+(picked===c?'ok':'no');explanation.innerHTML=`<b>${picked===c?'Correct.':'Not quite. Correct answer: '+'ABCD'[c]+'.'}</b>${esc(why)}`;d.append(explanation);
      const retry=document.createElement('button');retry.className='btn ghost retry';retry.textContent='Try this question again';retry.onclick=()=>{delete state[i];save();renderQuiz();$(`[data-question="${i}"] .opt`).focus({preventScroll:true});};d.append(retry);}
    list.append(d);
  });
  if(!quizPool.length)list.innerHTML='<div class="empty"><h3>No questions in this set.</h3><p>Choose “All questions” or another topic. Missed questions appear here after you answer them.</p></div>';
  $('#qPage').textContent=quizPool.length?`${page+1} / ${Math.ceil(quizPool.length/pageSize)}`:'0 / 0';$('#qPrev').disabled=page===0;$('#qNext').disabled=(page+1)*pageSize>=quizPool.length;
}
$('#quizMode').onchange=()=>{rebuildPool();renderQuiz();};$('#shuffle').onclick=()=>{shuffle(order);rebuildPool();renderQuiz();};$('#reset').onclick=()=>{unit.questions.forEach((q,i)=>{if(inTopic(q[0]))delete state[i];});save();rebuildPool();renderQuiz();};
function turnPage(delta){page+=delta;renderQuiz();$('#v-quiz').scrollIntoView({block:'start'});$('#qlist .stem')?.setAttribute('tabindex','-1');$('#qlist .stem')?.focus({preventScroll:true});}
$('#qPrev').onclick=()=>turnPage(-1);$('#qNext').onclick=()=>turnPage(1);
function cardsIn(){return cardOrder.filter(i=>inTopic(unit.cards[i][0]));}
function flipCard(){const flip=$('#fc').classList.toggle('flip');$('#fc').setAttribute('aria-pressed',flip);$('#fc .front').setAttribute('aria-hidden',flip);$('#fc .back').setAttribute('aria-hidden',!flip);}
function renderCards(){const cs=cardsIn();ci=cs.length?ci%cs.length:0;$('#fc').classList.remove('flip');$('#fc').setAttribute('aria-pressed','false');$('#fc .front').setAttribute('aria-hidden','false');$('#fc .back').setAttribute('aria-hidden','true');const [t,term,def]=cs.length?unit.cards[cs[ci]]:['','No flashcards for this topic','Choose another topic.'];$('#fc').dataset.t=t;$('#fcTopic').textContent=t?'TOPIC '+t:'';$('#fcTerm').textContent=term;$('#fcDef').textContent=def;$('#fcCount').textContent=cs.length?`${ci+1} / ${cs.length}`:'0 / 0';$('#prev').disabled=$('#next').disabled=$('#fc').disabled=!cs.length;}
$('#fc').onclick=flipCard;$('#next').onclick=()=>{ci++;renderCards();};$('#prev').onclick=()=>{const n=cardsIn().length;ci=(ci-1+n)%n;renderCards();};$('#fcShuffle').onclick=()=>{shuffle(cardOrder);ci=0;renderCards();};
document.addEventListener('keydown',e=>{if(view!=='cards'||e.target.matches('input,textarea,select,button,a,summary'))return;if(e.key==='ArrowRight')$('#next').click();else if(e.key==='ArrowLeft')$('#prev').click();else if(e.key===' '){e.preventDefault();flipCard();}});
function renderFrq(){const list=$('#frqlist');list.replaceChildren();let n=0;unit.frqs.forEach(([t,p,a],i)=>{if(!inTopic(t))return;const d=document.createElement('article');d.className='q frq';d.dataset.t=t;d.innerHTML=`<div class="meta">Free response ${++n} · Topic ${t}</div><h3 class="stem">${esc(p)}</h3><label class="meta" for="frq${i}">Your answer · saved on this device</label><textarea id="frq${i}" placeholder="Make a claim, use evidence, and explain the mechanism."></textarea><details><summary>Compare with a model answer</summary><p>${esc(a)}</p></details>`;const ta=d.querySelector('textarea');ta.value=typeof state['f'+i]==='string'?state['f'+i]:'';ta.oninput=()=>{state['f'+i]=ta.value;save();};list.append(d);});if(!n)list.innerHTML='<p class="empty">No free-response questions for this topic.</p>';}
function renderTest(){const l=$('#testlist');l.replaceChildren();if(!unit.test)return;const m=unit.test.mcq,picked=state.tm,d=document.createElement('article');d.className='q test';d.innerHTML=`<div class="meta">Multiple choice · ${esc(m.source)}</div><h3 class="stem">${esc(m.stem)}</h3><div class="opts"></div>`;m.options.forEach((txt,j)=>{const b=document.createElement('button');b.className='opt';b.innerHTML=`<span class="l">${'ABCD'[j]}</span><span>${esc(txt)}</span>`;if(picked!==undefined){b.disabled=true;if(j===m.answer)b.classList.add('right');else if(j===picked)b.classList.add('wrong');}b.onclick=()=>{state.tm=j;save();renderTest();$('#testlist .why').focus({preventScroll:true});};d.querySelector('.opts').append(b);});if(picked!==undefined){const w=document.createElement('div');w.className='why '+(picked===m.answer?'ok':'no');w.tabIndex=-1;w.innerHTML=`<b>${picked===m.answer?'Correct.':'Not quite. Answer: '+'ABCD'[m.answer]+'.'}</b>${esc(m.why)}`;d.append(w);const retry=document.createElement('button');retry.className='btn ghost retry';retry.textContent='Try again';retry.onclick=()=>{delete state.tm;save();renderTest();};d.append(retry);}l.append(d);
  const f=unit.test.frq,q=document.createElement('article');q.className='q frq test';q.innerHTML=`<div class="meta">${esc(f.source)}</div><h3 class="stem">${esc(f.setup)}</h3>`+f.parts.map((p,i)=>`<div class="part"><div class="plabel">(${'abcd'[i]}) <span class="verb">${esc(p.verb)}</span></div><p>${esc(p.prompt)}</p><label class="meta" for="tf${i}">Your answer · saved on this device</label><textarea id="tf${i}"></textarea><details><summary>Show model answer and scoring guidance</summary><div class="model"><p>${esc(p.answer)}</p><p class="why-pts"><b>Scoring guidance:</b> ${esc(p.points)}</p></div></details></div>`).join('');q.querySelectorAll('textarea').forEach((ta,i)=>{ta.value=state['tf'+i]||'';ta.oninput=()=>{state['tf'+i]=ta.value;save();};});l.append(q);
}
function fmt(s){return Math.floor(s/60)+':'+String(s%60).padStart(2,'0');}
function renderVideos(){const list=$('#videoList');list.replaceChildren();const vids=typeof VIDEOS==='undefined'?[]:VIDEOS;const done=vids.filter(v=>state['vid:'+v.id]).length;
  $('#videoProgress').textContent=`${done} of ${vids.length} videos done`;
  vids.forEach((v,i)=>{const url=`https://www.youtube.com/watch?v=${v.id}`;const d=document.createElement('article');d.className='video-step';d.dataset.t=v.topic;const watched=!!state['vid:'+v.id];
    d.innerHTML=`<div class="vs-head"><span class="vs-num" aria-hidden="true">${watched?'✓':i+1}</span><div><div class="meta">Step ${i+1} · Mr. Poser ${esc(v.poser)} · ${esc(v.classTopics)}</div><h3>${esc(v.title)}</h3></div></div>
    <a class="vs-thumb" href="${url}" target="_blank" rel="noopener"><img src="https://i.ytimg.com/vi/${v.id}/hqdefault.jpg" alt="" loading="lazy" width="480" height="360"><span class="vs-play">▶ Watch on YouTube · ${esc(v.length)}</span></a>
    <p class="vs-goal"><b>Goal:</b> ${esc(v.goal)}</p>
    <details class="vs-sec"><summary>Jump to a part (${v.chapters.length})</summary><ol class="vs-chapters">${v.chapters.map(([s,l])=>`<li><a href="${url}&t=${s}s" target="_blank" rel="noopener"><span>${fmt(s)}</span>${esc(l)}</a></li>`).join('')}</ol></details>
    <details class="vs-sec" open><summary>Key points from the video</summary><ul class="vs-points">${v.points.map(p=>`<li>${p}</li>`).join('')}</ul>${v.note?`<div class="tip"><div class="eyebrow">Heads up</div>${v.note}</div>`:''}</details>
    <details class="vs-sec"><summary>Words to know (${v.vocab.length})</summary><dl class="vs-vocab">${v.vocab.map(([t,x])=>`<div><dt>${esc(t)}</dt><dd>${esc(x)}</dd></div>`).join('')}</dl></details>
    <div class="vs-check"><div class="eyebrow">Quick check · answer out loud, then open</div>${v.check.map(([q,a])=>`<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
    <div class="vs-actions"><label class="vs-done"><input type="checkbox" id="vd-${v.id}" ${watched?'checked':''}> I watched this and did the check</label></div>`;
    d.querySelector('input').onchange=e=>{if(e.target.checked)state['vid:'+v.id]=1;else delete state['vid:'+v.id];save();renderVideos();};
    list.append(d);});}
function render(){({videos:renderVideos,guide:renderGuide,models:renderModels,quiz:renderQuiz,cards:renderCards,frq:renderFrq,test:renderTest})[view]();}
$('#unitPicker').hidden=UNITS.size<2;UNITS.forEach(u=>{const option=document.createElement('option');option.value=u.id;option.textContent=u.label;$('#unitSelect').append(option);});$('#unitSelect').onchange=e=>selectUnit(e.target.value);
selectUnit(read('apbio:unit','unit3'));moveTo($('.tab[aria-selected="true"]'),false);
