/* =====================================================
   FONDO DE ESTRELLAS
===================================================== */

const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");

let estrellas = [];


function ajustarCanvas() {

    canvas.width =
        window.innerWidth;

    canvas.height =
        window.innerHeight;

}


ajustarCanvas();



function crearEstrellas() {

    estrellas = [];

    const cantidad =
        Math.floor(
            (
                window.innerWidth *
                window.innerHeight
            ) / 7000
        );


    for (
        let i = 0;
        i < cantidad;
        i++
    ) {

        estrellas.push({

            x:
                Math.random() *
                canvas.width,

            y:
                Math.random() *
                canvas.height,

            radio:
                Math.random() * 1.5 + 0.3,

            velocidad:
                Math.random() * 0.35 + 0.05,

            brillo:
                Math.random() *
                Math.PI *
                2

        });

    }

}


crearEstrellas();



function animarFondo() {

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    for (
        const estrella
        of estrellas
    ) {

        estrella.brillo += 0.02;


        const opacidad =
            0.25 +
            Math.sin(
                estrella.brillo
            ) * 0.35;


        ctx.beginPath();


        ctx.arc(

            estrella.x,

            estrella.y,

            estrella.radio,

            0,

            Math.PI * 2

        );


        ctx.fillStyle =
            `rgba(
                255,
                255,
                255,
                ${opacidad}
            )`;


        ctx.fill();


        estrella.y +=
            estrella.velocidad;


        if (
            estrella.y >
            canvas.height
        ) {

            estrella.y = 0;

            estrella.x =
                Math.random() *
                canvas.width;

        }

    }


    requestAnimationFrame(
        animarFondo
    );

}


animarFondo();



/* =====================================================
   SISTEMA DE PARTÍCULAS CENTRAL
===================================================== */

const beamCanvas =
    document.getElementById(
        "beamCanvas"
    );

const beamCtx =
    beamCanvas.getContext("2d");


let particulas = [];

let particulasOrbita = [];

let anchoEscena = 0;

let altoEscena = 0;



/* =====================================================
   AJUSTAR CANVAS CENTRAL
===================================================== */

function ajustarBeam() {

    const rect =
        beamCanvas.getBoundingClientRect();


    beamCanvas.width =
        rect.width;

    beamCanvas.height =
        rect.height;


    anchoEscena =
        beamCanvas.width;

    altoEscena =
        beamCanvas.height;

}



/* =====================================================
   CREAR PARTÍCULAS QUE SUBEN
===================================================== */

function crearParticulasVerticales() {

    particulas = [];


    for (
        let i = 0;
        i < 90;
        i++
    ) {

        particulas.push({

            x:
                anchoEscena / 2 +
                (
                    Math.random() - 0.5
                ) * 65,

            y:
                altoEscena * 0.72 +
                Math.random() * 50,

            velocidad:
                Math.random() * 1.3 +
                0.5,

            tamaño:
                Math.random() * 2.5 +
                0.8,

            brillo:
                Math.random() *
                Math.PI * 2,

            curva:
                Math.random() *
                Math.PI * 2

        });

    }

}



/* =====================================================
   CREAR PARTÍCULAS DE ÓRBITA
===================================================== */

function crearParticulasOrbita() {

    particulasOrbita = [];


    const orbitas = [

        75,

        105,

        140,

        175

    ];


    orbitas.forEach(
        (
            radio,
            indice
        ) => {


            for (
                let i = 0;
                i < 14;
                i++
            ) {

                particulasOrbita.push({

                    radio:

                        radio,

                    angulo:

                        Math.random() *
                        Math.PI *
                        2,

                    velocidad:

                        (
                            0.002 +
                            Math.random() *
                            0.004
                        ) *
                        (
                            indice % 2 === 0
                                ? 1
                                : -1
                        ),

                    tamaño:

                        Math.random() *
                        2.5 + 1,

                    brillo:

                        Math.random() *
                        Math.PI * 2,

                    inclinacion:

                        0.65 +
                        Math.random() *
                        0.25

                });

            }

        }
    );

}



/* =====================================================
   ANIMAR PARTÍCULAS
===================================================== */

