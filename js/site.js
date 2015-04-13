// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = [37, 38, 39, 40];

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;
}


$.fn.scrollTo = function( target, options, callback ){
  if(typeof options == 'function' && arguments.length == 2){ callback = options; options = target; }
  var settings = $.extend({
    scrollTarget  : target,
    offsetTop     : 0,
    duration      : 500,
    easing        : 'swing'
  }, options);
  return this.each(function(){
    var scrollPane = $(this);
    var scrollTarget = (typeof settings.scrollTarget == "number") ? settings.scrollTarget : $(settings.scrollTarget);
    var scrollY = (typeof scrollTarget == "number") ? scrollTarget : scrollTarget.offset().top + scrollPane.scrollTop() - parseInt(settings.offsetTop);
    scrollPane.animate({scrollTop : scrollY }, parseInt(settings.duration), settings.easing, function(){
      if (typeof callback == 'function') { callback.call(this); }
    });
  });
}

$(function()
{
    // Disable scroll
    disable_scroll();

    setTimeout(function() {
        move('.spinner').set('opacity',0).end();
        move('#top h1').set('opacity', '1').ease('in').end();
        // move('.skills .content .storm').set('height',40).delay('0.7s').end();
        // move('.skills .content span:first-child').set('opacity',1).delay('0.8s').end();
        // move('.skills .content span:first-child').set('top',0).delay('0.8s').end();
        // move('.skills .content span:nth-child(3)').set('opacity',1).delay('0.9s').end();
        // move('.skills .content span:nth-child(3)').set('bottom',0).delay('0.9s').end();
        move('#top h2').set('opacity',1).delay('1s').end();
        if ($(this).width() < 767)
        {
            move('#top').set('background-position', '50% 120%').delay('1s').end();
        }
        else
        {
            move('#top').set('background-position', '50% 100%').ease('bounce').delay('1s').end();
        }
        // move('.backgrounds').set('opacity',1).delay('1.5s').end();
        move('.backgrounds').translate(50, 0).delay('1.5s').end();
        move('.backgrounds img').set('bottom',0).delay('1.5s').end();
        move('.backgrounds img').rotate(0).delay('1.5s').end();
        move('#scroll-down').set('opacity',1).delay('1.5s').end();
        move('.main-menu').set('opacity',1).delay('1s').end();
        enable_scroll();
    }, 2000);

    $('.main-menu a').on('click',function(event){
        $('body').scrollTo($(this).attr('href'));
        event.preventDefault();
    });

});