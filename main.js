window.onload = function () {
    let canvas;
    let ctx;
    let imagenSamurai;
    let x = 450; // Coordenada ninja inicial
    let y = 470; // Coordenada ninja inicial
    let ySuelo = 540;

    function limpiarLienzo() {
        ctx.clearRect(0, 0, 1200, 600);
    }


    /* 
    ============================================================
    ||   CONSTRUCTOR DEL NINJA
    ============================================================
    */

    function samurai(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.velocidad = 5;

        // -- Movimientos --

        this.izquierda = false;
        this.derecha = false;

        // -- Booleanos para animaciones --

        this.izquierdaAnimacion = false;
        this.derechaAnimacion = false;
        this.estaticoDerecha = false;
        this.estaticoIzquierda = false;
        this.saltoDerecha = false;
        this.saltoIzquierda = false;
        this.ataqueDerecha = false;

        // -- Animaciones --

        this.posicionAnimacion = 0;
        this.totalAnimacion = 1;
        this.animacionSamurai = /* Estatico Derecha */[[1150, 11], [1278, 11], [1406, 11], [1534, 11], [1662, 11], [1789, 11], /* Estatico Izquierda */[1053, 11], [925, 11], [797, 11], [669, 11], [541, 11], [414, 11], /* Movimiento Derecha */[2054, 274], [1926, 275], [1798, 274], [1670, 273], [1543, 275], [1414, 275], [1286, 274], [1157, 274], /* Movimiento Izquierda */[1048, 273], [919, 274], [791, 275], [662, 275], [535, 273], [407, 274], [279, 275], [150, 274], /* Salto Derecha */[1146, 911], [1282, 917], [1410, 920], [1537, 900], [1667, 905], [1795, 906], [1920, 907], /* Salto Izquierda */[1057, 911], [930, 917], [803, 920], [680, 900], [546, 905], [418, 906], [295, 907], /* Ataque Derecha */ [1157, 400], [1285, 400], [1409, 400], [1537, 400], [1153, 656], [1258, 656], [1397, 654], [1525, 651], [1157, 518], [1286, 496], [1414, 490], [1544, 496], [1681, 534]];

        this.posicionTamaño = 0;
        this.tamañoAnimacion = /* Estatico */[[58, 70], /* Corriendo */[54, 64], /* Saltando */[56, 67], [47, 61], [47, 58], [42, 72], [46, 59], [46, 59], [44, 65], /* Atacando */ [50, 65], [50, 65], [98, 65], [92, 65], [44, 65], [66, 65], [95, 67], [75, 70], [57, 75], [53, 97], [51, 103], [65, 97], [85, 59]];

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

    function moverArriba() {

        // Solo será para el salto
        ninja.y -= 40;
        ninja.velocidad = 8;
    }

    function moverAbajo() {

        // Para caer del salto
        ninja.y += 40;
    }

    function permitirSalto() {

        // Dependiendo de a donde mire el ninja saltamos a un lado o a otro
        if (ninja.derecha || ninja.estaticoDerecha) {
            ninja.saltoDerecha = true;
        } else if (ninja.izquierda || ninja.estaticoIzquierda) {
            ninja.saltoIzquierda = true;
        }
    }

    function terminarSalto() {
        if (ninja.saltoDerecha){
            ninja.saltoDerecha = false;            // Paramos salto
            ninja.velocidad = 3;                   // Reajustamos la velocidad que habíamos subido con moverArriba();
            if (ninja.derecha) {
                ninja.derechaAnimacion = true;     // Si el ninja corre, activamos animacion manualmente, ya que si no se ha dejado de pulsar la tecla, el valor sigue siendo false al haber desactivado la animación de correr para ejecutar la del salto en saltarDerecha()
            }
            ninja.posicionTamaño = 0;              // Reiniciamos tamaño, ya que si saltamos de nuevo podría hacer conflicto, mejor que cada animación use su tamaño al inicio de la misma
        } else {                                   // Lo mismo pero a la izquierda 
            ninja.saltoIzquierda = false;
            ninja.velocidad = 3;
            if (ninja.izquierda) {
                ninja.izquierdaAnimacion = true;
            } else if (ninja.derecha == false){
                ninja.estaticoIzquierda = true;    // Esto es para que no se gire el personaje, ya que si se queda todo en false, la animación por defecto será estático derecha, de ahí que no sea necesario controlarlo arriba en el caso del salto de la derecha
            }
            ninja.posicionTamaño = 0;
        }
    }

    function saltarDerecha() {
        ninja.derechaAnimacion = false;     // Paramos las animaciones para que no hagan conflicto con la del salto
        ninja.estaticoDerecha = false;
    }

    function saltarIzquierda() {
        ninja.izquierdaAnimacion = false;
        ninja.estaticoIzquierda = false;
    }

    function permitirAtaque() {
        
    }

    function activaMovimiento(evt) {

        if (evt.keyCode === 38 || evt.keyCode === 87) {
            if(!ninja.saltoDerecha && !ninja.saltoIzquierda){
                permitirSalto();
            }
        } else if (evt.keyCode === 18) {
            // Tecla altIzquierda
            permitirAtaque();
        } else if (evt.keyCode === 37 || evt.keyCode === 65) {
            // Teclas Flecha Izquierda y a
            permitirMoverIzquierda();
        } else if (evt.keyCode === 39 || evt.keyCode === 68) {
            // Teclas Flecha Derecha y d
            permitirMoverDerecha();
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

        if (ninja.saltoDerecha) {
            saltarDerecha();
        }

        if (ninja.saltoIzquierda) {
            saltarIzquierda();
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

        /*

        No he podido hacerlo de la misma manera que las demás animaciones, y la verdad
        es que desconozco el motivo, pero tras horas de intentos he decidido hacerlo por "la cuenta de la vieja"

        */

        // Es una manera para dar los valores la primera vez que se ejecuta la animación
        if (ninja.posicionTamaño < 2 || ninja.posicionTamaño > 8) { 
            ninja.posicionTamaño = 2;
            ninja.posicionAnimacion = 28;
        }

        // La mitad de la animación que salte y que la otra mitad caiga del salto
        if (ninja.posicionAnimacion > 28 && ninja.posicionAnimacion < 32) {
            moverArriba();
        } else if (ninja.posicionAnimacion > 31) {
            moverAbajo();
        }

        // Para controlar la finalización de la animación
        if (ninja.posicionAnimacion < 34) {
            ninja.posicionTamaño++;
            ninja.posicionAnimacion++;
        } else {
            terminarSalto();
        }


    }

    function animacionSaltoIzquierda() {        // Comentada arriba
        if (ninja.posicionTamaño < 2 || ninja.posicionTamaño > 8) {
            ninja.posicionTamaño = 2;
            ninja.posicionAnimacion = 35;
        }

        if (ninja.posicionAnimacion > 35 && ninja.posicionAnimacion < 39) {
            moverArriba();
        } else if (ninja.posicionAnimacion > 38) {
            moverAbajo();
        }

        if (ninja.posicionAnimacion < 41) {
            ninja.posicionTamaño++;
            ninja.posicionAnimacion++;
        } else {
            terminarSalto();
        }


    }

    function animacion() {

        if (!ninja.estaticoIzquierda && !ninja.izquierdaAnimacion && !ninja.estaticoDerecha && !ninja.derechaAnimacion && !ninja.saltoDerecha && !ninja.saltoIzquierda) {
            ninja.estaticoDerecha = true;   // Por defecto que mire a la derecha
        }

        if (ninja.derecha && ninja.izquierda) {

            // Si el jugador se mueve a ambas direcciones a la vez el personaje se quedará quieto con la animación estática a la derecha
            ninja.derechaAnimacion = false;
            ninja.izquierdaAnimacion = false;
            ninja.estaticoDerecha = true;
        }

        // Ejecutamos la animación que corresponda
        if (ninja.saltoDerecha) {
            animacionSaltoDerecha();
        } else if (ninja.saltoIzquierda) {
            animacionSaltoIzquierda();
        } else if (ninja.estaticoIzquierda) {
            animacionMirandoIzquierda();
        } else if (ninja.izquierdaAnimacion) {
            animacionCorrerIzquierda();
        } else if (ninja.estaticoDerecha) {
            animacionMirandoDerecha();
        } else if (ninja.derechaAnimacion) {
            animacionCorrerDerecha();
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
    let id2 = setInterval(animacion, 1000 / 10);
}