// Content for the site. Edit here to add or change questions, flashcards and FRQs.
// Q:     [topic, question, [4 options], correctIndex, explanation]
// CARDS: [topic, term, definition]
// FRQ:   [topic, prompt, modelAnswer]
const TOPICS=[["all","All topics"],["3.1","3.1 Enzyme Structure"],["3.2","3.2 Catalysis"],["3.3","3.3 Environment"],["3.4","3.4 Cellular Energy"],["3.5","3.5 Photosynthesis"]];

const Q=[
// 3.1
["3.1","Which part of an enzyme's structure most directly determines which substrate it binds?",["Its primary structure only","The shape and chemical properties of its active site","The number of peptide bonds","Whether it is found in the cytoplasm"],1,"Substrate binding depends on the active site's 3D shape and the charge/polarity of the R groups lining it. Primary structure matters indirectly, by determining how the protein folds."],
["3.1","An enzyme's active site is lined with negatively charged R groups. Which substrate is most likely to bind?",["A nonpolar lipid","A negatively charged molecule","A positively charged molecule of complementary shape","Any molecule small enough to fit"],2,"Opposite charges attract. The substrate needs a complementary shape AND compatible chemistry; a negatively charged substrate would be repelled."],
["3.1","The induced-fit model states that:",["The active site is rigid and fits only one exact shape","The enzyme changes shape slightly when the substrate binds, improving the fit","The substrate changes the enzyme's primary structure","Enzymes are permanently changed after each reaction"],1,"Binding causes a small shape change that grips the substrate more tightly and strains its bonds. The enzyme returns to its original shape afterward."],
["3.1","A mutation replaces a polar amino acid in the active site with a nonpolar one. The most likely result is:",["The enzyme works faster","The enzyme's ΔG changes","The substrate binds less well because the active site's chemistry changed","No effect, since only shape matters"],2,"Changing an R group's polarity in the active site changes how the substrate interacts with it, so binding and catalysis likely decrease."],
["3.1","A mutation changes an amino acid on the surface of an enzyme far from the active site, and enzyme activity is unchanged. The best explanation is:",["The mutation did not change the folding or shape of the active site","Enzymes don't depend on amino acids","The mutation increased activation energy","The substrate changed shape to compensate"],0,"Not every amino acid change affects function. If the fold and active site stay the same, the enzyme still works."],
["3.1","Ribozymes show that:",["All enzymes are lipids","Some RNA molecules can act as catalysts","Enzymes are consumed in reactions","Proteins cannot be catalysts"],1,"Ribozymes are catalytic RNA, such as the rRNA in the ribosome that forms peptide bonds."],
// 3.2
["3.2","Enzymes increase the rate of a reaction by:",["Increasing the free energy of the products","Lowering the activation energy","Making ΔG more negative","Adding energy to the reactants"],1,"Enzymes lower E_A by stabilizing the transition state. They don't change ΔG or add energy."],
["3.2","On an energy diagram, adding an enzyme would change:",["The energy of the reactants","The energy of the products","The height of the peak (transition state)","The overall ΔG"],2,"Only the activation-energy hump gets smaller. Reactant and product energies, and so ΔG, stay the same."],
["3.2","A reaction has ΔG = +15 kJ/mol. Adding the correct enzyme will:",["Make the reaction spontaneous","Speed up the reaction but not make it spontaneous","Change ΔG to −15 kJ/mol","Have no effect on the rate"],1,"Enzymes can't turn an endergonic reaction into an exergonic one. To proceed, it must be coupled to an exergonic reaction like ATP hydrolysis."],
["3.2","In an enzyme assay, product formation is fast at first, then levels off after 10 minutes. The most likely reason is:",["The enzyme was used up","Most of the substrate has been converted to product","The activation energy increased","The enzyme became a substrate"],1,"Enzymes aren't consumed. The curve flattens because substrate is running out."],
["3.2","Which statement about enzymes is FALSE?",["They can be reused many times","They lower activation energy","They are consumed in the reactions they catalyze","They are specific to certain substrates"],2,"Enzymes come out of the reaction unchanged and can catalyze it again."],
["3.2","Product concentration increases from 0 mM to 12 mM over 4 minutes. What is the average reaction rate?",["3 mM/min","48 mM/min","0.33 mM/min","12 mM/min"],0,"Rate = change in product ÷ time = 12 mM ÷ 4 min = 3 mM/min."],
// 3.3
["3.3","Why does enzyme activity drop sharply above the optimum temperature?",["Peptide bonds break","Molecules move too slowly","Hydrogen bonds holding the 3D shape break, so the enzyme denatures","The substrate becomes an inhibitor"],2,"High heat disrupts weak bonds (H-bonds, ionic) that maintain tertiary structure. The active site loses its shape. Peptide bonds stay intact."],
["3.3","Pepsin works best at pH 2. If pepsin is moved to pH 8, its activity drops because:",["The H⁺ change alters R-group charges and the active site shape","pH 8 lowers the temperature","pH has no effect on proteins","Pepsin's amino acid sequence changes"],0,"Changing pH changes ionization of R groups, disrupting ionic and hydrogen bonds that shape the active site."],
["3.3","An enzyme is cooled from 37 °C to 5 °C, and activity drops. When warmed back to 37 °C, activity returns. This shows that:",["Cold denatures enzymes permanently","Cold slows molecular collisions without denaturing the enzyme","The enzyme was replaced","Temperature doesn't affect enzymes"],1,"Low temperature reduces kinetic energy and collisions. The structure stays intact, so function returns when warmed."],
["3.3","As substrate concentration increases, reaction rate rises and then levels off. The plateau happens because:",["The enzyme is denatured","All active sites are occupied (saturated)","The substrate becomes an inhibitor","ΔG becomes zero"],1,"At saturation, every enzyme is busy. Adding more substrate can't increase the rate; only adding more enzyme could."],
["3.3","A competitive inhibitor:",["Binds an allosteric site","Binds the active site and can be overcome by adding more substrate","Permanently denatures the enzyme","Increases the enzyme's V_max"],1,"It resembles the substrate and competes for the active site. High substrate concentration outcompetes it."],
["3.3","Adding a large excess of substrate does NOT restore the enzyme's maximum rate in the presence of an inhibitor. The inhibitor is most likely:",["Competitive","Noncompetitive (allosteric)","A coenzyme","A cofactor"],1,"Noncompetitive inhibitors bind elsewhere and change the enzyme's shape. More substrate can't fix that."],
["3.3","In a pathway A → B → C → D, product D binds to the enzyme that converts A to B and slows it down. This is:",["Induced fit","Feedback inhibition","Denaturation","Energy coupling"],1,"The end product shuts down an early step so the cell doesn't make too much D."],
["3.3","Mg²⁺ is required for an enzyme to function. Mg²⁺ is an example of a:",["Coenzyme","Cofactor","Substrate","Competitive inhibitor"],1,"Cofactors are inorganic (metal ions). Coenzymes are organic, like NAD⁺ or vitamins."],
["3.3","A student boils an enzyme solution for 10 minutes and then cools it to 37 °C. Activity is near zero. Which is the best explanation?",["The primary structure was destroyed","The enzyme was irreversibly denatured; its 3D shape did not reform","The substrate was boiled away","37 °C is below the optimum"],1,"Extreme heat can permanently unfold the protein. The sequence is intact, but the active site's shape is gone."],
["3.3","Which change would most likely increase the rate of an enzyme reaction that is NOT yet saturated?",["Adding more substrate","Adding a noncompetitive inhibitor","Moving pH far from the optimum","Heating far above the optimum"],0,"If not saturated, more substrate means more enzyme–substrate collisions and a faster rate."],
// 3.4
["3.4","Which statement best describes why organisms need a constant input of energy?",["Energy is created during metabolism","To maintain order and power life processes, since energy transfers always lose some energy as heat","Because the first law says energy is destroyed","Because ATP is never recycled"],1,"The second law: every transfer increases entropy. Cells must keep taking in energy to stay organized."],
["3.4","ATP hydrolysis has a ΔG of about −7.3 kcal/mol. This reaction is:",["Endergonic and non-spontaneous","Exergonic and releases energy","Endergonic and releases energy","At equilibrium"],1,"Negative ΔG means exergonic: energy is released and the reaction is spontaneous."],
["3.4","Reaction X has ΔG = +4 kcal/mol. How can a cell make it happen?",["Add an enzyme","Couple it to ATP hydrolysis (ΔG −7.3), giving an overall negative ΔG","Lower the temperature","Remove all ADP"],1,"+4 + (−7.3) = −3.3 kcal/mol overall, so the coupled process is spontaneous."],
["3.4","During energy coupling, ATP usually drives a reaction by:",["Transferring a phosphate group to a reactant (phosphorylation)","Releasing heat that the reactant absorbs","Becoming a substrate's active site","Breaking peptide bonds"],0,"Phosphorylation makes the target molecule less stable and more reactive, or changes a protein's shape (e.g. pumps)."],
["3.4","Which of the following is an endergonic process?",["Cellular respiration","ATP → ADP + Pᵢ","Synthesis of a protein from amino acids","Breakdown of glucose"],2,"Building larger molecules from smaller ones requires energy input (positive ΔG)."],
["3.4","Why do cells break down glucose through many small steps instead of one big reaction?",["To release energy in small amounts that can be captured (e.g. as ATP) instead of lost as heat","Because enzymes can only handle one bond at a time","To increase ΔG","Because glucose cannot be oxidized"],0,"Stepwise pathways, each run by a specific enzyme, let cells harvest energy efficiently."],
// 3.5
["3.5","The O₂ released during photosynthesis comes from:",["CO₂","Glucose","H₂O split at Photosystem II","RuBP"],2,"Photolysis of water replaces electrons lost by PSII and releases O₂ as a by-product."],
["3.5","Where does the Calvin cycle take place?",["Thylakoid membrane","Thylakoid lumen","Stroma","Mitochondrial matrix"],2,"The Calvin cycle enzymes, including rubisco, are in the stroma."],
["3.5","During the light reactions, H⁺ ions are pumped:",["From the thylakoid lumen into the stroma","From the stroma into the thylakoid lumen","Out of the chloroplast","Into the nucleus"],1,"The ETC pumps H⁺ into the lumen. H⁺ then flows back out to the stroma through ATP synthase, making ATP."],
["3.5","Which molecules from the light reactions are used to power the Calvin cycle?",["O₂ and glucose","ATP and NADPH","CO₂ and H₂O","ADP and NADP⁺"],1,"ATP supplies energy and NADPH supplies high-energy electrons to reduce carbon into G3P."],
["3.5","A chemical makes the thylakoid membrane leaky to H⁺. The most direct effect is:",["More O₂ is produced","ATP synthesis by chemiosmosis decreases","The Calvin cycle speeds up","Chlorophyll stops absorbing light"],1,"No proton gradient means ATP synthase can't make ATP. The Calvin cycle would then slow from lack of ATP."],
["3.5","The enzyme rubisco catalyzes:",["Splitting of water","Attachment of CO₂ to RuBP (carbon fixation)","ATP synthesis","Reduction of NADP⁺"],1,"Rubisco fixes inorganic CO₂ into an organic molecule, the first step of the Calvin cycle."],
["3.5","Leaves appear green because chlorophyll:",["Absorbs green light","Reflects green light and absorbs mostly red and blue","Produces green light","Absorbs all wavelengths equally"],1,"Reflected (not absorbed) wavelengths reach our eyes. Chlorophyll absorbs blue-violet and red best."],
["3.5","Photosynthesis first evolved in:",["Plants","Prokaryotes such as cyanobacteria","Fungi","Animal cells"],1,"Cyanobacteria were the first oxygenic photosynthesizers; chloroplasts likely descend from them via endosymbiosis."],
["3.5","If a plant is placed in the dark, which happens first?",["The Calvin cycle stops immediately while light reactions continue","Production of ATP and NADPH by the light reactions stops, and the Calvin cycle soon slows","CO₂ fixation increases","O₂ production increases"],1,"Light reactions need light. Without new ATP and NADPH, the Calvin cycle runs down once its supply is used up."],
["3.5","Which is the correct path of electrons in the light reactions?",["NADPH → PSI → ETC → PSII → H₂O","H₂O → PSII → ETC → PSI → NADPH","CO₂ → PSII → PSI → G3P","O₂ → PSI → PSII → ATP"],1,"Electrons come from water, get excited at PSII, move down the ETC, get re-excited at PSI, and end up reducing NADP⁺ to NADPH."]
];

