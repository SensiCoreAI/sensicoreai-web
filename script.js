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

const NODE_COUNT = 120;
const LINK_DISTANCE = 110;

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

    ctx.lineWidth = 1.8;

    for (const link of links) {

        const { a, b, alpha } = link;

        ctx.beginPath();

        ctx.moveTo(a.x, a.y);
        const angle = time * 0.0003;

const cx = canvas.width / 2;
const cy = canvas.height / 2;

const rx = ((a.x + b.x) / 2) - cx;
const ry = ((a.y + b.y) / 2) - cy;

const mx = cx + rx * Math.cos(angle) - ry * Math.sin(angle);
const my = cy + rx * Math.sin(angle) + ry * Math.cos(angle);
        
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
