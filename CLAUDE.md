# Normes per treballar en aquest projecte

- No inventis contingut didàctic. Si falta informació (preguntes, objectius, materials, durades,
  descriptors), deixa-la com a `pendent('què falta')` i demana-la a la professora.
- Tot el text de cara a l'alumne és en català, amb frases curtes i vocabulari senzill: part del
  grup té poc domini del català.
- Les sessions duren 50 minuts. N'hi ha de dos tipus: `aula` (grup sencer) i `laboratori` (mig grup).
  Al web només s'etiqueten les de laboratori; una sessió sense tipus és d'aula.
- Avaluació amb NA/AS/AN/AE, sense notes numèriques.
- Una SA nova segueix el patró de `src/data/sa1/` i es publica posant `publicada: true` a `src/data/curs.js`.
- Un camp pot ser igual per a tothom o diferent per versió: `{ A: ..., B: ..., C: ... }`.
  A és l'adaptada, B l'estàndard i C la d'enriquiment.
- L'exit tiquet es respon en paper. Només porta formulari si la professora en dona l'enllaç.
- Cada paraula nova del glossari necessita traducció als set idiomes de `src/config.js`.
- Abans de donar una feina per acabada: `npm run build` i mirar la pàgina a 400 px i a 1200 px.
- El web no recull dades dels alumnes. No hi afegeixis formularis que enviïn res sense que la
  professora ho demani.
- Un joc és un fitxer de dades com `src/data/sa1/joc-nivells.js`, afegit a `jocs` de la seva SA. Els tipus
  d'exercici disponibles són a `src/joc/tipus.jsx`: ordena, relaciona, buits, classifica, vf, cadena i oberta.
  Els enunciats i les solucions han de venir dels materials de la professora.
- El web és públic. No hi posis codis de Classroom, correus ni dades d'alumnes.
