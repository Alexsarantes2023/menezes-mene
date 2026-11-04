// Pegar o elemento pelo id
const bars = document.getElementById("barsxxx");
const nav = document.getElementById("navxxx");

// Pegar todos os elementos <a> dentro do menu de navegação
const navItems = document.querySelectorAll(".nav-item");
// Função para abrir ou fechar o menu
function toggleMenu() {
  nav.classList.toggle("active"); // Adiciona ou remove a classe "active" do elemento nav
  bars.classList.toggle("active"); // Adiciona ou remove a classe "active" do elemento bars
}

// Adiciona um evento de clique no elemento bars para chamar a função toggleMenu
bars.addEventListener("click", toggleMenu);

// Adiciona um evento de clique a cada item do menu de navegação para chamar a função toggleMenu
 navItems.forEach((item) => {
   item.addEventListener("click", toggleMenu);
 });

const serviceCards = document.querySelectorAll('.description-content .description-card');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const ministrySlider = document.querySelector('.gmedias');
const ministrySlides = [...document.querySelectorAll('.gmedias input[name="slide"]')];

if (ministrySlider && ministrySlides.length > 1 && !prefersReducedMotion) {
  let slideTimer;
  let isSliderVisible = false;
  let isInteractionPaused = false;

  const stopSlideTimer = () => {
    window.clearInterval(slideTimer);
    slideTimer = undefined;
  };

  const startSlideTimer = () => {
    if (slideTimer || !isSliderVisible || isInteractionPaused || document.hidden) return;

    slideTimer = window.setInterval(() => {
      const currentIndex = ministrySlides.findIndex((slide) => slide.checked);
      ministrySlides[(currentIndex + 1) % ministrySlides.length].checked = true;
    }, 3000);
  };

  if ('IntersectionObserver' in window) {
    const sliderVisibilityObserver = new IntersectionObserver(([entry]) => {
      isSliderVisible = entry.isIntersecting;
      if (isSliderVisible) startSlideTimer();
      else stopSlideTimer();
    }, { threshold: 0.15 });

    sliderVisibilityObserver.observe(ministrySlider);
  } else {
    isSliderVisible = true;
    startSlideTimer();
  }
  ministrySlider.addEventListener('pointerenter', () => {
    isInteractionPaused = true;
    stopSlideTimer();
  });
  ministrySlider.addEventListener('pointerleave', () => {
    isInteractionPaused = false;
    startSlideTimer();
  });
  ministrySlider.addEventListener('focusin', () => {
    isInteractionPaused = true;
    stopSlideTimer();
  });
  ministrySlider.addEventListener('focusout', (event) => {
    if (!ministrySlider.contains(event.relatedTarget)) {
      isInteractionPaused = false;
      startSlideTimer();
    }
  });
  ministrySlides.forEach((slide) => {
    slide.addEventListener('change', () => {
      stopSlideTimer();
      startSlideTimer();
    });
  });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopSlideTimer();
    else startSlideTimer();
  });
}

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const serviceCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  serviceCards.forEach((serviceCard) => {
    serviceCard.classList.add('scroll-reveal');
    serviceCardsObserver.observe(serviceCard);
  });
}

const faqItems = document.querySelectorAll('.questions-text > details.question-text');

if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const faqItemsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  faqItems.forEach((faqItem, index) => {
    faqItem.classList.add('scroll-reveal', index === 1 ? 'from-left' : 'from-right');
    faqItemsObserver.observe(faqItem);
  });
}

const contactImage = document.querySelector('.contact-image');

if (contactImage && 'IntersectionObserver' in window && !prefersReducedMotion) {
  const contactImageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('is-visible', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  contactImage.classList.add('scroll-reveal');
  contactImageObserver.observe(contactImage);
}

const footerImage = document.querySelector('.footer-image');

if (footerImage && 'IntersectionObserver' in window && !prefersReducedMotion) {
  const footerImageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('coin-spin', entry.isIntersecting);
    });
  }, { threshold: 0.15 });

  footerImageObserver.observe(footerImage);
}

