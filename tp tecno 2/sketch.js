// CONFIGURACIÓN DE AMPLITUD
let AMP_MIN = 0.005;
let AMP_MAX = 0.05;

let mic;
let fft;
let amp = 0;

// Paleta Kazimir
let colores = ['#B03030', '#3A4BA0', '#D9B400', '#D97600', '#222222'];
let figuras = [];

function setup() {
  createCanvas(600, 600);
  mic = new p5.AudioIn();
  fft = new p5.FFT(0.8, 1024);
  userStartAudio();
  mic.start();
  fft.setInput(mic);
}

function draw() {
  background('#FFFFFF');
  amp = mic.getLevel();

  fft.analyze();

  // Energía en rango de agudos (2000 a 12000 Hz)
  let agudoEnergy = fft.getEnergy(2000, 12000);

  // Amplificar energía para más respuesta (limitar máximo a 255)
  agudoEnergy = constrain(agudoEnergy * 1.8, 0, 255);

  if (amp > AMP_MIN) {
    if (figuras.length < 20) {
      let tipo = random(['rectangulo', 'cuadrado', 'linea']);

      let x, y, dir;
      if (tipo === 'linea') {
        [x, y, dir] = generarEntradaDesdeBorde();
      } else {
        x = random(width * 0.1, width * 0.9);
        y = random(height * 0.1, height * 0.9);
      }

      let tam = random(40, 160);
      let color = random(colores);
      let rot = radians(random(-45, 45));

      figuras.push(new Figura(tipo, x, y, tam, color, rot, dir));
    }
  }

  for (let f of figuras) {
    f.actualizarTamano(amp);
    if (f.tipo === 'linea') {
      // Si la energía aguda es muy baja, velocidad mínima
      if (agudoEnergy > 20) {
        f.vel = map(agudoEnergy, 20, 255, 5, 35); // velocidad más alta
      } else {
        f.vel = 2;
      }
      f.mover();
      f.revisarBordes();
    }
    f.dibujar();
  }

  push();
  textSize(20);
  fill(50);
  text("Amplitud: " + nfc(amp, 3), 20, 30);
  text("Energía aguda: " + nfc(agudoEnergy, 2), 20, 60);
  pop();
}

function generarEntradaDesdeBorde() {
  let borde = floor(random(4));
  let x, y, dir;

  if (borde === 0) {
    x = random(width);
    y = -20;
    dir = random(PI / 4, (3 * PI) / 4);
  } else if (borde === 1) {
    x = width + 20;
    y = random(height);
    dir = random((5 * PI) / 8, (7 * PI) / 8);
  } else if (borde === 2) {
    x = random(width);
    y = height + 20;
    dir = random((5 * PI) / 4, (7 * PI) / 4);
  } else {
    x = -20;
    y = random(height);
    dir = random(-PI / 8, PI / 8);
  }

  return [x, y, dir];
}

class Figura {
  constructor(tipo, x, y, tam, color, rot, dir = null) {
    this.tipo = tipo;
    this.x = x;
    this.y = y;
    this.tamBase = tam;
    this.tamActual = tam;
    this.color = color;
    this.rot = rot;

    if (this.tipo === 'rectangulo') {
      this.proporcion = random(0.3, 0.6);
    } else if (this.tipo === 'linea') {
      this.largo = random(height * 0.6, height * 0.8);
      this.dir = dir ?? radians(random(360));
      this.vel = random(4, 10);
      this.noiseOffsetX = random(1000);
      this.noiseOffsetY = random(2000);
    }
  }

  actualizarTamano(amp) {
    let escala = map(amp, AMP_MIN, AMP_MAX, 1.2, 1.8);
    this.tamActual = this.tamBase * escala;
  }

  mover() {
    this.noiseOffsetX += 0.02;
    this.noiseOffsetY += 0.02;

    let ruidoX = map(noise(this.noiseOffsetX), 0, 1, -1, 1);
    let ruidoY = map(noise(this.noiseOffsetY), 0, 1, -1, 1);

    let dx = this.vel * cos(this.dir) + ruidoX;
    let dy = this.vel * sin(this.dir) + ruidoY;

    this.x += dx;
    this.y += dy;

    this.rot = atan2(dy, dx);
  }

  revisarBordes() {
    if (
      this.x < -100 ||
      this.x > width + 100 ||
      this.y < -100 ||
      this.y > height + 100
    ) {
      let [newX, newY, newDir] = generarEntradaDesdeBorde();
      this.x = newX;
      this.y = newY;
      this.dir = newDir;
      this.vel = random(4, 10);
    }
  }

  dibujar() {
    push();
    translate(this.x, this.y);
    rotate(this.rot);
    noStroke();
    fill(this.color);
    rectMode(CORNER);

    if (this.tipo === 'rectangulo') {
      let w = this.tamActual;
      let h = this.tamActual * this.proporcion;
      rect(-w / 2, -h / 2, w, h);
    } else if (this.tipo === 'cuadrado') {
      rect(-this.tamActual / 2, -this.tamActual / 2, this.tamActual, this.tamActual);
    } else if (this.tipo === 'linea') {
      let grosor = map(this.tamActual, 20, 160, 4, 8);
      rect(0, -grosor / 2, this.largo, grosor);
    }

    pop();
  }
}
