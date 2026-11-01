/* Unit 4 interactive models. They plug into mountModel() in models.js through MODEL_KINDS,
   so they share the same card, header and "Check your understanding" layout as Unit 3's models.
   Each renderer gets (body, model, helpers) where helpers = {svg, text, box, axis}. */
const MODEL_KINDS = {};

// 4.1: three ways cells signal
MODEL_KINDS.signaltypes = (body, h, {svg, text}) => {
  const types = {
    direct: ['Direct contact', 'The cells touch. A protein on one cell binds a protein on the other.', 'Immune cells (helper T and killer T cells)'],
    local: ['Local', 'The signal travels a short distance to nearby cells.', 'Neurotransmitters crossing a synapse; quorum sensing'],
    endocrine: ['Endocrine (long distance)', 'Hormones travel through the blood to distant target cells.', 'Insulin from the pancreas; growth hormone']
  };
  body.innerHTML = `<div class="step-buttons" role="group" aria-label="Signaling type">${Object.entries(types).map(([k, t]) => `<button class="step-button" data-k="${k}">${t[0]}</button>`).join('')}</div><div class="model-visual"></div><div class="step-explanation" aria-live="polite"></div>`;
  let pick = 'direct';
  const cell = (x, y, label, on) => `<circle cx="${x}" cy="${y}" r="42" fill="${on ? 'var(--leaf-soft)' : 'var(--surface)'}" stroke="var(--leaf)" stroke-width="3"/>${text(x, y + 6, label, 'text-anchor="middle"')}`;
  const dot = (x, y) => `<circle cx="${x}" cy="${y}" r="7" fill="var(--sun)"/>`;
  function update() {
    body.querySelectorAll('[data-k]').forEach(b => { b.setAttribute('aria-pressed', b.dataset.k === pick); b.onclick = () => { pick = b.dataset.k; update(); }; });
    let art;
    if (pick === 'direct') art = cell(250, 120, 'Sender', true) + cell(334, 120, 'Target', true) + `<rect x="284" y="108" width="16" height="24" rx="4" fill="var(--sun)"/>` + text(300, 205, 'Surface proteins touch', 'text-anchor="middle"');
    else if (pick === 'local') art = cell(150, 120, 'Sender', true) + cell(430, 120, 'Target', true) + [220, 260, 300, 340].map((x, i) => dot(x, 110 + (i % 2) * 20)).join('') + text(290, 205, 'Chemical crosses a short gap', 'text-anchor="middle"');
    else art = cell(80, 120, 'Gland', true) + `<path d="M130 120 C 230 40, 370 200, 470 120" fill="none" stroke="var(--bad)" stroke-width="10" opacity=".25"/>` + [190, 280, 370].map((x, i) => dot(x, [92, 118, 132][i])).join('') + cell(520, 120, 'Target', true) + text(300, 215, 'Hormone travels in the blood', 'text-anchor="middle"');
    body.querySelector('.model-visual').innerHTML = svg(art, `${types[pick][0]} signaling diagram`, 240);
    const t = types[pick];
    body.querySelector('.step-explanation').innerHTML = `<div class="flow-caption">${t[0]}</div><p>${t[1]}</p><p><b>Example:</b> ${t[2]}</p>`;
  }
  update();
};

