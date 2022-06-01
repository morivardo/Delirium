let cacheHeight=screen.height,cacheWidth=screen.width;function animateBurger(){const e=document.querySelector("#menu-toggle"),t=document.querySelector("#menu");e.addEventListener("click",(()=>{e.classList.toggle("open"),t.classList.toggle("uncollapse")}))}function createPanels(){new PanelSnap({panelSelector:"> #wrapper > .slide",directionThreshold:1})}function horizontalScroll(){const e=document.querySelector("html");e.addEventListener("wheel",(t=>{t.preventDefault(),e.scrollLeft+=t.deltaY}))}function layering(e,t){const n=document.querySelectorAll(e);let c=e;"."!==c[0]&&"#"!==c[0]||(c=c.substring(1)),n.forEach((e=>{const n=e.innerText,a=document.createElement("div");a.classList.add("container-"+c),e.classList.contains("primary-color")?a.classList.add("container-primary-color"):e.classList.contains("secondary-color")?a.classList.add("container-secondary-color"):e.classList.contains("tertiary-color")&&a.classList.add("container-tertiary-color"),e.classList.contains("number")&&a.classList.add("number"),e.replaceWith(a),a.append(e);const l=[];for(let e=0;e<t;e++)l[e]=document.createElement("span"),l[e].classList.add("glow-layer","layer-"+e),l[e].innerText=n,a.append(l[e])}))}function playAnthem(){const e=document.getElementById("community");let t=!1;if(null!=e){const e=document.getElementById("anthem-play-button"),n=document.getElementById("anthem"),c=document.querySelectorAll(".icon-section-2"),a=document.querySelectorAll(".from_play_to_pause"),l=document.querySelectorAll(".from_pause_to_play");e.addEventListener("click",(()=>{!1===t?(n.play(),c.forEach((e=>{e.classList.add("play")})),a.forEach((e=>{e.beginElement()})),t=!0):(n.pause(),c.forEach((e=>{e.classList.remove("play")})),l.forEach((e=>{e.beginElement()})),t=!1)}))}}function resizeWrapper(){const e=document.querySelector(".wrapper");if(void 0!==e&&null!=e){const t=e.querySelectorAll('section[class^="slide"]').length;e.style.width=100*t+22+"vw"}}function resizeRouting(){const e=function(){let e;return e=""!=window.location.href.split("/").slice(-1)?window.location.href.split("/").slice(-1):"index.html",e[0].includes("-")?e[0].split("-").slice(-1):e}();screen.width>1200?window.location.replace(e):screen.width<=1200&&screen.width>600?window.location.replace("t-"+e):screen.width<=600&&window.location.replace("m-"+e)}function previewFile(){const e=new FileReader;e.onload=function(){document.getElementById("image-preview").style.backgroundImage="url("+e.result+")"},e.readAsDataURL(event.target.files[0])}function submenu(){const e=document.querySelector("#submenu"),t=e.querySelectorAll("#submenu .slide-anchor");panelSnapInstance.on("activatePanel",(n=>{t.forEach((e=>e.classList.remove("active")));const c=n.getAttribute("data-panel");e.querySelector('.slide-anchor[data-panel="'+c+'"]').classList.add("active")})),t.forEach((e=>{e.addEventListener("click",(e=>{const t=e.target.getAttribute("data-panel"),n=document.querySelector('.slide[data-panel="'+t+'"]');panelSnapInstance.snapToPanel(n)}))}))}document.addEventListener("DOMContentLoaded",(()=>{animateBurger(),horizontalScroll(),layering("h1",6),layering("h2",6),layering("h3",6),layering(".btn-neon",6),layering(".check-neon",6),layering(".hamburger",6),layering(".input-neon",6),layering(".stroke-neon",6),playAnthem(),resizeWrapper()})),window.addEventListener("resize",(()=>{screen.width===cacheWidth&&screen.height===cacheHeight||resizeRouting()}));