// Cards
// Pegar o elemento pelo id
const card = document.getElementById("cardxx");
const scrollLeft = document.getElementById("leftx");
const scrollRight = document.getElementById("rightx");

// Adiciona um evento de clique ao botão de scroll para a esquerda
scrollLeft.addEventListener("click", () => {
  card.scrollBy({
    left: -320, // Move o elemento card 200 pixels para a esquerda
    behavior: "smooth", // Adiciona um efeito de rolagem suave
  });
});

// Adiciona um evento de clique ao botão de scroll para a direita
scrollRight.addEventListener("click", () => {
  card.scrollBy({
    left: 320, // Move o elemento card 200 pixels para a direita
    behavior: "smooth", // Adiciona um efeito de rolagem suave
  });
});



const audio = document.getElementById('musica');
audio.volume = 0.3;

document.querySelectorAll('.classevide .enzo').forEach((video) => {
  video.autoplay = false;
  video.preload = 'none';
  video.pause();
});

const backgroundVideo = [...document.querySelectorAll('.caixa-video-mario video')]
  .find((video) => getComputedStyle(video).display !== 'none');
if (backgroundVideo) {
  backgroundVideo.muted = true;
  backgroundVideo.volume = 0.3;
}
const mediaDialog = document.getElementById('media-dialog');
const mediaDialogMessage = document.getElementById('media-dialog-message');
const mediaPlayButton = document.getElementById('media-play-button');
const mediaDismissButton = document.getElementById('media-dismiss-button');
const blockedMedia = new Set();

function getBlockedMediaMessage() {
  const mediaNames = [];

  if (blockedMedia.has('audio')) mediaNames.push('da música');
  if (blockedMedia.has('video')) mediaNames.push('do vídeo de fundo');

  const mediaDescription = mediaNames.join(' e ');

  return `O navegador bloqueou a reprodução automática ${mediaDescription}. Deseja tentar reproduzir agora?`;
}

async function attemptPlayback(mediaType, mediaElements) {
  const results = await Promise.all(mediaElements.map(async (media) => {
    try {
      await media.play();
      return true;
    } catch (error) {
      if (error.name !== 'NotAllowedError') {
        console.error('Não foi possível iniciar a mídia:', error);
      }
      return false;
    }
  }));

  if (results.every(Boolean)) {
    blockedMedia.delete(mediaType);
  } else {
    blockedMedia.add(mediaType);
  }

  return results.every(Boolean);
}

function showBlockedMediaPrompt() {
  if (blockedMedia.size > 0 && !mediaDialog.open) {
    mediaDialogMessage.textContent = getBlockedMediaMessage();
    mediaDialog.showModal();
  }
}

async function enableBackgroundVideoAudio() {
  if (!backgroundVideo) return;

  if (backgroundVideo.paused) {
    const started = await attemptPlayback('video', [backgroundVideo]);
    if (!started) {
      showBlockedMediaPrompt();
      return;
    }
  }

  audio.pause();
  backgroundVideo.muted = false;
  showBlockedMediaPrompt();
}

audio.addEventListener('ended', enableBackgroundVideoAudio);

async function checkAutoplay() {
  await Promise.all([
    attemptPlayback('audio', [audio]),
    attemptPlayback('video', backgroundVideo ? [backgroundVideo] : []),
  ]);
  showBlockedMediaPrompt();
}

mediaPlayButton.addEventListener('click', async () => {
  const retries = [];
  if (blockedMedia.has('audio')) retries.push(attemptPlayback('audio', [audio]));
  if (blockedMedia.has('video') && backgroundVideo) {
    retries.push(attemptPlayback('video', [backgroundVideo]));
  }

  mediaDialog.close();
  await Promise.all(retries);
  showBlockedMediaPrompt();
});

mediaDismissButton.addEventListener('click', () => mediaDialog.close());

checkAutoplay();