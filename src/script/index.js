let cacheHeight = screen.height; // Needs for store the screen size and prevent scroll-resize in mobile devices
let cacheWidth = screen.width; // Needs for store the screen size and prevent scroll-resize in mobile devices
let samePage = false; // Needs for prevent routing loop

// Allows redirecting to the correct page based on screen size
document.addEventListener("open", () => {
  // Return name of current document
  function pathing() {
    if (window.location.href.split("/").slice(-1) != "") {
      return window.location.href.split("/").slice(-1);
    } else {
      return "index.html";
    }
  }

  // Detect the types of device with user navigate the website
  function detectDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    } else if (
      /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
        ua,
      )
    ) {
      return "mobile";
    } else {
      return "desktop";
    }
  }

  let doc = pathing();
  let history = document.referrer.split("/").slice(-1);
  let deviceType = detectDeviceType();
  let vw;

  if (doc[0].includes("-")) {
    doc = doc[0].split("-").slice(-1);
  }

  if (doc == history) {
    samePage = true;
  } else {
    samePage = false;
  }

  switch (deviceType) {
    case "mobile":
      vw = window.innerWidth;
      break;
    case "tablet":
      vw = window.innerWidth;
      break;
    case "desktop":
      vw = screen.width;
      break;
  }

  if (samePage == true) {
    return;
  } else {
    if (vw > 1200) {
      window.location.replace(doc);
      return;
    } else if (vw <= 1200 && screen.width > 600) {
      window.location.replace("t-" + doc);
      return;
    } else if (vw <= 600) {
      window.location.replace("m-" + doc);
      return;
    }
  }
});

document.addEventListener("DOMContentLoaded", (e) => {
  animateBurger();
  horizontalScroll();
  layering("h1", 6);
  layering("h2", 6);
  layering("h3", 6);
  layering(".btn-neon", 6);
  layering(".check-neon", 6);
  layering(".hamburger", 6);
  layering(".input-neon", 6);
  layering(".stroke-neon", 6);
  playAnthem();
  resizeWrapper();
});

window.addEventListener("resize", (resize) => {
  if (screen.width != cacheWidth || screen.height != cacheHeight) {
    resizeRouting();
  }
});
