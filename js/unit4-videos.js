// Gabe Poser (PoseKnows Biology) Unit 4 videos, "Updated 2025-2026" series.
// Same format as js/videos.js. Key points are our own summaries of each video, not transcripts.
const VIDEOS_U4 = [
{
  id:'2TDUrMFwulI', poser:'4.1', topic:'4.1', classTopics:'Topic 4.1',
  title:'Cell Communication', length:'14:29',
  goal:'Name the three ways cells signal each other and give an example of each.',
  chapters:[[5,'Unit 4 intro'],[51,'Why cells communicate'],[97,'Three types of signaling'],[142,'Direct contact (immune cells)'],[278,'Local signaling: synapses'],[369,'Plants close their stomata'],[416,'Quorum sensing'],[507,'Morphogens'],[555,'Endocrine signaling'],[601,'Insulin'],[647,'Growth hormone and thyroid'],[692,'Estrogen and testosterone'],[784,'Recap']],
  points:[
    'Every living thing needs cell communication: single-celled bacteria respond to their surroundings, and in a body, cells must coordinate tissues, organs and organ systems.',
    '<b>Direct contact:</b> cells touch, and proteins on one cell\'s surface bind proteins on the other. Example: immune cells like <b>helper T and killer T cells</b> signal each other this way to start an immune response.',
    '<b>Local signaling:</b> a cell releases chemicals that affect cells <b>nearby</b>. The classic example is <b>neurotransmitters</b> crossing the <b>synapse</b> between two neurons and binding receptors on the next neuron.',
    'More local examples: plants release chemicals that <b>close their stomata</b> when pathogens attack; <b>morphogens</b> form concentration gradients that guide how an embryo develops (one is called Sonic Hedgehog).',
    '<b>Quorum sensing:</b> bacteria release a chemical as they divide. A <b>high concentration</b> means the colony is crowded, which tells the bacteria to <b>stop dividing</b>.',
    '<b>Long-distance (endocrine) signaling:</b> glands release <b>hormones</b> that travel through the <b>blood</b> to distant target cells.',
    'Hormone examples: <b>insulin</b> from the pancreas tells cells to absorb glucose and lowers blood sugar; <b>growth hormone</b> from the pituitary; <b>thyroid hormones</b> (metabolism); <b>estrogen</b> and <b>testosterone</b>.',
    'You don\'t need to memorize every hormone. Know the <b>three types of signaling</b> and one example of each.'
  ],
  vocab:[['Direct contact signaling','Signaling between touching cells through surface proteins.'],['Local signaling','Chemicals acting on nearby cells (e.g., neurotransmitters).'],['Endocrine signaling','Hormones carried in the blood to distant cells.'],['Hormone','A long-distance chemical signal.'],['Quorum sensing','Bacteria sensing their population density from a released chemical.'],['Synapse','The small gap between two neurons.']],
  note:'On exams, the type of signaling depends on <b>distance</b> and <b>how the signal travels</b>: touching (direct), short distance (local) or through the blood (endocrine).',
  check:[
    ['A neuron releases a chemical that crosses a tiny gap to the next neuron. Which type of signaling is this?','Local signaling (neurotransmitters crossing a synapse).'],
    ['Why do bacteria in a crowded colony stop dividing?','Quorum sensing: the chemical they release reaches a high concentration, which signals them to stop dividing.'],
    ['Insulin is made in the pancreas but acts on liver cells. What type of signaling is this?','Endocrine (long-distance) signaling, because the hormone travels through the blood.']
  ]
},
{
  id:'s40dVRFqo98', poser:'4.2', topic:'4.2', classTopics:'Topic 4.2',
  title:'Introduction to Signal Transduction', length:'17:06',
  goal:'Explain how a signal outside the cell turns into a response inside it.',
  chapters:[[2,'Intro'],[94,'From signal to response'],[140,'What signal transduction is'],[230,'Ligands and receptors'],[320,'Receptor domains'],[411,'Intracellular receptors and GPCRs'],[501,'Kinases'],[638,'Phosphorylation cascades'],[683,'Second messengers (fight or flight)'],[774,'cAMP'],[868,'Ligand-gated ion channels'],[913,'Recap']],
  points:[
    '<b>Signal transduction</b> connects <b>reception → transduction → response</b>. He compares it to a relay race: the message is passed from molecule to molecule until the cell responds.',
    'A <b>ligand</b> (the chemical signal) binds a <b>specific receptor</b>, just like an enzyme and its substrate. Insulin only binds insulin receptors.',
    'A membrane receptor has a <b>ligand-binding domain</b> outside the cell and an <b>intracellular domain</b> inside. Ligand binding changes the receptor\'s shape, which starts the pathway.',
    'Some ligands pass through the membrane and bind <b>intracellular receptors</b> inside the cell. These often change <b>gene expression</b>.',
    '<b>GPCRs (G-protein-coupled receptors):</b> when the ligand binds, the receptor activates a <b>G protein</b> on the inside of the membrane.',
    '<b>Kinases</b> are enzymes that move a <b>phosphate</b> from ATP onto another protein (<b>phosphorylation</b>), switching it on. In a <b>phosphorylation cascade</b>, each kinase activates the next.',
    '<b>Second messengers</b> such as <b>cAMP</b> are small molecules made in large amounts. <b>Adenylyl cyclase</b> turns ATP into cAMP. This <b>amplifies</b> the signal and can activate many pathways at once (epinephrine, fight or flight).',
    '<b>Ligand-gated ion channels</b> are receptors that open (or close) when a ligand binds, letting ions flow in by facilitated diffusion.'
  ],
  vocab:[['Ligand','The signal molecule that binds a receptor.'],['Receptor','A protein that binds a specific ligand.'],['Signal transduction','The steps between receiving a signal and responding.'],['Kinase','An enzyme that adds a phosphate from ATP to another protein.'],['Second messenger','A small molecule (like cAMP) that relays and amplifies a signal.'],['GPCR','A receptor that activates a G protein when a ligand binds.']],
  note:'The video says the G protein and adenylyl cyclase are activated "by phosphorylation." More precisely: the activated receptor makes the G protein swap <b>GDP for GTP</b>, and the active G protein then switches on <b>adenylyl cyclase</b>. Use that version on the exam.',
  check:[
    ['What changes in a receptor when its ligand binds?','Its shape changes, especially the intracellular domain, which starts the transduction pathway.'],
    ['What do kinases do?','They transfer a phosphate from ATP to another protein, activating it.'],
    ['How does cAMP amplify a signal?','Many cAMP molecules are made from one signal, and each can activate other proteins, so one signal causes a large response.']
  ]
},
{
  id:'X5kFTeCOOuw', poser:'4.3', topic:'4.3', classTopics:'Topic 4.3',
  title:'Signal Transduction Pathways', length:'21:28',
  goal:'Describe the kinds of responses signals cause and predict what happens when a pathway is changed.',
  chapters:[[2,'Intro'],[140,'Signals change gene expression'],[277,'Cell differentiation'],[322,'Apoptosis'],[368,'When pathways are altered'],[415,'Tetrodotoxin and anthrax'],[552,'Quorum sensing and gene expression'],[644,'Epinephrine pathway'],[779,'G protein → adenylyl cyclase → cAMP'],[871,'Glycogen phosphorylase'],[916,'Cytokines'],[1007,'Yeast pheromones (shmoo)'],[1143,'Ethylene and ripening'],[1188,'Recap']],
  points:[
    'A cell doesn\'t "decide" anything. Its response is a <b>chain of chemical reactions</b>.',
    'Responses to a signal include <b>changes in gene expression</b> (which proteins are made), <b>changes in cell function</b>, and <b>apoptosis</b> (programmed cell death).',
    '<b>Cell differentiation:</b> all your cells have the same DNA, but signals tell each cell which genes to express, so it becomes a specific type (bone, blood, muscle).',
    'If a <b>receptor, kinase or other pathway protein</b> is changed by a <b>mutation</b> or blocked by a <b>chemical</b>, the response can stop, change or happen when it shouldn\'t.',
    'Examples: <b>tetrodotoxin</b> (puffer fish) blocks voltage-gated ion channels so neurons can\'t fire; an <b>anthrax</b> toxin interferes with <b>adenylyl cyclase</b>, so cAMP signaling breaks down.',
    '<b>Epinephrine pathway</b> (understand it, don\'t memorize every step): epinephrine binds a <b>GPCR</b> → G protein activated → <b>adenylyl cyclase</b> makes <b>cAMP</b> → cAMP activates a <b>protein kinase</b> → kinase activates <b>glycogen phosphorylase</b> → glycogen broken into <b>glucose</b> → more ATP for fight or flight.',
    'More examples of signals changing gene expression: <b>quorum sensing</b> in bacteria, <b>cytokines</b> starting an inflammatory response, <b>yeast pheromones</b> preparing cells to mate ("shmoo" formation), and <b>ethylene</b> making fruit ripen.'
  ],
  vocab:[['Gene expression','Using a gene to make its protein.'],['Differentiation','A cell becoming specialized by expressing certain genes.'],['Apoptosis','Programmed cell death triggered by a signal.'],['Cytokines','Signals used by immune cells to start inflammation.'],['Pheromone','A chemical signal sent to other individuals.'],['Glycogen phosphorylase','Enzyme that breaks glycogen into glucose.']],
  note:'Exam questions love "what if this step is blocked?" Rule: everything <b>after</b> the blocked step stops; steps <b>before</b> it still happen.',
  check:[
    ['A drug blocks adenylyl cyclase. Epinephrine still binds its receptor. Does glycogen get broken down?','No. Without adenylyl cyclase, no cAMP is made, so the kinase and glycogen phosphorylase are never activated.'],
    ['How can two cells with identical DNA become different cell types?','Different signals cause them to express different genes and make different proteins.'],
    ['Name three possible responses to a signal.','A change in gene expression, a change in cell function, or apoptosis.']
  ]
},
{
  id:'mL2-1dGD-Cc', poser:'4.4', topic:'4.4', classTopics:'Topic 4.4',
  title:'Feedback', length:'20:49',
  goal:'Tell negative from positive feedback and walk through blood glucose regulation.',
  chapters:[[2,'Intro'],[48,'Homeostasis'],[183,'What feedback is'],[229,'Sensor, control center, effector'],[411,'Getting hot: sweating'],[456,'Negative feedback'],[502,'Blood glucose'],[592,'Insulin'],[684,'Glucagon'],[775,'Positive feedback'],[867,'Blood clotting'],[913,'Lactation'],[1003,'Childbirth'],[1139,'Ethylene ripening'],[1184,'Recap']],
  points:[
    '<b>Homeostasis</b> means keeping internal conditions (temperature, pH, solute concentrations, water) close to a <b>set point</b>. It\'s a <b>dynamic equilibrium</b>: it wobbles up and down, like walking a balance beam.',
    'A feedback loop: <b>stimulus → sensor (receptor) → control center</b> (often the brain\'s hypothalamus, which compares to the set point) <b>→ effector → response</b>.',
    '<b>Negative feedback</b> does the <b>opposite</b> of the stimulus and returns things to the set point. "Negative" doesn\'t mean bad. Example: too cold → muscles <b>shiver</b>; too hot → <b>sweat</b> glands cool you.',
    '<b>High blood glucose</b> (after a soda): <b>beta cells</b> in the pancreas release <b>insulin</b> → liver and body cells take in glucose → blood glucose drops.',
    '<b>Low blood glucose</b> (skipped breakfast): <b>alpha cells</b> in the pancreas release <b>glucagon</b> → the liver breaks down <b>glycogen</b> and releases glucose → blood glucose rises.',
    '<b>Positive feedback</b> <b>amplifies</b> the stimulus, moving further from the set point to finish a job fast. It cycles until the task is done.',
    'Positive feedback examples: <b>blood clotting</b> (platelets release clotting factors that cause more clotting), <b>lactation</b> (suckling → oxytocin → more milk), <b>childbirth</b> (pressure on cervix → oxytocin → contractions → more pressure), <b>fruit ripening</b> (ethylene).'
  ],
  vocab:[['Homeostasis','Keeping internal conditions stable near a set point.'],['Set point','The normal target value (e.g., 37 °C).'],['Negative feedback','A response that counteracts the change.'],['Positive feedback','A response that amplifies the change.'],['Insulin','Hormone from beta cells that lowers blood glucose.'],['Glucagon','Hormone from alpha cells that raises blood glucose.']],
  note:'Quick test: if the response pushes the variable <b>back toward normal</b>, it\'s negative feedback. If it pushes it <b>further the same way</b>, it\'s positive feedback.',
  check:[
    ['After a big meal, which hormone rises and what does it do?','Insulin rises; it makes cells take in glucose, lowering blood glucose.'],
    ['Why is childbirth an example of positive feedback?','Contractions push the baby against the cervix, which causes more oxytocin and stronger contractions, amplifying until birth.'],
    ['What does "negative" mean in negative feedback?','The response opposes (counteracts) the stimulus, returning the variable to the set point.']
  ]
},
{
  id:'h8Cc9u0Ozjc', poser:'4.5', topic:'4.5', classTopics:'Topic 4.5',
  title:'Cell Cycle', length:'17:51',
  goal:'Describe each phase of the cell cycle and of mitosis in order.',
  chapters:[[2,'What the cell cycle is'],[92,'Checkpoints and go-ahead signals'],[137,'Interphase: G1, S, G2'],[274,'G0'],[319,'What mitosis is'],[409,'Growth, repair, asexual reproduction'],[455,'Phases overview'],[500,'Prophase'],[591,'Chromatin, chromosomes, sister chromatids'],[773,'Metaphase'],[818,'Anaphase'],[863,'Telophase'],[909,'Cytokinesis'],[955,'Recap']],
  points:[
    'The <b>cell cycle</b> is the growth and division cycle of a <b>eukaryotic</b> cell. A cell needs a <b>go-ahead signal</b> to move to each next stage.',
    '<b>Interphase</b> is most of a cell\'s life (about 87%). <b>G1:</b> the cell grows, copies organelles and does its job. <b>S:</b> DNA is replicated. <b>G2:</b> the cell makes proteins, ATP and centrosomes to get ready to divide.',
    '<b>G0:</b> a non-dividing state. Very specialized cells like most <b>neurons</b> and <b>muscle cells</b> stay here. Some G0 cells can re-enter G1 if signaled.',
    '<b>Mitosis</b> divides the nucleus so one cell becomes <b>two genetically identical daughter cells</b>. It\'s used for <b>growth</b>, <b>tissue repair</b> (skin, blood, gut lining) and <b>asexual reproduction</b>.',
    'Loose DNA (<b>chromatin</b>) is packed around <b>histone</b> proteins into <b>chromosomes</b> before division. After S phase, each chromosome is two identical <b>sister chromatids</b> joined at the <b>centromere</b>. Don\'t mix that up with the <b>centrosome</b>, which builds the spindle.',
    '<b>Prophase:</b> chromosomes condense, the <b>spindle</b> forms, centrosomes move to opposite poles, the <b>nuclear envelope breaks down</b>. <b>Metaphase:</b> chromosomes <b>line up in the middle</b> (easiest to spot under a microscope).',
    '<b>Anaphase:</b> sister chromatids are <b>pulled apart</b> to opposite poles (the shortest phase). <b>Telophase:</b> nuclear envelopes reform and the spindle breaks down. <b>Cytokinesis:</b> the cytoplasm splits: a <b>cleavage furrow</b> in animal cells, a <b>cell plate</b> in plant cells.'
  ],
  vocab:[['Interphase','G1 + S + G2, when the cell grows and copies its DNA.'],['S phase','When DNA is replicated.'],['G0','Non-dividing state.'],['Sister chromatids','Two identical copies of a chromosome joined at the centromere.'],['Centromere','Where sister chromatids are joined.'],['Cytokinesis','Splitting of the cytoplasm into two cells.']],
  note:'Order trick for mitosis: <b>P-M-A-T</b> (Prophase, Metaphase, Anaphase, Telophase), then cytokinesis. DNA is copied in <b>S phase</b>, not during mitosis.',
  check:[
    ['In which phase is DNA copied?','S phase of interphase.'],
    ['What happens in anaphase?','Sister chromatids are pulled apart to opposite ends of the cell.'],
    ['Why are most neurons in G0?','They are highly specialized and no longer need to divide.']
  ]
},
{
  id:'tmZk9KvxtrU', poser:'4.6', topic:'4.6', classTopics:'Topic 4.6',
  title:'Regulation of the Cell Cycle', length:'11:59',
  goal:'Explain how checkpoints, cyclins and CDKs control the cycle, and how failure leads to cancer.',
  chapters:[[5,'Intro'],[50,'Why regulation matters'],[95,'Checkpoints: G1, G2, M'],[187,'Cyclins'],[278,'Cyclin-dependent kinases'],[369,'When checkpoints fail'],[460,'Apoptosis'],[505,'Cancer'],[642,'Recap']],
  points:[
    'Dividing <b>too much</b> or <b>too little</b> are both harmful, so the cell cycle is tightly regulated.',
    '<b>Checkpoints:</b> <b>G1</b> (before DNA is copied), <b>G2</b> (before mitosis starts), and <b>M</b> (between metaphase and anaphase, making sure chromosomes are ready to split evenly).',
    'Checkpoints are <b>signal transduction pathways</b>; the cell isn\'t "checking" by thinking.',
    '<b>Cyclins</b> are proteins whose levels rise and fall at specific points in the cycle (for example, cyclin E rises in G1).',
    'When a cyclin reaches a high enough level, it binds and activates a <b>cyclin-dependent kinase (CDK)</b>. The CDK phosphorylates target proteins that push the cell into the next phase.',
    'If a checkpoint fails, the cell may receive a signal for <b>apoptosis</b> (programmed cell death), a built-in safety switch.',
    'If checkpoints fail <b>and</b> the cell ignores apoptosis, it divides uncontrollably: <b>cancer</b>. Cancer cells can form <b>tumors</b> and <b>metastasize</b> (spread) through the blood or lymph. Cancer isn\'t an invader; it\'s your own cells losing control.'
  ],
  vocab:[['Checkpoint','A control point where the cell must get a go-ahead to continue.'],['Cyclin','A protein whose level rises and falls through the cycle.'],['CDK','Cyclin-dependent kinase; active only when bound to a cyclin.'],['Apoptosis','Programmed cell death.'],['Cancer','Uncontrolled cell division from failed regulation.'],['Metastasis','Cancer cells spreading to other parts of the body.']],
  note:'Cyclin vs. CDK: <b>CDK levels stay fairly constant</b>; <b>cyclin levels rise and fall</b>. The CDK only works when enough cyclin is bound to it.',
  check:[
    ['What activates a CDK?','Binding to its cyclin once the cyclin reaches a high enough concentration.'],
    ['What is the M checkpoint making sure of?','That chromosomes are properly attached and lined up before sister chromatids separate in anaphase.'],
    ['What two failures lead to cancer?','Checkpoints fail to stop division, and the cell avoids apoptosis.']
  ]
}
];
