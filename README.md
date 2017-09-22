# Meteor + Cordova + React + Redux starter

This repo contains the basic setup for Meteor mobile apps, that use React and Redux on the frontend.
It leverages a scalable app structure, that separates the app into a feature modules, contained in
the imports directory

### Running

```sh
$ npm start
```

## Project Structure

* "client" and "server" folders are loaded on the client and server respectively
* "imports" folder holds all the main app's logic, divided into modules

Each top-level feature should be contained in a related module.

Basic module structure:

```
.
+-- moduleName/
|   +-- api/    - logic layer
|   |   +-- redux/   - redux actions, constants and reducers
|   |   |   +-- actions.js
|   |   |   +-- constants.js
|   |   |   +-- reducer.js
|   |   |   models/   - db collection related models
|   |   |   +-- collectionName.js
|   |   |   +-- collectionName_methods.js
|   |   |   +-- collectionName_pubs.js
|   |   |   +-- collectionName_hooks.js
|   |   +-- methods/   - methods, not related to some model
|   |   +-- static/    - static data
|   |   +-- utils/     - utils and helper methods
|   +-- startup/   - some initialization logic
|   |   +-- client/
|   |   +-- server/
|   +-- ui/   - view layer
|   |   +-- layouts/    - components that contain pages
|   |   +-- pages/      - components that have a corresponding route
|   |   +-- components/ - components that are first level building blocks for pages
|   |   +-- particles/  - components that are particles for another components
|   |   index.js   - module exports

```

When something should be shared between modules, it should be exported in index.js file.
So if you need some view or logic from another module, you can do:

```
// Good
import { SomeComponent } from '/imports/someFeature'
import { SomeCollection } from '/imports/anotherFeature'

```

And avoid:

```
// Bad
import SomeComponent from '/imports/someFeature/really/deep/path/SomeComponent'

```

There is a special module called `core`.
It holds app initialization logic, routes and redux store.
Holds top level app components like "MainLayout".
Think of in as a master module, and of all the other modules as sub-modules.

It's not mandatory that a module should contain all the specified folders.
There can be presentational only modules or api only modules.

### Styling

For styles 'scss' pre-processor is used.

### General structure

```
.
+-- app/
|   +-- client/
|   |   +-- styles/
|   |   |   +-- main.scss
|   |   |   +-- styles/ -   common use scss files, like mixing, variables, fonts
|   |   +-- main.html   -   main html entry
|   |   +-- main.js     -   main client entry. generally used to import startup/client from the 'core' module.
|   +-- i18n/
|   +-- imports/
|   |   +-- core/
|   |   +-- someModule/
|   |   +-- someOtherModule/
|   +-- lib/
|   +-- public/
|   |   +-- fonts/
|   |   +-- images/
|   +-- server/
|   |   +-- main.js  - main server entry. generally used to import startup/sever from the 'core' module.

```

P.S. Dont forget to put settings.json into .gitignore
