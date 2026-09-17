/* ==========================================
   FONDO DE ESTRELLAS
   ========================================== */

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
                `rgba(
                    255,
                    235,
                    72,
                    ${p.a}
                )`;


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


    requestAnimationFrame(
        draw
    );
}


resize();


window.addEventListener(
    "resize",
    resize
);


draw();



/* ==========================================
   CORAZÓN DE PARTÍCULAS
   ========================================== */

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



/* ==========================================
   LLUVIA DE FLORES
   ========================================== */

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



/* ==========================================
   CARTA
   ========================================== */

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



/* ==========================================
   LLUVIA AUTOMÁTICA
   ========================================== */

setInterval(
    () => rain(4),
    5000
);


rain(15);



/* ==========================================
   SISTEMA 3D
   ========================================== */

const world =
    document.getElementById("world");


const items =
    [
        ...document.querySelectorAll(
            ".item"
        )
    ];


/*
   PROFUNDIDAD ORIGINAL DE CADA FLOR

   Positivos = delante
   Negativos = detrás
*/

const itemDepths = [

    130,     // i1

    -100,    // i2

    180,     // i3

    -150,    // i4

    110,     // i5

    -180,    // i6

    150,     // i7

    -120     // i8
];



/* ==========================================
   ROTACIÓN
   ========================================== */

let rotationY = 0;

let rotationX = 0;


let targetRotationY = 0;

let targetRotationX = 0;


let lastX = 0;

let lastY = 0;


let dragging = false;



/* ==========================================
   SENSIBILIDAD
   ========================================== */

const horizontalSensitivity =
    0.42;


const verticalSensitivity =
    0.13;



function limit(
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



/* ==========================================
   ARRASTRE
   ========================================== */

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
       GIRO HORIZONTAL LIBRE
    */

    targetRotationY +=
        deltaX
        * horizontalSensitivity;


    /*
       INCLINACIÓN VERTICAL
    */

    targetRotationX -=
        deltaY
        * verticalSensitivity;


    targetRotationX =
        limit(

            targetRotationX,

            -10,

            10
        );


    lastX = x;

    lastY = y;
}



function endDrag() {

    dragging = false;


    world.classList.remove(
        "dragging"
    );
}



/* ==========================================
   MOUSE
   ========================================== */

world.addEventListener(
    "mousedown",
    e => {

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


world.addEventListener(
    "dragstart",
    e => {

        e.preventDefault();
    }
);



/* ==========================================
   CELULAR
   ========================================== */

world.addEventListener(
    "touchstart",

    e => {

        if (
            e.touches.length !== 1
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



world.addEventListener(
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



world.addEventListener(
    "touchend",

    endDrag,

    {
        passive: true
    }
);


world.addEventListener(
    "touchcancel",

    endDrag,

    {
        passive: true
    }
);



/* ==========================================
   ACTUALIZAR FLORES
   ========================================== */

function updateItems() {

    /*
       Convertimos el giro actual
       a radianes para calcular
       profundidad visual.
    */

    const radians =
        rotationY
        * Math.PI
        / 180;


    items.forEach(
        (item, index) => {

            const floating =
                item.querySelector(
                    ".floating"
                );


            const depth =
                itemDepths[index];


            /*
               POSICIÓN DEL ITEM EN EL MUNDO

               El item pertenece al escenario,
               así que viaja con la rotación.
            */

            item.style.transform =
                `
                translateZ(${depth}px)
                `;


            /*
               CONTRARROTACIÓN

               El mundo gira rotationY.

               El texto gira exactamente
               lo contrario.

               RESULTADO:

               la flor cambia de posición,
               pero las letras continúan
               mirando al usuario.

               Nunca se leen al revés.
            */

            floating.style.transform =
                `
                rotateY(${-rotationY}deg)
                rotateX(${-rotationX}deg)
                `;


            /*
               Calculamos si está adelante
               o atrás para mejorar
               la sensación de profundidad.
            */

            const visualDepth =
                depth
                * Math.cos(radians);


            /*
               Los elementos que pasan
               por atrás se ven un poco
               más tenues.
            */

            if (
                visualDepth < -60
            ) {

                item.style.opacity =
                    "0.48";

                item.style.filter =
                    "brightness(.72)";

            }

            else if (
                visualDepth < 20
            ) {

                item.style.opacity =
                    "0.72";

                item.style.filter =
                    "brightness(.88)";

            }

            else {

                item.style.opacity =
                    "1";

                item.style.filter =
                    "brightness(1)";
            }
        }
    );
}



/* ==========================================
   ANIMACIÓN PRINCIPAL
   ========================================== */

function animateWorld() {

    /*
       Movimiento suave
    */

    rotationY +=
        (
            targetRotationY
            - rotationY
        )
        * .12;


    rotationX +=
        (
            targetRotationX
            - rotationX
        )
        * .12;


    /*
       GIRAMOS EL UNIVERSO
    */

    world.style.transform =
        `
        rotateX(${rotationX}deg)
        rotateY(${rotationY}deg)
        `;


    /*
       CORREGIMOS LAS LETRAS
    */

    updateItems();


    requestAnimationFrame(
        animateWorld
    );
}


animateWorld();
