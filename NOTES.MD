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
