/* Timed practice test (Test Prep tab) for units whose test has kind:'mock'.
   Uses globals from app.js at call time: unit, state, save, esc, $, shuffle. */
let mock = null, mockTimer = null;

function mockPick() {
  const by = {};
  unit.questions.forEach((q, i) => { if (q[5] === 'hard') (by[q[0]] ??= []).push(i); });
  Object.values(by).forEach(shuffle);
  const topics = shuffle(Object.keys(by)), out = [];
  for (let k = 0; out.length < unit.test.count && Object.values(by).some(a => a.length); k++) {
    const a = by[topics[k % topics.length]]; if (a.length) out.push(a.pop());
  }
  return shuffle(out);
}
const mockLeft = () => unit.test.minutes * 60 - Math.floor((Date.now() - mock.start) / 1000);
function startMockTimer() {
  clearInterval(mockTimer);
  mockTimer = setInterval(() => {
    if (!mock || mock.done) return clearInterval(mockTimer);
    const left = mockLeft(), t = document.getElementById('mockTimer');
    if (t) { t.textContent = `${Math.floor(Math.max(0, left) / 60)}:${String(Math.max(0, left) % 60).padStart(2, '0')} left`; t.classList.toggle('low', left < 300); }
    if (left <= 0) finishMock();
  }, 1000);
}
function finishMock() {
  if (!mock || mock.done) return;
  mock.done = true; mock.end = Date.now(); clearInterval(mockTimer);
  const score = mock.qs.filter(i => mock.ans[i] === unit.questions[i][3]).length;
  (state.mockHistory ??= []).push({score, total: mock.qs.length, date: new Date().toISOString().slice(0, 10)});
  state.mockHistory = state.mockHistory.slice(-10); save();
  renderTest(); window.scrollTo({top: 0, behavior: 'instant'});
}
function mockQuestion(i, n, review) {
  const [t, stem, opts, c, why] = unit.questions[i], fig = unit.questions[i][7], picked = mock.ans[i];
  const d = document.createElement('article'); d.className = 'q'; d.dataset.t = t;
  d.innerHTML = `<div class="meta">Question ${n} of ${mock.qs.length} · Topic ${t}</div><h3 class="stem">${esc(stem)}</h3>${fig ? `<div class="q-fig">${fig}</div>` : ''}<div class="opts"></div>`;
  opts.forEach((txt, j) => {
    const b = document.createElement('button'); b.className = 'opt'; b.innerHTML = `<span class="l">${'ABCD'[j]}</span><span>${esc(txt)}</span>`;
    if (review) { b.disabled = true; if (j === c) b.classList.add('right'); else if (j === picked) b.classList.add('wrong'); }
    else { b.setAttribute('aria-pressed', picked === j); if (picked === j) b.classList.add('picked');
      b.onclick = () => { mock.ans[i] = j; d.querySelectorAll('.opt').forEach((o, k) => { o.classList.toggle('picked', k === j); o.setAttribute('aria-pressed', k === j); }); updateMockCount(); }; }
    d.querySelector('.opts').append(b);
  });
  if (review) { const w = document.createElement('div'); w.className = 'why ' + (picked === c ? 'ok' : 'no');
    w.innerHTML = `<b>${picked === c ? 'Correct.' : picked === undefined ? 'Not answered. Correct answer: ' + 'ABCD'[c] + '.' : 'Not quite. Correct answer: ' + 'ABCD'[c] + '.'}</b>${esc(why)}`; d.append(w); }
  return d;
}
function updateMockCount() {
  const n = mock.qs.filter(i => mock.ans[i] !== undefined).length, el = document.getElementById('mockCount');
  if (el) el.textContent = `${n}/${mock.qs.length} answered`;
  const sub = document.getElementById('mockSubmit'); if (sub) { sub.dataset.confirm = ''; sub.textContent = 'Submit test'; }
}
function renderMock() {
  const l = $('#testlist'), T = unit.test; l.replaceChildren();
  if (!mock || mock.unit !== unit.id) {
    const hist = state.mockHistory || [];
    const card = document.createElement('article'); card.className = 'q mock-start'; card.dataset.t = '';
    card.innerHTML = `<div class="meta">Practice test</div><h3 class="stem">${T.count} questions · ${T.minutes} minutes</h3><ul class="mock-rules"><li>Questions come from every topic and change every attempt.</li><li>Answers stay hidden until you submit, like the real test.</li><li>The timer is AP pace: 1.5 minutes per question. It submits automatically at 0:00.</li></ul>${hist.length ? `<p class="mock-hist"><b>Your last scores:</b> ${hist.slice(-5).map(h => `${h.score}/${h.total}`).join(' · ')}</p>` : ''}<button class="btn" id="mockStart">Start practice test</button>`;
    l.append(card);
    $('#mockStart').onclick = () => { mock = {unit: unit.id, qs: mockPick(), ans: {}, start: Date.now(), done: false}; startMockTimer(); renderTest(); window.scrollTo({top: 0, behavior: 'instant'}); };
  } else if (!mock.done) {
    const bar = document.createElement('div'); bar.className = 'mock-bar';
    bar.innerHTML = `<span id="mockTimer" class="mock-timer" role="timer"></span><span id="mockCount" class="score"></span><button class="btn" id="mockSubmit">Submit test</button>`;
    l.append(bar);
    mock.qs.forEach((i, k) => l.append(mockQuestion(i, k + 1, false)));
    const end = document.createElement('div'); end.className = 'mock-end'; end.innerHTML = `<button class="btn" id="mockSubmit2">Submit test</button>`; l.append(end);
    const submit = b => { const left = mock.qs.filter(i => mock.ans[i] === undefined).length;
      if (left && !b.dataset.confirm) { b.dataset.confirm = '1'; b.textContent = `${left} unanswered. Submit anyway?`; return; } finishMock(); };
    $('#mockSubmit').onclick = e => submit(e.currentTarget); $('#mockSubmit2').onclick = e => submit(e.currentTarget);
    updateMockCount(); startMockTimer();
    const t = document.getElementById('mockTimer'), left = Math.max(0, mockLeft()); t.textContent = `${Math.floor(left / 60)}:${String(left % 60).padStart(2, '0')} left`;
  } else {
    const qs = mock.qs, score = qs.filter(i => mock.ans[i] === unit.questions[i][3]).length, used = Math.round((mock.end - mock.start) / 1000);
    const topics = [...new Set(qs.map(i => unit.questions[i][0]))].sort();
    const res = document.createElement('article'); res.className = 'q mock-result';
    res.innerHTML = `<div class="meta">Your score</div><div class="mock-score">${score}/${qs.length} <span>${Math.round(score / qs.length * 100)}%</span></div><p class="score">Time used: ${Math.floor(used / 60)}:${String(used % 60).padStart(2, '0')}</p>
      <div class="mock-topics">${topics.map(t => { const tq = qs.filter(i => unit.questions[i][0] === t), r = tq.filter(i => mock.ans[i] === unit.questions[i][3]).length;
        return `<div class="mt-row" data-t="${t}"><span>Topic ${t}</span><span class="mt-bar"><span style="width:${r / tq.length * 100}%"></span></span><b>${r}/${tq.length}</b></div>`; }).join('')}</div>
      <p class="mock-tip">${score / qs.length >= .8 ? 'Strong work. Review any misses below, then try a new test.' : 'Start with your lowest topic: rewatch its video, then practice that topic in the Quiz tab.'}</p>
      <div class="topic-actions"><button class="btn" id="mockNew">New practice test</button><button class="btn ghost" id="mockRetake">Retake these questions</button></div>
      <label class="vs-done"><input type="checkbox" id="mockMissed"> Show only questions I missed</label>`;
    l.append(res);
    const list = document.createElement('div'); l.append(list);
    const draw = () => { list.replaceChildren(); qs.forEach((i, k) => { if (!$('#mockMissed').checked || mock.ans[i] !== unit.questions[i][3]) list.append(mockQuestion(i, k + 1, true)); }); };
    $('#mockMissed').onchange = draw; draw();
    $('#mockNew').onclick = () => { mock = null; renderTest(); };
    $('#mockRetake').onclick = () => { mock = {unit: unit.id, qs: shuffle([...qs]), ans: {}, start: Date.now(), done: false}; startMockTimer(); renderTest(); window.scrollTo({top: 0, behavior: 'instant'}); };
  }
  if (T.frq) renderMockFrq(l, T.frq);
}
function renderMockFrq(l, f) {
  const q = document.createElement('article'); q.className = 'q frq test';
  q.innerHTML = `<div class="meta">${esc(f.source)}</div><h3 class="stem">${esc(f.setup)}</h3>${f.figureHtml ? `<div class="q-fig">${f.figureHtml}</div>` : ''}` +
    f.parts.map((p, i) => `<div class="part"><div class="plabel">(${'abcdef'[i]}) <span class="verb">${esc(p.verb)}</span></div><p>${esc(p.prompt)}</p><label class="meta" for="mf${i}">Your answer · saved on this device</label><textarea id="mf${i}"></textarea><details><summary>Show model answer and scoring</summary><div class="model"><p>${esc(p.answer)}</p><p class="why-pts"><b>To earn the point:</b> ${esc(p.points)}</p><label class="vs-done"><input type="checkbox" data-mp="${i}"> I earned this point</label></div></details></div>`).join('') +
    `<p class="rub-total score" aria-live="polite"></p>`;
  const total = () => { const n = f.parts.filter((_, i) => state['mp' + i]).length; q.querySelector('.rub-total').textContent = `Self-score: ${n}/${f.parts.length} points`; };
  q.querySelectorAll('textarea').forEach((ta, i) => { ta.value = state['mf' + i] || ''; ta.oninput = () => { state['mf' + i] = ta.value; save(); }; });
  q.querySelectorAll('[data-mp]').forEach(c => { c.checked = !!state['mp' + c.dataset.mp]; c.onchange = () => { if (c.checked) state['mp' + c.dataset.mp] = 1; else delete state['mp' + c.dataset.mp]; save(); total(); }; });
  total(); l.append(q);
}