const CARDS=[
["3.1","Enzyme","A biological catalyst (usually a protein) that speeds up a reaction without being consumed."],
["3.1","Active site","The region of an enzyme where the substrate binds; its shape and charge determine specificity."],
["3.1","Substrate","The reactant molecule an enzyme acts on."],
["3.1","Induced fit","The slight change in enzyme shape when the substrate binds, which improves the fit and strains bonds."],
["3.1","Ribozyme","An RNA molecule that acts as a catalyst."],
["3.2","Activation energy (Eₐ)","The energy needed to reach the transition state and start a reaction. Enzymes lower it."],
["3.2","Transition state","The unstable, high-energy state where bonds are breaking and forming."],
["3.2","ΔG (free energy change)","Products' free energy minus reactants'. Enzymes do NOT change it."],
["3.3","Denaturation","Loss of a protein's 3D shape (and function) from heat, pH, or salt. Sequence stays intact."],
["3.3","Optimum","The temperature or pH where an enzyme works fastest."],
["3.3","Saturation","All active sites are occupied; adding substrate no longer increases the rate."],
["3.3","Competitive inhibitor","Binds the active site; overcome by adding more substrate."],
["3.3","Noncompetitive inhibitor","Binds an allosteric site and changes the enzyme's shape; not overcome by more substrate."],
["3.3","Feedback inhibition","A pathway's end product inhibits an early enzyme in that pathway."],
["3.3","Cofactor vs. coenzyme","Cofactor: inorganic helper (Mg²⁺, Zn²⁺). Coenzyme: organic helper (NAD⁺, vitamins)."],
["3.4","Exergonic","Releases free energy; ΔG negative; spontaneous."],
["3.4","Endergonic","Absorbs free energy; ΔG positive; needs energy input."],
["3.4","Energy coupling","Using an exergonic reaction (like ATP hydrolysis) to drive an endergonic one."],
["3.4","ATP hydrolysis","ATP + H₂O → ADP + Pᵢ + energy (ΔG ≈ −7.3 kcal/mol)."],
["3.4","Phosphorylation","Transfer of a phosphate group from ATP to another molecule, making it more reactive."],
["3.4","Second law of thermodynamics","Every energy transfer increases entropy; some energy is lost as heat."],
["3.5","Thylakoid","Membrane sacs in the chloroplast where the light reactions happen."],
["3.5","Stroma","Fluid around the thylakoids where the Calvin cycle happens."],
["3.5","Photosystem II","Absorbs light first; splits water to replace its electrons, releasing O₂."],
["3.5","Photosystem I","Re-energizes electrons that are then used to reduce NADP⁺ to NADPH."],
["3.5","Chemiosmosis","H⁺ flowing down its gradient through ATP synthase powers ATP production."],
["3.5","Rubisco","Calvin cycle enzyme that fixes CO₂ onto RuBP."],
["3.5","G3P","3-carbon sugar made by the Calvin cycle; used to build glucose."],
["3.5","Photolysis","Splitting of water by light-driven reactions: source of O₂, H⁺, and electrons."]
];

