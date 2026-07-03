const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resize();
window.addEventListener("resize", resize);

const POINTS = 180;
const MAX_DISTANCE = 130;

const nodes = [];

for (let i = 0; i < POINTS; i++) {

    nodes.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        glow: Math.random()
    });

}

function drawNode(n){

    ctx.beginPath();
    ctx.arc(n.x,n.y,2.2,0,Math.PI*2);

    ctx.fillStyle="#ff2a2a";

    ctx.shadowBlur=10;
    ctx.shadowColor="#ff0000";

    ctx.fill();

    ctx.shadowBlur=0;

}

function drawConnections(){

    for(let i=0;i<nodes.length;i++){

        for(let j=i+1;j<nodes.length;j++){

            const a=nodes[i];
            const b=nodes[j];

            const dx=a.x-b.x;
            const dy=a.y-b.y;

            const dist=Math.sqrt(dx*dx+dy*dy);

            if(dist<MAX_DISTANCE){

                ctx.beginPath();

                ctx.moveTo(a.x,a.y);

                ctx.lineTo(b.x,b.y);

                ctx.strokeStyle="rgba(255,40,40,"+(1-dist/MAX_DISTANCE)+")";

                ctx.lineWidth=1;

                ctx.stroke();

            }

        }

    }

}

const pulses = [];

for(let i=0;i<35;i++){

    pulses.push({
        a:0,
        b:0,
        t:Math.random(),
        speed:0.004+Math.random()*0.01
    });

}

function updatePulses(){

    for(const p of pulses){

        p.t += p.speed;

        if(p.t >= 1){

            p.t = 0;

            p.a = Math.floor(Math.random()*nodes.length);
            p.b = Math.floor(Math.random()*nodes.length);

        }

        const A = nodes[p.a];
        const B = nodes[p.b];

        const dx = B.x - A.x;
        const dy = B.y - A.y;

        const x = A.x + dx * p.t;
        const y = A.y + dy * p.t;

        ctx.beginPath();

        ctx.arc(x,y,3.5,0,Math.PI*2);

        ctx.fillStyle="#ffffff";

        ctx.shadowBlur=18;
        ctx.shadowColor="#ff0000";

        ctx.fill();

        ctx.shadowBlur=0;

    }

            }

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    drawConnections();

    drawNodeLoop();

    updatePulses();

    requestAnimationFrame(animate);

}

function drawNodeLoop(){

    for(const n of nodes){

        drawNode(n);

    }

}

animate();
