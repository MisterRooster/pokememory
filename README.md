# Pokememory

![Vite shield](https://img.shields.io/badge/-Vite-pink)
![React shield](https://img.shields.io/badge/-React-blue)
![Tailwind shield](https://img.shields.io/badge/-TailwindCSS-purple)

A pokemon memory game built with Vite, React and TailwindCSS.
Uses [PokeAPI](https://pokeapi.co/) to gather pokemon data and sound samples from the [DP Sound library](https://www.pokemon.com/us/dp-sound-library).

## How to play

Try to click on as many cards as possible successively without
choosing the same card twice.
The pokemons are getting reordered randomly after every choice.
You beat a level when there is no unique card left to choose.
One additional pokemon joins on every level.

## How to compile

First clone the repository locally:

```bash
git clone git@github.com:MisterRooster/pokememory.git
```

Then move to the project directory, install dependencies and compile:

```bash
cd pokememory
npm install
npm run build
```

To have a preview of the build in the browser:

```bash
npm run preview
```

If you want a development server with HMR:

```bash
# 'npm run dev -- --host' to expose on local network
npm run dev
```

---

Copyright (c) 2023 MisterRooster ([github.com/MisterRooster](https://github.com/MisterRooster)). All rights reserved.  
Licensed under the MIT license. See [LICENSE](LICENSE) for full terms.
