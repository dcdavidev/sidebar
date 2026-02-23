# `simpler-sidebar`

A **jQuery plugin** that allows to create a **side nav** as in modern mobile apps. It aims to simplicity so that everybody can use it no matter if expert programmers or not. It is written entirely in javascript so that you won't need to include any css file and the only css you must add is not even required!

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Install

**simpler-sidebar** is available as a npm package

```shell
// with npm
npm install @ctrlmaniac/simpler-sidebar

// with yarn
yarn add @ctrlmaniac/simpler-sidebar
```

## Demo

You can play with options in this [codepen](https://codepen.io/ctrlmaniac/pen/mdLVwoV).

## Usage

Not much to do, just follow the steps below:

### 1. Include jquery

In your html file, include the jquery library! The only required library is the main jquery library. If you want to have access to animation easing you have to include the jquery-ui library too!

```html
<html>
  <head>
    <!-- other tags -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
      integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <!-- boby content -->
  </body>
</html>
```

### 2. Prepare your template

In order to make **simpler-sidebar** work you will need to add at least two html elements in your template:

- an app bar
- the sidebar

The first element you will need is an app bar. An app bar, or a toolbar, is a bar positioned fixed at the top of your template. It must include a button or a simple element that will trigger the opening and closing of the sidebar:

```html
<html>
  <head>
    <!-- other tags -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
      integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="appbar">
      <div class="menu-icon" id="toggle-sidebar"></div>
    </div>
    <!-- appbar -->

    <!-- body content -->
  </body>
</html>
```

The appbar could be any element of your choice. The only actually required element is the triggerer. In the example above a `#toggle-sidebar` is provided. When that element is clicked, the sidebar will open or close!

The second element you will need is of course a sidebar!

```html
<html>
  <head>
    <!-- other tags -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
      integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="appbar">
      <div class="menu-icon" id="toggle-sidebar"></div>
    </div>
    <!-- appbar -->

    <div class="sidebar" id="sidebar">
      <div class="sidebar-wrapper">
        <span class="quit-sidebar">Click me</span>
        <!-- sidebar content -->
      </div>
    </div>
    <!-- sidebar -->

    <!-- body content -->
  </body>
</html>
```

In the example above an element `#sidebar` is added. The sidebar is positioned fixed, content won't overflow automatically. This can't be achieved with javascript because it will introduce number of bugs! So in order to make the sidebar's content overflow, just add a wrapper like in the example. Give it a class of your choice and let content overflow.

Example:

```css
.sidebar-wrapper {
  overflow-y: auto;
  height: 100%;
}
```

The `.quit-sidebar` element is just a simple element, or any other element, inside the sidebar that will trigger the closing animation! If you have to add lists or link that are clickable and that must trigger the closing action of the sidebar, provide that class (or a class of your choice), like in the example!

### 3. Include and configure simpler-sidebar

At the bottom of your html file you now have to include the simpler-sidebar plugin! Check the location of the script in your project (like node_modules) or vendor. Or bundle the script with all your vendor libraries, then include it!

```html
<html>
  <head>
    <!-- other tags -->
    <script
      src="https://code.jquery.com/jquery-3.5.1.min.js"
      integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0="
      crossorigin="anonymous"
    ></script>
    <script
      src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js"
      integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
      crossorigin="anonymous"
    ></script>
  </head>
  <body>
    <div class="appbar">
      <div class="menu-icon" id="toggle-sidebar"></div>
    </div>
    <!-- appbar -->

    <div class="sidebar" id="sidebar">
      <div class="sidebar-wrapper">
        <span class="quit-sidebar">Click me</span>
        <!-- sidebar content -->
      </div>
    </div>
    <!-- sidebar -->

    <!-- body content -->

    <!-- this is only an example! Check the right location of the script in your project -->
    <script src="static/js/simpler-sidebar.js"></script>

    <!-- customize simple-sidebar -->
    <script>
      $('document').ready(function () {
        $('#sidebar-left').simplerSidebar({
          toggler: '#toggle-sidebar',
          quitter: '.quit-sidebar',
        });
      });
    </script>
  </body>
</html>
```

In the example above you will find the only required options of **simpler-sidebar**:

> `#toggle-sidebar` is the element that will open and close the sidebar when clicked. It's the menu icon that you find at the top right or left of any web app!

> `.quit-sidebar` is the class that you must provide to all elements inside the sidebar component that will trigger the closing action when clicked! Tip: you can add this class to the sidebar wrapper to make the wrapper itself the element that will trigger the closing action of the sidebar when clicked!

## Options

Full option list

```javascript
{
  quitter: "a", // string (class) - The element that will trigger the closing action
  toggler: "", // string (id) - The element that will trigger the closing and opening action
  attr: "sidebar-main", // string - the data attribute assigned to the elements the library will interact with
  open: false, // bool - initialize sidebar opened or closed
  align: "right", // string - right, left -- the position of the sidebar
  top: 0, // int - the amount in px of the position top of the sidebar
  width: 300, // int - the size in px of the sidebar
  gap: 64, // int - the amount in px ot the gap that will be left when the screen is narrower than the sidebar width
  zIndex: 3000, // int - the z-index of the sidebar element
  freezePage: true, // bool - this option will disallow the scrolling of the page beneath the sidebar when it is opened
  animation: {
    duration: 500, // int - the time in ms of the animation
    easing: "swing", // string - the tipe of easing animation
  },
  mask: {
    // a mask that will cover the content beneath the sidebar when opened
    display: true, // boolean - disable or not the mask element
    css: {
      backgroundColor: "black",
      opacity: 0.5,
      filter: "Alpha(opacity=50)",
    },
  },
  events: {
    onOpen: function () {}, // function - event(s) triggered when sidebar is opening
    afterOpen: function () {}, // function - event(s) triggered after sidebar opened
    onClose: function () {}, // function - event(s) triggered when sidebar is closing
    afterClose: function () {}, // function - event(s) triggered after sidebar is closed
    always: function () {}, // function - event(s) triggered both on and after closing and opening
  },
}
```
