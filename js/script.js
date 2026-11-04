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

  if (blockedMedia.has('audio')) mediaNames.push('a música');
  if (blockedMedia.has('video')) mediaNames.push('o vídeo de fundo');

  const mediaDescription = mediaNames.length > 1
    ? `${mediaNames[0]} e ${mediaNames[1]}`
    : mediaNames[0];

  return `O navegador bloqueou a reprodução automática de ${mediaDescription}. Deseja tentar reproduzir agora?`;
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