// Create animation for the hamburger menu
function animateBurger() {
  const menuToggle = document.querySelector("#menu-toggle");
  const menu = document.querySelector("#menu");

  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("open");
    menu.classList.toggle("uncollapse");
  });
}

// Creates panels for effect
function createPanels() {
  let panelSnapInstance = new PanelSnap({
    panelSelector: "> #wrapper > .slide",
    directionThreshold: 1,
  });
}

// Allows horizontal scrolling with the mouse wheel
function horizontalScroll() {
  const scrollContainer = document.querySelector("html");

  scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
  });
}

// Creates the layers that form the neon effect
// Tag parameter must be a string
function layering(tag, n) {
  let el = document.querySelectorAll(tag);
  let names = tag;
  if (names[0] == "." || names[0] == "#") {
    names = names.substring(1);
  }

  el.forEach((h) => {
    const content = h.innerText;
    const div = document.createElement("div");
    div.classList.add("container-" + names);

    if (h.classList.contains("primary-color")) {
      div.classList.add("container-primary-color");
    } else if (h.classList.contains("secondary-color")) {
      div.classList.add("container-secondary-color");
    } else if (h.classList.contains("tertiary-color")) {
      div.classList.add("container-tertiary-color");
    }

    if (h.classList.contains("number")) {
      div.classList.add("number");
    }

    h.replaceWith(div);
    div.append(h);

    const s = [];
    for (let i = 0; i < n; i++) {
      s[i] = document.createElement("span");
      s[i].classList.add("glow-layer", "layer-" + i);
      s[i].innerText = content;
      div.append(s[i]);
    }
  });
}

// Allows the play button on the community page to start playing the anthem
function playAnthem() {
  const body = document.getElementById("community");
  let playing = false;
  if (body != null) {
    const btn = document.getElementById("anthem-play-button");
    const anthem = document.getElementById("anthem");
    let obj = document.querySelectorAll(".icon-section-2");
    let start = document.querySelectorAll(".from_play_to_pause");
    let stop = document.querySelectorAll(".from_pause_to_play");

    btn.addEventListener("click", (evn) => {
      if (playing == false) {
        anthem.play();
        obj.forEach((o) => {
          o.classList.add("play");
        });
        start.forEach((play) => {
          play.beginElement();
        });
        playing = true;
      } else {
        anthem.pause();
        obj.forEach((o) => {
          o.classList.remove("play");
        });
        stop.forEach((pause) => {
          pause.beginElement();
        });
        playing = false;
      }
    });
  }
}

// Allows to set the loaded image as the background of the preview container
function previewFile() {
  var reader = new FileReader();
  reader.onload = function () {
    var output = document.getElementById("image-preview");
    output.style.backgroundImage = "url(" + reader.result + ")";
  };
  reader.readAsDataURL(event.target.files[0]);
}

// Directs the user to the correct document based on window size
function resizeRouting() {
  function pathing() {
    let path;
    if (window.location.href.split("/").slice(-1) != "") {
      path = window.location.href.split("/").slice(-1);
    } else {
      path = "index.html";
    }

    if (path[0].includes("-")) {
      return path[0].split("-").slice(-1);
    } else {
      return path;
    }
  }

  let doc = pathing();

  if (screen.width > 1200) {
    window.location.replace(doc);
  } else if (screen.width <= 1200 && screen.width > 600) {
    window.location.replace("t-" + doc);
  } else if (screen.width <= 600) {
    window.location.replace("m-" + doc);
  }
}

//Sets the width to create fullscreen sections
function resizeWrapper() {
  const wrapper = document.querySelector(".wrapper");

  if (typeof wrapper != "undefined" && wrapper != null) {
    const w = wrapper.querySelectorAll('section[class^="slide"]').length;
    wrapper.style.width = w * 100 + 22 + "vw";
  }
}

// Makes the submenu dynamic and creates anchors between buttons and sections of the page
function submenu() {
  const subMenu = document.querySelector("#submenu");
  const subMenuItems = subMenu.querySelectorAll("#submenu .slide-anchor");

  panelSnapInstance.on("activatePanel", (panel) => {
    subMenuItems.forEach((subMenuEl) => subMenuEl.classList.remove("active"));

    let panelName = panel.getAttribute("data-panel");
    let subMenuObject = subMenu.querySelector(
      '.slide-anchor[data-panel="' + panelName + '"]',
    );
    subMenuObject.classList.add("active");
  });

  subMenuItems.forEach((subMenuEl) => {
    subMenuEl.addEventListener("click", (e) => {
      let panelName = e.target.getAttribute("data-panel");
      let panel = document.querySelector(
        '.slide[data-panel="' + panelName + '"]',
      );

      panelSnapInstance.snapToPanel(panel);
    });
  });
}
