/* Shared service photos - used on the page and in the video collage */
const SERVICES = [
  {
    id: "new-home",
    title: "New home design",
    image: "assets/images/new-home.jpg",
    alt: "Modern new home exterior",
    description:
      "Custom residential plans tailored to your lot, lifestyle, and local building requirements.",
    voice:
      "New home design - custom residential plans built around your lot and lifestyle.",
  },
  {
    id: "additions",
    title: "Home additions",
    image: "assets/images/additions.jpg",
    alt: "Home addition living space",
    description:
      "Expand living space with additions that integrate cleanly with your existing structure.",
    voice:
      "Home additions that expand your living space and blend with the existing structure.",
  },
  {
    id: "remodels",
    title: "Remodels",
    image: "assets/images/remodels.jpg",
    alt: "Remodeled modern interior",
    description:
      "Thoughtful remodel plans that refresh function and flow while respecting your home's bones.",
    voice:
      "Remodels that refresh function and flow while respecting your home's structure.",
  },
  {
    id: "decks",
    title: "Decks",
    image: "assets/images/decks.jpg",
    alt: "Outdoor deck overlooking landscape",
    description:
      "Durable, code-ready deck designs for entertaining, outdoor living, and long-term use.",
    voice: "Decks - durable, code-ready designs for outdoor living.",
  },
  {
    id: "foundation",
    title: "Foundation upgrade plans",
    image: "assets/images/foundation.jpg",
    alt: "Foundation and structural construction",
    description:
      "Structural foundation plans to strengthen, repair, or upgrade for safer performance.",
    voice: "Foundation upgrade plans to strengthen and protect your home.",
  },
  {
    id: "tenant",
    title: "Tenant improvements",
    image: "assets/images/tenant.jpg",
    alt: "Commercial tenant improvement space",
    description:
      "Efficient TI packages that help spaces open on schedule and meet landlord and city standards.",
    voice:
      "Tenant improvements that keep projects on schedule and ready for city approval.",
  },
  {
    id: "retaining-wall",
    title: "Retaining walls",
    image: "assets/images/retaining-wall.jpg",
    alt: "Retaining wall and landscaped grade",
    description:
      "Engineered retaining wall plans that manage grade, drainage, and site stability.",
    voice: "Retaining walls engineered for grade, drainage, and site stability.",
  },
  {
    id: "framing",
    title: "New framing layouts",
    image: "assets/images/framing.jpg",
    alt: "Wood framing layout on construction site",
    description:
      "Clear framing layouts builders can trust - accurate, buildable, and ready for the field.",
    voice: "New framing layouts that builders can trust in the field.",
  },
  {
    id: "roof-framing",
    title: "New roof framing layouts",
    image: "assets/images/roof-framing.jpg",
    alt: "Roof structure and architectural lines",
    description:
      "Roof framing plans that balance structure, drainage, and the look you want from the curb.",
    voice: "New roof framing layouts for strength, drainage, and curb appeal.",
  },
  {
    id: "engineering",
    title: "Engineering services",
    image: "assets/images/engineering.jpg",
    alt: "Engineering drawings and blueprints",
    description:
      "Structural engineering support coordinated with design so drawings move smoothly to approval.",
    voice:
      "Engineering services coordinated with design for smooth city approval.",
  },
  {
    id: "adu",
    title: "ADUs, Junior ADUs & Efficiency Units",
    image: "assets/images/adu.jpg",
    alt: "Accessory dwelling unit exterior",
    description:
      "Accessory dwelling and efficiency unit plans designed for code compliance and rental-ready living.",
    voice:
      "ADUs, Junior ADUs, and Efficiency Units designed for code compliance and rental-ready living.",
  },
];

(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  renderServices();
  populateProjectSelect();

  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  observeServiceItems();

  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      if (formStatus) {
        formStatus.textContent = `Thanks, ${name || "there"}. Your inquiry is ready - we'll follow up soon.`;
      }
      form.reset();
    });
  }

  setupVideoPlayer();
})();

