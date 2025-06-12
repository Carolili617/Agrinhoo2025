function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
}
let boy;

let trashes = [];

let score = 0;

let timer = 0;

let gameStarted = false;

let gameOver = false;

let gameWon = false;

let startTime;

function setup() {

  createCanvas(600, 400);

  textAlign(CENTER, CENTER);

  textSize(24);

  boy = new Boy();

  // Cria os lixos

  for (let i = 0; i < 10; i++) {

    trashes.push(new Trash());

  }

}

function draw() {

  background(200, 230, 255);

  if (!gameStarted) {

    fill(0);

    textSize(28);

    text("Aperte espaço para começar", width / 2, height / 2);

    return;

  }

  if (!gameOver && !gameWon) {

    timer = int((millis() - startTime) / 1000);

    fill(0);

    textSize(18);

    text("Tempo: " + timer + "s", 70, 20);

    text("Pontos: " + score, width - 100, 20);

    boy.move();

    boy.display();

    for (let i = 0; i < trashes.length; i++) {

      trashes[i].display();

      if (boy.collects(trashes[i])) {

        score += 100;

        trashes[i] = new Trash(); // substitui por novo lixo

      }

    }

    if (score >= 1000 && timer <= 30) {

      gameWon = true;

    }

    if (timer > 30 && score < 1000) {

      gameOver = true;

    }

  } else {

    textSize(32);

    fill(0);

    if (gameWon) {

      text("Parabéns, você ganhou!", width / 2, height / 2);

    } else if (gameOver) {

      text("Você perdeu, seja mais rápido!", width / 2, height / 2);

    }

  }

}

function keyPressed() {

  if (!gameStarted && key === '') {

    gameStarted = true;

    startTime = millis();

    return;

  }

  if (keyCode === LEFT_ARROW) {

    boy.xSpeed = -5;

  } else if (keyCode === RIGHT_ARROW) {

    boy.xSpeed = 5;

  } else if (keyCode === UP_ARROW) {

    boy.ySpeed = -5;

  } else if (keyCode === DOWN_ARROW) {

    boy.ySpeed = 5;

  }

}

function keyReleased() {

  boy.xSpeed = 0;

  boy.ySpeed = 0;

}

// Classe do garoto com emoji

class Boy {

  constructor() {

    this.x = width / 2;

    this.y = height / 2;

    this.size = 30;

    this.xSpeed = 0;

    this.ySpeed = 0;

  }

  move() {

    this.x += this.xSpeed;

    this.y += this.ySpeed;

    this.x = constrain(this.x, 0, width);

    this.y = constrain(this.y, 0, height);

  }

  display() {

    textSize(30);

    text("🧒🏾", this.x, this.y);

  }

  collects(trash) {

    return dist(this.x, this.y, trash.x, trash.y) < 30;

  }

}

// Classe dos lixos com emojis aleatórios

class Trash {

  constructor() {

    this.x = random(20, width - 20);

    this.y = random(20, height - 20);

    this.emojis = ["📜", "📦", "🥡"];

    this.emoji = random(this.emojis);

  }

  display() {

    textSize(20);

    text(this.emoji, this.x, this.y);

  }

}

