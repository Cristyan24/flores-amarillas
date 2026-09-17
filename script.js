/* =========================================================
   ESTRELLAS
   ========================================================= */

const canvas =
    document.getElementById("stars");

const ctx =
    canvas.getContext("2d");

let W;
let H;

let particles = [];


function resize() {

    W =
        canvas.width =
        window.innerWidth;

    H =
        canvas.height =
        window.innerHeight;

    makeStars();
}


function makeStars() {

    particles =
        Array.from(
            { length: 180 },

            () => ({

                x:
                    Math.random() * W,

                y:
                    Math.random() * H,

                r:
                    Math.random() * 1.8 + .2,

                a:
                    Math.random(),

                s:
                    Math.random() * .012 + .003
            })
        );
}


function draw() {

    ctx.clearRect(
        0,
        0,
        W,
        H
    );


    const g =
        ctx.createRadialGradient(

            W / 2,
            H * .5,
            0,

            W / 2,
            H * .5,

            Math.max(W, H) * .55
        );


    g.addColorStop(
        0,
        "rgba(218,190,0,.22)"
    );

    g.addColorStop(
        .35,
        "rgba(80,70,0,.10)"
    );

    g.addColorStop(
        1,
        "rgba(0,0,0,0)"
    );


    ctx.fillStyle = g;


    ctx.fillRect(
        0,
        0,
        W,
        H
    );


    particles.forEach(
        p => {

            p.a += p.s;


            if (
                p.a > 1 ||
                p.a < .1
            ) {

                p.s *= -1;
            }


            ctx.beginPath();


            ctx.fillStyle =
                `rgba(255,235,72,${p.a})`;


            ctx.shadowBlur = 9;

            ctx.shadowColor =
                "#ffe600";


            ctx.arc(
                p.x,
                p.y,
                p.r,
                0,
                Math.PI * 2
            );


            ctx.fill();
        }
    );


    requestAnimationFrame(draw);
}


resize();


window.addEventListener(
    "resize",
    resize
);


draw();



/* =========================================================
   CORAZÓN DE PARTÍCULAS
   ========================================================= */

const heart =
    document.getElementById("heart");


for (
    let i = 0;
    i < 170;
    i++
) {

    const t =
        Math.random()
        * Math.PI
        * 2;


    const x =
        16
        * Math.pow(
            Math.sin(t),
            3
        );


    const y =
        13 * Math.cos(t)
        - 5 * Math.cos(2 * t)
        - 2 * Math.cos(3 * t)
        - Math.cos(4 * t);


    const s =
        document.createElement("i");


    s.className =
        "spark";


    s.style.left =
        (
            85
            + x * 4.6
            + (Math.random() - .5) * 7
        )
        + "px";


    s.style.top =
        (
            72
            - y * 4.2
            + (Math.random() - .5) * 7
        )
        + "px";


    s.style.animationDelay =
        (
            Math.random() * 1.5
        )
        + "s";


    heart.appendChild(s);
}



/* =========================================================
   LLUVIA
   ========================================================= */

function rain(n = 35) {

    for (
        let i = 0;
        i < n;
        i++
    ) {

        const e =
            document.createElement(
                "span"
            );


        e.className =
            "falling";


        e.textContent =
            Math.random() > .5
                ? "🌻"
                : "✨";


        e.style.left =
            Math.random()
            * 100
            + "vw";


        e.style.fontSize =
            (
                9
                + Math.random() * 18
            )
            + "px";


        e.style.animationDuration =
            (
                4
                + Math.random() * 5
            )
            + "s";


        e.style.animationDelay =
            Math.random()
            + "s";


        e.style.setProperty(

            "--drift",

            (
                -90
                + Math.random() * 180
            )
            + "px"
        );


        document.body.appendChild(e);


        setTimeout(
            () => e.remove(),
            10000
        );
    }
}



/* =========================================================
   CARTA
   ========================================================= */

const modal =
    document.getElementById("modal");


const surprise =
    document.getElementById("surprise");


const close =
    document.getElementById("close");


surprise.addEventListener(
    "click",
    () => {

        modal.classList.add(
            "show"
        );

        rain(55);
    }
);


close.addEventListener(
    "click",
    () => {

        modal.classList.remove(
            "show"
        );
    }
);