// 4.2 + 4.3: follow the epinephrine pathway, then break it
MODEL_KINDS.pathway = (body, h, {svg, text}) => {
  const nodes = ['Epinephrine', 'GPCR', 'G protein', 'Ad. cyclase', 'cAMP', 'Kinase', 'Glyc. phos.', 'Glucose out'];
  const full = ['Epinephrine (ligand)', 'GPCR (receptor)', 'G protein', 'Adenylyl cyclase', 'cAMP (second messenger)', 'Protein kinase', 'Glycogen phosphorylase', 'Glucose released'];
  const scenarios = {
    normal: ['Normal: epinephrine arrives', [1, 1, 1, 1, 1, 1, 1, 1], 'Every step activates the next one. Glycogen is broken down and glucose is released for fight or flight.'],
    none: ['No epinephrine', [0, 0, 0, 0, 0, 0, 0, 0], 'No ligand, no reception. Nothing downstream turns on.'],
    receptor: ['Drug blocks the receptor', [1, 0, 0, 0, 0, 0, 0, 0], 'Epinephrine is present but can\'t bind, so the signal stops at the membrane.'],
    cyclase: ['Toxin blocks adenylyl cyclase', [1, 1, 1, 0, 0, 0, 0, 0], 'Steps before the block still happen. With no cAMP, the kinase and glycogen phosphorylase never turn on.'],
    kinase: ['Kinase stuck "on" (no epinephrine)', [0, 0, 0, 0, 0, 1, 1, 1], 'Everything after an always-on step stays on, even with no signal. Glucose keeps being released.'],
    pde: ['cAMP can\'t be broken down', [1, 1, 1, 1, 2, 1, 1, 1], 'cAMP stays high, so the response is stronger and lasts longer than normal.']
  };
  body.innerHTML = `<label class="filter-label">What happens if… <select>${Object.entries(scenarios).map(([k, s]) => `<option value="${k}">${s[0]}</option>`).join('')}</select></label><div class="model-visual"></div><p class="model-result" aria-live="polite"></p><p class="model-note">Filled boxes are active. Dashed boxes are off. You don't need to memorize every step, but you should be able to predict what happens when one is blocked.</p>`;
  function update() {
    const s = scenarios[body.querySelector('select').value];
    const bx = (i) => { const x = 20 + (i % 4) * 145, y = i < 4 ? 30 : 150, on = s[1][i];
      return `<rect x="${x}" y="${y}" width="125" height="56" rx="12" fill="${on ? 'var(--leaf-soft)' : 'var(--surface)'}" stroke="${on ? 'var(--leaf)' : 'var(--muted)'}" stroke-width="${on === 2 ? 5 : 2}" ${on ? '' : 'stroke-dasharray="6 5"'}/>${text(x + 62, y + 35, nodes[i], `text-anchor="middle" font-size="17" ${on ? '' : 'opacity=".45"'}`)}`; };
    const arrows = [0, 1, 2].map(i => text(150 + i * 145, 64, '→', 'font-size="20"')).join('') + `<path d="M520 90 V120 H82 V146" fill="none" stroke="var(--muted)" stroke-width="2" marker-end="url(#ah)"/>` + [4, 5, 6].map(i => text(150 + (i - 4) * 145, 184, '→', 'font-size="20"')).join('');
    body.querySelector('.model-visual').innerHTML = svg(`<defs><marker id="ah" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto"><path d="M0 0L8 4L0 8z" fill="var(--muted)"/></marker></defs>` + arrows + nodes.map((_, i) => bx(i)).join(''), `Epinephrine pathway. Active steps: ${full.filter((_, i) => s[1][i]).join(', ') || 'none'}.`, 230);
    body.querySelector('.model-result').textContent = s[2];
  }
  body.querySelector('select').onchange = update; update();
};

