// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = function (root, jQuery) {
      if (jQuery === undefined) {
        jQuery =
          globalThis.window === undefined
            ? require('jquery')(root)
            : require('jquery');
      }
      factory(jQuery);
      return jQuery;
    };
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  $.fn.simplerSidebar = function (options) {
    // Default values
    // These values can be overwritten
    var configs = $.extend(
      true,
      {
        quitter: 'a', // must be changed by user because it's buggy
        attr: 'sidebar-main',
        open: false,
        align: 'left',
        top: 0,
        width: 300,
        gap: 64,
        zIndex: 3000,
        freezePage: true,
        animation: {
          duration: 500,
          easing: 'swing',
        },
        mask: {
          display: true,
          css: {
            backgroundColor: 'black',
            opacity: 0.5,
            filter: 'Alpha(opacity=50)',
          },
        },
        events: {
          onOpen: function () {},
          afterOpen: function () {},
          onClose: function () {},
          afterClose: function () {},
          always: function () {},
        },
      },
      options
    );

    // return this to keep chainability
    return this.each(function () {
      var $sidebar = $(this);
      var windowWidth = $(globalThis).width();
      var baseAttr = 'data-' + configs.attr;
      var sidebarAttrOpen = baseAttr + '-open';

      /**
       * Set the sidebar width according to the current window width
       * @param windowWidth - $(window).width()
       * @returns
       */
      var setSidebarWidth = function (windowWidth) {
        return windowWidth < configs.width + configs.gap
          ? windowWidth - configs.gap
          : configs.width;
      };

      /**
       * Return the current sidebar open attr
       * @returns
       */
      var isSidebarOpen = function () {
        return JSON.parse($sidebar.attr(sidebarAttrOpen));
      };

      /**
       * change sidebar attr `open` status
       * @param status
       */
      var setSidebarAttrOpen = function (status) {
        $sidebar.attr(sidebarAttrOpen, status);
      };

      // apply style and init attribute
      $sidebar.attr(sidebarAttrOpen, configs.open).css({
        display: 'block',
        position: 'fixed',
        top: Number.parseInt(configs.top), // default: 64px
        bottom: 0, // don't change this value
        width: setSidebarWidth(windowWidth),
        zIndex: configs.zIndex,
        [configs.align]: configs.open ? 0 : -setSidebarWidth(windowWidth),
      });

      // Define Mask
      var $mask = $('<div>').attr(baseAttr, 'mask');

      // define mask style
      var maskStyle = $.extend(
        true,
        {
          position: 'fixed',
          top: Number.parseInt(configs.top),
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: configs.zIndex - 1,
          display: configs.open ? 'block' : 'none',
        },
        configs.mask.css
      );

      // if mask is enabled than it is created
      if (configs.mask.display) {
        $mask.appendTo('body').css(maskStyle);
      }

      /** events triggered on sidebar opening */
      var onSidebarOpenEvent = function () {
        // Show mask
        if (configs.mask.display) {
          $mask.fadeIn(configs.animation.duration);
        }

        // freeze page
        if (configs.freezePage) {
          $('body').css('overflow-y', 'hidden');
        }

        setSidebarAttrOpen(true);

        // trigger user custom events
        configs.events.always();
        configs.events.onOpen();
      };

      /** events triggerd after sidebar opening action */
      var afterSidebarOpenEvent = function () {
        // trigger user custom events
        configs.events.always();
        configs.events.afterOpen();
      };

      /** events triggered on sidebar closing */
      var onSidebarCloseEvent = function () {
        // hide mask
        if (configs.mask.display) {
          $mask.fadeOut(configs.animation.duration);
        }

        // unfreeze page
        if (configs.freezePage) {
          $('body').css('overflow-y', 'visible');
        }

        setSidebarAttrOpen(false);

        // trigger user custom events
        configs.events.always();
        configs.events.onClose();
      };

      /** events triggerd after sidebar closing action */
      var afterSidebarCloseEvent = function () {
        // trigger user custom events
        configs.events.always();
        configs.events.afterClose();
      };

      /** triggers sidebar action open */
      var openSidebar = function () {
        // animation
        $sidebar.animate(
          { [configs.align]: 0 },
          configs.animation.duration,
          configs.animation.easing,
          afterSidebarOpenEvent
        );

        // trigger parallel events
        onSidebarOpenEvent();
      };

      /** triggers sidebar action close */
      var closeSidebar = function () {
        // animation
        $sidebar.animate(
          { [configs.align]: -$sidebar.width() },
          configs.animation.duration,
          configs.animation.easing,
          afterSidebarCloseEvent
        );

        // trigger parallel events
        onSidebarCloseEvent();
      };

      // trigger open or close action when the toggler is clicked
      $(configs.toggler).click(function () {
        if (isSidebarOpen()) {
          closeSidebar();
        } else {
          openSidebar();
        }
      });

      // trigger close action when $mask is clicked
      $mask.click(closeSidebar);

      // trigger close action when quitter elements
      // in sidebar are clicked
      $sidebar.on('click', configs.quitter, closeSidebar);

      // Updates on window resize
      $(globalThis).resize(function () {
        var windowWidth = $(globalThis).width();

        // update default sidebar width on window resize
        $sidebar.css('width', setSidebarWidth(windowWidth));

        // update sidebar width while open
        if (!$sidebar.attr(sidebarAttrOpen)) {
          $sidebar.css(configs.align, -$sidebar.width());
        }
      });
    });
  };
});
