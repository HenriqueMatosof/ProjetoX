function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  )
}

function determineWinner({ player, enemy, timerId }) {
  clearTimeout(timerId);

  const displayText = document.querySelector('#displayText');

  if (player.health === enemy.health) {
    displayText.innerHTML = 'Empate!';
  } else if (player.health > enemy.health) {
    displayText.innerHTML = 'Jogador 1 Venceu!';
  } else {
    displayText.innerHTML = 'Jogador 2 Venceu!';
  }

  displayText.style.display = 'flex';

  // Game Over
  showGameOver();
}


let timer = 60
let timerId
function decreaseTimer() {
  if (timer > 0) {
    timerId = setTimeout(decreaseTimer, 1000)
    timer--
    document.querySelector('#timer').innerHTML = timer
  }

  if (timer === 0) {
    determineWinner({ player, enemy, timerId })
  }
}
function showGameOver() {
  document.getElementById("game-over").style.display = "block";
}
