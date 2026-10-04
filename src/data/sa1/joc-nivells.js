// Joc de pràctica dels nivells d'organització.
// Tot el contingut ve de «Nivells d'organització de la matèria. Exercicis de
// pràctica» (enunciats, exemples i solucionari). No s'hi ha afegit cap pregunta.
//
// A `respostes`, la primera és la que es mostra com a solució; les altres
// també es donen per bones.
export const jocNivells = {
  id: 'nivells',
  titol: "Els nivells d'organització",
  entrada: 'Vuit exercicis per practicar. Pots repetir-los tantes vegades com vulguis.',

  recorda: {
    titol: "Recorda: l'escala dels nivells",
    text: 'De la partícula més petita fins a tot el planeta. Cada nivell està format pels anteriors.',
    grups: [
      {
        nom: 'Nivells químics i biològics',
        nivells: [
          ['Subatòmic', 'protó, neutró, electró'],
          ['Atòmic', "àtom de carboni (C), d'oxigen (O)"],
          ['Molecular', 'aigua (H₂O), glucosa, ADN'],
          ['Cel·lular', 'una neurona, un bacteri'],
          ['Teixit', 'teixit muscular, teixit epitelial'],
          ['Òrgan', "el cor, l'estómac, una fulla"],
          ['Aparell o sistema', 'aparell digestiu, sistema nerviós'],
          ['Organisme', 'un gat, un pi, una persona']
        ]
      },
      {
        nom: 'Nivells ecològics',
        nivells: [
          ['Població', "tots els conills d'un bosc"],
          ['Comunitat', "tots els éssers vius d'un llac"],
          ['Ecosistema', 'un bosc i el seu medi físic'],
          ['Biosfera', 'tots els ecosistemes de la Terra']
        ]
      }
    ],
    nota: 'Nivells 1 a 3: també a la matèria inerta. Nivells 4 a 8: només als éssers vius.'
  },

  exercicis: [
    {
      titol: 'Ordena els nivells',
      instruccio: "Toca els nivells per ordre: de l'1 (el més senzill) al 8 (el més complex).",
      parts: [
        {
          tipus: 'ordena',
          items: ['Òrgan', 'Àtom', 'Cèl·lula', 'Molècula', 'Teixit', 'Organisme', 'Nivell subatòmic', 'Aparell o sistema'],
          ordre: ['Nivell subatòmic', 'Àtom', 'Molècula', 'Cèl·lula', 'Teixit', 'Òrgan', 'Aparell o sistema', 'Organisme']
        }
      ]
    },
    {
      titol: 'Relaciona cada exemple amb el seu nivell',
      instruccio: 'Tria el nivell que correspon a cada exemple.',
      parts: [
        {
          tipus: 'relaciona',
          opcions: ['Òrgan', 'Nivell subatòmic', 'Organisme', 'Molecular', 'Aparell o sistema', 'Cel·lular', 'Atòmic', 'Teixit'],
          files: [
            { text: 'Una molècula de glucosa', resposta: 'Molecular' },
            { text: 'Un electró', resposta: 'Nivell subatòmic' },
            { text: 'El teixit epitelial', resposta: 'Teixit' },
            { text: 'Un glòbul vermell', resposta: 'Cel·lular' },
            { text: "L'estómac", resposta: 'Òrgan' },
            { text: "Un àtom d'oxigen", resposta: 'Atòmic' },
            { text: "L'aparell respiratori", resposta: 'Aparell o sistema' },
            { text: 'Una gasela', resposta: 'Organisme' }
          ]
        }
      ]
    },
    {
      titol: 'Omple els buits',
      instruccio: 'Escriu el nom del nivell o del concepte que falta a cada frase.',
      parts: [
        {
          tipus: 'buits',
          frases: [
            { abans: "La unitat més petita de matèria que manté les propietats d'un element és l'", despres: '.', respostes: ['àtom'] },
            { abans: 'Diverses cèl·lules iguals que fan una mateixa funció formen un ', despres: '.', respostes: ['teixit'] },
            {
              abans: 'Diversos òrgans que treballen junts formen un ',
              despres: '.',
              respostes: ['aparell o sistema', 'aparell', 'sistema', 'sistema o aparell', 'aparell/sistema']
            },
            { abans: 'Els protons, els neutrons i els electrons pertanyen al nivell ', despres: '.', respostes: ['subatòmic'] },
            { abans: 'Dos o més àtoms units formen una ', despres: '.', respostes: ['molècula'] },
            { abans: "Un conjunt d'individus de la mateixa espècie en una zona és una ", despres: '.', respostes: ['població'] }
          ]
        }
      ]
    },
    {
      titol: 'Matèria inerta o matèria viva?',
      instruccio: 'Col·loca cada nivell a la columna que li correspongui.',
      parts: [
        {
          tipus: 'classifica',
          grups: [
            { id: 'totes', nom: 'A la matèria inerta i la viva' },
            { id: 'vius', nom: 'Només als éssers vius' }
          ],
          items: [
            { text: 'subatòmic', grup: 'totes' },
            { text: 'atòmic', grup: 'totes' },
            { text: 'molecular', grup: 'totes' },
            { text: 'cel·lular', grup: 'vius' },
            { text: 'teixit', grup: 'vius' },
            { text: 'òrgan', grup: 'vius' },
            { text: 'aparell/sistema', grup: 'vius' },
            { text: 'organisme', grup: 'vius' }
          ]
        }
      ]
    },
    {
      titol: 'Verdader o fals?',
      instruccio: 'Marca V o F. Corregeix al teu quadern les que siguin falses.',
      parts: [
        {
          tipus: 'vf',
          frases: [
            { text: 'Un àtom és més complex que una molècula.', resposta: false, correccio: "L'àtom és més senzill que la molècula." },
            { text: 'El nivell cel·lular és exclusiu dels éssers vius.', resposta: true },
            { text: 'Un teixit està format per diversos òrgans.', resposta: false, correccio: 'El teixit el formen cèl·lules.' },
            { text: "L'aigua es troba al nivell molecular.", resposta: true },
            {
              text: "Una població està formada per individus d'espècies diferents.",
              resposta: false,
              correccio: 'La formen individus de la mateixa espècie.'
            },
            { text: "El cor és un exemple del nivell d'òrgan.", resposta: true }
          ]
        }
      ]
    },
    {
      titol: "L'escala pluricel·lular",
      instruccio: "Del cos humà: completa la cadena fins a arribar a l'organisme.",
      parts: [
        {
          tipus: 'cadena',
          nivells: ['Cèl·lula', 'Teixit', 'Òrgan', 'Aparell o sistema', 'Organisme'],
          exemple: ['Cèl·lula muscular', 'Teixit muscular', 'Cor', 'Aparell circulatori', 'Ésser humà'],
          cadena: [
            { fix: 'Cèl·lula nerviosa' },
            { respostes: ['teixit nerviós'] },
            // El solucionari diu «cervell». També es donen per bons altres òrgans del sistema nerviós.
            { respostes: ['cervell', 'encèfal', 'medul·la espinal'] },
            { respostes: ['sistema nerviós'] },
            { fix: 'Ésser humà' }
          ]
        }
      ]
    },
    {
      titol: 'Els nivells ecològics',
      instruccio: "Primer ordena'ls del més petit al més gran. Després, digues quin nivell és cada exemple.",
      parts: [
        {
          tipus: 'ordena',
          subtitol: 'Ordena (de l’1 al 4)',
          items: ['Ecosistema', 'Població', 'Biosfera', 'Comunitat'],
          ordre: ['Població', 'Comunitat', 'Ecosistema', 'Biosfera']
        },
        {
          tipus: 'relaciona',
          subtitol: 'Quin nivell és?',
          opcions: ['Població', 'Comunitat', 'Ecosistema', 'Biosfera'],
          files: [
            { text: 'Tots els conills que viuen en un bosc.', resposta: 'Població' },
            { text: "Tots els éssers vius d'un llac: peixos, algues, insectes...", resposta: 'Comunitat' },
            { text: 'Un bosc amb els seus éssers vius i el medi físic (sòl, aigua, aire).', resposta: 'Ecosistema' },
            { text: 'El conjunt de tots els ecosistemes de la Terra.', resposta: 'Biosfera' }
          ]
        }
      ]
    },
    {
      titol: 'Pensa-hi i explica-ho',
      instruccio: 'Respon amb frases completes, justificant la teva resposta.',
      parts: [
        {
          tipus: 'oberta',
          cita: 'Una cèl·lula és més senzilla que una molècula, perquè és molt petita.',
          pregunta: 'Té raó? Per què? Fes servir les paraules molècula, cèl·lula i complexitat.',
          paraules: ['molècula', 'cèl·lula', 'complexitat'],
          model:
            'No té raó: la mida no determina la complexitat. La cèl·lula està feta de moltes molècules organitzades; és un nivell superior i més complex.'
        }
      ]
    }
  ]
}
