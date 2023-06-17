String estado;
int c; 
float x = 50;
float y = 0;
PFont fuenteNueva;
PImage imagen1, imagen2, imagen3, imagen4;

void setup(){
  size( 640, 480 );  //resolucion tp1
   fuenteNueva = loadFont("Calibri-Bold-40.vlw");
   imagen1 = loadImage("imagen1.jpg");
   imagen2 = loadImage("imagen2.jpg");
   imagen3 = loadImage("imagen3.jpg");
   imagen4 = loadImage("imagen4.jpg");
  textAlign( CENTER, CENTER );
  textSize( 40 );
  fill(255, 60, 0);
  estado = "Quokkas";
  textFont(fuenteNueva);
  frameRate( 60 );
}

void draw() {
  if ( estado.equals("Quokkas") ) {
   image(imagen3, 0, 0, 640, 480);
    text( "Quokkas", width/2, 100 );
    circle( width/2, height/4*3, 60 );
    //
  }
   if ( estado.equals("tercera diapositiva") ) {
    image(imagen4, 0, 0, 640, 480);
    text( "Gracias por leer \n se como un quokka, sonrie mas", 60, 200 );
    circle( width/2, height/4*3, 50 );
    //
  }
  else if (estado.equals("primera diapositiva") ) {
  image(imagen1, 0, 0, 640, 480);
     text("El quokka es un animal de la \n familia de los canguros \n Se le considera el más feliz \n del mundo por su aspecto jovial \n y por su eterna sonrisa", x, y);
     textAlign(200, 200);
      y += 1;
       if (y > height) {
    y = 0;
  }
    //
    c++;  
    if( c >= 480 ){  
      estado = "segunda diapositiva";
      c = 0;  
    }
    //
  } else if (estado.equals("segunda diapositiva") ) {
    image(imagen2, 0, 0, 640, 480);
    y--;
      text( "Este animalito peludo es del tamaño \n de un gato \n vive en el suroeste de  Australia \n y es bastante simpático \n con los seres humanos.\n Sin embargo, su población \n está en descenso", 10, y);
    if (y<height/2) {
  }
    //
    c++; 
    if( c >= 750 ){  
      estado = "tercera diapositiva";
      c = 0;  
    }
    //
  } else if (estado.equals("tercera diapositiva") ) {
    image(imagen4, 0, 0, 640, 480);
    text( "Gracias por leer \n se como un quokka, sonrie mas", width/2, height/2 );
    //
  }
  println( estado );
}

void mousePressed() {
  if( estado.equals("Quokkas") ){
    if( dist(width/2, height/4*3, mouseX, mouseY) < 50/2 ){
      estado = "primera diapositiva";
    }
  }
  if( estado.equals("tercera diapositiva") ){
     if( dist(width/2, height/4*3, mouseX, mouseY) < 50/2 )
     estado = "Quokkas" ;
  }
}