// 4.4: blood glucose negative feedback
MODEL_KINDS.glucose = (body, h, {svg, text}) => {
  body.innerHTML = `<div class="model-controls"><label>Person <select><option value="healthy">Healthy</option><option value="t1">Type 1 diabetes (no insulin made)</option><option value="t2">Type 2 diabetes (cells respond weakly)</option></select></label><label>Blood glucose <output></output><input type="range" min="40" max="200" value="150" step="5"></label></div><div class="model-visual"></div><div class="energy-ledger"><div><span>Detected by</span><strong class="g-cells"></strong></div><div><span>Hormone released</span><strong class="g-hormone"></strong></div><div class="net"><span>Result</span><strong class="g-result"></strong></div></div><p class="model-result" aria-live="polite"></p><p class="model-note">Set point shown as 70–110 mg/dL (shaded). Values are simplified for learning.</p>`;
  function update() {
    const g = +body.querySelector('input').value, who = body.querySelector('select').value;
    body.querySelector('output').textContent = g + ' mg/dL';
    let cells = 'No big response', hormone = '—', result = 'Stays near set point', good = true, msg = 'Glucose is in the normal range, so neither hormone changes much.';
    if (g > 110) {
      cells = 'Beta cells (pancreas)';
      if (who === 't1') { hormone = 'Little or no insulin'; result = 'Stays high'; good = false; msg = 'Beta cells are destroyed, so insulin isn\'t released. Cells don\'t get the signal to take in glucose, so blood glucose stays high.'; }
      else if (who === 't2') { hormone = 'Insulin (weak effect)'; result = 'Falls slowly / stays high'; good = false; msg = 'Insulin is released, but receptors respond poorly (weak reception), so cells take in less glucose.'; }
      else { hormone = 'Insulin'; result = 'Falls back to set point'; msg = 'Negative feedback: insulin makes liver and body cells take in glucose (the liver stores it as glycogen), so glucose drops back toward the set point.'; }
    } else if (g < 70) {
      cells = 'Alpha cells (pancreas)'; hormone = 'Glucagon'; result = 'Rises back to set point';
      msg = 'Negative feedback: glucagon tells the liver to break down glycogen and release glucose, so blood glucose rises.';
    }
    const y = v => 210 - (v - 40) * 1.1;
    const target = result.startsWith('Falls back') || result.startsWith('Rises') ? 90 : g;
    body.querySelector('.model-visual').innerHTML = svg(`<rect x="60" y="${y(110)}" width="510" height="${y(70) - y(110)}" fill="var(--good-soft)"/>` + `<path d="M60 25V210H570" fill="none" stroke="var(--muted)"/>` + text(64, 20, 'Blood glucose (mg/dL)') + text(70, y(110) - 6, 'set point range', 'font-size="15"') + `<path d="M90 ${y(g)} C 260 ${y(g)}, 330 ${y(target)}, 540 ${y(target)}" fill="none" stroke="var(--leaf)" stroke-width="4"/><circle cx="90" cy="${y(g)}" r="7" fill="var(--leaf)"/>` + text(230, 236, 'Time after the change →'), `Blood glucose starts at ${g} and ${result.toLowerCase()}.`, 250);
    body.querySelector('.g-cells').textContent = cells; body.querySelector('.g-hormone').textContent = hormone; body.querySelector('.g-result').textContent = result;
    body.querySelector('.net').dataset.favorable = good; body.querySelector('.model-result').textContent = msg;
  }
  body.querySelector('select').onchange = update; body.querySelector('input').oninput = update; update();
};

