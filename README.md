# Qui decideix per tu?

Portal de Biologia i Geologia de 3r d'ESO de l'Institut Sant Quirze (Lloret de Mar).

## Què hi ha

- Portada amb les sis situacions d'aprenentatge. Només la SA1 està publicada; la resta surt com a «Pròximament».
- Una pàgina per sessió, amb dues plantilles: aula (grup sencer) i laboratori (mig grup).
- Tres versions de cada sessió: A adaptada, B estàndard (la que surt per defecte) i C enriquiment.
- Ajuda de traducció en castellà, ucraïnès, rus, àrab, urdú, hindi i panjabi: en triar un idioma, les paraules del glossari queden subratllades i mostren la traducció. Les traduccions s'han de validar amb parlants nadius.
- Exit tiquet a cada sessió, en paper per defecte i amb formulari si s'hi posa un enllaç, i autoavaluació NA/AS/AN/AE imprimible al final de la SA.
- Jocs de pràctica amb correcció automàtica (per ara, el dels nivells d'organització).
- Temporitzador i sonòmetre per projectar a l'aula.

No es recull cap dada dels alumnes. Tot queda al navegador de cadascú.

## On és cada cosa

| Què vull canviar | Fitxer |
| --- | --- |
| Títols de les SA i quines estan publicades | `src/data/curs.js` |
| Sessions de la SA1 | `src/data/sa1/s01.js`, `s02.js`… i `index.js` |
| Jocs de pràctica de la SA1 | `src/data/sa1/joc-nivells.js` |
| Fases de cada plantilla | `src/plantilles.js` |
| Paraules amb traducció | `src/data/glossari.js` |
| Idiomes, versions i mode revisió | `src/config.js` |

## Contingut pendent

El que encara no existeix es marca amb `pendent('què falta')`. Amb `modeRevisio: true` es veu en groc.
Abans d'ensenyar el web als alumnes cal posar `modeRevisio: false` a `src/config.js`: els blocs
pendents desapareixen i les sessions sense títol surten com a «Pròximament».

## Publicació

Cada canvi a la branca `main` es publica sol a GitHub Pages (`.github/workflows/deploy.yml`).
Al repositori cal tenir activat *Settings → Pages → Source: GitHub Actions*.

Per provar-lo en un ordinador: `npm install` i `npm run dev`.
