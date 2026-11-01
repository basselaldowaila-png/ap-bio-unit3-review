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
  topics:TOPICS, questions:Q, cards:CARDS, frqs:FRQ, models:UNIT3_MODELS, test:TEST, videos:VIDEOS, webModels:WEB_MODELS_U3, defaultQuizMode:'enzymes',
  videoIntro:'Five videos by Gabe Poser (PoseKnows Biology), in order. For each one: watch it, read the key points, answer the quick check out loud, then tick it off. After all five, go to Quiz and Test Prep.',
  scope:'Your class topics 3.1–3.5 · Enzymes through photosynthesis'
});
registerUnit({
  id:'unit4', title:'Cell Communication & Cell Cycle', label:'Unit 4 · Cell Communication & Cell Cycle',
  description:'Watch, learn, then practice: signals, feedback and how cells divide.',
  storageKey:'apbio4', viewKey:'apbio4view', guideTemplate:'guide-unit4', sourcesTemplate:'sources-unit4',
  topics:TOPICS_U4, questions:Q_U4, cards:CARDS_U4, frqs:FRQ_U4, models:UNIT4_MODELS, webModels:WEB_MODELS_U4, test:null, videos:VIDEOS_U4, defaultQuizMode:'hard',
  videoIntro:'Six videos by Gabe Poser (PoseKnows Biology), in order. For each one: watch it, read the key points, answer the quick check out loud, then tick it off. After all six, go to Quiz.',
  scope:'Topics 4.1–4.6 · Cell communication through cell cycle regulation'
});
