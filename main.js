window.onload = function () {
    let canvas;
    let ctx;
    let imagenSamurai;
    let x = 450;
    let y = 470;

    function samurai(x_, y_) {
        this.x = x_;
        this.y = y_;
        this.tamañoX = 58;
        this.tamañoY = 70;
        this.velocidad = 2;
        this.izquierda = false;
        this.derecha = false;
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
            ninja.x -= ninja.velocidad
        }

        ctx.drawImage(
            ninja.imagen,
            1150,
            11,
            58, //tamañoxfoto
            70, //tamañoyfoto
            ninja.x,
            ninja.y,
            ninja.tamañoX,
            ninja.tamañoY
        );

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
}