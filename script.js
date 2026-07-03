const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const nodes = [];
const links = [];

const NODE_COUNT = 100;
const LINK_DISTANCE = 90;

for (let i = 0; i < NODE_COUNT; i++) {

    nodes.push({

        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,

        vx: (Math.random() - 0.5) * 0.08,
        vy: (Math.random() - 0.5) * 0.08

    });

}

function updateNodes() {

    for (const n of nodes) {

        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;

    }

}

function buildLinks() {

    links.length = 0;

    for (let i = 0; i < nodes.length; i++) {

        for (let j = i + 1; j < nodes.length; j++) {

            const a = nodes[i];
            const b = nodes[j];

            const dx = a.x - b.x;
            const dy = a.y - b.y;

            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < LINK_DISTANCE) {

                links.push({
                    a,
                    b,
                    alpha: 1 - dist / LINK_DISTANCE
                });

            }

        }

    }

}

function drawNetwork(time) {

    ctx.lineWidth = 1.2;

    for (const link of links) {

        const { a, b, alpha } = link;

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);

        const mx = (a.x + b.x) / 2 + Math.sin(time * 0.001 + a.x * 0.02) * 8;
        const my = (a.y + b.y) / 2 + Math.cos(time * 0.001 + b.y * 0.02) * 8;

        ctx.quadraticCurveTo(
            mx,
            my,
            b.x,
            b.y
        );

        ctx.strokeStyle = `rgba(255,40,40,${alpha})`;

        ctx.shadowBlur = 10;
        ctx.shadowColor = "#ff2020";

        ctx.stroke();

    }

    ctx.shadowBlur = 0;

}

function drawNodes() {

    for (const n of nodes) {

        ctx.beginPath();

        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);

        ctx.fillStyle = "#ff3030";

        ctx.fill();

    }

}

function animate(time){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    updateNodes();

    buildLinks();

    drawNetwork(time);

    drawNodes();

    requestAnimationFrame(animate);

}

requestAnimationFrame(animate);
