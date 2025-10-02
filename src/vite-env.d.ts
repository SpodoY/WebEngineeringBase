/*
This file is needed so typescript and vite "work together" so I can split my comment-section component
and import the .html and .css files in my .ts file

For more info see:
https://vite.dev/guide/features.html#disabling-css-injection-into-the-page
https://vite.dev/guide/env-and-mode.html#intellisense-for-typescript
*/

declare module '*.html?raw' {
  const content: string;
  export default content;
}

declare module '*.css?inline' {
  const content: string;
  export default content;
}
