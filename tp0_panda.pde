PImage panda;
void setup(){
  size(800,400);
  background(205,235,0);
   panda=loadImage("panda.jpg");
  
}

void draw(){
  image(panda, 400, 0);
  noStroke();
  fill(255);
  circle(200,275,175); //cuerpo
  fill(40);
  rect(245,290,100,70,40); //pata izquierda
  rect(65,290,100,70,40); //pata izquierda
  fill(0);
  ellipse(140,280,70,180); //brazo derecho
  ellipse(270,280,70,180); //brazo izquierdo
  fill(0);
  circle(265,110,60); //oreja izquierda
  circle(150,110,60); //oreja derecho
  fill(255);
  circle(205,160,135); //cabeza
  fill(0);
  circle(239,150,50); //ojo izquierdo
  circle(170,150,50); //ojo derecho
  fill(255);
  circle(230,150,25); //ojo izquierdo
  circle(180,150,25); //ojo derecho
  fill(0);
  circle(225,150,15); //ojo izquierdo
  circle(175,150,15); //ojo derecho
  triangle(215,170,195,170,205,185); //naríz
  stroke(0);
  line(205,185,205,198); //boca
  line(205,198,210,200);
  

}
