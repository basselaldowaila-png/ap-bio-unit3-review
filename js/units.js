/* Add future units with registerUnit({...}) before app.js loads.
   Only registered units appear; no empty units or future content are created. */
const UNITS = new Map();
function registerUnit(config) {
  if (!config.id || UNITS.has(config.id)) throw new Error('A unit needs a unique id');
  const unit = {models:[], test:null, ...config};
  for (const key of ['topics','questions','cards','frqs']) {
    if (!Array.isArray(unit[key])) throw new Error(`Unit ${unit.id} needs ${key}`);
  }
  if (!document.getElementById(unit.guideTemplate)) throw new Error('Missing guide template');
  UNITS.set(unit.id,unit);
}
registerUnit({
  id:'unit3', title:'Enzymes, Energy & Photosynthesis', label:'Unit 3 · Cellular Energetics',
  description:'Understand the process. Explore a model. Put it into practice.',
  storageKey:'apbio3', viewKey:'apbio3view', guideTemplate:'guide-unit3', sourcesTemplate:'sources-unit3',
  topics:TOPICS, questions:Q, cards:CARDS, frqs:FRQ, models:UNIT3_MODELS, test:TEST,
  scope:'Your class topics 3.1–3.5 · Enzymes through photosynthesis'
});