function animarBeam() {

    beamCtx.clearRect(

        0,

        0,

        beamCanvas.width,

        beamCanvas.height

    );


    const centroX =
        anchoEscena / 2;


    const centroY =
        altoEscena * 0.55;



    /* ================================================
       PARTÍCULAS ASCENDENTES
    ================================================= */

    for (
        const p
        of particulas
    ) {

        p.y -=
            p.velocidad;


        p.brillo +=
            0.08;


        p.curva +=
            0.025;


        p.x +=
            Math.sin(
                p.curva +
                p.y * 0.025
            ) * 0.45;


        if (
            p.y <
            altoEscena * 0.05
        ) {

            p.y =
                altoEscena * 0.72 +
                Math.random() * 45;


            p.x =
                centroX +
                (
                    Math.random() - 0.5
                ) * 65;

        }


        const brillo =
            0.35 +
            Math.sin(
                p.brillo
            ) * 0.4;


        beamCtx.beginPath();


        beamCtx.arc(

            p.x,

            p.y,

            p.tamaño,

            0,

            Math.PI * 2

        );


        beamCtx.fillStyle =
            `rgba(
                255,
                220,
                30,
                ${brillo}
            )`;


        beamCtx.shadowBlur = 12;

        beamCtx.shadowColor =
            "#ffd000";


        beamCtx.fill();


        beamCtx.shadowBlur = 0;

    }



    /* ================================================
       PARTÍCULAS EN ÓRBITA
    ================================================= */

    for (
        const p
        of particulasOrbita
    ) {

        p.angulo +=
            p.velocidad;


        p.brillo +=
            0.05;


        const x =
            centroX +
            Math.cos(
                p.angulo
            ) *
            p.radio;


        const y =
            centroY +
            Math.sin(
                p.angulo
            ) *
            p.radio *
            p.inclinacion;


        const brillo =
            0.45 +
            Math.sin(
                p.brillo
            ) * 0.45;


        beamCtx.beginPath();


        beamCtx.arc(

            x,

            y,

            p.tamaño,

            0,

            Math.PI * 2

        );


        beamCtx.fillStyle =
            `rgba(
                255,
                225,
                50,
                ${brillo}
            )`;


        beamCtx.shadowBlur = 14;

        beamCtx.shadowColor =
            "#ffd000";


        beamCtx.fill();


        beamCtx.shadowBlur = 0;


        /* PEQUEÑO RASTRO */

        beamCtx.beginPath();


        beamCtx.moveTo(
            x,
            y
        );


        beamCtx.lineTo(

            x -
            Math.cos(
                p.angulo
            ) * 7,

            y -
            Math.sin(
                p.angulo
            ) * 5

        );


        beamCtx.strokeStyle =
            `rgba(
                255,
                210,
                30,
                ${brillo * 0.4}
            )`;


        beamCtx.lineWidth = 1;


        beamCtx.stroke();

    }


    requestAnimationFrame(
        animarBeam
    );

}


/* INICIAR */

ajustarBeam();

crearParticulasVerticales();

crearParticulasOrbita();

animarBeam();



/* =====================================================
   PÉTALOS
===================================================== */

const petalos =
    document.getElementById(
        "petalos"
    );


function crearPetalo() {

    if (!petalos) return;


    const petalo =
        document.createElement(
            "div"
        );


    petalo.className =
        "petalo";


    const tamaño =
        Math.random() * 8 + 7;


    petalo.style.left =
        Math.random() * 100 + "%";


    petalo.style.width =
        tamaño + "px";


    petalo.style.height =
        tamaño * 1.4 + "px";


    const duracion =
        Math.random() * 6 + 6;


    petalo.style.animationDuration =
        duracion + "s";


    petalo.style.animationDelay =
        Math.random() * 3 + "s";


    petalos.appendChild(
        petalo
    );


    setTimeout(
        () => {

            petalo.remove();

        },

        (duracion + 5) * 1000

    );

}


/* CREAR PÉTALOS INICIALES */

for (
    let i = 0;
    i < 30;
    i++
) {

    setTimeout(
        crearPetalo,
        i * 200
    );

}


/* CREAR CONTINUAMENTE */

setInterval(
    crearPetalo,
    650
);



