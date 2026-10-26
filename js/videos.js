// Gabe Poser (PoseKnows Biology) Unit 3 videos, "Updated 2025-2026" series.
// Notes are summarized in our own words from each video. Timestamps are [seconds, label].
// `topic` is the color/topic key used on this site; `poser` is the number Mr. Poser uses.
// Mr. Poser follows the current College Board numbering, so his 3.1 covers this site's 3.1 + 3.2,
// and his 3.5 (cellular respiration) is new material this site files under "3.6".
const VIDEOS = [
{
  id:'gO_7AwGL2nQ', poser:'3.1', topic:'3.1', classTopics:'Site topics 3.1 + 3.2',
  title:'Enzymes', length:'13:54',
  goal:'Know what an enzyme is, how it speeds up a reaction, and why each enzyme only works on one substrate.',
  chapters:[[0,'Unit 3 overview'],[50,'What enzymes are'],[187,'Activation energy (catalase + liver demo)'],[278,'Energy graph and the "hill" analogy'],[323,'Metabolism'],[368,'Lactase example'],[459,'Substrate, active site, enzyme–substrate complex'],[594,'Enzymes are reusable'],[640,'One enzyme, one reaction (lock and key)'],[730,'Recap']],
  points:[
    'Life is a huge set of chemical reactions. Enzymes let a cell control <b>when and where</b> each reaction happens. All the reactions together are called <b>metabolism</b>.',
    'Enzymes are <b>proteins</b> that act as <b>biological catalysts</b>: they speed up reactions.',
    'They work by <b>lowering the activation energy</b>, the energy needed to start a reaction. Think of flattening a hill you have to bike over: you still end up in the same place, it just takes less effort.',
    'Example: <b>catalase</b> (in liver) breaks down hydrogen peroxide. Peroxide alone barely reacts; add a piece of liver and it bubbles right away.',
    'Example: <b>lactase</b> breaks lactose (a disaccharide in milk) into glucose + galactose by hydrolysis. It does that one reaction and nothing else.',
    'The reactants are called <b>substrates</b>. They bind to the <b>active site</b>, forming the <b>enzyme–substrate complex</b>. Then the reaction happens and the <b>products</b> are released.',
    'The active site\'s <b>shape and charge</b> (from the R groups of its amino acids: charged, polar, nonpolar) must match the substrate. That\'s why an enzyme usually catalyzes only <b>one reaction</b>.',
    'Enzymes are <b>not used up</b>. The same enzyme can catalyze the reaction again and again.'
  ],
  vocab:[['Catalyst','Speeds up a reaction without being used up.'],['Activation energy','Energy needed to start a reaction. Enzymes lower it.'],['Substrate','The reactant an enzyme binds.'],['Active site','Pocket on the enzyme where the substrate binds.'],['Enzyme–substrate complex','The enzyme and substrate bound together.']],
  note:'Mr. Poser uses the lock-and-key model. For the AP exam, also know <b>induced fit</b>: the active site shifts slightly to grip the substrate (see the Study Guide, topic 3.1).',
  check:[
    ['An enzyme makes a reaction go faster. Does it add energy to the reaction?','No. It lowers the activation energy. The energy of the reactants and products stays the same.'],
    ['Why can\'t lactase break down a protein?','Its active site\'s shape and charge only fit lactose. A protein can\'t bind there.'],
    ['After lactase finishes one reaction, what happens to it?','Nothing; it\'s unchanged and can catalyze another reaction. Enzymes are reusable.']
  ]
},
{
  id:'ztmV1fBVvYo', poser:'3.2', topic:'3.3', classTopics:'Site topic 3.3',
  title:'Environmental Impacts on Enzyme Function', length:'17:13',
  goal:'Explain what speeds enzymes up, what slows them down, and what denaturation is.',
  chapters:[[0,'Intro'],[49,'Structure = function review'],[233,'Optimal temperature and pH'],[323,'Temperature graph'],[414,'pH graph (pepsin)'],[460,'Denaturation'],[596,'More substrate or more enzyme'],[688,'Temperature and collisions'],[778,'Inhibitors'],[824,'Competitive inhibitor'],[871,'Allosteric (noncompetitive) inhibitor'],[918,'Recap']],
  points:[
    'An enzyme only works if it keeps its <b>shape</b>. Its shape depends on how its amino acids fold and the hydrogen bonds holding it together.',
    'Each enzyme has an <b>optimal temperature and pH</b> where it works best. On his graph, a human enzyme peaks around <b>40 °C</b> (body temp is about 37 °C) and drops to zero by about 70 °C.',
    'Different enzymes have different pH optimums. <b>Pepsin</b> in the very acidic stomach works best at a low pH.',
    'A little off the optimum = slower. Far off = <b>denaturation</b>: heat or pH breaks the <b>hydrogen bonds</b>, the protein unfolds, and it stops working. Denaturation is <b>sometimes reversible</b>, but often not ("cooked").',
    'Reactions go <b>faster</b> when enzymes and substrates collide more: add <b>more substrate</b>, add <b>more enzyme</b>, or <b>raise the temperature</b> (molecules move faster).',
    'There\'s a limit. Adding substrate only helps until every enzyme is busy (the max rate, <b>Vmax</b>). Raising temperature only helps until the enzyme denatures.',
    '<b>Inhibitors</b> slow reactions down. Cells use them to control their enzymes.',
    '<b>Competitive inhibitor:</b> binds the <b>active site</b> and blocks the substrate.',
    '<b>Allosteric / noncompetitive inhibitor:</b> binds a different spot (the <b>allosteric site</b>), changes the enzyme\'s shape, so the substrate no longer fits.'
  ],
  vocab:[['Optimum','The temperature or pH where an enzyme is most active.'],['Denaturation','Protein loses its shape (hydrogen bonds break) and stops working.'],['Vmax','The maximum rate once all enzymes are busy.'],['Competitive inhibitor','Binds the active site.'],['Allosteric site','A spot on the enzyme other than the active site.']],
  note:'The "relationship" he couldn\'t remember the name of is Michaelis–Menten kinetics. You don\'t need the name for AP Bio; just know the rate levels off when enzymes are saturated.',
  check:[
    ['A human enzyme is heated to 70 °C and stops working. What happened?','It denatured. Heat broke the hydrogen bonds holding its shape, so the active site no longer fits the substrate.'],
    ['Name three ways to speed up an enzyme reaction.','Add more substrate, add more enzyme, or raise the temperature (up to the optimum). All three increase collisions.'],
    ['How is a competitive inhibitor different from an allosteric inhibitor?','Competitive binds the active site and blocks it. Allosteric binds a different site and changes the enzyme\'s shape.']
  ]
},
{
  id:'qtcGnXxebss', poser:'3.3', topic:'3.4', classTopics:'Site topic 3.4',
  title:'Cellular Energy', length:'11:33',
  goal:'Use the laws of thermodynamics to explain why living things need constant energy, and how cells save energy.',
  chapters:[[0,'Intro'],[48,'What living things need'],[139,'First law of thermodynamics'],[184,'Second law (entropy, heat loss)'],[278,'Energy input must beat output'],[369,'Metabolic pathways'],[460,'Energy coupling'],[551,'Shared pathways = common ancestry'],[598,'Recap']],
  points:[
    'Living things are highly ordered. They must take in nutrients, get rid of waste, be made of cells, keep a stable inside, and <b>take in more energy than they use</b>.',
    '<b>First law:</b> energy can\'t be created or destroyed, only <b>transformed</b>. Example: photosynthesis turns light energy into energy stored in chemical bonds.',
    '<b>Second law:</b> every energy transformation increases disorder (<b>entropy</b>). No transformation is 100% efficient; some energy is always lost as <b>heat</b>.',
    'Because energy is always being used <i>and</i> lost, <b>energy input must be greater than output</b>. If energy flow stops, the organism dies.',
    '<b>Metabolic pathways:</b> reactions happen in a sequence, each step run by its own enzyme. The <b>product of one reaction is the reactant of the next</b> (A → B → C). This saves energy.',
    '<b>Energy coupling:</b> a reaction that <b>releases</b> energy (exergonic) is paired with one that <b>needs</b> energy (endergonic), so released energy isn\'t wasted.',
    'Some pathways, like <b>glycolysis</b> and <b>oxidative phosphorylation</b>, are found in all three domains (Archaea, Bacteria, Eukarya). That\'s evidence of <b>common ancestry</b>.'
  ],
  vocab:[['First law','Energy is conserved; it only changes form.'],['Entropy','Disorder. Every energy transfer increases it.'],['Metabolic pathway','A chain of reactions where each product feeds the next step.'],['Energy coupling','Using an energy-releasing reaction to power an energy-requiring one.'],['Exergonic / endergonic','Releases energy / requires energy.']],
  note:'The most common example of energy coupling on the exam is <b>ATP hydrolysis</b> powering an endergonic reaction (see Study Guide, topic 3.4).',
  check:[
    ['Why does an organism die if it stops eating for too long?','Energy is constantly used and lost as heat (2nd law). If input stops being greater than output, cells can\'t power their processes.'],
    ['In A → B → C, what is B?','The product of the first reaction and the reactant (substrate) of the second.'],
    ['Why do all living things having glycolysis matter?','It suggests all life shares a common ancestor.']
  ]
},
{
  id:'iuaUjv_ryJs', poser:'3.4', topic:'3.5', classTopics:'Site topic 3.5',
  title:'Photosynthesis', length:'23:27',
  goal:'Trace how light energy becomes ATP and NADPH in the light reactions, and how the Calvin cycle uses them to make sugar.',
  chapters:[[0,'What photosynthesis is'],[94,'The overall equation'],[139,'Cyanobacteria and the oxygen atmosphere'],[229,'Two stages: overview'],[411,'Light reactions vs. Calvin cycle'],[456,'Chloroplast: thylakoids, grana, stroma'],[546,'Electron transport chain + photophosphorylation'],[682,'The thylakoid membrane setup'],[728,'Photosystem II excites an electron'],[819,'Splitting water makes O₂'],[911,'Pumping H⁺ into the thylakoid'],[1002,'ATP synthase and chemiosmosis'],[1093,'Photosystem I and NADPH'],[1185,'Recap']],
  points:[
    'Photosynthesis uses <b>CO₂, water and light</b> to make <b>carbohydrates</b> (sugar) and <b>O₂</b>. Overall: 6 CO₂ + 6 H₂O + light → C₆H₁₂O₆ + 6 O₂. This is a summary of many reactions, not one.',
    'Plants, algae and <b>cyanobacteria</b> photosynthesize. Photosynthesis <b>first evolved in prokaryotes</b> (cyanobacteria), and they made Earth\'s oxygen-rich atmosphere (about 21% O₂).',
    'Two stages. <b>Light reactions</b> (need light) happen on the <b>thylakoid membranes</b>; stacks of thylakoids are <b>grana</b>. The <b>Calvin cycle</b> happens in the <b>stroma</b>, the fluid around them.',
    '<b>1.</b> Chlorophyll in <b>Photosystem II</b> absorbs light. The energy <b>excites an electron</b> to a high-energy state.',
    '<b>2.</b> That electron is replaced by <b>splitting water</b>. Water gives up electrons and H⁺, and what\'s left is <b>O₂</b>. The oxygen we breathe comes from water.',
    '<b>3.</b> The excited electron moves down the <b>electron transport chain</b>. Its energy powers a pump that pushes <b>H⁺ from the stroma into the thylakoid</b>, building a proton gradient.',
    '<b>4.</b> H⁺ flows back out through <b>ATP synthase</b>, which uses that flow to add a phosphate to ADP → <b>ATP</b>. Using a gradient this way is <b>chemiosmosis</b> (photophosphorylation).',
    '<b>5.</b> <b>Photosystem I</b> absorbs more light and re-excites the electron. <b>NADP reductase</b> uses it to turn NADP⁺ into <b>NADPH</b>, an electron carrier.',
    '<b>6.</b> The <b>Calvin cycle</b> uses the energy in <b>ATP</b> and electrons from <b>NADPH</b> to <b>fix CO₂</b> into sugar. You don\'t need to memorize its steps.'
  ],
  vocab:[['Thylakoid','Disc-shaped membrane in the chloroplast; light reactions happen here.'],['Stroma','Fluid in the chloroplast; Calvin cycle happens here.'],['Chlorophyll','Green pigment that absorbs light in the photosystems.'],['NADPH','Electron carrier (reducing agent) made by the light reactions.'],['Chemiosmosis','Using H⁺ flowing down its gradient (through ATP synthase) to make ATP.'],['Carbon fixation','Turning CO₂ from the air into organic molecules.']],
  note:'He calls the Calvin cycle the "dark reactions" and says it makes glucose. More precisely, it\'s <b>light-independent</b> (it still needs ATP and NADPH from the light reactions) and its direct product is the 3-carbon sugar <b>G3P</b>, used to build glucose.',
  check:[
    ['Where does the O₂ released by plants come from?','From water, split at Photosystem II.'],
    ['Which two molecules from the light reactions power the Calvin cycle?','ATP (energy) and NADPH (electrons).'],
    ['If the thylakoid membrane leaked H⁺, what would stop being made?','ATP. ATP synthase needs the H⁺ gradient (chemiosmosis).']
  ]
},
{
  id:'1iYUXH9R1fM', poser:'3.5', topic:'3.6', classTopics:'New: cellular respiration',
  title:'Cellular Respiration', length:'21:17',
  goal:'Describe glycolysis, the Krebs cycle and the electron transport chain, and explain why cells need oxygen.',
  chapters:[[0,'What cellular respiration is'],[47,'The three stages'],[92,'Mitochondria anatomy'],[182,'NADH and FADH₂'],[228,'Redox: OIL RIG'],[412,'Glycolysis'],[503,'Fermentation'],[595,'Krebs cycle'],[686,'Electron transport chain overview'],[868,'ETC step by step'],[1004,'ATP synthase'],[1049,'Oxygen: the final electron acceptor'],[1095,'Recap']],
  points:[
    'Cellular respiration uses glucose (and other carbohydrates) to make <b>ATP</b>, through enzyme-run reactions. <b>All living things</b> do some form of it.',
    'Mitochondria have a smooth <b>outer membrane</b>, an <b>intermembrane space</b>, a highly folded <b>inner membrane</b> (more folds = more surface area = more ATP), and the <b>matrix</b> inside.',
    '<b>Redox:</b> <b>OIL RIG</b> = Oxidation Is Loss, Reduction Is Gain (of electrons). NAD⁺ gains an electron → <b>NADH</b>. NADH and FADH₂ are <b>electron carriers</b> that drop electrons off elsewhere.',
    '<b>1. Glycolysis</b> (cytosol, <b>no O₂ needed</b>): glucose → <b>pyruvate</b>, making <b>2 ATP</b> and NADH.',
    '<b>Fermentation:</b> without oxygen, cells rely on glycolysis alone. Yeast make <b>ethanol</b>; your muscles make <b>lactic acid</b> when short on oxygen. (It also recycles NAD⁺ so glycolysis can keep going.)',
    '<b>2. Krebs cycle</b> (mitochondrial <b>matrix</b>, if O₂ is present): pyruvate is broken down, releasing <b>CO₂</b> (what you breathe out). It makes a little ATP and lots of <b>NADH and FADH₂</b>.',
    '<b>3. Electron transport chain</b> (<b>inner membrane</b>): NADH and FADH₂ drop off electrons. As electrons pass from protein to protein, their energy <b>pumps H⁺ from the matrix into the intermembrane space</b>.',
    'H⁺ flows back through <b>ATP synthase</b>, making ATP by <b>chemiosmosis</b>. This is <b>oxidative phosphorylation</b> and makes <b>30+ ATP</b> per glucose, far more than glycolysis alone.',
    '<b>Oxygen is the final electron acceptor.</b> It picks up the used electrons plus H⁺ and forms <b>water</b>. Without O₂, electrons back up and the chain stops. That\'s why you breathe.',
    'Aerobic prokaryotes (no mitochondria) run their ETC on the <b>plasma membrane</b>. Endotherms like us can also use this process to make <b>heat</b>.'
  ],
  vocab:[['Glycolysis','Glucose → pyruvate in the cytosol; 2 ATP; no O₂ needed.'],['Krebs cycle','In the matrix; releases CO₂ and makes NADH and FADH₂.'],['Oxidative phosphorylation','ETC + chemiosmosis making most of the ATP.'],['Final electron acceptor','O₂; it combines with electrons and H⁺ to make water.'],['Fermentation','Making ATP from glycolysis only, without O₂.'],['OIL RIG','Oxidation Is Loss, Reduction Is Gain (of electrons).']],
  note:'This topic isn\'t in the Study Guide tab yet (your class numbering stops at 3.5), but it\'s on your test: the Test Prep FRQ is about cellular respiration. Learn this video well.',
  check:[
    ['Why does aerobic respiration make so much more ATP than fermentation?','It fully breaks down glucose and uses the ETC + ATP synthase (oxidative phosphorylation) for 30+ ATP. Fermentation only gets 2 ATP from glycolysis.'],
    ['What does oxygen do in cellular respiration?','It\'s the final electron acceptor at the end of the ETC, combining with electrons and H⁺ to form water.'],
    ['Where does the CO₂ you breathe out come from?','The Krebs cycle, when pyruvate is broken down in the mitochondrial matrix.']
  ]
}
];
