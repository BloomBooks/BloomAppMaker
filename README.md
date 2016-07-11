# Bloom Library App Maker

### Getting Started
**Make sure you have Node version >= 5.0 and NPM >= 3**
**You may not be able to build correctly if you are not building it on your local drive**

```bash
# WINDOWS ONLY
# add required global libraries `typings webpack-dev-server rimraf webpack`
npm install -g typings webpack-dev-server rimraf webpack

# install the repo with npm
npm install

# WINDOWS ONLY
# install typings
npm run typings-install

# install jQuery typescript
tsd install

# edit jquery
path:"typings/jquery/jquery.d.ts"

# Modify jquery.d.ts and change
declare module "jquery" {
    export = $;
}
declare var jQuery: JQueryStatic;
declare var $: JQueryStatic;

# to:
declare module "jquery" {
    export = jQuery;
}
declare var jQuery: JQueryStatic;

# start server
npm start
```

## Other Command

### build files
```bash
# development
npm run build:dev
# production
npm run build:prod
```

### server
```bash
# development
npm run server
# production
npm run server:prod
```