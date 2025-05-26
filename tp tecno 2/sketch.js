// CONFIGURACIÓN DE AMPLITUD
let AMP_MIN = 0.02;
let AMP_MAX = 0.05;

let mic;
let amp = 0;

// Colores que respetan la paleta de Kazimir
let colores = ['#B03030', '#3A4BA0', '#D9B400', '#D97600', '#222222'];
let figuras = [];
let circuloVerdeAgregado = false;

function setup() {
  createCanvas(600, 600);
  mic = new p5.AudioIn();
  userStartAudio();
  mic.start();
}

function draw() {
  background('#FFFFFF');
  amp = mic.getLevel();

  if (amp > AMP_MIN) {
    // Si hay sonido agregar figuras 
    if (figuras.length < 20) {
      let tipo;
      if (!circuloVerdeAgregado) {
        tipo = 'circulo';
        circuloVerdeAgregado = true;
      } else {
        tipo = random(['rectangulo', 'cuadrado', 'linea']);
      }

      let x, y;
      if (tipo === 'circulo') {
        x = random(width / 2 - 50, width / 2 + 50);
        y = random(height / 2 - 50, height / 2 + 50);
      } else {
        x = random(width * 0.1, width * 0.9);
        y = random(height * 0.1, height * 0.9);
      }

      let tam = random(40, 160);
      let color = tipo === 'circulo' ? '#4E8F4A' : random(colores);
      let rot = radians(random(-45, 45));

      figuras.push(new Figura(tipo, x, y, tam, color, rot));
    }
  }

  // Dibujar y modificar las figuras según la amplitud
  for (let f of figuras) {
    f.actualizarTamano(amp);
    f.dibujar();
  }

  // Mostrar amplitud en texto
  push();
  textSize(20);
  fill(50);
  text("Amplitud: " + nfc(amp, 3), 20, 30);
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

    // Guardar proporciones fijas para evitar el temblor
    if (this.tipo === 'rectangulo') {
      this.proporcion = random(0.3, 0.6); // altura relativa
    } else if (this.tipo === 'linea') {
      this.largo = random(height * 0.6, height * 0.8);
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
    } else if (this.tipo === 'linea') {
      let grosor = map(this.tamActual, 20, 160, 4, 8);
      rect(0, 0, this.largo, grosor);
    } else if (this.tipo === 'circulo') {
      ellipse(0, 0, this.tamActual, this.tamActual);
    }

    pop();
  }
}