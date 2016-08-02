# Bloom Library App Maker

An Angular 2 - based web app that lets users order new custom apps composed of Bloom Books found on the [Bloom Library](http://bloomlibrary.org) and publish them to the Google Play Store.

## Dependencies
Node version >= 5.0 and NPM >= 3**.

Access to BloomLibrary's Parse Server api.

## Building
```bash
# (WINDOWS ONLY) add required global libraries `typings webpack-dev-server rimraf webpack`
npm install -g typings webpack-dev-server rimraf webpack

# install the repo with npm
npm install

# install typings, which typescript uses to know the types of javascript libraries
# (WINDOWS ONLY) (this command is included in npm install for Linux)
npm run typings-install

# build without running server
npm run build:dev

# or
npm run build:prod
```

## Running with continuous build and update

```bash
# development
npm run server

# production
npm run server:prod
```
These start a local server at http://localhost:3000 using webpack-dev-server which will watch, build (in-memory), and reload for you.

Note: You may not be able to build correctly if you are not building it on your local drive.

# The build system
This project is based on the https://github.com/AngularClass/angular2-webpack-starter.
