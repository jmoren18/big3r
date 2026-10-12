# Qui decideix per tu?

Portal de Biologia i Geologia de 3r d'ESO de l'Institut Sant Quirze (Lloret de Mar).

## Què hi ha

- Portada amb les sis situacions d'aprenentatge, la sessió d'avui i els botons d'ajuda d'idioma. Només la SA1 està publicada; la resta surt com a «Pròximament».
- Una pàgina per sessió, amb dues plantilles: aula (grup sencer) i laboratori (mig grup). A dalt, la franja «On som» amb les 12 sessions.
- Tres versions de cada sessió: A (pla individualitzat o aula d'acollida, hi convida la professora), B estàndard (la que surt per defecte) i C enriquiment. A la pantalla només surt la lletra.
- Ajuda de traducció en castellà, ucraïnès, rus, àrab, urdú, hindi i panjabi: en triar un idioma, les paraules del glossari queden subratllades i mostren la traducció (dins dels botons, la traducció surt escrita a sota). Al final de cada pàgina hi ha el banc «Paraules d'aquesta pàgina». Les traduccions s'han de validar amb parlants nadius.
- Exit tiquet a cada sessió, en paper per defecte i amb formulari si s'hi posa un enllaç, i autoavaluació NA/AS/AN/AE imprimible al final de la SA, feta amb els objectius de la SA.
- Jocs de pràctica amb correcció automàtica, pistes i «Recordes?» a les sessions següents (per ara, el dels nivells d'organització). Les respostes es desen a la pestanya i no es perden en refrescar.
- Eines d'aula (temporitzador i sonòmetre) en una pàgina pròpia per projectar, enllaçada al peu.

## On és cada cosa

| Què vull canviar | Fitxer |
| --- | --- |
| Títols de les SA i quines estan publicades | `src/data/curs.js` |
| Sessió d'avui (`avui`), objectius de la SA i descriptors de l'autoavaluació | `src/data/sa1/index.js` |
| Pàgina «Com funciona el curs» | `src/data/curs-info.js` |
| Sessions de la SA1 | `src/data/sa1/s01.js`, `s02.js`… i `index.js` |
| Camps que pot tenir una sessió (pregunta, objectius, model de frase, repte, imatges…) | `src/data/sa1/buides.js` |
| Jocs de pràctica de la SA1 | `src/data/sa1/joc-nivells.js` |
| Fases de cada plantilla i línia de regulació de l'exit tiquet | `src/plantilles.js` |
| Paraules amb traducció | `src/data/glossari.js` |
| Idiomes (i la frase d'ajuda de cada un), versions i mode revisió | `src/config.js` |
| Imatges | carpeta `public/imatges/` |

## Sessió d'avui

A `src/data/sa1/index.js`, posa a `avui` el número de la sessió que toca. Surt marcada a la pàgina de la SA
i com a botó a la portada. Si no en vols cap, posa `avui: null`.

## Imatges

Desa la imatge a `public/imatges/` i afegeix-la a la sessió, a la fase on ha de sortir:

```js
imatges: { apunts: { src: 'imatges/escala.png', alt: 'Què es veu a la imatge', peu: 'Text curt', credit: 'Autor, llicència' } }
```

## Contingut pendent i propostes

El que encara no existeix es marca amb `pendent('què falta')`. Amb `modeRevisio: true` es veu en groc.

El que ha proposat Claude a petició teva es marca amb `proposta(...)`. Amb `modeRevisio: true` porta
l'etiqueta blava PROPOSTA; els alumnes el veuen normal. Quan l'hagis revisat, treu el `proposta(...)` i
deixa-hi només el text.

Abans d'ensenyar el web als alumnes cal posar `modeRevisio: false` a `src/config.js`: els blocs
pendents i les etiquetes desapareixen i les sessions sense títol surten com a «Pròximament».

## Publicació

Cada canvi a la branca `main` es publica sol a GitHub Pages (`.github/workflows/deploy.yml`).
Al repositori cal tenir activat *Settings → Pages → Source: GitHub Actions*.

Per provar-lo en un ordinador: `npm install` i `npm run dev`.
