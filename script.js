const btn = document.getElementById("startBtn");

btn.addEventListener("click", () => {

    btn.innerText = "CARGANDO...";

    btn.style.transform = "scale(0.95)";

    setTimeout(() => {

        btn.innerText = "COMENZAR";

        btn.style.transform = "scale(1)";

    },1000);

});
