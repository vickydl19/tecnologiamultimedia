//Victoria Di Lorenzo 95495/7
//Comision 2
//TP2
//Video: https://youtu.be/XUBEbWBPLbg
float angle;
color fill;
float scalevar;
PImage imagen1;

void setup() {
  size(800, 400);
  imagen1=loadImage("ilusion.jpg");
  rectMode(CENTER);
  stroke(0, 15, 30);
  strokeWeight(25);
}

void draw() {
  background(0, 15, 30);
  translate(600, 200);
  
  push();
  scalevar = map(mouseX, 0, width, 0.5, 10);
  scale(scalevar);
  for (int i = 0; i < 100; i++) {
    if (key == 'r' || key == 'R') {
      stroke(random(255), random(255), random(255));
    }
    fill(i * 10, 255 - i * 20, 255 - i * 10);
    scale(0.95);
    rotate(radians(angle));
    rect(0, 0, 600, 600);
  }
  
  angle += 0.1;
  pop();
  
  translate(-600, -200);
  imagen1.resize(400,400);
  image(imagen1, 0, 0);
  println(scalevar);
}

void keyPressed() {
  if (key == 'f' || key == 'F') {
    angle=0;
    scalevar=0;
  }
}
