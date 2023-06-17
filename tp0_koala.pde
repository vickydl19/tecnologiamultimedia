PImage koala;

void setup(){
 size(800,400);
 background(255);
 koala=loadImage("koala.jpg");


}

void draw(){
  image(koala,400,0);
  fill(240);
   noStroke();
 circle(100,260,130); //orejas
 circle(290,260,130);
 fill(250);
 circle(100,280,90);
 circle(290,280,90);
 fill(230);
 circle(200,410,200); //circulo del cuerpo
 fill(240);
 circle(200,290,155); //circulo de la cabeza 
 fill(64);
 rect(185,290,30,60,10); //nariz
 fill(255);
 circle(240,280,30); //ojos
 circle(165,280,30);
 fill(0);
 circle(240,280,25); //pupila
 circle(165,280,25);
 fill(255);
 circle(250,275,10); //brillo
 circle(175,275,10);

}