/* =====================================================
   ELEMENTOS DE LA SEGUNDA ESCENA
===================================================== */

const boton =
    document.getElementById(
        "boton"
    );


const segundaEscena =
    document.getElementById(
        "segundaEscena"
    );


const volver =
    document.getElementById(
        "volver"
    );


const textoEscritura =
    document.getElementById(
        "textoEscritura"
    );


const cursor =
    document.getElementById(
        "cursor"
    );


const separador =
    document.getElementById(
        "separador"
    );


const fraseFinal =
    document.getElementById(
        "fraseFinal"
    );



/* =====================================================
   TEXTO DE LA DEDICATORIA
===================================================== */

const textoDedicatoria =
`Que nunca te falten motivos para sonreír,
personas que te quieran y momentos
que hagan florecer tu corazón.`;



/* =====================================================
   EFECTO DE ESCRITURA
===================================================== */

let escrituraIniciada =
    false;


function escribirTexto() {

    if (
        escrituraIniciada
    ) return;


    escrituraIniciada =
        true;


    textoEscritura.textContent =
        "";


    let posicion = 0;


    function escribirLetra() {

        if (
            posicion <
            textoDedicatoria.length
        ) {

            textoEscritura.textContent +=
                textoDedicatoria[
                    posicion
                ];


            posicion++;


            /* VELOCIDAD */

            setTimeout(
                escribirLetra,
                45
            );

        }

        else {

            /* TERMINÓ DE ESCRIBIR */

            setTimeout(
                () => {

                    cursor.style.display =
                        "none";


                    separador.classList.add(
                        "visible"
                    );


                },
                500
            );


            setTimeout(
                () => {

                    fraseFinal.classList.add(
                        "visible"
                    );

                },
                1000
            );


            setTimeout(
                () => {

                    volver.classList.add(
                        "visible"
                    );

                },
                1500
            );

        }

    }


    escribirLetra();

}



/* =====================================================
   BOTÓN CONTINUAR
===================================================== */

if (
    boton &&
    segundaEscena
) {

    boton.addEventListener(
        "click",
        () => {


            segundaEscena.classList.add(
                "activa"
            );


            /* INICIAR ESCRITURA */

            setTimeout(
                escribirTexto,
                1600
            );


        }
    );

}



/* =====================================================
   BOTÓN VOLVER
===================================================== */

if (
    volver &&
    segundaEscena
) {

    volver.addEventListener(
        "click",
        () => {


            segundaEscena.classList.remove(
                "activa"
            );


            /* REINICIAR TEXTO */

            escrituraIniciada =
                false;


            textoEscritura.textContent =
                "";


            cursor.style.display =
                "inline-block";


            separador.classList.remove(
                "visible"
            );


            fraseFinal.classList.remove(
                "visible"
            );


            volver.classList.remove(
                "visible"
            );

        }
    );

}



/* =====================================================
   CAMBIAR TAMAÑO
===================================================== */

window.addEventListener(
    "resize",
    () => {

        ajustarCanvas();

        crearEstrellas();

        ajustarBeam();

        crearParticulasVerticales();

        crearParticulasOrbita();

    }
);

/* =====================================================
   MÚSICA DE FONDO
===================================================== */

const musica =
    document.getElementById("musica");

const botonSonido =
    document.getElementById("botonSonido");


let musicaActiva = false;


/* =====================================================
   BOTÓN DE SONIDO
===================================================== */

if (
    musica &&
    botonSonido
) {

    botonSonido.addEventListener(
        "click",
        () => {

            if (!musicaActiva) {

                musica.volume = 0.45;

                musica.play()
                    .then(() => {

                        musicaActiva = true;

                        botonSonido.textContent =
                            "🔊";

                        botonSonido.classList.add(
                            "musica-activa"
                        );

                        botonSonido.title =
                            "Silenciar música";

                    })
                    .catch((error) => {

                        console.log(
                            "No se pudo reproducir la música:",
                            error
                        );

                    });

            }

            else {

                musica.pause();

                musicaActiva = false;

                botonSonido.textContent =
                    "🔇";

                botonSonido.classList.remove(
                    "musica-activa"
                );

                botonSonido.title =
                    "Activar música";

            }

        }
    );

}