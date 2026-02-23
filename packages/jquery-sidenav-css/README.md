# @dcdavidev/jquery-sidenav-css

A lightweight and performant side navigation plugin for jQuery that leverages **CSS3 transitions** for ultra-smooth animations. This version is optimized for modern browsers and offers better performance on low-power devices compared to traditional JavaScript-based animations.

## Features

- ⚡ **CSS3 Hardware Accelerated**: Uses native browser transitions for maximum smoothness.
- 📱 **Mobile-First**: Designed to feel like a native mobile app sidebar.
- 🛠️ **Lightweight**: No dependency on jQuery UI.
- 🧊 **Page Freezing**: Prevents background scrolling when the menu is active.
- 🎭 **Clickable Mask**: Automatically creates a customizable background overlay.
- ⌨️ **TypeScript Ready**: Full type definitions included.

## Installation

```shell
# pnpm
pnpm add @dcdavidev/jquery-sidenav-css

# npm
npm install @dcdavidev/jquery-sidenav-css

# yarn
yarn add @dcdavidev/jquery-sidenav-css
```

### Dependencies

This plugin only requires **jQuery** (v4.0+ recommended).

```html
<script src="https://code.jquery.com/jquery-4.0.0.min.js"></script>
```

## Quick Start

### 1. HTML Structure

Setup your trigger button and the navigation container.

```html
<!-- Trigger -->
<header>
  <button id="toggle-sidenav">Open Menu</button>
</header>

<!-- Sidenav -->
<nav id="sidenav">
  <div class="sidenav-wrapper">
    <button class="quit-sidenav">Close</button>
    <ul>
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Settings</a></li>
      <li><a href="#">Logout</a></li>
    </ul>
  </div>
</nav>
```

### 2. Basic Initialization

Target your sidenav element and initialize the plugin:

```javascript
$(document).ready(function () {
  $('#sidenav').sidenav({
    toggler: '#toggle-sidenav',
    quitter: '.quit-sidenav',
  });
});
```

## Advanced Usage

### Handling Content Overflow

To ensure long menus are scrollable, add the following CSS to your wrapper:

```css
#sidenav .sidenav-wrapper {
  height: 100%;
  overflow-y: auto;
}
```

### Event Lifecycle

Hook into sidenav events to add custom interactions:

```javascript
$('#sidenav').sidenav({
  toggler: '#toggle-sidenav',
  events: {
    onOpen: function () {
      console.log('Animation started...');
    },
    afterOpen: function () {
      $('#toggle-sidenav').addClass('active');
    },
    afterClose: function () {
      $('#toggle-sidenav').removeClass('active');
    },
  },
});
```

## Options

| Option               | Type                | Default          | Description                                                            |
| :------------------- | :------------------ | :--------------- | :--------------------------------------------------------------------- |
| `toggler`            | `string`            | `''`             | **Required**. Selector for the element that toggles the menu.          |
| `quitter`            | `string`            | `'a'`            | Selector for elements inside the menu that will close it when clicked. |
| `attr`               | `string`            | `'sidenav-main'` | Data attribute prefix.                                                 |
| `align`              | `'left' \| 'right'` | `'left'`         | Sidebar alignment side.                                                |
| `width`              | `number`            | `300`            | Width of the menu in pixels.                                           |
| `gap`                | `number`            | `64`             | Minimum gap from the screen edge on small devices.                     |
| `open`               | `boolean`           | `false`          | Initial state on page load.                                            |
| `zIndex`             | `number`            | `3000`           | The z-index of the sidenav.                                            |
| `freezePage`         | `boolean`           | `true`           | Disables `body` scrolling when menu is open.                           |
| `animation.duration` | `number`            | `300`            | CSS transition duration in milliseconds.                               |
| `animation.easing`   | `string`            | `'ease-out'`     | Any valid CSS `transition-timing-function`.                            |
| `mask.display`       | `boolean`           | `true`           | Enable/disable the background overlay.                                 |
| `mask.opacity`       | `number`            | `0.5`            | Opacity of the background mask.                                        |
| `mask.css`           | `object`            | `{...}`          | Custom CSS for the mask (e.g., `backgroundColor`).                     |

## Key Differences from `@dcdavidev/jquery-sidenav`

- **Performance**: Uses CSS3 `transition` instead of jQuery `.animate()`, leading to smoother 60fps animations.
- **Dependencies**: No dependency on jQuery UI easing.
- **Easing**: Supports any CSS easing value (e.g., `cubic-bezier`).
- **Options**: `mask.opacity` is a top-level option for easier customization.

## License

MIT © [Davide Di Criscito](https://github.com/dcdavidev)
