window.onload = function () {
    let canvas;
    let ctx;
    let idInicio;
    let id1;
    let id2;
    let id3;
    let botonEmpezar;
    let textoNombre;
    let usuario;
    let ninja;
    let imagenSamurai;
    let iconoVida;
    let iconoVidaIzq;
    let iconoVidaDer;
    let iconoCalavera;
    let imagenEnemigoEspadas;
    let imagenEnemigoVerde;
    let imagenShuriken;
    let x = 550; // Coordenada ninja inicial
    let y = 470; // Coordenada ninja inicial
    let ySuelo = 540;
    let numeroEnemigosEspadas = 0;
    let numeroEnemigosVerdes = 0;
    let numeroShurikens = 0;
    let matrizEnemigosEspadas = [];
    let matrizEnemigosVerdes = [];
    let matrizShuriken = [];
    let enemigoEspada;
    let enemigoVerde;
    let shurikenUnidad;
    let ninjaIzquierda; // Coordenada X
    let ninjaDerecha; // Coordenada X mas su tamaño X
    let ninjaArriba; // Coordenada Y
    let ninjaAbajo; // Coordenada Y mas su tamaño Y
    let enemigoIzquierda; // Coordenada X
    let enemigoDerecha; // Coordenada X mas su tamaño X
    let enemigoArriba; // Coordenada Y
    let enemigoAbajo; // Coordenada Y mas su tamaño Y
    let shurikenIzquierda; // Coordenada X
    let shurikenDerecha; // Coordenada X mas su tamaño X
    let shurikenArriba; // Coordenada Y
    let shurikenAbajo; // Coordenada Y mas su tamaño Y 
    let portalIzquierda;
    let portalDerecha;
    let valorRectanguloFinal; // Valor para hacer el efecto cortina al acabar el juego
    let contadorEnemigosAsesinados;
    let dificultad;
    let portalVerde;
    let imagenPortalVerde;
    let portalMorado;
    let imagenPortalMorado;
    let records = [];
    let audioAtaque = document.getElementById('audioEspada');
    let audioMuerte = document.getElementById('audioMuerte');
    let audioFondo = document.getElementById('audioFondo');
    let audioContador = document.getElementById('audioSumaContador');
    // Borra todo
    function limpiarLienzo() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Borra todo a partir de la barra de vida
    function limpiarLienzoMenosDatos() {
        ctx.clearRect(0, 91, canvas.width, canvas.height);
    }

    // Borra la barra de vida
    function limpiarLienzoVida() {
        ctx.clearRect(65, 60, canvas.width, 25);
    }

    function mostrarIconoCalavera() {
        ctx.drawImage(
            iconoCalavera,
            0,
            0,
            364,
            364,
            canvas.width - 100,
            28,
            30,
            30
        );
    }

    function mostrarContadorEnemigosAsesinados() {
        ctx.clearRect(canvas.width - 60, 0, 40, 60); // Limpia franja del contador
        ctx.fillStyle = "white";
        ctx.font = "20px Cinzel";
        ctx.fillText(contadorEnemigosAsesinados, canvas.width - 60, 50);
    }

    function actualizarContadorEnemigosAsesinados() {
        contadorEnemigosAsesinados++;
        audioContador.play();
        mostrarContadorEnemigosAsesinados();
    }

    function pararAudiosYMuerte() {
        audioAtaque.pause();
        audioContador.pause();
        audioFondo.pause();
        audioMuerte.currentTime = 0;
        audioMuerte.play();
        finDelJuego();
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
        this.vida = 1000;

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
        this.ataqueIzquierda = false;
        this.heridoDerecha = false;
        this.heridoIzquierda = false;
        this.muerteDerecha = false;
        this.muerteIzquierda = false;

        // -- Animaciones --

        this.posicionAnimacion = 0;
        this.totalAnimacion = 1;
        this.animacionSamurai = /* Estatico Derecha */[[1150, 11], [1278, 11], [1406, 11], [1534, 11], [1662, 11], [1789, 11], /* Estatico Izquierda */[1053, 11], [925, 11], [797, 11], [669, 11], [541, 11], [414, 11], /* Movimiento Derecha */[2054, 274], [1926, 275], [1798, 274], [1670, 273], [1543, 275], [1414, 275], [1286, 274], [1157, 274], /* Movimiento Izquierda */[1048, 273], [919, 274], [791, 275], [662, 275], [535, 273], [407, 274], [279, 275], [150, 274], /* Salto Derecha */[1146, 911], [1282, 917], [1410, 920], [1537, 900], [1537, 900], [1667, 905], [1667, 905], [1795, 906], [1920, 907], /* Salto Izquierda */[1057, 911], [930, 917], [803, 920], [680, 900], [680, 900], [546, 905], [546, 905], [418, 906], [295, 907], /* Ataque Derecha */[1157, 400], [1285, 400], [1409, 400], [1537, 400], [1157, 518], [1286, 496], [1414, 490], [1544, 496], [1681, 534], [1153, 656], [1258, 656], [1397, 654], [1525, 651], /* Ataque Izquierda */[1051, 400], [923, 400], [751, 400], [630, 400], [1044, 519], [919, 496], [793, 490], [649, 496], [493, 534], [1062, 656], [935, 657], [767, 654], [658, 652], /* Herido Derecha */[1146, 1038], [1273, 1038], [1400, 1038], /* Herido Izquierda */[1058, 1038], [930, 1038], [802, 1038], /* Muerte Derecha */[1150, 1168], [1277, 1168], [1410, 1177], [1539, 1184], [1668, 1188], [1804, 1218], /* Muerte Izquierda */[1069, 1168], [939, 1168], [809, 1177], [682, 1184], [546, 1188], [396, 1218]];

        this.posicionTamaño = 0;
        this.tamañoAnimacion = /* Estatico */[[58, 70], /* Corriendo */[54, 64], /* Saltando */[56, 67], [47, 61], [47, 58], [42, 72], [42, 72], [46, 59], [46, 59], [46, 59], [44, 65], /* Atacando */[50, 65], [50, 65], [98, 65], [92, 65], [57, 75], [53, 97], [51, 103], [65, 97], [85, 59], [44, 65], [66, 65], [95, 67], [75, 70], /* Herido */[55, 68], /* Muerte */[41, 66], [42, 66], [40, 57], [38, 50], [45, 46], [58, 16]];

        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];
    }

    imagenSamurai = new Image();
    imagenSamurai.src = "assets/sprites/samurai/samuraiDefinitivo.png";
    samurai.prototype.imagen = imagenSamurai;

    // Cada frame de cada animacion puede tener un tamaño diferente
    samurai.prototype.recalcularTamaño = function () {
        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];
    }

    // Cada frame puede tener un tamaño Y diferente, 
    // por lo que si es inferior al anterior se podría quedar el personaje levitando
    samurai.prototype.recalcularY = function () {
        this.y = ySuelo - this.tamañoY;
    }

    samurai.prototype.comprobarVida = function () {
        if (this.vida <= 0) {
            this.vida = 0;
            if (ninja.derecha || ninja.estaticoDerecha) {
                ninja.muerteDerecha = true;
                pararAudiosYMuerte();
            } else {
                ninja.muerteIzquierda = true;
                pararAudiosYMuerte();
            }
        }
    }

    /* 
    ============================================================
    ||   BARRA DE VIDA  DEL NINJA
    ============================================================
    */

    function mostrarIconoVida() {
        ctx.drawImage(
            iconoVida,
            0,
            0,
            50,
            24,
            15,
            60,
            50,
            24
        );
    }
    function mostrarVida() {
        limpiarLienzoVida();
        ctx.drawImage( // Acabado redondo de la barra de vida
            iconoVidaIzq,
            0,
            0,
            7,
            15,
            73,
            65,
            7,
            15
        );
        ctx.fillStyle = "#800000"; // Para el rectangulo de la vida
        ctx.fillRect(
            80,
            65,
            ninja.vida, // Así hago que se vaya haciendo más pequeño
            15
        );
        ctx.drawImage( // Acabado redondo del final de la barra de vida
            iconoVidaDer,
            0,
            0,
            7,
            15,
            80 + ninja.vida, // Se añade al final de la barra de vida
            65,
            7,
            15
        );
    }

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
        if (ninja.x <= 0) { // Control de los limites del mapa
            ninja.x = 0;
        } else {
            ninja.x -= ninja.velocidad;
        }
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
        if (ninja.x >= canvas.width - ninja.tamañoX) { // Control de los limites del mapa
            ninja.x = canvas.width - ninja.tamañoX;
        } else {
            ninja.x += ninja.velocidad;
        }
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
        ninja.y -= 25;
    }

    function moverAbajo() {

        // Para caer del salto
        ninja.y += 25;
    }

    function permitirSalto() {

        // Dependiendo de a donde mire el ninja saltamos a un lado o a otro
        if (ninja.derecha || ninja.estaticoDerecha) {
            ninja.saltoDerecha = true;
        } else if (ninja.izquierda || ninja.estaticoIzquierda) {
            ninja.saltoIzquierda = true;
        }
        ninja.velocidad += 1; // Para que no se note lento el salto
    }

    function terminarSalto() {
        if (ninja.saltoDerecha) {
            ninja.saltoDerecha = false;            // Paramos salto
            ninja.velocidad -= 1;                   // Reajustamos la velocidad que habíamos subido con moverArriba();
            if (ninja.derecha) {
                ninja.derechaAnimacion = true;     // Si el ninja corre, activamos animacion manualmente, ya que si no se ha dejado de pulsar la tecla, el valor sigue siendo false al haber desactivado la animación de correr para ejecutar la del salto en saltarDerecha()
            }
            ninja.posicionTamaño = 0;              // Reiniciamos tamaño, ya que si saltamos de nuevo podría hacer conflicto, mejor que cada animación use su tamaño al inicio de la misma
        } else {                                   // Lo mismo pero a la izquierda 
            ninja.saltoIzquierda = false;
            ninja.velocidad = 5;
            if (ninja.izquierda) {
                ninja.izquierdaAnimacion = true;
            } else if (ninja.derecha == false) {
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

        // Atacamos en funcion del lado al que mire el ninja
        if (ninja.derecha || ninja.estaticoDerecha) {
            ninja.ataqueDerecha = true;
        } else if (ninja.izquierda || ninja.estaticoIzquierda) {
            ninja.ataqueIzquierda = true;
        }
    }

    function terminarAtaque() {
        if (ninja.ataqueDerecha) {
            ninja.ataqueDerecha = false;            // Paramos ataque
            if (ninja.derecha) {
                ninja.derechaAnimacion = true;     // Si el ninja corre, activamos animacion manualmente, ya que si no se ha dejado de pulsar la tecla, el valor sigue siendo false al haber desactivado la animación de correr para ejecutar la del salto en saltarDerecha()
            }
            ninja.posicionTamaño = 0;              // Reiniciamos tamaño, ya que si atacamos de nuevo podría hacer conflicto, mejor que cada animación use su tamaño al inicio de la misma
        } else {                                   // Lo mismo pero a la izquierda 
            ninja.ataqueIzquierda = false;
            if (ninja.izquierda) {
                ninja.izquierdaAnimacion = true;
            } else if (ninja.derecha == false) {
                ninja.estaticoIzquierda = true;    // Esto es para que no se gire el personaje, ya que si se queda todo en false, la animación por defecto será estático derecha, de ahí que no sea necesario controlarlo arriba en el caso del salto de la derecha
            }
            ninja.posicionTamaño = 0;
        }
    }

    function ataqueDerecha() {
        ninja.derechaAnimacion = false;
        ninja.estaticoDerecha = false;
    }

    function ataqueIzquierda() {
        ninja.izquierdaAnimacion = false;
        ninja.estaticoIzquierda = false;
    }

    function activaMovimiento(evt) {

        if (evt.keyCode === 38 || evt.keyCode === 87) {
            // Tecla w o flecha Arriba
            if (!ninja.saltoDerecha && !ninja.saltoIzquierda && !ninja.ataqueIzquierda && !ninja.ataqueDerecha) {
                // Nada de saltar si se está atacando
                permitirSalto();
            }
        } else if (evt.keyCode === 69) {
            // Tecla e
            if (!ninja.ataqueIzquierda && !ninja.ataqueDerecha && !ninja.saltoDerecha && !ninja.saltoIzquierda) {
                // Que no ataque mientras salta porque es un coladero de bugs.
                permitirAtaque();
            }
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

        if (ninja.ataqueDerecha) {
            ataqueDerecha();
        }

        if (ninja.ataqueIzquierda) {
            ataqueIzquierda();
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
        if (ninja.posicionTamaño < 2 || ninja.posicionTamaño > 10) {
            ninja.posicionTamaño = 2;
            ninja.posicionAnimacion = 28;
        }

        // La mitad de la animación que salte y que la otra mitad caiga del salto
        if (ninja.posicionAnimacion > 28 && ninja.posicionAnimacion < 33) {
            moverArriba();
        } else if (ninja.posicionAnimacion > 32) {
            moverAbajo();
        }

        // Para controlar la finalización de la animación
        if (ninja.posicionAnimacion < 36) {
            ninja.posicionTamaño++;
            ninja.posicionAnimacion++;
        } else {
            terminarSalto();
        }
        ninja.recalcularTamaño(); // Para que cambie el tamaño del ninja junto con la animación
    }

    function animacionSaltoIzquierda() {        // Comentada arriba
        if (ninja.posicionTamaño < 2 || ninja.posicionTamaño > 10) {
            ninja.posicionTamaño = 2;
            ninja.posicionAnimacion = 37;
        }

        if (ninja.posicionAnimacion > 37 && ninja.posicionAnimacion < 42) {
            moverArriba();
        } else if (ninja.posicionAnimacion > 41) {
            moverAbajo();
        }

        if (ninja.posicionAnimacion < 45) {
            ninja.posicionTamaño++;
            ninja.posicionAnimacion++;
        } else {
            terminarSalto();
        }
        ninja.recalcularTamaño();
    }

    function animacionAtaqueDerecha() {
        if (ninja.posicionTamaño < 11 || ninja.posicionTamaño > 23) {
            audioAtaque.currentTime = 0;
            audioAtaque.play(); // Sonido de ataque, lo pongo aquí porque si te hieren y pulsas la e para atacar, se activa el ataque, solo que no realiza la animación y su efecto, lo lógico es que este aquí
            ninja.posicionTamaño = 11;
            ninja.posicionAnimacion = 46;
        }

        if (ninja.posicionAnimacion < 58) {
            ninja.posicionTamaño++;
            ninja.posicionAnimacion++;
        } else {
            terminarAtaque();
        }
        ninja.recalcularTamaño(); // Para que cambie el tamaño del ninja junto con la animación
        ninja.recalcularY(); // Para que el ninja siempre esté con los pies en el suelo
    }

    function animacionAtaqueIzquierda() {
        if (ninja.posicionTamaño < 11 || ninja.posicionTamaño > 23) {
            audioAtaque.currentTime = 0;
            audioAtaque.play();
            ninja.posicionTamaño = 11;
            ninja.posicionAnimacion = 59;
        }

        if (ninja.posicionAnimacion < 71) {
            ninja.posicionTamaño++;
            ninja.posicionAnimacion++;
        } else {
            terminarAtaque();
        }
        ninja.recalcularTamaño();
        ninja.recalcularY();

    }

    function animacionHeridaDerecha() {
        ninja.posicionTamaño = 24;
        ninja.totalAnimacion = 3;
        ninja.posicionAnimacion = 72 + (ninja.posicionAnimacion + 1) % ninja.totalAnimacion;
        if (ninja.posicionAnimacion = 74) {
            ninja.heridoDerecha = false;
        }

    }

    function animacionHeridaIzquierda() {
        ninja.posicionTamaño = 24;
        ninja.totalAnimacion = 3;
        ninja.posicionAnimacion = 75 + (ninja.posicionAnimacion + 1) % ninja.totalAnimacion;
        if (ninja.posicionAnimacion = 77) {
            ninja.heridoIzquierda = false;
        }
    }

    function animacionMuerteDerecha() {
        if (ninja.posicionTamaño < 25 || ninja.posicionTamaño > 30) {
            ninja.posicionTamaño = 25;
            ninja.posicionAnimacion = 78;
        }

        if (ninja.posicionAnimacion < 83) {
            ninja.posicionTamaño++;
            ninja.posicionAnimacion++;
        } else {
            terminarIntervaloFinal();
        }
        ninja.recalcularTamaño();
        ninja.recalcularY();

    }

    function animacionMuerteIzquierda() {
        if (ninja.posicionTamaño < 25 || ninja.posicionTamaño > 30) {
            ninja.posicionTamaño = 25;
            ninja.posicionAnimacion = 84;
        }

        if (ninja.posicionAnimacion < 89) {
            ninja.posicionTamaño++;
            ninja.posicionAnimacion++;
        } else {
            terminarIntervaloFinal();
        }
        ninja.recalcularTamaño();
        ninja.recalcularY();
    }

    function terminarIntervaloFinal() {
        clearInterval(id3);
        delete ninja; // Si no borramos el objeto, se puede dar un bug a la hora de volver a iniciar una partida
        console.log("Fin del juego");
        gestionarRecords();
        activarBoton();
        activarNombre();
    }

    /*
    =======================================
    || Enemigo general
    ========================================
    */

    function enemigo() {
        this.x;
        this.velocidad = 2;
        this.vida = 0;
        this.muerto = false;

        // -- Booleanos para animaciones --

        this.izquierdaAnimacion = false;
        this.derechaAnimacion = false;
        this.ataqueDerecha = false;
        this.ataqueIzquierda = false;
        this.muerteDerecha = false;
        this.muerteIzquierda = false;

        this.posicionAnimacion = 0;
        this.totalAnimacion = 1;
        this.posicionTamaño = 0;
    }

    enemigo.prototype.mover = function () {
        ninjaIzquierda = ninja.x;
        ninjaDerecha = ninja.x + ninja.tamañoX;
        ninjaArriba = ninja.y;
        ninjaAbajo = ninja.y + ninja.tamañoY;
        enemigoIzquierda = this.x;
        enemigoDerecha = this.x + this.tamañoX;
        enemigoArriba = this.y;
        enemigoAbajo = this.y + this.tamañoY;

        // Que el personaje no se mueva mientras la animación de muerte está en curso
        if (this.vida > 0) {

            // Comprobamos colisiones

            if (ninjaIzquierda <= enemigoDerecha && ninjaDerecha >= enemigoIzquierda && ninjaArriba <= enemigoAbajo && ninjaAbajo >= enemigoArriba) {
                // Determinar el lado de la colisión
                if (ninjaIzquierda <= enemigoIzquierda) { // Colisión en el lado derecho
                    if (ninja.ataqueDerecha === true) {
                        this.vida -= 1;
                        this.comprobarVida();
                    } else {
                        ninja.vida -= 1;
                        ninja.comprobarVida(); // Comprobar si muere
                        if (!ninja.saltoDerecha && !ninja.saltoIzquierda) { // Que solo haga la animacion de herido si salta, que si mezclamos ambas animaciones se puede quedar el personaje levitando
                            ninja.heridoDerecha = true;
                            ninja.ataqueDerecha = false;
                            ninja.ataqueIzquierda = false;
                        }
                        mostrarVida();
                    }
                } else { // Colisión en el lado izquierdo
                    if (ninja.ataqueIzquierda === true) {
                        this.vida -= 1;
                        this.comprobarVida(); // Comprobar si muere
                    } else {
                        ninja.vida -= 1;
                        ninja.comprobarVida();
                        if (!ninja.saltoDerecha && !ninja.saltoIzquierda) { // Que solo haga la animacion de herido si salta, que si mezclamos ambas animaciones se puede quedar el personaje levitando
                            ninja.heridoIzquierda = true;
                            ninja.ataqueDerecha = false;
                            ninja.ataqueIzquierda = false;
                        }
                        mostrarVida();
                    }
                }
            } else if (ninjaIzquierda >= enemigoDerecha) {
                this.x += this.velocidad;
                if (ninjaIzquierda < enemigoDerecha + 70) { // Distancia para empezar a atacar
                    this.ataqueDerecha = true;
                    this.ataqueIzquierda = false;
                    this.derechaAnimacion = false;
                    this.izquierdaAnimacion = false;
                } else { // El enemigo simplemente corre si no se encuentra a una distancia para atacar
                    this.derechaAnimacion = true;
                    this.izquierdaAnimacion = false;
                    this.ataqueDerecha = false;
                    this.ataqueIzquierda = false;
                }
            } else if (ninjaDerecha <= enemigoIzquierda) {
                this.x -= this.velocidad;
                if (ninjaDerecha > enemigoIzquierda - 70) { // Distancia para empezar a atacar
                    this.ataqueDerecha = false;
                    this.ataqueIzquierda = true;
                    this.derechaAnimacion = false;
                    this.izquierdaAnimacion = false;
                } else { // El enemigo simplemente corre si no se encuentra a una distancia para atacar
                    this.izquierdaAnimacion = true;
                    this.derechaAnimacion = false;
                    this.ataqueDerecha = false;
                    this.ataqueIzquierda = false;
                }
            }
        }

    }

    enemigo.prototype.comprobarVida = function () {

        // Comprobamos si el enemigo debe morir, en caso afirmativo
        // dependiendo del lado al que mire se inicia la animacion de muerte correspondiente

        if (this.vida <= 0) {
            if (ninjaIzquierda <= enemigoIzquierda) {
                this.muerteIzquierda = true;
                actualizarContadorEnemigosAsesinados();
            } else {
                this.muerteDerecha = true;
                actualizarContadorEnemigosAsesinados();
            }
        }
    }

    function quitarEnemigosMuertos(element) {

        // Antes de pintar cada uno de los enemigos se va a eliminar de todos los arrays
        // los enemigos que estén muertos, filtrando y permaneciendo aquellos que tengan
        // una número de vida positivo

        return element.muerto === false;
    }

    function quitarShurikenCaidos(element) {
        return element.activo === true;
    }

    /*
    =======================================
    || Constructor Enemigo de dos espadas
    ========================================
    */


    function enemigoEspadas() {

        // -- Animaciones --

        this.animacionEnemigo = [/* Corriendo Derecha */[877, 226], [973, 225], [1069, 224], [1165, 225], [1261, 224], [1357, 223], /* Corriendo Izquierda */[791, 226], [695, 225], [599, 224], [503, 225], [407, 225], [311, 223], /* Atacando derecha */[990, 420], [1084, 420], [888, 516], [981, 516], [1076, 516], [1172, 516], [1267, 516], /* Atacando Izquierda */[689, 420], [565, 420], [767, 516], [688, 516], [601, 516], [473, 516], [381, 516], /* Muerte Derecha */[888, 901], [888, 901], [888, 901], [888, 901], [984, 905], [984, 905], [984, 905], [984, 905], [1080, 910], [1080, 910], [1080, 910], [1080, 910], [1176, 933], [1176, 933], [1176, 933], [1176, 933], /* Muerte Izquierda */[789, 901], [789, 901], [789, 901], [789, 901], [693, 905], [693, 905], [693, 905], [693, 905], [584, 910], [584, 910], [584, 910], [584, 910], [470, 933], [470, 933], [470, 933], [470, 933]];

        this.tamañoAnimacion = [/* Corriendo */[48, 62], [48, 63], [48, 64], [48, 63], [48, 64], [48, 65], /* Atacando */[37, 60], [67, 60], [61, 60], [47, 60], [39, 60], [71, 60], [68, 60], /* Muriendo */[39, 59], [39, 59], [39, 59], [39, 59], [39, 55], [39, 55], [39, 55], [39, 55], [52, 50], [52, 50], [52, 50], [52, 50], [70, 27], [70, 27], [70, 27], [70, 27]];

        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];

        this.y = ySuelo - this.tamañoY; // Cada enemigo tendrá una coordenada Y distinta
    }

    imagenEnemigoEspadas = new Image();
    imagenEnemigoEspadas.src = "assets/sprites/enemigos/orcoespadas.png";
    enemigoEspadas.prototype = new enemigo(); // Herencia
    enemigoEspadas.prototype.imagen = imagenEnemigoEspadas;
    enemigoEspadas.prototype.recalcularTamaño = function () {
        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];
    }

    enemigoEspadas.prototype.recalcularY = function () {
        this.y = ySuelo - this.tamañoY;
    }

    enemigoEspadas.prototype.pintar = function () {
        this.mover();
        ctx.drawImage(
            this.imagen,
            this.animacionEnemigo[this.posicionAnimacion][0],
            this.animacionEnemigo[this.posicionAnimacion][1],
            this.tamañoX,
            this.tamañoY,
            this.x,
            this.y,
            this.tamañoX,
            this.tamañoY
        );
    }

    function crearEnemigosEspadas() {
        for (let i = 0; i < numeroEnemigosEspadas; i++) {
            enemigoEspada = new enemigoEspadas();
            enemigoEspada.vida = 30; // Mueren de un ataque
            matrizEnemigosEspadas.push(enemigoEspada);

            if (Math.random() < 0.5) {
                enemigoEspada.x = (0 - enemigoEspada.tamañoX) + (Math.random() * -200);
            } else {
                enemigoEspada.x = canvas.width + (Math.random() * 200);
            }
        }
    }

    function pintarEnemigosEspadas() {

        // Antes de pintar eliminamos del array los enemigos muertos

        if (matrizEnemigosEspadas.length > 0) {
            matrizEnemigosEspadas = matrizEnemigosEspadas.filter(quitarEnemigosMuertos);
        } else {
            numeroEnemigosEspadas = numeroEnemigosEspadas * 2;
            crearEnemigosEspadas();
        }

        matrizEnemigosEspadas.forEach(element => {
            element.pintar();
        });
    }

    /*
    ======================================================
    || Animaciones enemigoEspadas
    =======================================================
    */

    enemigoEspadas.prototype.animacionCorrerDerecha = function () {
        this.totalAnimacion = 6;
        this.posicionTamaño = 0 + (this.posicionTamaño + 1) % this.totalAnimacion;
        this.posicionAnimacion = 0 + (this.posicionAnimacion + 1) % this.totalAnimacion;
        this.recalcularTamaño();
    }

    enemigoEspadas.prototype.animacionCorrerIzquierda = function () {
        this.totalAnimacion = 6;
        this.posicionTamaño = 0 + (this.posicionTamaño + 1) % this.totalAnimacion;
        this.posicionAnimacion = 6 + (this.posicionAnimacion + 1) % this.totalAnimacion;
        this.recalcularTamaño();
    }

    enemigoEspadas.prototype.animacionAtaqueDerecha = function () {

        if (this.posicionTamaño < 6 || this.posicionTamaño > 25) {
            this.posicionTamaño = 6;
            this.posicionAnimacion = 12;
        }

        if (this.posicionAnimacion < 18) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {
            if (this.ataqueDerecha === true) {
                this.posicionTamaño = 6;
                this.posicionAnimacion = 12;
            }
        }
        this.recalcularTamaño();

    }

    enemigoEspadas.prototype.animacionAtaqueIzquierda = function () {

        if (this.posicionTamaño < 6 || this.posicionTamaño > 25) {
            this.posicionTamaño = 6;
            this.posicionAnimacion = 19;
        }

        if (this.posicionAnimacion < 25) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {
            if (this.ataqueIzquierda === true) {
                this.posicionTamaño = 6;
                this.posicionAnimacion = 19;
            }
        }
        this.recalcularTamaño();

    }

    enemigoEspadas.prototype.animacionMuerteDerecha = function () {

        if (this.posicionTamaño < 13 || this.posicionTamaño > 28) {
            this.posicionTamaño = 13;
            this.posicionAnimacion = 26;
        }

        if (this.posicionAnimacion < 41) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {

            // El personaje muere del todo para borrar del array cuando ha terminado su
            // animacion de morir

            this.muerto = true;
        }

        this.recalcularTamaño();
        this.recalcularY();
    }

    enemigoEspadas.prototype.animacionMuerteIzquierda = function () {
        if (this.posicionTamaño < 13 || this.posicionTamaño > 28) {
            this.posicionTamaño = 13;
            this.posicionAnimacion = 42;
        }

        if (this.posicionAnimacion < 56) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {

            // El personaje muere del todo para borrar del array cuando ha terminado su
            // animacion de morir

            this.muerto = true;
        }

        this.recalcularTamaño();
        this.recalcularY();
    }

    /*
    =======================================
    || Constructor Enemigo Verde
    ========================================
    */


    function orcoVerde() {

        // -- Animaciones --

        this.animacionEnemigo = [/* Corriendo Derecha */[873, 230], [970, 229], [1067, 228], [1163, 228], [1259, 228], [1354, 227], /* Corriendo Izquierda */[788, 230], [692, 229], [596, 228], [496, 228], [404, 228], [308, 227], /* Atacando derecha */[864, 323], [963, 320], [1078, 326], [1174, 326], [876, 420], [1065, 422], [1184, 422], /* Atacando Izquierda */[771, 323], [669, 320], [569, 326], [483, 326], [774, 420], [579, 422], [457, 422], /* Muerte Derecha */[895, 899], [895, 899], [895, 899], [895, 899], [991, 900], [991, 900], [991, 900], [991, 900], [1066, 903], [1066, 903], [1066, 903], [1066, 903], [1153, 940], [1153, 940], [1153, 940], [1153, 940], /* Muerte Izquierda */[775, 899], [775, 899], [775, 899], [775, 899], [681, 900], [681, 900], [681, 900], [681, 900], [588, 903], [588, 903], [588, 903], [588, 903], [487, 940], [487, 940], [487, 940], [487, 940]];

        this.tamañoAnimacion = [/* Corriendo */[42, 57], [41, 58], [40, 59], [44, 59], [40, 59], [41, 60], /* Atacando */[69, 60], [70, 63], [55, 57], [45, 57], [52, 59], [58, 57], [63, 57], /* Muriendo */[33, 60], [33, 60], [33, 60], [33, 60], [31, 59], [31, 59], [31, 59], [31, 59], [49, 56], [49, 56], [49, 56], [49, 56], [63, 19], [63, 19], [63, 19], [63, 19]];

        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];

        this.y = ySuelo - this.tamañoY; // Cada enemigo tendrá una coordenada Y distinta
    }

    imagenEnemigoVerde = new Image();
    imagenEnemigoVerde.src = "assets/sprites/enemigos/orcohacha.png";
    orcoVerde.prototype = new enemigo(); // Herencia
    orcoVerde.prototype.imagen = imagenEnemigoVerde;
    orcoVerde.prototype.recalcularTamaño = function () {
        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];
    }

    orcoVerde.prototype.recalcularY = function () {
        this.y = ySuelo - this.tamañoY;
    }

    orcoVerde.prototype.pintar = function () {
        this.mover();
        ctx.drawImage(
            this.imagen,
            this.animacionEnemigo[this.posicionAnimacion][0],
            this.animacionEnemigo[this.posicionAnimacion][1],
            this.tamañoX,
            this.tamañoY,
            this.x,
            this.y,
            this.tamañoX,
            this.tamañoY
        );
    }

    function crearEnemigosVerdes() {
        for (let i = 0; i < numeroEnemigosVerdes; i++) {
            enemigoVerde = new orcoVerde();
            enemigoVerde.vida = 60; // Mueren de dos ataques
            matrizEnemigosVerdes.push(enemigoVerde);

            if (Math.random() < 0.5) {
                enemigoVerde.x = (0 - enemigoVerde.tamañoX) + (Math.random() * -200);
            } else {
                enemigoVerde.x = canvas.width + (Math.random() * 200);
            }
        }
    }

    function pintarEnemigosVerdes() {

        // Antes de pintar eliminamos del array los enemigos muertos

        if (matrizEnemigosVerdes.length > 0) {
            matrizEnemigosVerdes = matrizEnemigosVerdes.filter(quitarEnemigosMuertos);
        } else {
            numeroEnemigosVerdes = numeroEnemigosVerdes * 2;
            crearEnemigosVerdes();
        }

        matrizEnemigosVerdes.forEach(element => {
            element.pintar();
        });
    }

    /*
    ======================================================
    || Animaciones enemigo verde
    =======================================================
    */

    orcoVerde.prototype.animacionCorrerDerecha = function () {
        this.totalAnimacion = 6;
        this.posicionTamaño = 0 + (this.posicionTamaño + 1) % this.totalAnimacion;
        this.posicionAnimacion = 0 + (this.posicionAnimacion + 1) % this.totalAnimacion;
        this.recalcularTamaño();
    }

    orcoVerde.prototype.animacionCorrerIzquierda = function () {
        this.totalAnimacion = 6;
        this.posicionTamaño = 0 + (this.posicionTamaño + 1) % this.totalAnimacion;
        this.posicionAnimacion = 6 + (this.posicionAnimacion + 1) % this.totalAnimacion;
        this.recalcularTamaño();
    }

    orcoVerde.prototype.animacionAtaqueDerecha = function () {

        if (this.posicionTamaño < 6 || this.posicionTamaño > 25) {
            this.posicionTamaño = 6;
            this.posicionAnimacion = 12;
        }

        if (this.posicionAnimacion < 18) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {
            if (this.ataqueDerecha === true) {
                this.posicionTamaño = 6;
                this.posicionAnimacion = 12;
            }
        }
        this.recalcularTamaño();

    }

    orcoVerde.prototype.animacionAtaqueIzquierda = function () {

        if (this.posicionTamaño < 6 || this.posicionTamaño > 25) {
            this.posicionTamaño = 6;
            this.posicionAnimacion = 19;
        }

        if (this.posicionAnimacion < 25) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {
            if (this.ataqueIzquierda === true) {
                this.posicionTamaño = 6;
                this.posicionAnimacion = 19;
            }
        }
        this.recalcularTamaño();

    }

    orcoVerde.prototype.animacionMuerteDerecha = function () {

        if (this.posicionTamaño < 13 || this.posicionTamaño > 28) {
            this.posicionTamaño = 13;
            this.posicionAnimacion = 26;
        }

        if (this.posicionAnimacion < 41) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {

            // El personaje muere del todo para borrar del array cuando ha terminado su
            // animacion de morir

            this.muerto = true;
        }

        this.recalcularTamaño();
        this.recalcularY();
    }

    orcoVerde.prototype.animacionMuerteIzquierda = function () {
        if (this.posicionTamaño < 13 || this.posicionTamaño > 28) {
            this.posicionTamaño = 13;
            this.posicionAnimacion = 42;
        }

        if (this.posicionAnimacion < 56) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {

            // El personaje muere del todo para borrar del array cuando ha terminado su
            // animacion de morir

            this.muerto = true;
        }

        this.recalcularTamaño();
        this.recalcularY();
    }

    /*
    =======================================
    || Eliminar todos los enemigos
    ========================================
    */

    function eliminarEnemigos() {

        // Borramos enemigos de todos los arrays de enemigos

        matrizEnemigosEspadas.splice(0, matrizEnemigosEspadas.length);
        matrizEnemigosVerdes.splice(0, matrizEnemigosVerdes.length);
        matrizShuriken.splice(0, matrizShuriken.length);

    }

    /*
    =======================================
    || Shuriken
    ========================================
    */

    imagenShuriken = new Image();
    imagenShuriken.src = "assets/sprites/enemigos/shuriken.png";

    function shuriken() {
        this.activo = true;
        this.y = 120;
        this.x = 0;
        this.velocidad = 3;
        this.imagen = imagenShuriken;
        this.posicionAnimacion = 0;
        this.posicionTamaño = 0;
        this.animacion = [[0, 0], [1568, 130]];
        this.tamaño = [[1394, 1394], [1074, 1074]];
        this.derecha = false;
    }

    function crearShurikens() {
        for (let i = 0; i < numeroShurikens; i++) {
            shurikenUnidad = new shuriken();
            shurikenUnidad.x = Math.random() * canvas.width;

            //Determinamos si irá a izquierda o a derecha
            Math.random() < 0.5 ? shurikenUnidad.derecha = true : shurikenUnidad;

            matrizShuriken.push(shurikenUnidad);
        }
    }

    shuriken.prototype.pintar = function () {

        ninjaIzquierda = ninja.x;
        ninjaDerecha = ninja.x + ninja.tamañoX;
        ninjaArriba = ninja.y;
        ninjaAbajo = ninja.y + ninja.tamañoY;
        shurikenIzquierda = this.x;
        shurikenDerecha = this.x + 30;
        shurikenArriba = this.y;
        shurikenAbajo = this.y + 30;

        // Comprobamos colisiones

        if (ninjaIzquierda <= shurikenDerecha && ninjaDerecha >= shurikenIzquierda && ninjaArriba <= shurikenAbajo && ninjaAbajo >= shurikenArriba) {
            ninja.vida -= 10;
            ninja.comprobarVida(); // Comprobar si muere
            mostrarVida();
        }

        if (this.y >= ySuelo) {
            this.activo = false;
        } else {
            this.y += this.velocidad;
            if (this.derecha) {
                this.x < canvas.width ? this.x += this.velocidad : this.activo = false;
            } else {
                this.x > 0 ? this.x -= this.velocidad : this.activo = false;
            }
        }

        ctx.drawImage(
            this.imagen,
            this.animacion[this.posicionAnimacion][0],
            this.animacion[this.posicionAnimacion][1],
            this.tamaño[this.posicionTamaño][0],
            this.tamaño[this.posicionTamaño][1],
            this.x,
            this.y,
            30,
            30
        );
    }

    function pintarShurikens() {

        // Antes de pintar eliminamos del array los shuriken caidos

        if (matrizShuriken.length > 0) {
            matrizShuriken = matrizShuriken.filter(quitarShurikenCaidos);
        } else {
            numeroShurikens = Math.floor(Math.random() * 5);
            crearShurikens();
        }

        matrizShuriken.forEach(element => {
            element.pintar();
        });
    }

    shuriken.prototype.girar = function () {
        if (this.posicionAnimacion === 0) {
            this.posicionAnimacion++;
            this.posicionTamaño = 1;
        } else {
            this.posicionAnimacion--;
            this.posicionTamaño = 0;
        }
    }

    /*
    =======================================
    || Control de animaciones
    ========================================
    */

    function animacion() {

        if (!ninja.estaticoIzquierda && !ninja.izquierdaAnimacion && !ninja.estaticoDerecha && !ninja.derechaAnimacion && !ninja.saltoDerecha && !ninja.saltoIzquierda && !ninja.ataqueDerecha && !ninja.ataqueIzquierda) {
            ninja.estaticoDerecha = true;   // Por defecto que mire a la derecha
        }

        if (ninja.derecha && ninja.izquierda) {

            // Si el jugador se mueve a ambas direcciones a la vez el personaje se quedará quieto con la animación estática a la derecha
            ninja.derechaAnimacion = false;
            ninja.izquierdaAnimacion = false;
            ninja.estaticoDerecha = true;
        }

        // Ejecutamos la animación que corresponda
        if (ninja.heridoDerecha) {
            animacionHeridaDerecha();
        } else if (ninja.heridoIzquierda) {
            animacionHeridaIzquierda();
        } else if (ninja.saltoDerecha) {
            animacionSaltoDerecha();
        } else if (ninja.saltoIzquierda) {
            animacionSaltoIzquierda();
        } else if (ninja.ataqueDerecha) {
            animacionAtaqueDerecha();
        } else if (ninja.ataqueIzquierda) {
            animacionAtaqueIzquierda();
        } else if (ninja.estaticoIzquierda) {
            animacionMirandoIzquierda();
        } else if (ninja.izquierdaAnimacion) {
            animacionCorrerIzquierda();
        } else if (ninja.estaticoDerecha) {
            animacionMirandoDerecha();
        } else if (ninja.derechaAnimacion) {
            animacionCorrerDerecha();
        }

        // Control de animaciones de enemigos

        if (matrizEnemigosEspadas.length > 0) {
            matrizEnemigosEspadas.forEach(element => {
                if (element.muerteDerecha) {
                    element.animacionMuerteDerecha();
                } else if (element.muerteIzquierda) {
                    element.animacionMuerteIzquierda();
                } else if (element.ataqueDerecha) {
                    element.animacionAtaqueDerecha();
                } else if (element.ataqueIzquierda) {
                    element.animacionAtaqueIzquierda();
                } else if (element.derechaAnimacion) {
                    element.animacionCorrerDerecha();
                } else if (element.izquierdaAnimacion) {
                    element.animacionCorrerIzquierda();
                }
            });
        }

        if (matrizEnemigosVerdes.length > 0) {
            matrizEnemigosVerdes.forEach(element => {
                if (element.muerteDerecha) {
                    element.animacionMuerteDerecha();
                } else if (element.muerteIzquierda) {
                    element.animacionMuerteIzquierda();
                } else if (element.ataqueDerecha) {
                    element.animacionAtaqueDerecha();
                } else if (element.ataqueIzquierda) {
                    element.animacionAtaqueIzquierda();
                } else if (element.derechaAnimacion) {
                    element.animacionCorrerDerecha();
                } else if (element.izquierdaAnimacion) {
                    element.animacionCorrerIzquierda();
                }
            });
        }

        if (matrizShuriken.length > 0) {
            matrizShuriken.forEach(element => {
                if (element.activo) {
                    element.girar();
                }
            });
        }

        // Control de animaciones de portales

        if (portalVerde.abriendo) {
            portalVerde.abrir();
        } else if (portalVerde.estable) {
            portalVerde.estabilizar();
        } else if (portalVerde.cerrando) {
            portalVerde.cerrar();
        }

        if (portalMorado.abriendo) {
            portalMorado.abrir();
        } else if (portalMorado.estable) {
            portalMorado.estabilizar();
        } else if (portalMorado.cerrando) {
            portalMorado.cerrar();
        }
    }

    /*
    =======================================
    || Gestion del juego
    ========================================
    */

    // Niveles de dificultad

    function inicioDelJuego() {
        limpiarLienzoMenosDatos();

        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Metemos texto
        ctx.fillStyle = "white";
        ctx.font = "40px Cinzel";
        ctx.fillText("Elige tu propio infierno.", 350, 150);
        ctx.font = "25px Cinzel";
        ctx.fillText("La calma que precede a la tormenta", 50, 300);
        ctx.fillText("La guerra contra tu destino", 700, 300);

        pintarNinja();
        portalVerde.pintar();
        portalMorado.pintar();
    }

    function iniciarPartida() {
        clearInterval(idInicio);
        limpiarLienzo();
        mostrarIconoVida(); // Se inicia solo una vez
        mostrarVida();
        mostrarIconoCalavera(); // Se inicia solo una vez
        contadorEnemigosAsesinados = 0;
        mostrarContadorEnemigosAsesinados();
        audioFondo.play();
        id1 = setInterval(iniciar, 1000 / 60);
    }

    function portal() {
        this.tamañoX;
        this.tamañoY;
        this.x;
        this.y = 500;
        this.imagen;

        this.abriendo = true;
        this.cerrando = false;
        this.estable = false;

        this.posicionAnimacion = 0;
        this.animacionPortal = [/* Abriendo */[19, 94], [81, 94], [145, 92], [214, 89], [281, 81], [345, 78], [409, 81], [473, 79], /* Estable */[345, 78], [409, 81], [473, 79], /* Cerrando */[473, 79], [409, 81], [345, 78], [281, 81], [214, 89], [145, 92], [81, 94], [19, 94]];

        this.posicionTamaño = 0;
        this.tamañoAnimacion = [/* Abriendo */[22, 2], [26, 4], [27, 9], [16, 18], [14, 33], [14, 42], [14, 39], [14, 40], /* Estable */[14, 42], [14, 39], [14, 40], /* Cerrando */[14, 40], [14, 39], [14, 42], [14, 33], [16, 18], [27, 9], [26, 4], [22, 2]];

        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];
        this.imagen;
    }

    portal.prototype.recalcularTamaño = function () {
        this.tamañoX = this.tamañoAnimacion[this.posicionTamaño][0];
        this.tamañoY = this.tamañoAnimacion[this.posicionTamaño][1];
    }

    portal.prototype.recalcularY = function () {
        this.y = ySuelo - this.tamañoY * 3;
    }

    portal.prototype.pintar = function () {
        ninjaIzquierda = ninja.x;
        ninjaDerecha = ninja.x + ninja.tamañoX;
        portalIzquierda = this.x;
        portalDerecha = this.x + this.tamañoX;

        if (ninjaIzquierda <= portalDerecha && ninjaDerecha >= portalIzquierda) {
            this.estable = false;
            this.cerrando = true;

            if (ninja.x < 600) {
                dificultad = 1;
                numeroEnemigosEspadas = 1;
                crearEnemigosEspadas();
                iniciarPartida();
            } else {
                dificultad = 2;
                numeroEnemigosEspadas = 1;
                numeroEnemigosVerdes = 1;
                numeroShurikens = 1;
                crearEnemigosEspadas();
                crearEnemigosVerdes();
                crearShurikens();
                iniciarPartida();
            }
        }


        ctx.drawImage(
            this.imagen,
            this.animacionPortal[this.posicionAnimacion][0],
            this.animacionPortal[this.posicionAnimacion][1],
            this.tamañoX,
            this.tamañoY,
            this.x,
            this.y,
            this.tamañoX * 5,
            this.tamañoY * 3
        );
    }

    portal.prototype.abrir = function () {
        if (this.posicionTamaño > 7) {
            this.posicionTamaño = 0;
            this.posicionAnimacion = 0;
        }

        if (this.posicionAnimacion < 7) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {
            this.abriendo = false;
            this.estable = true;
        }

        this.recalcularTamaño();
        this.recalcularY();
    }

    portal.prototype.estabilizar = function () {
        if (this.posicionTamaño > 10 || this.posicionTamaño < 8) {
            this.posicionTamaño = 8;
            this.posicionAnimacion = 8;
        }

        if (this.posicionAnimacion < 10) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {
            this.posicionTamaño = 8;
            this.posicionAnimacion = 8;
        }

        this.recalcularTamaño();
        this.recalcularY();
    }

    portal.prototype.cerrar = function () {
        if (this.posicionTamaño > 18 || this.posicionTamaño < 11) {
            this.posicionTamaño = 11;
            this.posicionAnimacion = 11;
        }

        if (this.posicionAnimacion < 18) {
            this.posicionTamaño++;
            this.posicionAnimacion++;
        } else {
            this.posicionTamaño = 11;
            this.posicionAnimacion = 11;
        }

        this.recalcularTamaño();
        this.recalcularY();
    }

    // Final de la partida

    function finDelJuego() {

        // Empezamos con el final de la partida

        eliminarEnemigos(); // Limpiamos enemigos para la siguiente partida
        clearInterval(id1); // Limpiamos intervalo del juego
        console.log("Fin intervalo 1");
        clearInterval(id2); // Limpiamos intervalo de las animaciones
        console.log("Fin intervalo 2");
        valorRectanguloFinal = 0;
        id3 = setInterval(animacionFinJuego, 400); // Creamos un nuevo intervalo destinado a la animcion final del juego
    }

    function animacionFinJuego() {
        limpiarLienzo();

        // Cremamos el efecto cortina
        ctx.fillStyle = "black";
        ctx.fillRect(0, 0, canvas.width, valorRectanguloFinal);
        ctx.fillRect(0, canvas.height, canvas.width, -valorRectanguloFinal);
        valorRectanguloFinal += 80;

        // Metemos texto
        ctx.fillStyle = "white";
        ctx.font = "40px Cinzel";
        ctx.fillText("NADIE DIJO QUE SERÍA FÁCIL", 300, 250);

        // Animamos al personaje muriendo
        if (ninja.muerteDerecha) {
            animacionMuerteDerecha();
        } else {
            animacionMuerteIzquierda();
        }
        pintarNinja();
    }

    // GESTION DE LOS RECORDS

    function crearTablaActualizada() {
        let tituloRecords = document.createElement("h3");
        tituloRecords.appendChild(document.createTextNode("Tabla de Récords"));
        document.body.appendChild(tituloRecords);
        let tabla = document.createElement("table");
        document.body.appendChild(tabla);
        records.forEach(element => {
            let fila = document.createElement("tr");
            let columnaNombre = document.createElement("td");
            let textoColumnaNombre = document.createTextNode(element[0]);
            let columnaRecord = document.createElement("td");
            let textoColumnaRecord = document.createTextNode(element[1]);
            tabla.appendChild(fila);
            fila.appendChild(columnaNombre);
            columnaNombre.appendChild(textoColumnaNombre);
            fila.appendChild(columnaRecord);
            columnaRecord.appendChild(textoColumnaRecord);
        });
    }

    function gestionarRecords() {


        function ordenarRecords(r1, r2) {
            return r2[1] - r1[1];
        }

        function limitar10records() {
            records = records.slice(0, 10);
        }

        records.splice(0, records.length);
        let recordsRecuperados = localStorage.getItem('records');
        if (recordsRecuperados != null) {
            recordsRecuperados = recordsRecuperados.split(",");
            for (let i = 0; i < recordsRecuperados.length; i += 2) {
                let nuevoRecord = [recordsRecuperados[i], recordsRecuperados[i + 1]];
                records.push(nuevoRecord);
            }
        }

        usuario = [textoNombre.value, contadorEnemigosAsesinados];
        records.push(usuario);

        records = records.sort(ordenarRecords);
        limitar10records();

        localStorage.setItem('records', records);

        let listaTablas = document.getElementsByTagName("table");

        if (listaTablas.length === 0) {
            crearTablaActualizada();
        } else {
            document.body.removeChild(listaTablas[0]);
            document.body.removeChild(document.body.lastChild);
            crearTablaActualizada();
        }

    }


    /* 
    ============================================================
    ||   CODIGO DE "UN SOLO USO"
    ============================================================
    */

    function activarBoton() {
        botonEmpezar.disabled = false;
        botonEmpezar.style.textDecoration = "none";
    }

    function desactivarBoton() {
        botonEmpezar.disabled = true;
        botonEmpezar.style.textDecoration = "line-through";
    }

    function activarNombre() {
        textoNombre.disabled = false;
        textoNombre.style.textDecoration = "none";
    }

    function desactivarNombre() {
        textoNombre.disabled = true;
        textoNombre.style.textDecoration = "line-through";
    }

    function iniciar() {
        limpiarLienzoMenosDatos();
        pintarEnemigosEspadas();

        dificultad === 2 ? pintarEnemigosVerdes() : dificultad;
        dificultad === 2 ? pintarShurikens() : dificultad;

        pintarNinja();
    }

    canvas = document.getElementById("miCanvas");
    ctx = canvas.getContext('2d');
    botonEmpezar = document.getElementById("empezar");
    textoNombre = document.getElementById("textarea");

    desactivarBoton();

    function comprobarNombre() {
        if (textoNombre.value != " Introduce tu nombre aquí " && textoNombre.value != "") {
            activarBoton();
        } else {
            desactivarBoton();
        }
    }

    textoNombre.oninput = comprobarNombre;

    botonEmpezar.onclick = function () {
        desactivarBoton();
        desactivarNombre();
        ninja = new samurai(x, y);
        limpiarLienzo();

        portalVerde = new portal();
        portalVerde.x = 250;
        portalVerde.imagen = imagenPortalVerde;
        portalMorado = new portal();
        portalMorado.x = 900;
        portalMorado.imagen = imagenPortalMorado;

        idInicio = setInterval(inicioDelJuego, 1000 / 60);
        id2 = setInterval(animacion, 1000 / 10);
    }

    imagenPortalVerde = new Image();
    imagenPortalVerde.src = "assets/sprites/portales/verde.png"

    imagenPortalMorado = new Image();
    imagenPortalMorado.src = "assets/sprites/portales/morado.png"

    imagenSamurai = new Image();
    imagenSamurai.src = "assets/sprites/samurai/samuraiDefinitivo.png";
    samurai.prototype.imagen = imagenSamurai;

    iconoVida = new Image();
    iconoVida.src = "assets/images/sangre.png";

    iconoVidaIzq = new Image();
    iconoVidaIzq.src = "assets/images/barraVidaIzquierda.png";

    iconoVidaDer = new Image();
    iconoVidaDer.src = "assets/images/barraVidaDerecha.png";

    iconoCalavera = new Image();
    iconoCalavera.src = "assets/images/iconoBajas.png";

    document.addEventListener("keydown", activaMovimiento, false);
    document.addEventListener("keyup", paraMovimiento, false);
    audioFondo.addEventListener("ended", function () {
        audioFondo.currentTime = 0;
        audioFondo.play();
    });
}