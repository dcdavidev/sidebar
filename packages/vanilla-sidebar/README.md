# `vanilla-sidebar`

**vanilla-sidebar** is a simple sidebar or side nav that aims to have to dependencies. In fact it is written in plain vanilla javascript!

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Install

**vanilla-sidebar** is available as a npm package

```shell
// with npm
npm install @ctrlmaniac/vanilla-sidebar

// with yarn
yarn add @ctrlmaniac/vanilla-sidebar
```

## Demo

You can play with `vanilla-sidebar`'s options and features in this [codepen](https://codepen.io/ctrlmaniac/pen/eYrJWwR).

## Usage

Follow these steps

### 1. Prepare your template

In order to make **vanilla-sidebar** work you will need to add at least two html elements in your template:

- an app bar
- the sidebar

The first element you will need is an app bar. An app bar, or a toolbar, is a bar positioned fixed at the top of your template. It must include a button or a simple element that will trigger the opening and closing of the sidebar:

```html
<div class="appbar">
  <div class="menu-icon" id="toggle-sidebar"></div>
</div>
<!-- appbar -->

<!-- body content -->

<!-- sidebar -->
<div class="sidebar" id="main-sidebar"></div>
```

### 2. Include and configure `vanilla-sidebar`

```html
<div class="appbar">
  <div class="menu-icon" id="toggle-sidebar"></div>
</div>
<!-- appbar -->

<!-- body content -->

<!-- sidebar -->
<div class="sidebar" id="main-sidebar">
  <a href="#" class="quit-sidebar">Click me</a>
</div>
<script src="/path-to/vanilla-sidebar.js"></script>

<!-- customize vanilla-sidebar -->
<script>
  var sidebar = new VanillaSidebar({
    selector: '#main-sidebar',
    triggerer: '#toggle-sidebar',
    quitter: '.quit-sidebar',
  });
</script>
```

## Options

```typescript
selector: string; // The sidebar selector
triggerer: string; // The element that will trigger the opening and closing event (ex: a menu button)
quitter: string; // Elements (preferably a class) inside the sidebar that once clicked will trigger the closing event
mask: boolean; // Whether to show the mask or not
align: 'right' | 'left'; // The align of the sidebar
top: string; // The top offset of the sidebar
width: string; // The width of the sidebar
gap: string; // The safe gap between the sidebar and the window when the sidebar is opened
opened: boolean; // Whether the sidebar is initialized opened or closed
easing: string; // The animation of the opening and closing event
zIndex: number;
```
