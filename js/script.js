// Pegar o elemento pelo id
const bars = document.getElementById("bars");
const nav = document.getElementById("navxxx");

// Pegar todos os elementos <a> dentro do menu de navegação
const navItems = document.querySelectorAll("nav-item");

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
  console.log("scrollLeft");
});

// Adiciona um evento de clique ao botão de scroll para a direita
scrollRight.addEventListener("click", () => {
  card.scrollBy({
    left: 320, // Move o elemento card 200 pixels para a direita
    behavior: "smooth", // Adiciona um efeito de rolagem suave
  });
  console.log("scrollRight");
});



//audio toca automatico no site
//document.addEventListener('DOMContentLoaded', function () { document.getElementById('musica').play(); });

//document.getElementById('musica').addEventListener('canplay', function () {this.play();});

document.addEventListener('DOMContentLoaded', function () {
  var audio = document.getElementById('musica');
  audio.load();
  audio.play();
});

// Define o volume do áudio para 30%
var audio = document.getElementById('musica');
var audio2 = document.getElementById('musica2');
var audio3 = document.getElementById('musica3');
var audio4 = document.getElementById('musica4');
audio.volume = 0.3;
audio2.volume = 0.3;
audio3.volume = 0.3;
audio4.volume = 0.3;