// Function to use vh & vw units
function vh(v) {
  var h = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  );
  return (v * h) / 100;
}

function vw(v) {
  var w = Math.max(
    document.documentElement.clientWidth,
    window.innerWidth || 0
  );
  return (v * w) / 100;
}

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = { 37: 1, 38: 1, 39: 1, 40: 1, 32: 1, 33: 1, 34: 1, 35: 1, 36: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener(
    "test",
    null,
    Object.defineProperty({}, "passive", {
      get: function () {
        supportsPassive = true;
      },
    })
  );
} catch (e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent =
  "onwheel" in document.createElement("div") ? "wheel" : "mousewheel";

// call this to Disable
function disableScroll() {
  window.addEventListener("DOMMouseScroll", preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener("touchmove", preventDefault, wheelOpt); // mobile
  window.addEventListener("keydown", preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener("DOMMouseScroll", preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener("touchmove", preventDefault, wheelOpt);
  window.removeEventListener("keydown", preventDefaultForScrollKeys, false);
}

disableScroll();

/**************************************************************************** */
/*********************** Start navigation ********************************** */
/************************************************************************** */

var container = document.querySelector(".view__container");
var position = 0;

function addEventListener() {
  window.addEventListener(
    "wheel",
    function (el) {
      var prevPosition = position;
      if (el.deltaY > 20) {
        position++;
        container.classList.replace(
          `position--${prevPosition}`,
          `position--${position}`
        );
      } else if( el.deltaY < -20 && position != 0) {
        position--;
        container.classList.replace(
          `position--${prevPosition}`,
          `position--${position}`
        );
      }
      setTimeout(() => {
        addEventListener();
      }, 1200);
    },
    { passive : true,
      once: true }
  );
}

document.addEventListener('mousemove', function(e) {
  container.style.left = `${vw(5) - e.clientX*0.1}px`
  container.style.top = `${vh(5) - e.clientY*0.1}px`
  document.querySelector('.title__view--1').style.transform = `translate(${e.clientX*0.05}px, ${e.clientY*0.05}px)`

  if(e.clientX < 20 || e.clientX > window.innerWidth - 20 || e.clientY < 20 || e.clientY > window.innerHeight - 20) {
    console.log('triggered')
  }
})


addEventListener();

