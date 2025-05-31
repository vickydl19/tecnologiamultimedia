let AMP_MIN = 0.005;
let AMP_MAX = 0.05;

let mic;
let fft;
let amp = 0;

let colores = ['#B03030', '#3A4BA0', '#D9B400', '#D97600', '#222222'];
let figuras = [];

let cardumen;

function setup() {
  createCanvas(600, 600);
  mic = new p5.AudioIn();
  fft = new p5.FFT(0.8, 1024);
  userStartAudio();
  mic.start();
  fft.setInput(mic);

  cardumen = new CardumenLinea(random(width), random(height), 10);
}

function draw() {
  background('#FFFFFF');
  amp = mic.getLevel();
  fft.analyze();

  let agudoEnergy = fft.getEnergy(2000, 12000);
  agudoEnergy = constrain(agudoEnergy * 1.8, 0, 255);

  if (amp > AMP_MIN) {
    if (figuras.length < 20) {
      let tipo = random(['rectangulo', 'cuadrado']);
      let x = random(width * 0.1, width * 0.9);
      let y = random(height * 0.1, height * 0.9);
      let tam = random(40, 160);
      let color = random(colores);
      let rot = radians(random(-45, 45));
      figuras.push(new Figura(tipo, x, y, tam, color, rot));
    }
  }

  for (let f of figuras) {
    f.actualizarTamano(amp);
    f.dibujar();
  }

  cardumen.actualizar(amp);
  cardumen.dibujar();

  push();
  textSize(20);
  fill(50);
  text("Amplitud: " + nfc(amp, 3), 20, 30);
  text("Energía aguda: " + nfc(agudoEnergy, 2), 20, 60);
  pop();
}

class Figura {
  constructor(tipo, x, y, tam, color, rot) {
    this.tipo = tipo;
    this.x = x;
    this.y = y;
    this.tamBase = tam;
    this.tamActual = tam;
    this.color = color;
    this.rot = rot;

    if (this.tipo === 'rectangulo') {
      this.proporcion = random(0.3, 0.6);
    }
  }

  actualizarTamano(amp) {
    let escala = map(amp, AMP_MIN, AMP_MAX, 1.2, 1.8);
    this.tamActual = this.tamBase * escala;
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    rotate(this.rot);
    noStroke();
    fill(this.color);
    rectMode(CENTER);

    if (this.tipo === 'rectangulo') {
      let w = this.tamActual;
      let h = this.tamActual * this.proporcion;
      rect(0, 0, w, h);
    } else if (this.tipo === 'cuadrado') {
      rect(0, 0, this.tamActual, this.tamActual);
    }

    pop();
  }
}

class Linea {
  constructor(offsetX, offsetY, color) {
    this.baseX = offsetX;
    this.baseY = offsetY;
    this.x = offsetX;
    this.y = offsetY;
    this.largo = 120;
    this.color = color;
  }

  actualizarPosicion(cardumenX, cardumenY, tiempo) {
    this.x = cardumenX + this.baseX;
    this.y = cardumenY + this.baseY + sin(tiempo + this.baseX * 0.3) * 10;
  }

  dibujar() {
    push();
    stroke(this.color);
    strokeWeight(5);
    line(this.x, this.y, this.x + this.largo, this.y);
    pop();
  }
}

class CardumenLinea {
  constructor(x, y, cantidad) {
    this.x = x;
    this.y = y;
    this.velMin = 1;
    this.velMax = 3;
    this.tiempo = 0;
    this.lineas = [];
    for (let i = 0; i < cantidad; i++) {
      let offsetX = i * 25;
      let offsetY = random(-20, 20);
      let color = random(colores);
      this.lineas.push(new Linea(offsetX, offsetY, color));
    }

    this.setDireccion(random(['vertical', 'horizontal', 'diagonal']));
  }

  setDireccion(dir) {
    this.direccion = dir;
    if (dir === 'vertical') {
      this.dirX = 0;
      this.dirY = 1;
    } else if (dir === 'horizontal') {
      this.dirX = 1;
      this.dirY = 0;
    } else if (dir === 'diagonal') {
      this.dirX = 0.7;
      this.dirY = 0.7;
    }
  }

  actualizar(amp) {
    this.tiempo += 0.05;
    let speed = map(amp, AMP_MIN, AMP_MAX, this.velMin, this.velMax);
    this.x += this.dirX * speed;
    this.y += this.dirY * speed;

    // Cuando está a punto de salirse, lo teletransportamos a otro borde
    let margen = 60; // margen antes de salir

    if (
      this.x > width + margen ||
      this.x < -margen ||
      this.y > height + margen ||
      this.y < -margen
    ) {
      let borde = floor(random(4));
      if (borde === 0) {
        this.x = random(width);
        this.y = -margen; // justo arriba
      } else if (borde === 1) {
        this.x = width + margen; // justo a la derecha
        this.y = random(height);
      } else if (borde === 2) {
        this.x = random(width);
        this.y = height + margen; // justo abajo
      } else {
        this.x = -margen; // justo a la izquierda
        this.y = random(height);
      }
      this.setDireccion(random(['vertical', 'horizontal', 'diagonal']));
    }
  }

  dibujar() {
    for (let linea of this.lineas) {
      linea.actualizarPosicion(this.x, this.y, this.tiempo);
      linea.dibujar();
    }
  }
}