modal.addEventListener(
    "click",
    e => {

        if (
            e.target === modal
        ) {

            modal.classList.remove(
                "show"
            );
        }
    }
);


document.addEventListener(
    "keydown",
    e => {

        if (
            e.key === "Escape"
        ) {

            modal.classList.remove(
                "show"
            );
        }
    }
);



/* =========================================================
   LLUVIA AUTOMÁTICA
   ========================================================= */

setInterval(
    () => rain(4),
    5000
);


rain(15);



/* =========================================================
   ELEMENTOS INTERACTIVOS
   ========================================================= */

const scene =
    document.querySelector(
        ".scene"
    );


const world =
    document.getElementById(
        "world"
    );


const items =
    Array.from(
        document.querySelectorAll(
            ".item"
        )
    );



/* =========================================================
   CONFIGURACIÓN DE LAS FLORES

   Cada flor tiene:

   angle:
   posición inicial en la órbita.

   height:
   posición vertical.

   radius:
   qué tan lejos está del centro.
   ========================================================= */

const flowerData = [

    {
        angle: 210,
        height: -120,
        radius: 1.00
    },

    {
        angle: 250,
        height: -10,
        radius: .93
    },

    {
        angle: 290,
        height: 115,
        radius: .90
    },

    {
        angle: 30,
        height: -100,
        radius: 1.00
    },

    {
        angle: 70,
        height: 0,
        radius: .95
    },

    {
        angle: 110,
        height: 120,
        radius: .90
    },

    {
        angle: 160,
        height: 185,
        radius: .72
    },

    {
        angle: 340,
        height: -190,
        radius: .72
    }

];



/* =========================================================
   GIRO
   ========================================================= */

let rotation = 0;

let targetRotation = 0;


let verticalMove = 0;

let targetVerticalMove = 0;


let dragging = false;


let lastX = 0;

let lastY = 0;


const sensitivity =
    .42;


const verticalSensitivity =
    .10;



/* =========================================================
   LIMITAR
   ========================================================= */

function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(
            value,
            min
        ),
        max
    );
}



/* =========================================================
   INICIAR ARRASTRE
   ========================================================= */

function startDrag(
    x,
    y
) {

    dragging = true;


    lastX = x;

    lastY = y;


    world.classList.add(
        "dragging"
    );
}



/* =========================================================
   MOVER
   ========================================================= */

function moveDrag(
    x,
    y
) {

    if (!dragging) {

        return;
    }


    const deltaX =
        x - lastX;


    const deltaY =
        y - lastY;


    /*
       DERECHA / IZQUIERDA
    */

    targetRotation +=
        deltaX
        * sensitivity;


    /*
       ARRIBA / ABAJO

       Muy poquito.
    */

    targetVerticalMove +=
        deltaY
        * verticalSensitivity;


    targetVerticalMove =
        clamp(
            targetVerticalMove,
            -25,
            25
        );


    lastX = x;

    lastY = y;
}



/* =========================================================
   FINALIZAR
   ========================================================= */

function endDrag() {

    dragging = false;


    world.classList.remove(
        "dragging"
    );
}



/* =========================================================
   MOUSE
   ========================================================= */

scene.addEventListener(
    "mousedown",
    e => {

        /*
           No iniciar giro cuando
           se toca el botón.
        */

        if (
            e.target.closest(
                "#surprise"
            )
        ) {

            return;
        }


        startDrag(
            e.clientX,
            e.clientY
        );
    }
);


window.addEventListener(
    "mousemove",
    e => {

        moveDrag(
            e.clientX,
            e.clientY
        );
    }
);


window.addEventListener(
    "mouseup",
    endDrag
);


scene.addEventListener(
    "dragstart",
    e => {

        e.preventDefault();
    }
);



/* =========================================================
   CELULAR
   ========================================================= */

scene.addEventListener(
    "touchstart",

    e => {

        if (
            e.touches.length !== 1
        ) {

            return;
        }


        if (
            e.target.closest(
                "#surprise"
            )
        ) {

            return;
        }


        const touch =
            e.touches[0];


        startDrag(
            touch.clientX,
            touch.clientY
        );
    },

    {
        passive: true
    }
);


