function createButton(className, label, text) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `${className} gbtn`;
  button.setAttribute("aria-label", label);
  button.textContent = text;
  return button;
}

function ensureStyles() {
  if (document.querySelector("[data-znakownia-lightbox-styles]")) return;
  const style = document.createElement("style");
  style.dataset.znakowniaLightboxStyles = "";
  style.textContent = `
    .glightbox-container.inactive{display:none!important}
    .glightbox-container .gprev,
    .glightbox-container .gnext,
    .glightbox-container .gclose{
      position:absolute!important;
      z-index:100000!important;
      display:flex!important;
      align-items:center!important;
      justify-content:center!important;
      border:1px solid rgba(255,255,255,.18)!important;
      background:rgba(13,15,18,.86)!important;
      color:#fff!important;
      font-family:Arial,sans-serif!important;
      font-size:28px!important;
      line-height:1!important;
      opacity:1!important;
      visibility:visible!important;
      pointer-events:auto!important;
    }
    .glightbox-container .gprev,
    .glightbox-container .gnext{
      top:50%!important;
      width:48px!important;
      height:64px!important;
      transform:translateY(-50%)!important;
    }
    .glightbox-container .gprev{left:16px!important}
    .glightbox-container .gnext{right:16px!important}
    .glightbox-container .gclose{
      top:16px!important;
      right:16px!important;
      width:44px!important;
      height:44px!important;
      font-size:24px!important;
    }
    .glightbox-container .gbtn.disabled{opacity:.28!important}
    .glightbox-container .gslide-image img{cursor:pointer}
  `;
  document.head.appendChild(style);
}

function createContainer() {
  ensureStyles();
  const container = document.createElement("div");
  container.className = "glightbox-container glightbox-clean inactive";
  container.innerHTML = `
    <div class="goverlay"></div>
    <div class="gcontainer">
      <div class="gslider">
        <div class="gslide current">
          <div class="gslide-inner-content">
            <div class="ginner-container desc-bottom">
              <div class="gslide-media gslide-image">
                <img alt="">
              </div>
              <div class="gslide-description">
                <div class="gdesc-inner">
                  <h4 class="gslide-title"></h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>`;

  container.append(
    createButton("gclose", "Zamknij", "x"),
    createButton("gprev", "Poprzednie zdjęcie", "<"),
    createButton("gnext", "Następne zdjęcie", ">")
  );
  document.body.appendChild(container);
  return container;
}

function GLightbox(options = {}) {
  const selector = options.selector || ".glightbox";
  const links = Array.from(document.querySelectorAll(selector));
  const container = createContainer();
  const image = container.querySelector("img");
  const title = container.querySelector(".gslide-title");
  const closeButton = container.querySelector(".gclose");
  const prevButton = container.querySelector(".gprev");
  const nextButton = container.querySelector(".gnext");
  let group = [];
  let index = 0;

  const activeLinks = (link) => {
    const gallery = link?.dataset?.gallery;
    return links.filter((item) => !gallery || item.dataset.gallery === gallery);
  };

  const render = () => {
    const link = group[index];
    if (!link || !image || !title) return;
    image.src = link.getAttribute("href") || "";
    image.alt = link.getAttribute("aria-label") || link.dataset.title || "";
    const caption = link.dataset.title || "";
    title.textContent = group.length > 1 ? `${index + 1} / ${group.length} - ${caption}` : caption;
    prevButton.classList.toggle("disabled", group.length < 2);
    nextButton.classList.toggle("disabled", group.length < 2);
  };

  const open = (link) => {
    group = activeLinks(link);
    index = Math.max(0, group.indexOf(link));
    render();
    container.classList.remove("inactive");
    document.documentElement.classList.add("glightbox-open");
    document.body.classList.add("glightbox-open");
  };

  const close = () => {
    container.classList.add("inactive");
    document.documentElement.classList.remove("glightbox-open");
    document.body.classList.remove("glightbox-open");
  };

  const move = (step) => {
    if (group.length < 2) return;
    index = (index + step + group.length) % group.length;
    render();
  };

  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      open(link);
    });
  });

  closeButton.addEventListener("click", close);
  container.querySelector(".goverlay").addEventListener("click", close);
  image.addEventListener("click", () => move(1));
  prevButton.addEventListener("click", () => move(-1));
  nextButton.addEventListener("click", () => move(1));
  window.addEventListener("keydown", (event) => {
    if (container.classList.contains("inactive")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") move(-1);
    if (event.key === "ArrowRight") move(1);
  });

  return { open, close, next: () => move(1), prev: () => move(-1) };
}

export const g = { default: GLightbox };
export default GLightbox;
