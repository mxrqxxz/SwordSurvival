window.onload = function () {
    let canvas;
    let ctx;
    let imagenSamurai;
    let x = 450; // Coordenada ninja inicial
    let y = 470; // Coordenada ninja inicial

    function limpiarLienzo() {
        ctx.clearRect(0, 0, 1000, 600);
    }


    /* 
    ============================================================
    ||   CONSTRUCTOR DEL NINJA
    ============================================================
    */

    function samurai(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.velocidad = 2;

        // -- Movimientos --

        this.izquierda = false;
        this.derecha = false;

        // -- Booleanos para animaciones --

        this.izquierdaAnimacion = false;
        this.derechaAnimacion = false;
        this.estaticoDerecha = false;
        this.estaticoIzquierda = false;
        this.saltoDerecha = false;

        // -- Animaciones --

        this.posicionAnimacion = 0;
        this.totalAnimacion = 1;
        this.animacionSamurai = /* Estatico Derecha */[[1150, 11], [1278, 11], [1406, 11], [1534, 11], [1662, 11], [1789, 11], /* Estatico Izquierda */[1053, 11], [925, 11], [797, 11], [669, 11], [541, 11], [414, 11], /* Movimiento Derecha */[2054, 274], [1926, 275], [1798, 274], [1670, 273], [1543, 275], [1414, 275], [1286, 274], [1157, 274], /* Movimiento Izquierda */[1048, 273], [919, 274], [791, 275], [662, 275], [535, 273], [407, 274], [279, 275], [150, 274], /* Salto Derecha */ [1146, 911], [1282, 917], [1410, 920], [1537, 900], [1667, 905], [1795, 906], [1920, 907], [2052, 933], [2180, 933]];

        this.posicionTamaño = 0;
        this.tamañoAnimacion = /* Estatico */[[58, 70], /* Corriendo */[54, 64], /* Saltando */[56,67], [47,61], [47, 58], [42,72], [46,59], [46,59], [44,65], [42,45], [39,45]];

        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];
    }

    imagenSamurai = new Image();
    imagenSamurai.src = "assets/sprites/samurai/samuraiDefinitivo.png";
    samurai.prototype.imagen = imagenSamurai;

    /* 
    ============================================================
    ||   MOVIMIENTOS DEL NINJA
    ============================================================
    */

    function permitirMoverIzquierda() {

        // -- Movimiento --
        ninja.izquierda = true;

        // -- Booleanos Animacion --
        ninja.izquierdaAnimacion = true;
        ninja.estaticoIzquierda = false;
        ninja.derechaAnimacion = false;
        ninja.estaticoDerecha = false;
    }

    function moverIzquierda() {
        ninja.x -= ninja.velocidad;
    }

    function permitirMoverDerecha() {

        // -- Movimiento --
        ninja.derecha = true;

        // -- Booleanos Animacion --
        ninja.derechaAnimacion = true;
        ninja.estaticoDerecha = false;
        ninja.izquierdaAnimacion = false;
        ninja.estaticoIzquierda = false;
    }

    function moverDerecha() {
        ninja.x += ninja.velocidad;
    }

    function noPermitirMoverIzquierda() {

        // -- Movimiento --
        ninja.izquierda = false;

        // -- Booleanos Animacion --
        ninja.izquierdaAnimacion = false;
        ninja.estaticoIzquierda = true;
    }

    function noPermitirMoverDerecha() {

        // -- Movimiento --
        ninja.derecha = false;

        // -- Booleanos Animacion --
        ninja.derechaAnimacion = false;
        ninja.estaticoDerecha = true;
    }

    function permitirSalto() {
        if (ninja.derecha || ninja.estaticoDerecha){
            ninja.saltoDerecha = true;
        }
    }

    function saltarDerecha() {
        ninja.derechaAnimacion = false;
        ninja.estaticoDerecha = false;
    }

    function activaMovimiento(evt) {

        if (evt.keyCode === 38 || evt.keyCode === 87) {
            permitirSalto();

            // Teclas Flecha Arriba y w
        }

        // Teclas Flecha Izquierda y a
        if (evt.keyCode === 37 || evt.keyCode === 65) {
            permitirMoverIzquierda();
        } else if (evt.keyCode === 39 || evt.keyCode === 68) {
            permitirMoverDerecha();

            // Teclas Flecha Derecha y d
        }
    }

    function paraMovimiento(evt) {

        // Teclas Flecha Izquierda y a
        if (evt.keyCode === 37 || evt.keyCode === 65) {
            noPermitirMoverIzquierda();
        } else if (evt.keyCode === 39 || evt.keyCode === 68) {
            noPermitirMoverDerecha();

            // Teclas Flecha Derecha y d
        }
    }

    /* 
    ============================================================
    ||   REPRESENTACION DEL NINJA
    ============================================================
    */

    function pintarNinja() {

        if (ninja.derecha) {
            moverDerecha();
        }

        if (ninja.izquierda) {
            moverIzquierda();
        }

        if (ninja.saltoDerecha){
            saltarDerecha();
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

    /* 
    ============================================================
    ||   ANIMACIONES DEL NINJA
    ============================================================
    */

    function animacionMirandoIzquierda() {
        ninja.posicionTamaño = 0;
        ninja.totalAnimacion = 6;
        ninja.posicionAnimacion = 6 + (ninja.posicionAnimacion + 1) % ninja.totalAnimacion;
    }

    function animacionCorrerIzquierda() {
        ninja.posicionTamaño = 1;
        ninja.totalAnimacion = 8;
        ninja.posicionAnimacion = 20 + (ninja.posicionAnimacion + 1) % ninja.totalAnimacion;
    }

    function animacionMirandoDerecha() {
        ninja.posicionTamaño = 0;
        ninja.totalAnimacion = 6;
        ninja.posicionAnimacion = 0 + (ninja.posicionAnimacion + 1) % ninja.totalAnimacion;
    }

    function animacionCorrerDerecha() {
        ninja.posicionTamaño = 1;
        ninja.totalAnimacion = 8;
        ninja.posicionAnimacion = 12 + (ninja.posicionAnimacion + 1) % ninja.totalAnimacion;
    }

    function animacionSaltoDerecha() {
        
        if (ninja.posicionTamaño < 2 || ninja.posicionTamaño > 11){
            ninja.posicionTamaño = 2;
            ninja.posicionAnimacion = 28;
        }

        ninja.posicionTamaño++;
        ninja.posicionAnimacion++;

        if (ninja.posicionTamaño > 11){
            ninja.saltoDerecha = false;
        }
    }
    
    function animacion() {

        if (!ninja.estaticoIzquierda && !ninja.izquierdaAnimacion && !ninja.estaticoDerecha && !ninja.derechaAnimacion && !ninja.saltoDerecha) {
            ninja.estaticoDerecha = true;
        }

        if (ninja.derecha && ninja.izquierda) {
            ninja.derechaAnimacion = false;
            ninja.izquierdaAnimacion = false;
            ninja.estaticoDerecha = true;
        }

        if (ninja.estaticoIzquierda) {
            animacionMirandoIzquierda();
        }

        if (ninja.izquierdaAnimacion) {
            animacionCorrerIzquierda();
        }

        if (ninja.estaticoDerecha) {
            animacionMirandoDerecha();
        }

        if (ninja.derechaAnimacion) {
            animacionCorrerDerecha();
        }

        if (ninja.saltoDerecha){
            animacionSaltoDerecha();
        }

    }


    /* 
    ============================================================
    ||   CODIGO DE "UN SOLO USO"
    ============================================================
    */

    function iniciar() {
        limpiarLienzo();
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
    let id1 = setInterval(iniciar, 1000 / 60);
    let id2 = setInterval(animacion, 1000 / 8);
}