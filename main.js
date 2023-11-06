window.onload = function () {
    let canvas;
    let ctx;
    let imagenSamurai;
    let x = 450;
    let y = 470;

    function samurai(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.velocidad = 2;
        this.izquierda = false;
        this.derecha = false;
        this.estaticoDerecha = false;
        this.estaticoIzquierda = false;

        // -- Animaciones --

        this.posicionAnimacion = 0;
        this.totalAnimacion = 1;
        this.animacionSamurai = /* Estatico Derecha */ [[1150, 11], /* Estatico Izquierda */ [1053, 11], /* Movimiento Derecha */ [2054, 274], [1926, 275], [1798, 274], [1670, 273], [1543, 275], [1414, 275], [1286, 274], [1157, 274]];

        this.posicionTamaño = 0;
        this.tamañoAnimacion = /* Estatico */ [[58, 70], /* Corriendo */ [54, 64]];

        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];
    }

    function activaMovimiento(evt) {
        switch (evt.keyCode) {
            case 37:
                ninja.izquierda = true;
                break;

            case 39:
                ninja.derecha = true;
                break;
        }
    }

    function paraMovimiento(evt) {
        switch (evt.keyCode) {
            case 37:
                ninja.izquierda = false;
                break;

            case 39:
                ninja.derecha = false;
                break;
        }
    }

    function pintarNinja() {

        ctx.clearRect(0,0,1000,600);

        if (ninja.derecha) {
            ninja.x += ninja.velocidad;
        }

        if (ninja.izquierda) {
            ninja.x -= ninja.velocidad;
        }

        ctx.drawImage(
            ninja.imagen,
            ninja.animacionSamurai[ninja.posicionAnimacion][0],
            ninja.animacionSamurai[ninja.posicionAnimacion][1],
            ninja.tamañoX,
            ninja.tamañoY,
            ninja.x,
            ninja.y,
            ninja.tamañoX,
            ninja.tamañoY
        );

    }

    function animacion() {
        if (ninja.izquierda){
            ninja.totalAnimacion = 1;
            ninja.posicionAnimacion = 1 + (ninja.posicionAnimacion + 1) % ninja.totalAnimacion;
        }

        if (ninja.derecha) {
            ninja.totalAnimacion = 8;
            ninja.posicionAnimacion = 2 + (ninja.posicionAnimacion + 1) % ninja.totalAnimacion;
        }
    }

    function iniciar() {
        pintarNinja();
    }

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext('2d');


    imagenSamurai = new Image();
    imagenSamurai.src = "assets/sprites/samurai/samuraiDefinitivo.png";
    samurai.prototype.imagen = imagenSamurai;

    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", paraMovimiento, false);


    ninja = new samurai(x, y);
    let id1 = setInterval(iniciar, 1000/60);
    let id2 = setInterval(animacion, 1000/8);
}