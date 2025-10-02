# Personal Notes 🦝
I used this markdown to note any topic I came across while solving the playgrounds that caught my eye - 
Continue with caution!

## Playground #2

### Modules modules modules
I kinda got caught in this whole module rabbit hole about `.mjs` or `.js` and how this plays out in .ts and .mts file
The gist of it is that... while you can annotate them with `.mjs` as it declares files as ECMAScript modules (ES modules)
...buuuuut you overrule the package.json type field and some other stuff.
While it is still useful for library development or dual package support:
```json
// package.json
{
  "type": "module",
  "main": "./dist/index.cjs",     // CommonJS entry
  "module": "./dist/index.mjs",   // ES module entry
  "exports": {
    "import": "./dist/index.mjs",
    "require": "./dist/index.cjs"
  }
}
```
It's not commonly used anymore as most projects pick one module system in `package.json`, the `tsconfig.json` defines it
or build tools like Webpack, Vite, etc. handle this for you anyway... which makes it kinda... obsolete.

The most fun part about this was that apparently if you use ES modules with TypeScript you need `.js` extension imports...
which is even more weird since we source from `.ts` files ???
```typescript
// ✅ Correct
import { utils } from './utils.js';    // Points to compiled utils.js
import { config } from './config.js';  // Points to compiled config.js

// ❌ Wrong (won't work at runtime)
import { utils } from './utils';       // Missing extension
import { config } from './config.ts';  // Wrong extension
```
> Disclaimer: All code example were generated using AI as some of the research on this question was done with AI 

### ESLint v9
ESLint switched their whole config structure moving from v8 to v9 and well lets just say that fucked me up good :').
The moved to a flattened structure which also caused some trouble with `standard-with-typescript` as apparently it hasn't
moved to v9 structure yet and doesn't work properly.

If you wanna read about it just go to the [Migration Docs](https://eslint.org/docs/latest/use/migrate-to-9.0.0#flat-config).

### Shadow DOM
I didn't know about that one before so I watched some videos but I think the [medium blog]
(https://medium.com/front-end-weekly/shadow-dom-implementation-in-javascript-1a3cc8c01687)
did it the best - You can basically create your own sub-components that are fully encapsulated from the rest of the dom tree.
This can be pretty nice and is also how custom elements like the `<video>` tag work in html. You can even enable seeing the
sub-components in a video tag if you want to. 

I also split my shadow-component into three separate files as I wanted to keep it clean to some degree - This required me
to play around with some vite config stuff, although I'm not quite sure if that is the best way to do it...

### Paths Vite vs Typescript
I also wanted to make my imports a little prettier by allowing root-level imports like `modules/utils` instead of
`../../modules/utils`. However, if you use typescript and define the baseUrl param, typescript is happy until you try to load
the component and vite tells you _nuh uh_! This is because TypeScript and runtime module resolution aren't the same :D (Please
kill me) To be exact this means we not only have to define it in our typescript config, but also the vite config :^).

Oh and because I wanted the `@` import syntax we also added this ony the fly

![Alt Text](https://media.tenor.com/WTKJwI7PpHUAAAAM/yipee-meme.gif)