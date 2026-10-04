// Els nivells d'organització tal com surten a la presentació de classe
// («Organització de la matèria», diapositiva 6).
const PLURI = 'Només organismes pluricel·lulars'

export const NIVELLS_ORGANITZACIO = [
  { titol: 'Nivell subatòmic', text: 'Comprèn les partícules subatòmiques, com els protons i electrons.' },
  {
    titol: 'Nivell atòmic',
    text: "Comprèn els àtoms. Els àtoms formen tota la matèria. Els diferents tipus d'àtoms donen lloc als elements (els que es troben a la taula periòdica)."
  },
  { titol: 'Nivell molecular', text: 'Comprèn les molècules, que són la unió de dos o més àtoms.' },
  {
    titol: 'Nivell cel·lular',
    text: 'Comprèn les cèl·lules. Per exemple les neurones, cèl·lules musculars, bacteris, etc. Hi ha cèl·lules que per si mateixes constitueixen un ésser viu (unicel·lulars): nivell organisme.'
  },
  { titol: 'Nivell teixit', text: 'Conjunt de cèl·lules iguals que fan una mateixa funció.', marca: PLURI },
  { titol: 'Nivell òrgan', text: 'Conjunt de teixits que treballen junts per fer una mateixa funció.', marca: PLURI },
  { titol: 'Nivell sistemes i aparells', text: "Conjunt d'òrgans que treballen junts per fer una mateixa funció.", marca: PLURI },
  { titol: 'Nivell organisme', text: 'És un ésser viu en si mateix. Pot ser unicel·lular i pluricel·lular.' },
  {
    titol: 'Nivell de població',
    text: "Conjunt d'individus de la mateixa espècie que ocupen una mateixa àrea en un temps determinat."
  },
  { titol: 'Nivell de comunitat', text: 'El conjunt de poblacions que conviuen en un medi.' },
  {
    titol: "Nivell d'ecosistema",
    text: "Comprèn el conjunt de poblacions que hi ha en una determinada zona i les relacions que s'estableixen entre elles i entre elles i el medi."
  }
]
