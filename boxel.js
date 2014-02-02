/**
 * Apply the boxel effect to an element.
 * @param array options
 * @param integer options.height Height of the boxel element.
 * @param mixed options.speed Speed in milliseconds, or a text value compatible
 *    with jquery (eg. slow, fast)
 * @param string options.easing Easing effect.
 * @param string options.labelOpen The "open" text label
 * @param string options.labelClose The "close" text label
 * @param function options.before Callback function that MUST return true
 *    if the boxel element should continue open/close. First param is the action
 *    ('open' or 'close'), the second is the boxel object.
 * @param function options.after Callback, same as options.before, but the return
 *    value is useless.
 */
jQuery.fn.boxel = function (options) {
  if (!jQuery(this).hasClass('boxel-processed')) {
    var boxel = jQuery(this);
    jQuery(this).addClass('boxel-processed boxel');
    var settings = {
      height: options.height || 250,
      speed: options.speed || 'slow',
      easing: options.swing || 'swing',
      labelOpen: options.labelOpen || 'open',
      labelClose: options.labelClose || 'close',
      before: typeof options.before === 'function' ? options.before : '',
      after: typeof options.after === 'function' ? options.after : ''
    };
    var size = jQuery(this).boxelSize();
    if (size[1] <= settings.height) {
      return;
    }
    var content = jQuery(this).html();
    var inner = jQuery('<div class="boxel-inner boxel-closed"></div>')
      .css({
        overflow: 'hidden',
        textOverflow: 'ellipsis'
      })
      .html(content);
    var label = jQuery('<span></span>').html(settings.labelOpen);
    var handle = jQuery('<div class="boxel-handle"></div>').html(label);
    jQuery(this).html(inner);
    inner.after(handle);
    var handleSize = jQuery(handle).boxelSize();
    var handleBottom = handleSize[1];
    handle.css({ bottom: handleBottom });
    //var finalHeight = settings.height - handleSize[1];
    var finalHeight = settings.height;
    handle.click(function () {
      if (jQuery(handle).prev().hasClass('boxel-closed')) {
        // Open, check for the callback, assume true
        var open = true;
        if (typeof settings.before === 'function') {
          var open = settings.before('open', boxel);
        }
        if (open) {
          jQuery(inner)
            .addClass('boxel-processing boxel-opening')
            .animate(
            {'height': size[1] + (handleSize[1] * 3)},
            settings.speed,
            settings.easing,
            function () {
              jQuery(this)
                .addClass('boxel-open')
                .removeClass('boxel-processing boxel-opening boxel-closed');
              handle.css({ bottom: 0 }).find('span').html(settings.labelClose);
            }
          );
          handle.animate({ bottom: 0 }, 'slow');
          if (typeof settings.after === 'function') {
            settings.after('open', boxel);
          }
        }
      } else {
        // close
        var close = true;
        if (typeof settings.before === 'function') {
          close = settings.before('close', boxel);
        }

        if (close) {
          jQuery(inner)
            .addClass('boxel-processing boxel-closing')
            .animate(
            {'height': finalHeight},
            settings.speed,
            settings.easing,
            function () {
              jQuery(this)
                .addClass('boxel-closed')
                .removeClass('boxel-processing boxel-closing boxel-open');
              handle.css({ bottom: handleBottom }).find('span').html(settings.labelOpen);
            }
          );

          handle.animate({ bottom: handleBottom}, settings.speed, settings.easing);

          jQuery('html, body').animate(
            { scrollTop: jQuery(inner).find('div.field-label').offset().top },
            settings.speed,
            settings.easing
          );
          if (typeof settings.after === 'function') {
            settings.after('close', boxel);
          }
        }
      }
    });
    inner.height(finalHeight);
  }
};
/**/

/**
 * Return the absolute (with margins and paddings) width and height of the element.
 * @returns {*[]}
 */
jQuery.fn.boxelSize = function () {
  var width = jQuery(this).width();
  var height = jQuery(this).height();
  var paddingLeft = parseInt(jQuery(this).css('padding-left'), 10);
  var paddingRight = parseInt(jQuery(this).css('padding-right'), 10);
  var paddingTop = parseInt(jQuery(this).css('padding-top'), 10);
  var paddingBottom = parseInt(jQuery(this).css('padding-bottom'), 10);
  var borderLeft = parseInt(jQuery(this).css('borderLeftWidth'), 10);
  var borderRight = parseInt(jQuery(this).css('borderRightWidth'), 10);
  var borderTop = parseInt(jQuery(this).css('borderTopWidth'), 10);
  var borderBottom = parseInt(jQuery(this).css('borderBottomWidth'), 10);
  var totalWidth = width + paddingLeft + paddingRight + borderLeft + borderRight;
  var totalHeight = height + paddingBottom + paddingTop + borderBottom + borderTop;
  return [totalWidth, totalHeight];
};
/**/