scene.addEventListener(
    "touchmove",

    e => {

        if (
            !dragging ||
            e.touches.length !== 1
        ) {

            return;
        }


        const touch =
            e.touches[0];


        moveDrag(
            touch.clientX,
            touch.clientY
        );
    },

    {
        passive: true
    }
);


scene.addEventListener(
    "touchend",

    endDrag,

    {
        passive: true
    }
);


scene.addEventListener(
    "touchcancel",

    endDrag,

    {
        passive: true
    }
);



/* =========================================================
   POSICIONAR FLORES
   ========================================================= */

function updateFlowers() {

    /*
       Radio horizontal dependiendo
       del tamaño de pantalla.
    */

    const isMobile =
        window.innerWidth <= 700;


    const radiusX =
        isMobile
            ? window.innerWidth * .38
            : Math.min(
                window.innerWidth * .39,
                650
            );


    /*
       Radio vertical pequeño.

       Esto crea sensación circular
       sin inclinar las letras.
    */

    const radiusY =
        isMobile
            ? 28
            : 48;


    items.forEach(
        (item, index) => {

            const data =
                flowerData[index];


            /*
               Ángulo actual.
            */

            const degrees =
                data.angle
                + rotation;


            const angle =
                degrees
                * Math.PI
                / 180;


            /*
               POSICIÓN X

               Esto hace que viaje
               de izquierda a derecha.
            */

            const x =
                Math.sin(angle)
                * radiusX
                * data.radius;


            /*
               POSICIÓN Y

               Mantiene cada flor en
               su nivel original pero
               agrega un pequeño arco.
            */

            const y =
                data.height
                + Math.cos(angle)
                * radiusY
                + verticalMove;


            /*
               PROFUNDIDAD SIMULADA

               +1 = frente
               -1 = atrás
            */

            const depth =
                Math.cos(angle);


            /*
               ESCALA

               Frente = más grande
               Fondo = más pequeño
            */

            const scale =
                isMobile

                ? (
                    .72
                    + (
                        depth + 1
                    )
                    * .10
                )

                : (
                    .78
                    + (
                        depth + 1
                    )
                    * .14
                );


            /*
               OPACIDAD

               Atrás se ve más tenue,
               pero NUNCA desaparece.
            */

            const opacity =
                .48
                + (
                    depth + 1
                )
                * .26;


            /*
               BRILLO
            */

            const brightness =
                .72
                + (
                    depth + 1
                )
                * .18;


            /*
               POSICIÓN FINAL.

               MUY IMPORTANTE:

               SOLO:
               translate + scale

               NO EXISTE:
               rotateY
               rotateX
               rotateZ

               Por eso las letras
               SIEMPRE miran al usuario.
            */

            item.style.transform =
                `
                translate(
                    ${x}px,
                    ${y}px
                )
                scale(${scale})
                `;


            item.style.opacity =
                opacity;


            item.style.filter =
                `
                brightness(
                    ${brightness}
                )
                `;


            /*
               Orden visual.

               Las que están adelante
               pasan por encima.
            */

            item.style.zIndex =
                Math.round(
                    6
                    + (
                        depth + 1
                    )
                    * 4
                );


            /*
               SEGURIDAD EXTRA:

               Si quedó algún estilo
               antiguo en floating,
               lo eliminamos.
            */

            const floating =
                item.querySelector(
                    ".floating"
                );


            if (floating) {

                floating.style.transform =
                    "none";
            }


            /*
               Y seguridad adicional
               para el texto.
            */

            const text =
                item.querySelector(
                    "span"
                );


            if (text) {

                text.style.transform =
                    "none";
            }


            /*
               También el emoji
               permanece frontal.
            */

            const emoji =
                item.querySelector(
                    "b"
                );


            if (emoji) {

                emoji.style.transform =
                    "none";
            }
        }
    );
}



/* =========================================================
   ANIMACIÓN
   ========================================================= */

function animate() {

    /*
       Suavizado horizontal
    */

    rotation +=
        (
            targetRotation
            - rotation
        )
        * .10;


    /*
       Suavizado vertical
    */

    verticalMove +=
        (
            targetVerticalMove
            - verticalMove
        )
        * .10;


    /*
       IMPORTANTE:

       JAMÁS GIRAMOS WORLD.
    */

    world.style.transform =
        "none";


    updateFlowers();


    requestAnimationFrame(
        animate
    );
}


animate();
