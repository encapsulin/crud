import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Crud from './crud/Crud';
// import DirsRaw from './crud/crud/DirsRaw';
// import './crud/style-align.css';

// const data = [{ "parent": "20240917_101722_493", "role": "dir", "descr": "  ", "pkid": "0", "title": "adsf3.1", "skid": "20240917_223523_539", "kids": [] }, { "parent": "20240917_101722_493", "role": "doc", "descr": "\n\nWe allow each theme creator to select their own tooling and commands since each theme has different needs, so always to refer to your theme’s documentation for the actual commands and installation instructions.That said, the basic process of setting up local development is roughly the same in every theme: ", "pkid": "0", "title": "Setting up local development", "skid": "20240918_222741_434", "kids": [] }, { "parent": "20240917_101722_493", "role": "doc", "descr": "This guide will help you get started with a Bootstrap Theme, including how to run, customize, update, and integrate your theme!", "pkid": "0", "title": "The Guide", "skid": "20240917_215059_226", "kids": [] }, { "parent": "20240917_101722_493", "role": "doc", "descr": "Používame vysokokvalitné vodouriediteľné farby značky SPIES HECKER, ktoré zodpovedajú všetkým legislatívnym normám a sú certifikované. Majú perfektnú koloristiku. Venujeme sa aj priemyselnému lakovaniu interierových a exterierových profilov a strojárenských dielov. Lakujeme aj v  RAL odtieňoch na drevo, plast a kov. ", "pkid": "0", "title": "SPIES HECKER", "skid": "20240919_091448_292", "kids": [] }, { "parent": "20240917_101722_493", "role": "dir", "descr": "dir11 ", "pkid": "0", "title": "dir3.1.1", "skid": "20240917_101836_075", "kids": [] }, { "parent": "20240917_101722_493", "role": "doc", "descr": "ree, high quality, open source icon library with over 2,000 icons. Include them anyway you like—SVGs, SVG sprite, or web fonts. Use them with or without Bootstrap in any project.", "pkid": "0", "title": "Bootstrap Icons", "skid": "20240917_222039_788", "kids": [] }, { "parent": "20240917_101722_493", "role": "doc", "descr": "\n\nThese terms are can mean different things in different contexts, but for the purposes of a Bootstrap Theme:\n\n    Source files are files that are meant to be processed by a theme’s build tools.\n    Compiled files are generated as a result of running a compiling process (also called a \"build process\") on the source files.\n    Static files are ones that aren’t processed or generated.\n ", "pkid": "0", "title": "What are source, compiled and static files?", "skid": "20240918_223700_878", "kids": [] }]


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Crud />
  // <DirsRaw data={data} />

);