const FRQ=[
["3.1","A mutation changes one amino acid in the active site of an enzyme from aspartate (negatively charged) to leucine (nonpolar). The normal substrate is positively charged. Predict and justify the effect on enzyme activity.","Activity decreases. The negatively charged aspartate R group likely attracted the positively charged substrate. Leucine is nonpolar, so this attraction is lost and the active site's chemistry (and possibly shape) changes. The substrate binds less well, fewer enzyme–substrate complexes form, and the reaction rate drops."],
["3.2","Draw (or describe) an energy diagram for an exergonic reaction with and without an enzyme. Explain what the enzyme changes and what it does not change.","Reactants start higher than products (negative ΔG). Both curves rise to a peak, then fall to the products. The enzyme-catalyzed curve has a lower peak, meaning lower activation energy, so the reaction is faster. The enzyme does not change the starting energy of reactants, the final energy of products, or ΔG."],
["3.3","Researchers measure the activity of an enzyme from a hot-spring bacterium and from humans at temperatures from 20 °C to 90 °C. Predict the results and explain the difference.","Human enzyme: activity rises to ~37 °C, then drops sharply as it denatures. Hot-spring enzyme: activity keeps rising to a much higher optimum (~70–80 °C) before dropping. The thermophile's enzyme has more stabilizing bonds (e.g. more ionic bonds, disulfide bridges) so its 3D shape holds at high temperature. Both increase at first because of more frequent collisions."],
["3.3","Describe an experiment to determine whether an inhibitor is competitive or noncompetitive. State the expected results for each.","Measure reaction rate across increasing substrate concentrations, with and without the inhibitor (same enzyme amount, temperature, pH). If competitive: with high substrate, the rate with inhibitor reaches the same max as without it. If noncompetitive: the rate with inhibitor plateaus at a lower max no matter how much substrate is added."],
["3.4","Glutamine synthesis (glutamic acid + NH₃ → glutamine) has ΔG = +3.4 kcal/mol. Explain how cells make this reaction proceed.","The reaction is endergonic, so it won't proceed on its own. The cell couples it to ATP hydrolysis (ΔG −7.3 kcal/mol). ATP phosphorylates glutamic acid, forming a less stable, more reactive intermediate that then reacts with NH₃. Overall ΔG ≈ +3.4 − 7.3 = −3.9 kcal/mol, so the coupled process is exergonic and spontaneous."],
["3.5","A herbicide blocks electron flow between Photosystem II and Photosystem I. Predict the effects on O₂ production, ATP and NADPH production, and the Calvin cycle. Justify each.","O₂ production drops: PSII can't pass on electrons, so it stops pulling electrons from water. ATP drops: the ETC no longer pumps H⁺ into the lumen, so there's no gradient for ATP synthase. NADPH drops: no electrons reach PSI and NADP⁺. The Calvin cycle slows and stops because it depends on ATP and NADPH; less CO₂ is fixed and less G3P/sugar is made."],
["3.5","Explain how the structure of the chloroplast allows ATP to be made during the light reactions.","The thylakoid membrane separates the lumen from the stroma. The ETC in this membrane pumps H⁺ into the small lumen space, building a steep concentration gradient. Because the membrane is impermeable to H⁺, the ions can only flow back through ATP synthase, whose rotation powers ADP + Pᵢ → ATP in the stroma, right where the Calvin cycle needs it."]
];