// 4.5: step through interphase and mitosis
MODEL_KINDS.mitosis = (body, h, {svg, text}) => {
  const phases = [
    ['G1', 'The cell grows, copies its organelles and does its job. DNA is loose chromatin.'],
    ['S', 'DNA is replicated. Each chromosome now has two identical sister chromatids.'],
    ['G2', 'The cell makes proteins, ATP and centrosomes to get ready to divide.'],
    ['Prophase', 'Chromosomes condense into X shapes, the spindle forms, centrosomes move to the poles and the nuclear envelope breaks down.'],
    ['Metaphase', 'Chromosomes line up across the middle of the cell. The M checkpoint checks that every one is attached.'],
    ['Anaphase', 'Sister chromatids are pulled apart to opposite poles. This is the shortest phase.'],
    ['Telophase', 'Nuclear envelopes reform around each set of chromosomes and the spindle breaks down.'],
    ['Cytokinesis', 'The cytoplasm splits: a cleavage furrow in animal cells (shown), a cell plate in plant cells. Two identical daughter cells.']
  ];
  body.innerHTML = `<div class="step-buttons" aria-label="Cell cycle phases">${phases.map((p, i) => `<button class="step-button" data-step="${i}">${i + 1}. ${p[0]}</button>`).join('')}</div><div class="model-visual"></div><div class="step-explanation" aria-live="polite"></div><div class="model-nav"><button class="btn ghost" data-back>← Back</button><span class="step-count"></span><button class="btn" data-next>Next phase →</button></div>`;
  let step = 0;
  const X = (x, y, c = 'var(--leaf)') => `<path d="M${x - 9} ${y - 14}L${x + 9} ${y + 14}M${x + 9} ${y - 14}L${x - 9} ${y + 14}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;
  const I = (x, y, c = 'var(--leaf)') => `<path d="M${x} ${y - 14}V${y + 14}" stroke="${c}" stroke-width="6" stroke-linecap="round"/>`;
  const draw = () => {
    const cx = 300, cy = 125, sun = 'var(--sun)';
    const cell = (rx, ry = 95, x = cx) => `<ellipse cx="${x}" cy="${cy}" rx="${rx}" ry="${ry}" fill="var(--leaf-soft)" stroke="var(--leaf)" stroke-width="3"/>`;
    const nuc = (x = cx, dash = false, r = 45) => `<circle cx="${x}" cy="${cy}" r="${r}" fill="var(--surface)" stroke="var(--muted)" stroke-width="2" ${dash ? 'stroke-dasharray="6 6"' : ''}/>`;
    const spindle = (xs) => xs.map(([x, y]) => `<path d="M${cx - 110} ${cy}L${x} ${y}M${cx + 110} ${cy}L${x} ${y}" stroke="var(--muted)" stroke-width="1.5"/>`).join('') + `<circle cx="${cx - 110}" cy="${cy}" r="8" fill="${sun}"/><circle cx="${cx + 110}" cy="${cy}" r="8" fill="${sun}"/>`;
    switch (step) {
      case 0: return cell(120) + nuc() + `<path d="M280 110 q10 -12 20 0 t20 0M285 140 q10 12 20 0 t20 0" stroke="var(--leaf)" stroke-width="4" fill="none"/>`;
      case 1: return cell(125) + nuc() + `<path d="M280 108 q10 -12 20 0 t20 0M280 116 q10 -12 20 0 t20 0M285 138 q10 12 20 0 t20 0M285 146 q10 12 20 0 t20 0" stroke="var(--leaf)" stroke-width="4" fill="none"/>`;
      case 2: return cell(135) + nuc() + `<circle cx="230" cy="70" r="8" fill="${sun}"/><circle cx="244" cy="70" r="8" fill="${sun}"/>` + X(290, 125) + X(315, 125);
      case 3: return cell(140) + nuc(cx, true, 55) + spindle([[285, 105], [315, 145]]) + X(285, 105) + X(315, 145);
      case 4: return cell(140) + `<path d="M300 40V210" stroke="var(--line)" stroke-dasharray="5 5"/>` + spindle([[300, 90], [300, 125], [300, 160]]) + X(300, 90) + X(300, 125) + X(300, 160);
      case 5: return cell(160, 90) + spindle([[230, 100], [230, 150], [370, 100], [370, 150]]) + [230, 370].map(x => I(x, 100) + I(x, 150)).join('');
      case 6: return `<path d="M140 125 C140 30, 290 30, 300 70 C310 30, 460 30, 460 125 C460 220, 310 220, 300 180 C290 220, 140 220, 140 125Z" fill="var(--leaf-soft)" stroke="var(--leaf)" stroke-width="3"/>` + nuc(215, false, 38) + nuc(385, false, 38) + I(205, 125) + I(225, 125) + I(375, 125) + I(395, 125);
      default: return cell(80, 80, 205) + cell(80, 80, 395) + nuc(205, false, 36) + nuc(395, false, 36) + I(195, 125) + I(215, 125) + I(385, 125) + I(405, 125) + text(300, 235, 'Two identical daughter cells', 'text-anchor="middle"');
    }
  };
  function update() {
    body.querySelectorAll('[data-step]').forEach((b, i) => { b.setAttribute('aria-pressed', i === step); b.onclick = () => { step = i; update(); }; });
    body.querySelector('[data-back]').disabled = step === 0; body.querySelector('[data-next]').disabled = step === phases.length - 1;
    body.querySelector('.step-count').textContent = `${step + 1} of ${phases.length}`;
    body.querySelector('.model-visual').innerHTML = svg(draw(), `${phases[step][0]} diagram. Schematic, not to scale.`, 250);
    body.querySelector('.step-explanation').innerHTML = `<div class="flow-caption">${step < 3 ? 'Interphase' : step < 7 ? 'Mitosis' : 'After mitosis'}</div><h4>${phases[step][0]}</h4><p>${phases[step][1]}</p>`;
  }
  body.querySelector('[data-back]').onclick = () => { step = Math.max(0, step - 1); update(); };
  body.querySelector('[data-next]').onclick = () => { step = Math.min(phases.length - 1, step + 1); update(); };
  update();
};

// 4.6: cyclin, CDK and the checkpoint decision
MODEL_KINDS.checkpoint = (body, h, {svg, text}) => {
  body.innerHTML = `<label for="cyclinLevel">Cyclin level <output></output></label><input id="cyclinLevel" type="range" min="0" max="100" value="30" step="5"><div class="model-controls"><label class="vs-done"><input type="checkbox" data-c="damage"> The cell's DNA is damaged</label><label class="vs-done"><input type="checkbox" data-c="broken"> The checkpoint is broken</label><label class="vs-done"><input type="checkbox" data-c="noapop"> The cell ignores apoptosis signals</label></div><div class="model-visual"></div><p class="model-result" aria-live="polite"></p><p class="model-note">Simplified: the CDK switches on when cyclin passes the dashed threshold (60). Real cells have several cyclins and checkpoints.</p>`;
  function update() {
    const c = +body.querySelector('input[type=range]').value, on = c >= 60;
    const f = k => body.querySelector(`[data-c="${k}"]`).checked;
    const damage = f('damage'), broken = f('broken'), noapop = f('noapop');
    body.querySelector('output').textContent = c;
    let outcome, kind;
    if (!on) { outcome = 'CDK is inactive: not enough cyclin is bound, so the cell waits at the checkpoint.'; kind = 'wait'; }
    else if (!damage) { outcome = 'Cyclin is high enough to activate the CDK, which phosphorylates target proteins. The cell passes the checkpoint and moves to the next phase.'; kind = 'go'; }
    else if (!broken) { outcome = 'The CDK is active, but the checkpoint detects damaged DNA and pauses the cycle for repair. If it can\'t be fixed, the cell is signaled to undergo apoptosis.'; kind = 'wait'; }
    else if (!noapop) { outcome = 'The broken checkpoint lets the damaged cell through, but the backup works: the cell receives a signal and undergoes apoptosis.'; kind = 'apop'; }
    else { outcome = 'Both safety systems failed: the damaged cell keeps dividing and ignores apoptosis. This is how cancer can start.'; kind = 'cancer'; }
    const col = {go: 'var(--good)', wait: 'var(--sun)', apop: 'var(--muted)', cancer: 'var(--bad)'}[kind];
    const label = {go: 'PASS', wait: 'WAIT', apop: 'APOPTOSIS', cancer: 'UNCONTROLLED'}[kind];
    body.querySelector('.model-visual').innerHTML = svg(
      `<rect x="40" y="40" width="60" height="160" rx="10" fill="var(--surface)" stroke="var(--line)"/><rect x="40" y="${200 - c * 1.6}" width="60" height="${c * 1.6}" rx="10" fill="var(--leaf)"/><path d="M30 ${200 - 96}H110" stroke="var(--ink)" stroke-dasharray="6 5"/>` + text(70, 225, 'Cyclin', 'text-anchor="middle"') +
      text(150, 125, '→', 'font-size="26"') + `<circle cx="240" cy="120" r="48" fill="${on ? 'var(--leaf-soft)' : 'var(--surface)'}" stroke="var(--leaf)" stroke-width="${on ? 5 : 2}" ${on ? '' : 'stroke-dasharray="6 5"'}/>` + text(240, 118, 'CDK', 'text-anchor="middle"') + text(240, 142, on ? 'active' : 'inactive', 'text-anchor="middle" font-size="15"') +
      text(312, 125, '→', 'font-size="26"') + `<rect x="350" y="80" width="220" height="80" rx="14" fill="var(--surface)" stroke="${col}" stroke-width="4"/>` + text(460, 130, label, `text-anchor="middle" fill="${col}"`),
      `Cyclin ${c}. CDK ${on ? 'active' : 'inactive'}. Outcome: ${label}.`, 240);
    body.querySelector('.model-result').textContent = outcome;
  }
  body.querySelectorAll('input').forEach(i => i.oninput = i.onchange = update); update();
};

