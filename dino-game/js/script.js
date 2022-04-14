const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) {
    if (!isJumping) jump();
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);
      // descendo
      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = `${position}px`;
        }
      }, 15);
    }
    // subindo
    position += 20;
    dino.style.bottom = `${position}px`;
  }, 15);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  cactus.classList.add('cactus');
  cactus.style.left = `${cactusPosition}px`;
  background.appendChild(cactus);

  let leftInterval = setInterval(() => {
    if (cactusPosition < -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
      // maior que 0 e menor que 60, está no espaco do dinossauro
      // position < 60 significa que o dinossauro nao pulou
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      // game over
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo!</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 20);

  // chamada recursiva
  setTimeout(createCactus, randomTime);
}

createCactus();
document.addEventListener('keyup', handleKeyUp);