// Questions confirmed for the upcoming test (Test Prep tab). Paraphrased from the source.
const TEST={
  mcq:{
    source:"Mass of organisms kept in the dark",
    stem:"A class measured the mass of several living organisms, kept them in the dark for 24 hours with no food, and then measured them again. Every organism had less mass after 24 hours. Which is the best explanation for this change in mass?",
    options:["Water loss due to evaporation","Cellular respiration","The law of conservation of matter","Growth and reproduction"],
    answer:1,
    why:"With no light and no food, the organisms kept themselves alive by breaking down their own stored sugars, fats and proteins in cellular respiration. The carbon and hydrogen in those molecules left the body as CO₂ (breathed out) and H₂O, so the organisms lost mass. A: evaporation alone doesn't explain a steady loss in every living organism; respiration is the main cause. C: conservation of matter says matter isn't destroyed, which is true (it left as CO₂ and water) but doesn't explain the loss. D: growth and reproduction would increase mass, not decrease it."
  },
  frq:{
    source:"AP Biology 2021 FRQ 3 (College Board), paraphrased",
    setup:"Researchers think resveratrol, a plant compound, improves how mitochondria work. They dissolve resveratrol in DMSO (which passes easily through cell membranes) and add it to mammalian muscle cells growing in a glucose-rich culture medium. Over several time points, ATP production by the cells goes up.",
    parts:[
      {verb:"Describe",prompt:"the main advantage for a mammalian muscle cell of using aerobic respiration instead of fermentation.",
       answer:"Aerobic respiration makes much more ATP from each glucose molecule than fermentation does: about 30–32 ATP compared with only 2 ATP. This is because aerobic respiration fully breaks glucose down through glycolysis, the Krebs cycle and oxidative phosphorylation, using O₂ as the final electron acceptor. Fermentation stops after glycolysis.",
       points:"Names the advantage (more ATP per glucose) and gives the reason (complete oxidation of glucose / electron transport chain with O₂)."},
      {verb:"Identify",prompt:"a good negative control that would let the researchers conclude the extra ATP is caused by the resveratrol.",
       answer:"Muscle cells grown in the same glucose medium under the same conditions that get the same volume of DMSO with no resveratrol in it. ATP is measured at the same time points.",
       points:"The control must include the DMSO solvent but no resveratrol, so the only difference between groups is the resveratrol. This rules out DMSO itself causing the ATP increase."},
      {verb:"Predict",prompt:"the effect on short-term ATP production if resveratrol-treated muscle cells are grown in a medium with no glucose or other sugars.",
       answer:"ATP production will decrease (it will not increase like it did with glucose). Without glucose, glycolysis can't run, so no pyruvate, NADH or FADH₂ is made to feed the Krebs cycle and electron transport chain. Resveratrol may improve the mitochondria, but it doesn't supply the fuel, so the cells make less ATP.",
       points:"Gives a clear direction (ATP decreases / no increase) for the short term. A one-line prediction is enough for this point; the reasoning helps you be sure."},
      {verb:"Justify",prompt:"the claim that resveratrol will also increase the cells' oxygen consumption when glucose is not limiting, given that resveratrol increases production of electron transport chain components.",
       answer:"O₂ is the final electron acceptor at the end of the electron transport chain. More ETC components means more electrons from NADH and FADH₂ can move through the chain at once. Each pair of electrons that reaches the end must be passed to O₂, which combines with H⁺ to form water. So more electron flow through more ETC complexes means more O₂ is used up. Because glucose isn't limiting, there is enough NADH and FADH₂ to keep the extra ETC components busy.",
       points:"Connects more ETC components to more electron flow, and more electron flow to more O₂ reduced to water as the final electron acceptor."}
    ]
  }
};
