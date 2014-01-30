boxel
=====

This repo is for testing purpose.
=====
Im using this project to practice with git and github, so aspect many fake commits along the way.

Simple jQuery plugin that create a collapsible box from an element (could be everything in the dom) with an handle (button) to open it (restore the original height) and close it.


Simple usage:

    jQuery(selector).boxel({
      height: 250,// Height of the boxel element, default 250.
      speed: 'slow',// Speed in milliseconds, or a text value compatible with jquery (eg. slow, fast), default 'slow'
      easing: 'swing',// Easing effect.
      labelOpen: 'Read all &#10549;',// The "open" text label
      labelClose: 'Close &#10548;',// The "close" text label
      //before: function(action, boxel){ return true;} Callback
      //after: function(action, boxel){ return true;} Callback
    });

Before callback, if given,  MUST return true if the boxel element should continue the action (open/close).
First argument is the action ('open' or 'close'), the second is the boxel object.

After callback use the same arguments.
