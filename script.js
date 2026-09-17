/* ==========================================
   FONDO DE ESTRELLAS
   ========================================== */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

let W, H;
let particles = [];

function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    makeStars();
}

function makeStars() {
    particles = Array.from(
        { length: 180 },
        () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.8 + .2,
            a: Math.random(),
            s: Math.random() * .012 + .003
        })
    );
}

function draw() {

    ctx.clearRect(0, 0, W, H);

    const g = ctx.createRadialGradient(
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

    particles.forEach(p => {

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
    });

    requestAnimationFrame(draw);
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
        16 *
        Math.pow(
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
            document.createElement("span");

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
   GIRO INTERACTIVO
   ========================================== */

const world =
    document.getElementById("world");

const centerpiece =
    document.querySelector(
        ".centerpiece"
    );

const items =
    Array.from(
        document.querySelectorAll(
            ".item"
        )
    );


/*
   IMPORTANTE:

   Ya NO rotamos .world.

   El contenedor permanece mirando
   hacia la pantalla.

   JavaScript mueve individualmente
   cada flor para simular el giro.

   Así las letras NUNCA quedan
   de lado ni al revés.
*/

world.style.transform = "none";


/* ==========================================
   CONFIGURACIÓN DE LAS 8 FLORES
   ========================================== */

/*
   Cada elemento tiene:

   angle = posición alrededor del escenario
   radius = distancia horizontal
   depth = profundidad
*/

const flowerData = [

    {
        angle: -55,
        radius: 90,
        depth: 130
    },

    {
        angle: -115,
        radius: 110,
        depth: 150
    },

    {
        angle: -155,
        radius: 85,
        depth: 170
    },

    {
        angle: 55,
        radius: 100,
        depth: 140
    },

    {
        angle: 105,
        radius: 115,
        depth: 160
    },

    {
        angle: 150,
        radius: 95,
        depth: 180
    },

    {
        angle: -20,
        radius: 75,
        depth: 120
    },

    {
        angle: 20,
        radius: 80,
        depth: 130
    }

];


/* ==========================================
   VARIABLES DEL GIRO
   ========================================== */

let rotationY = 0;

let targetRotationY = 0;

let tiltX = 0;

let targetTiltX = 0;

let lastX = 0;

let lastY = 0;

let dragging = false;


/*
   Sensibilidad del dedo/mouse
*/

const horizontalSensitivity =
    0.40;

const verticalSensitivity =
    0.08;


/* ==========================================
   LIMITAR VALOR
   ========================================== */

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
   INICIAR ARRASTRE
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


/* ==========================================
   MOVER
   ========================================== */

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
       GIRO HORIZONTAL
    */

    targetRotationY +=
        deltaX
        * horizontalSensitivity;


    /*
       PEQUEÑA INCLINACIÓN VERTICAL
    */

    targetTiltX -=
        deltaY
        * verticalSensitivity;

    targetTiltX =
        limit(
            targetTiltX,
            -7,
            7
        );


    lastX = x;

    lastY = y;
}


/* ==========================================
   TERMINAR ARRASTRE
   ========================================== */

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

function updateFlowers() {

    items.forEach(
        (item, index) => {

            const data =
                flowerData[index];

            const floating =
                item.querySelector(
                    ".floating"
                );


            /*
               Ángulo actual de la flor
            */

            const angle =
                (
                    data.angle
                    + rotationY
                )
                * Math.PI
                / 180;


            /*
               Movimiento horizontal
               alrededor del centro
            */

            const x =
                Math.sin(angle)
                * data.radius;


            /*
               Profundidad
            */

            const z =
                Math.cos(angle)
                * data.depth;


            /*
               Ligero movimiento vertical
               cuando inclinamos
            */

            const y =
                Math.sin(
                    tiltX
                    * Math.PI
                    / 180
                )
                * 15;


            /*
               MOVEMOS EL CONTENEDOR.

               OJO:

               NO usamos rotateY aquí.

               Por eso el texto no gira
               y siempre queda mirando
               directamente a la pantalla.
            */

            item.style.transform =
                `
                translate3d(
                    ${x}px,
                    ${y}px,
                    ${z}px
                )
                `;


            /*
               El contenido permanece
               completamente frontal.
            */

            floating.style.transform =
                "rotateX(0deg) rotateY(0deg)";


            /*
               PROFUNDIDAD VISUAL

               Adelante:
               grande y brillante.

               Atrás:
               pequeño y tenue.
            */

            const normalizedDepth =
                (
                    z
                    + data.depth
                )
                /
                (
                    data.depth * 2
                );


            const scale =
                0.82
                + normalizedDepth
                * 0.22;


            const opacity =
                0.45
                + normalizedDepth
                * 0.55;


            /*
               Aplicamos escala sin
               rotar las letras.
            */

            floating.style.transform =
                `
                scale(${scale})
                `;


            item.style.opacity =
                opacity;


            /*
               Más brillo cuando
               está adelante.
            */

            const brightness =
                0.72
                + normalizedDepth
                * 0.35;


            item.style.filter =
                `
                brightness(
                    ${brightness}
                )
                `;
        }
    );
}


/* ==========================================
   MOVIMIENTO DEL CORAZÓN
   ========================================== */

/*
   El corazón permanece prácticamente
   en el centro.

   Solo hacemos una inclinación MUY leve
   para conservar sensación de movimiento.

   No lo volteamos 180 grados.
*/

function updateCenter() {

    const centerMove =
        Math.sin(
            rotationY
            * Math.PI
            / 180
        )
        * 12;


    /*
       Conservamos la escala responsive
       mediante CSS.

       Solo desplazamos ligeramente
       el mundo que contiene el centro.
    */

    centerpiece.style.marginLeft =
        centerMove + "px";
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
        * .11;


    tiltX +=
        (
            targetTiltX
            - tiltX
        )
        * .11;


    /*
       IMPORTANTE:

       WORLD NO ROTA.

       Por eso ninguna frase puede
       quedar escrita al revés.
    */

    world.style.transform =
        "none";


    updateFlowers();

    updateCenter();


    requestAnimationFrame(
        animateWorld
    );
}


animateWorld();
