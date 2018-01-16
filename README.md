After wasting countless hours no setting this up every time or copypasting previous projects I've finally convinced myself to create a ready-to-use template for simple landing pages.

Nothing fancy, just adding `ES6`, `SCSS` and some `minification` to the build process.

This template uses [Gulp](https://gulpjs.com) for building process.


# Supported `/src` directory structure

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

```
gulp cleanup
```
Task used to clean up the `dist` directory upon build.

----

```
gulp build
```
Created a 'ready-to-use' production package in `/dist` directory.

---

```
gulp dev
```
For development. Watches for changes in all project files and creates a production bundle in `/dist` directory on change.

---

```
gulp zip-dev
```
Create a `.zip` bundle from all the `src` files.

---

```
gulp zip-prod
```
Create a `.zip` bundle from all the `dist` files.

## **CSS**

```
gulp fonts-css
```
Bundles and minifies font specific `css` files.

---
```
gulp vendors-css
```
Bundles and minifies `css` files from vendors.

---

```
gulp scss
```
Bundles and minifies all project related `scss` files.

---

```
gulp css
```
Runs `cleanup` task and then all the above `css` related tasks.

---

## **Javascript**

```
gulp js-vendors
```
Bundles together all the `vendor` scripts e.g. `jQuery` in a single, minified `vendors` file.

---

```
gulp js-dev
```
Bundles together and minifies all the project specific `js` files. Enables the use of `ES6`.

---

```
gulp js
```
Runs `cleanup` task and then all the above `js` related tasks.

---

## **Static files**

```
gulp img
```
Copies all the static image files from `/img` directory and it's subdirectories.

---

```
gulp fonts
```
Copies all the font files – `.eot`, `.svg` etc.

---

```
gulp html
```
Copies all the static `.html` files whilst replacing the links to `css` and `js` files.

---

```
gulp static
```
Runs `cleanup` task and then all the above static files related tasks.

---