function renderServices() {
  const list = document.getElementById("servicesList");
  if (!list) return;

  list.innerHTML = SERVICES.map(
    (service, index) => `
    <li class="service-item${index % 2 === 1 ? " reverse" : ""}" data-service="${service.id}">
      <div class="service-image">
        <img src="${service.image}" alt="${service.alt}" loading="lazy" width="900" height="675" />
      </div>
      <div class="service-copy">
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      </div>
    </li>`
  ).join("");
}

function populateProjectSelect() {
  const select = document.getElementById("projectSelect");
  if (!select) return;

  SERVICES.forEach((service) => {
    const option = document.createElement("option");
    option.value = service.title;
    option.textContent = service.title;
    select.appendChild(option);
  });

  const other = document.createElement("option");
  other.value = "Other";
  other.textContent = "Other";
  select.appendChild(other);
}

function observeServiceItems() {
  const serviceItems = document.querySelectorAll(".service-item");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );
    serviceItems.forEach((item) => observer.observe(item));
  } else {
    serviceItems.forEach((item) => item.classList.add("is-visible"));
  }
}

function setupVideoPlayer() {
  const player = document.getElementById("videoPlayer");
  const playBtn = document.getElementById("playVideo");
  const stopBtn = document.getElementById("stopVideo");
  const progressBar = document.getElementById("progressBar");
  const caption = document.getElementById("videoCaption");
  const captionIdle = document.getElementById("videoCaptionIdle");
  const controls = player?.querySelector(".video-controls");
  const collages = Array.from(document.querySelectorAll(".collage"));

  const collageMain = document.getElementById("collageMain");
  const collageLeft = document.getElementById("collageLeft");
  const collageRight = document.getElementById("collageRight");
  const collageG1 = document.getElementById("collageG1");
  const collageG2 = document.getElementById("collageG2");
  const collageG3 = document.getElementById("collageG3");
  const collageG4 = document.getElementById("collageG4");

  if (!player || !playBtn) return;

  const defaultCaption = "Darren's Design - services & 40 years of experience";

  const introScript = [
    {
      text: "Welcome to Darren's Design - a full-service home design company with over forty years of experience.",
      caption: "Over 40 years of experience",
      mode: "grid",
      images: [
        SERVICES[0].image,
        SERVICES[1].image,
        SERVICES[3].image,
        SERVICES[10].image,
      ],
    },
    {
      text: "We offer complete design and engineering services, including direct submission of plans to the city.",
      caption: "Design & engineering · city submission",
      mode: "duo",
      images: [SERVICES[9].image, SERVICES[0].image],
    },
    {
      text: "Our key advantage is fast turnaround. A complete set of plans, from start to city submission, typically takes just seven to ten days.",
      caption: "Fast turnaround · 7-10 days",
      mode: "single",
      images: [SERVICES[0].image],
    },
  ];

  const serviceScript = SERVICES.map((service, index) => {
    const next = SERVICES[(index + 1) % SERVICES.length];
    const modes = ["single", "duo", "grid"];
    const mode = modes[index % 3];
    let images = [service.image];
    if (mode === "duo") images = [service.image, next.image];
    if (mode === "grid") {
      images = [
        service.image,
        next.image,
        SERVICES[(index + 2) % SERVICES.length].image,
        SERVICES[(index + 3) % SERVICES.length].image,
      ];
    }
    return {
      text: service.voice,
      caption: service.title,
      mode,
      images,
    };
  });

  const closingScript = [
    {
      text: "From new homes and additions to ADUs, framing, and engineering - Darren's Design delivers clear, buildable plans you can trust.",
      caption: "Complete residential design services",
      mode: "grid",
      images: [
        SERVICES[0].image,
        SERVICES[2].image,
        SERVICES[7].image,
        SERVICES[10].image,
      ],
    },
  ];

  const script = [...introScript, ...serviceScript, ...closingScript];

  let playing = false;
  let utteranceIndex = 0;
  let progressTimer = null;
  let startedAt = 0;
  const estimatedDurationMs = 95000;

  const supportsSpeech =
    "speechSynthesis" in window && "SpeechSynthesisUtterance" in window;

  function pickVoice() {
    const voices = window.speechSynthesis.getVoices();
    return (
      voices.find(
        (v) =>
          /en(-|_)?(US|GB|AU)?/i.test(v.lang) &&
          /female|samantha|google us english|microsoft aria|jenny|zira/i.test(
            v.name
          )
      ) ||
      voices.find((v) => /en/i.test(v.lang)) ||
      voices[0] ||
      null
    );
  }

  function setCaption(text) {
    if (caption) caption.textContent = text;
    if (captionIdle) captionIdle.textContent = text;
  }

  function setCollage(part) {
    const { mode, images } = part;

    collages.forEach((el) => {
      el.classList.toggle("is-active", el.dataset.mode === mode);
    });

    if (mode === "single" && collageMain) {
      collageMain.src = images[0];
    }

    if (mode === "duo") {
      if (collageLeft) collageLeft.src = images[0];
      if (collageRight) collageRight.src = images[1] || images[0];
    }

    if (mode === "grid") {
      const slots = [collageG1, collageG2, collageG3, collageG4];
      slots.forEach((slot, i) => {
        if (!slot) return;
        const src = images[i] || images[i % images.length] || SERVICES[i % SERVICES.length].image;
        slot.src = src;
        slot.loading = "eager";
      });
    }
  }

  function startProgress() {
    startedAt = Date.now();
    clearInterval(progressTimer);
    progressTimer = setInterval(() => {
      const ratio = Math.min(1, (Date.now() - startedAt) / estimatedDurationMs);
      if (progressBar) progressBar.style.width = `${ratio * 100}%`;
      if (ratio >= 1) clearInterval(progressTimer);
    }, 120);
  }

  function stopProgress(complete) {
    clearInterval(progressTimer);
    progressTimer = null;
    if (progressBar) progressBar.style.width = complete ? "100%" : "0%";
  }

  function resetPlayer() {
    playing = false;
    utteranceIndex = 0;
    player.classList.remove("is-playing");
    if (controls) controls.setAttribute("aria-hidden", "true");
    playBtn.querySelector(".play-label").textContent = "Play Video";
    playBtn.setAttribute("aria-label", "Play introduction video");
    setCaption(defaultCaption);
    stopProgress(false);
    setCollage(script[0]);
    if (supportsSpeech) window.speechSynthesis.cancel();
  }

  function finishPlayer() {
    playing = false;
    player.classList.remove("is-playing");
    if (controls) controls.setAttribute("aria-hidden", "true");
    playBtn.querySelector(".play-label").textContent = "Play Again";
    playBtn.setAttribute("aria-label", "Play introduction video again");
    stopProgress(true);
    setCaption("Thank you for watching - let's build your next project.");
    setCollage(script[script.length - 1]);
  }

  function speakNext() {
    if (!playing || utteranceIndex >= script.length) {
      finishPlayer();
      return;
    }

    const part = script[utteranceIndex];
    setCaption(part.caption);
    setCollage(part);

    if (!supportsSpeech) {
      utteranceIndex += 1;
      window.setTimeout(speakNext, 4200);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(part.text);
    const voice = pickVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.96;
    utterance.pitch = 1;
    utterance.lang = voice?.lang || "en-US";

    utterance.onend = () => {
      utteranceIndex += 1;
      window.setTimeout(speakNext, 280);
    };
    utterance.onerror = () => {
      utteranceIndex += 1;
      window.setTimeout(speakNext, 280);
    };

    window.speechSynthesis.speak(utterance);
  }

  function startPlayer() {
    if (playing) return;

    if (supportsSpeech) window.speechSynthesis.cancel();

    playing = true;
    utteranceIndex = 0;
    player.classList.add("is-playing");
    if (controls) controls.setAttribute("aria-hidden", "false");
    startProgress();
    speakNext();
  }

  // Idle preview collage using service photos
  setCollage(script[0]);

  playBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    startPlayer();
  });

  stopBtn?.addEventListener("click", (event) => {
    event.stopPropagation();
    resetPlayer();
  });

  controls?.addEventListener("click", (event) => {
    event.stopPropagation();
  });

  if (supportsSpeech) {
    window.speechSynthesis.onvoiceschanged = () => pickVoice();
  }
}
