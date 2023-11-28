This repo is purely here to illustrate a weird behaviour of the remix.js dev server for issue [#8155](https://github.com/remix-run/remix/issues/8155)

To start the server just to the basic:
```
npm i
npm run build
npm run start
```

In this full server execution all pages function properly, but if you run it using the dev server, it often implodes after handling one request
```
npm i
npm run build
npm run dev
```