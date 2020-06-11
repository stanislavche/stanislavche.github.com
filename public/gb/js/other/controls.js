const JS_KEY_UP = 38;
const JS_KEY_LEFT = 37;
const JS_KEY_RIGHT = 39;
const JS_KEY_DOWN = 40;
const JS_KEY_ENTER = 13;
const JS_KEY_ALT = 18;
const JS_KEY_CTRL = 17;
const JS_KEY_SHIFT = 16;

const JS_KEY_W = 87;
const JS_KEY_A = 65;
const JS_KEY_S = 83;
const JS_KEY_D = 68;
const JS_KEY_J = 74;
const JS_KEY_K = 75;

const JS_KEY_Z = 90;
const JS_KEY_X = 88;

const DEADZONE = 0.1;

var isTouchEnabled = "ontouchstart" in document.documentElement;
isTouchEnabled = true;
var isReady = false;

var controller = document.getElementById("controller");
var btnA = document.getElementById("controller_a");
var btnB = document.getElementById("controller_b");
var btnStart = document.getElementById("controller_start");
var emptyScreen = document.getElementById("emptyScreen");
var btnSelect = document.getElementById("controller_select");
var dpad = document.getElementById("controller_dpad");
var btnLeft = document.getElementById("controller_left");
var btnRight = document.getElementById("controller_right");
var btnUp = document.getElementById("controller_up");
var btnDown = document.getElementById("controller_down");
var mainCanvas = document.getElementById("gameboy_shell");
mainCanvas.addEventListener('click', checkUserEvent);

function bindButton(el, code) {
  "mousedown touchstart".split(" ").forEach(function(eventName){
    el.addEventListener(eventName, function(e) {
      e.preventDefault();
      e.stopPropagation();
      e.currentTarget.className = e.currentTarget.className + " btnPressed";
      GameBoyKeyDown(code);
    });
  });
  
  "mouseup touchend".split(" ").forEach(function(eventName){
    el.addEventListener(eventName, function(e) {
      e.preventDefault();
      e.stopPropagation();
      initSound();
      e.currentTarget.className = e.currentTarget.className.replace(
        / btnPressed/,
        ""
      );
      GameBoyKeyUp(code);
    });
  });
}

function bindDpad(el) {
  "mousedown touchstart".split(" ").forEach(function(eventName){
    el.addEventListener(eventName, function(e) {
      e.preventDefault();
      e.stopPropagation();
      var rect = e.currentTarget.getBoundingClientRect();
      var x = 0;
      var y = 0;
      e.target.className = e.target.className + " btnPressed";
      if (eventName === 'mousedown') {
        x = (2 * (e.clientX - rect.left)) / rect.width - 1;
        y = (2 * (e.clientY - rect.top)) / rect.height - 1;
      } else {
        x = (2 * (e.targetTouches[0].clientX - rect.left)) / rect.width - 1;
        y = (2 * (e.targetTouches[0].clientY - rect.top)) / rect.height - 1;
      }
      move(x, y);
    });
  });

  "mouseup touchend".split(" ").forEach(function(eventName){
    el.addEventListener(eventName, function(e) {
      e.preventDefault();
      e.stopPropagation();
      var rect = e.currentTarget.getBoundingClientRect();
      var x = 0;
      var y = 0;
      e.target.className = e.target.className.replace(
        / btnPressed/,
        ""
      );
      if (eventName === 'mouseup') {
        x = (2 * (e.clientX - rect.left)) / rect.width - 1;
        y = (2 * (e.clientY - rect.top)) / rect.height - 1;
      } else {
        x = (2 * (e.targetTouches[0].clientX - rect.left)) / rect.width - 1;
        y = (2 * (e.targetTouches[0].clientY - rect.top)) / rect.height - 1;
      }
      
      move(x, y);
    });
  });

  function move(x, y) {
    if (x < -DEADZONE || x > DEADZONE) {
      if (y > x && y < -x) {
        GameBoyKeyUp("right");
        GameBoyKeyDown("left");
      } else if (y > -x && y < x) {
        GameBoyKeyUp("left");
        GameBoyKeyDown("right");
      }

      if (y > -DEADZONE && y < DEADZONE) {
        GameBoyKeyUp("up");
        GameBoyKeyUp("down");
      }
    }

    if (y < -DEADZONE || y > DEADZONE) {
      if (x > y && x < -y) {
        GameBoyKeyUp("down");
        GameBoyKeyDown("up");
      } else if (x > -y && x < y) {
        GameBoyKeyUp("up");
        GameBoyKeyDown("down");
      }

      if (x > -DEADZONE && x < DEADZONE) {
        GameBoyKeyUp("left");
        GameBoyKeyUp("right");
      }
    }
  }

  "mouseup touchend".split(" ").forEach(function(eventName){
    el.addEventListener(eventName, function(e) {
      e.preventDefault();
      e.stopPropagation();
      initSound();
      GameBoyKeyUp("left");
      GameBoyKeyUp("right");
      GameBoyKeyUp("up");
      GameBoyKeyUp("down");
    });
  });
}