const UNIT4_MODELS = [
  {id: 'types', topic: '4.1', title: 'Three ways cells talk', subtitle: 'Pick a signaling type and see how far the signal travels.', kind: 'signaltypes', check: 'Insulin is made in the pancreas but acts on muscle cells. Which type of signaling is it?', answer: 'Endocrine. The hormone travels through the blood to distant target cells.'},
  {id: 'pathway', topic: '4.3', title: 'Follow a signal, then break it', subtitle: 'The epinephrine pathway in a liver cell, and what happens when one step changes.', kind: 'pathway', check: 'A drug blocks the G protein. Is cAMP made?', answer: 'No. Steps after the block stop: adenylyl cyclase is never activated, so no cAMP, and no glucose is released.'},
  {id: 'glucose', topic: '4.4', title: 'Blood glucose on autopilot', subtitle: 'Drag the glucose level and watch negative feedback respond.', kind: 'glucose', check: 'Why is insulin release an example of negative feedback?', answer: 'High glucose causes insulin release, and insulin lowers glucose. The response opposes the change and returns it to the set point.'},
  {id: 'mitosis', topic: '4.5', title: 'Step through the cell cycle', subtitle: 'From G1 to two identical daughter cells.', kind: 'mitosis', check: 'In which phase is DNA copied, and in which are sister chromatids separated?', answer: 'DNA is copied in S phase (interphase). Sister chromatids separate in anaphase.'},
  {id: 'checkpoint', topic: '4.6', title: 'Cyclins, CDKs and checkpoints', subtitle: 'Raise the cyclin level, add DNA damage and break the safety systems.', kind: 'checkpoint', check: 'What two things must fail for a damaged cell to become cancerous?', answer: 'The checkpoint must fail to stop it, and the cell must avoid apoptosis.'}
];

