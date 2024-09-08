# Cartographie web avec Leaflet

## Le livre

-   Auteur [Richard Carlier](https://www.linkedin.com/in/rcarlier)
-   Éditeur [D-BookeR](https://www.d-booker.fr)
-   ISBN : 978-2-8227-xxxx-x
-   [Démo en live](https://livre-leaflet.d-booker.info/)

## Installation

```sh
git clone https://github.com/D-BookeR/livre-leaflet
```

## Organisation du Git

### Chapitres

Le dossier `chapitres` contient le code des exemples du livre, au fil des chapitres... Ils utilisent des éléments en communs (css, libs...) La numérotation retenue rappelle celle des hôtels : 0xx pour l'introduciton, 1xx pour le chapitre un, etc.

Chaque fichier html (ex: `101.html`) utilise son pendant JavaScript (ex: `js/101.js`).

Voir la page `index.html` pour un guide plus pratique.

### Ateliers

Contient le code des ateliers, indépendant du reste.

-   `ateliers/80jours` Cas pratique : cartes narratives (chapitre 11)
-   `ateliers/education` Cas pratique : autour d'un point (chapitre 16), en python et nécessite une installation particulière (voir son `readme.md`)
-   `ateliers/medical` Cas pratique : désert médical (chapitre 25)

### annexes

Contient le code des annexes... et nécessitant des installations spécifiques (voir leur `readme.md` respectifs).

-   `annexes/dashboard` pour un exemple Dash-leaflet
-   `annexes/R` pour un exemple en R
-   `annexes/react` pour un exemple avec react-leaflet
-   `annexes/vue` pour un exemple avec Vue3
