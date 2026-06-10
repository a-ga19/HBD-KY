// --- CONFIGURACIÓN DE LA CANCIÓN CON YOUTUBE API ---
let reproductor;
function onYouTubeIframeAPIReady() {
    reproductor = new YT.Player('reproductor-oculto', {
        height: '1',
        width: '1',
        videoId: 'r89AvfKUyaQ',
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'r89AvfKUyaQ'
        }
    });
}

// --- CREACIÓN DE PÉTALOS FLOTANTES ---
const atmosfera = document.getElementById('atmosfera');
const totalPetalos = 18;

for (let i = 0; i < totalPetalos; i++) {
    const petalo = document.createElement('div');
    petalo.classList.add('petalo');

    // Variación de tamaños, posiciones horizontales y velocidades
    const tamaño = Math.random() * 25 + 15;
    petalo.style.width = `${tamaño}px`;
    petalo.style.height = `${tamaño}px`;
    petalo.style.left = `${Math.random() * 100}%`;

    // Tiempos aleatorios para que salgan de forma escalonada
    petalo.style.animationDelay = `${Math.random() * 7}s`;
    petalo.style.animationDuration = `${Math.random() * 4 + 6}s`;

    atmosfera.appendChild(petalo);
}

// --- ORGANIZACIÓN INICIAL DE LAS CARTAS ---
const cartas = Array.from(document.querySelectorAll('.carta-foto'));
let cartasRestantes = cartas.length;

function organizarCartas() {
    cartas.forEach((carta, indice) => {
        const rotacion = (indice - (cartas.length - 1) / 2) * 3 + (Math.random() * 2 - 1);
        carta.style.transform = `rotate(${rotacion}deg)`;
        carta.style.zIndex = indice;
    });
}

// --- ACCIÓN: ABRIR EL REGALO ---
function abrirRegalo() {
    if (reproductor && typeof reproductor.playVideo === 'function') {
        reproductor.playVideo();
    }

    document.getElementById('barra-musica').style.opacity = '1';
    document.getElementById('pantalla-regalo').classList.add('abierto');

    setTimeout(() => {
        document.getElementById('pantalla-regalo').style.display = 'none';
        const escenario = document.getElementById('escenario');
        escenario.classList.add('mostrar');

        setTimeout(() => {
            document.getElementById('titulo').style.opacity = '1';
            document.getElementById('titulo').style.transform = 'translateY(0)';
            organizarCartas();
        }, 100);
    }, 800);
}

// --- ACCIÓN: DESPLAZAR CARTAS ---
function pasarCarta(carta) {
    const direcciones = [
        { x: -window.innerWidth, y: -50, r: -45 },
        { x: window.innerWidth, y: -50, r: 45 },
        { x: 0, y: -window.innerHeight, r: 10 }
    ];

    const destino = direcciones[Math.floor(Math.random() * direcciones.length)];

    carta.style.transform = `translate(${destino.x}px, ${destino.y}px) rotate(${destino.r}deg) scale(0.8)`;
    carta.style.opacity = '0';
    carta.style.pointerEvents = 'none';

    cartasRestantes--;

    if (cartasRestantes === 0) {
        setTimeout(crearCollage, 600);
    }
}

// --- TRANSICIÓN: COLLAGE ---
function crearCollage() {
    const escenario = document.getElementById('escenario');
    escenario.classList.add('modo-collage');

    document.getElementById('titulo').innerText = "Gracias por cada momento a su lado, y por los que aún faltan por vivir...";

    cartas.forEach((carta, indice) => {
        carta.style.opacity = '0';
        setTimeout(() => {
            const inclinaciones = [-4, 3, -2, 5];
            const rotacionFinal = inclinaciones[indice] || 0;

            carta.style.transform = `rotate(${rotacionFinal}deg) scale(1)`;
            carta.style.opacity = '1';
        }, indice * 150);
    });

    setTimeout(() => {
        const btn = document.getElementById('btnFinal');
        btn.style.opacity = '1';
        btn.style.pointerEvents = 'auto';
        btn.style.transition = 'opacity 0.8s ease';
    }, 800);
}

// --- ACCIÓN FINALE: DESTELLOS MÁGICOS PÚRPURAS ---
function lanzarDeseo() {
    const altoPantalla = window.innerHeight;
    const anchoPantalla = window.innerWidth;

    for (let i = 0; i < 40; i++) {
        const chispa = document.createElement('div');
        chispa.classList.add('petalo'); // Reutiliza la clase base de animación estilizada
        chispa.style.background = 'radial-gradient(circle, #fff 0%, var(--bts-purple-light) 60%, rgba(255,255,255,0) 100%)';
        chispa.style.width = '14px'; chispa.style.height = '14px';
        chispa.style.left = '50%'; chispa.style.bottom = '80px';
        chispa.style.position = 'absolute'; chispa.style.zIndex = '100';

        document.body.appendChild(chispa);

        const destinoX = (Math.random() - 0.5) * anchoPantalla;
        const destinoY = -(Math.random() * altoPantalla);

        chispa.animate([
            { transform: 'translate(0, 0) scale(1)', opacity: 1 },
            { transform: `translate(${destinoX}px, ${destinoY}px) scale(0) rotate(180deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 1200 + 800,
            easing: 'cubic-bezier(0.1, 0.8, 0.3, 1)',
            fill: 'forwards'
        });

        setTimeout(() => chispa.remove(), 2000);
    }

    const btn = document.getElementById('btnFinal');
    btn.innerHTML = '¡Deseo enviado, Que pronto se le cumpla!';
    btn.style.background = 'var(--esperanza-verde)';
    btn.style.color = '#2d1b4e';
    btn.style.transform = 'scale(1.02)';
}