// Interactive models from other websites (opened in a new tab).
const WEB_MODELS_U3 = [
  {topic: '3.3', title: 'Enzyme simulation', source: 'Biology Simulations', url: 'https://www.biologysimulations.com/enzymes', task: 'Change temperature, pH, enzyme and substrate amounts, then run trials and compare reaction rates.'},
  {topic: '3.5', title: 'Photosynthesis Click & Learn', source: 'HHMI BioInteractive', url: 'https://www.biointeractive.org/classroom-resources/photosynthesis', task: 'Seven short animated parts that zoom into a leaf, a chloroplast, the light reactions and the Calvin cycle.'},
  {topic: '3.6', title: 'Cellular respiration hub', source: 'HHMI BioInteractive', url: 'https://www.biointeractive.org/classroom-resources/cellular-respiration-hub', task: 'Interactive diagram and animations of glycolysis, the Krebs cycle and the electron transport chain.'}
];
const WEB_MODELS_U4 = [
  {topic: '4.1', title: 'Cell communication', source: 'Learn.Genetics (University of Utah)', url: 'https://learn.genetics.utah.edu/content/cells/cellcom/', task: 'Interactive pages on how cells send and receive signals, with receptors and responses.'},
  {topic: '4.2', title: 'Growth factors and signal transduction', source: 'HHMI BioInteractive', url: 'https://www.biointeractive.org/classroom-resources/cancer-storyline', task: 'Open Lesson 9, "How do growth factors cause cell division?", where growth factors act as ligands that start signaling cascades.'},
  {topic: '4.3', title: 'VEGF animation', source: 'HHMI BioInteractive', url: 'https://www.biointeractive.org/classroom-resources/vegf', task: 'Watch how tumors use a signaling protein (VEGF) to recruit blood vessels.'},
  {topic: '4.5', title: 'Unit 4 collection', source: 'HHMI BioInteractive', url: 'https://www.biointeractive.org/taxonomy/term/534', task: 'BioInteractive\'s AP Unit 4 resources, including "The Eukaryotic Cell Cycle and Cancer" Click & Learn on phases, checkpoints and regulators.'},
  {topic: '4.6', title: 'Cell division and cancer risk', source: 'HHMI BioInteractive', url: 'https://www.biointeractive.org/classroom-resources/cell-division-and-cancer-risk', task: 'Analyze data on how the number of cell divisions in a tissue relates to its cancer risk.'}
];