function bindKeyboard() {
  window.onkeydown = function(e) {
    initSound();
    if (isTouchEnabled) {
      //controller.style.display = "none";
      //isTouchEnabled = false;
    }
    if (
      e.keyCode !== JS_KEY_CTRL &&
      e.keyCode !== JS_KEY_ALT &&
      (e.altKey || e.ctrlKey || e.metaKey)
    ) {
      return;
    }
    if (e.keyCode === JS_KEY_LEFT || e.keyCode === JS_KEY_A) {
      GameBoyKeyDown("left");
      pressedButton("left");
    } else if (e.keyCode === JS_KEY_RIGHT || e.keyCode === JS_KEY_D) {
      GameBoyKeyDown("right");
      pressedButton("right");
    } else if (e.keyCode === JS_KEY_UP || e.keyCode === JS_KEY_W) {
      GameBoyKeyDown("up");
      pressedButton("up");
    } else if (e.keyCode === JS_KEY_DOWN || e.keyCode === JS_KEY_S) {
      GameBoyKeyDown("down");
      pressedButton("down");
    } else if (e.keyCode === JS_KEY_ENTER) {
      GameBoyKeyDown("start");
      pressedButton("start");
    } else if (
      e.keyCode === JS_KEY_ALT ||
      e.keyCode === JS_KEY_Z ||
      e.keyCode === JS_KEY_J
    ) {
      GameBoyKeyDown("a");
      pressedButton("a");
    } else if (
      e.keyCode === JS_KEY_CTRL ||
      e.keyCode === JS_KEY_K ||
      e.keyCode === JS_KEY_X
    ) {
      GameBoyKeyDown("b");
      pressedButton("b");
    } else if (e.keyCode === JS_KEY_SHIFT) {
      GameBoyKeyDown("select");
      pressedButton("select");
    }
    e.preventDefault();
  };

  window.onkeyup = function(e) {
    if (e.key === "Dead") {
      // Ipad keyboard fix :-/
      // Doesn't register which key was released, so release all of them
      ["right", "left", "up", "down", "a", "b", "select", "start"].forEach(
        key => {
          GameBoyKeyUp(key);
          unPressedButton(key)
        }
      );
    }
    if (e.keyCode === JS_KEY_LEFT || e.keyCode === JS_KEY_A) {
      GameBoyKeyUp("left");
      unPressedButton("left")
    } else if (e.keyCode === JS_KEY_RIGHT || e.keyCode === JS_KEY_D) {
      GameBoyKeyUp("right");
      unPressedButton("right")
    } else if (e.keyCode === JS_KEY_UP || e.keyCode === JS_KEY_W) {
      GameBoyKeyUp("up");
      unPressedButton("up")
    } else if (e.keyCode === JS_KEY_DOWN || e.keyCode === JS_KEY_S) {
      GameBoyKeyUp("down");
      unPressedButton("down")
    } else if (e.keyCode === JS_KEY_ENTER) {
      GameBoyKeyUp("start");
      unPressedButton("start")
    } else if (
      e.keyCode === JS_KEY_ALT ||
      e.keyCode === JS_KEY_Z ||
      e.keyCode === JS_KEY_J
    ) {
      GameBoyKeyUp("a");
      unPressedButton("a")
    } else if (
      e.keyCode === JS_KEY_CTRL ||
      e.keyCode === JS_KEY_K ||
      e.keyCode === JS_KEY_X
    ) {
      GameBoyKeyUp("b");
      unPressedButton("b")
    } else if (e.keyCode === JS_KEY_SHIFT) {
      GameBoyKeyUp("select");
      unPressedButton("select")
    }
    e.preventDefault();
  };
}

function pressedButton(name) {
  let element = null;
  switch (name) {
    case "a":
      element = btnA;
      break;
    case "b":
      element = btnB;
      break;
    case "select":
      element = btnSelect;
      break;
    case "start":
      element = btnStart;
      break;
    case "down":
      element = btnDown;
      break;
    case "up":
      element = btnUp;
      break;
    case "left":
      element = btnLeft;
      break;
    case "right":
      element = btnRight;
      break;
  }
  element.className = element.className + " btnPressed";
}

function unPressedButton(name) {
  let element = null;
  switch (name) {
    case "a":
      element = btnA;
      break;
    case "b":
      element = btnB;
      break;
    case "select":
      element = btnSelect;
      break;
    case "start":
      element = btnStart;
      break;
    case "down":
      element = btnDown;
      break;
    case "up":
      element = btnUp;
      break;
    case "left":
      element = btnLeft;
      break;
    case "right":
      element = btnRight;
      break;
  }
  element.className = element.className.replace(/ btnPressed/, "");
}

function checkUserEvent() {
  if (!isReady) {
    isReady = true;
    emptyScreen.style.display = "none";
    mainCanvas.removeEventListener('click', checkUserEvent);
    run();
    initSound();
  }
}

if (isTouchEnabled) {
  bindButton(btnA, "a");
  bindButton(btnB, "b");
  bindButton(btnStart, "start");
  bindButton(btnSelect, "select");
  bindDpad(dpad);
} else {
  controller.style.display = "none";
}
bindKeyboard();
