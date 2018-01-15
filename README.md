# Landing page project template

After wasting countless hours no setting this up every time or copypasting previous projects I've finally convinced myself to create a ready-to-use template for simple landing pages.

Nothing fancy, just adding `ES6`, `SCSS` and some `minification` to the build process.

This template uses [Gulp](https://gulpjs.com) for building process.


## Supported `/src` directory structure

It's pretty basic and speaking for itself, but just for the purpose of keeping the information in one place.

```
.
├── css/
|   └── fonts/
├── img/
├── js/
|   └── vendors/
├── *.html
```

Of course this can be modified using the `gulpfile` but that's how it works out of the box.

# Instalation

Clone the repository

```
git clone git@github.com:andrzejkala/landing-template.git
```

Install all the dependencies

```
npm install
```

# Usage

Project provides to main tasks for creating a distribution package.

To build a production package:

```
gulp build
```

For development use the `watch` task, which triggers the `build` task on any file change in the `/src/` directory.

```
gulp watch
```

# Available tasks

## **General**

Tasks that are used as utilities for other tasks.

- ### `cleanup`
  Task used to clean up the `dist` directory upon build.

- ### `build`
  Created a 'ready-to-use' production package in `/dist` directory.

- ### `watch`
  For development. Watches for changes in all project files and creates a production bundle in `/dist` directory on change.

- ### `zip-dev`
  Create a `.zip` bundle from all the `src` files.

- ### `zip-prod`
  Create a `.zip` bundle from all the `dist` files.

## **Css**

- ### `fonts-css`
  Bundles and minifies font specific `css` files.

- ### `scss`
  Bundles and minifies all project related `scss` files.

- ### `css`
  Runs `cleanup` task and then all the above `css` related tasks.

## **Javascript**

- ### `js-vendors`
  Bundles together all the `vendor` scripts e.g. `jQuery` in a single, minified `vendors` file.

- ### `js-dev`
  Bundles together and minifies all the project specific `js` files. Enables the use of `ES6`.

- ### `js`
  Runs `cleanup` task and then all the above `js` related tasks.

## **Static files**

- ### `img`
  Copies all the static image files from `/img` directory and it's subdirectories.

- ### `fonts`
  Copies all the font files – `.eot`, `.svg` etc.

- ### `html`
  Copies all the static `.html` files whilst replacing the links to `css` and `js` files.

- ### `static`
  Runs `cleanup` task and then all the above static files related tasks.


# Todo

It's a rough template that needs some more polish.

- add some kind of `dev server`
- provide some additional output for tasks
- `cleanup` task needs some refinement (remove only files in currently processed directory e.g. `css`, not everything)
- check if dependencies exist (e.g. `vendors`) and ignore if they aren't present
- load dependencies directly form marked places in `.html` files (`html` task improvement)