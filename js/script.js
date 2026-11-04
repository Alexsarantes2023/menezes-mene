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

const albumSection = document.querySelector('#certificacoes');
const albumTrack = document.querySelector('#certificacoes .projetos-caixa');
const albumCards = [...document.querySelectorAll('#certificacoes .projetos-card')];
const mobileAlbumQuery = window.matchMedia('(max-width: 600px)');

if (albumSection && albumTrack && albumCards.length > 1 && !prefersReducedMotion) {
  let isAlbumVisible = false;
  let albumTimer;

  const stopAlbumAutoplay = () => {
    window.clearInterval(albumTimer);
    albumTimer = undefined;
  };

  const startAlbumAutoplay = () => {
    if (albumTimer || !isAlbumVisible || !mobileAlbumQuery.matches || document.hidden) return;

    albumTimer = window.setInterval(() => {
      const trackLeft = albumTrack.getBoundingClientRect().left;
      const cardPositions = albumCards.map((albumCard) =>
        albumCard.getBoundingClientRect().left - trackLeft + albumTrack.scrollLeft);
      const currentIndex = cardPositions.reduce((closestIndex, position, index) =>
        Math.abs(position - albumTrack.scrollLeft) < Math.abs(cardPositions[closestIndex] - albumTrack.scrollLeft)
          ? index
          : closestIndex, 0);
      const nextIndex = (currentIndex + 1) % albumCards.length;

      albumTrack.scrollTo({ left: cardPositions[nextIndex], behavior: 'smooth' });
    }, 3000);
  };

  const albumVisibilityObserver = new IntersectionObserver(([entry]) => {
    isAlbumVisible = entry.isIntersecting;
    if (isAlbumVisible) startAlbumAutoplay();
    else stopAlbumAutoplay();
  }, { threshold: 0.1 });

  albumVisibilityObserver.observe(albumSection);
  mobileAlbumQuery.addEventListener('change', () => {
    if (mobileAlbumQuery.matches) startAlbumAutoplay();
    else stopAlbumAutoplay();
  });
  albumTrack.addEventListener('pointerdown', stopAlbumAutoplay);
  albumTrack.addEventListener('pointerup', startAlbumAutoplay);
  albumTrack.addEventListener('pointercancel', startAlbumAutoplay);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stopAlbumAutoplay();
    else startAlbumAutoplay();
  });
}

const ministrySlider = document.querySelector('.gmedias');
const ministrySlides = [...document.querySelectorAll('.gmedias input[name="slide"]')];

if (ministrySlider && ministrySlides.length > 1) {
  const slideIndicators = [...ministrySlider.querySelectorAll('.navigation1 .barx')];
  const updateSlideIndicators = () => {
    const activeSlide = ministrySlides.find((slide) => slide.checked);

    slideIndicators.forEach((indicator, index) => {
      indicator.classList.toggle('is-active', ministrySlides[index] === activeSlide);
    });
  };

  let slideTimer;

  const stopSlideTimer = () => {
    window.clearInterval(slideTimer);
    slideTimer = undefined;
  };

  const startSlideTimer = () => {
    if (slideTimer || document.hidden) return;

    slideTimer = window.setInterval(() => {
      const currentIndex = ministrySlides.findIndex((slide) => slide.checked);
      const nextIndex = (Math.max(currentIndex, 0) + 1) % ministrySlides.length;
      ministrySlides[nextIndex].checked = true;
      updateSlideIndicators();
    }, 3000);
  };

  updateSlideIndicators();
  ministrySlides.forEach((slide) => {
    slide.addEventListener('change', updateSlideIndicators);
  });
  startSlideTimer();
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

faqItems.forEach((faqItem) => {
  const summary = faqItem.querySelector('summary');
  const panel = faqItem.querySelector('.question-panel');
  let panelAnimation;

  if (!summary || !panel || typeof panel.animate !== 'function' || prefersReducedMotion) return;

  summary.addEventListener('click', (event) => {
    event.preventDefault();
    panelAnimation?.cancel();

    const opening = !faqItem.open;
    if (opening) faqItem.open = true;

    const animation = panel.animate(
      [
        { gridTemplateRows: opening ? '0fr' : '1fr' },
        { gridTemplateRows: opening ? '1fr' : '0fr' },
      ],
      {
        duration: 420,
        easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
        fill: 'both',
      },
    );
    panelAnimation = animation;

    animation.addEventListener('finish', () => {
      if (panelAnimation !== animation) return;
      if (!opening) faqItem.open = false;
      animation.cancel();
      panelAnimation = undefined;
    }, { once: true });
  });
});

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