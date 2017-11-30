var balls = document.querySelectorAll("a-sphere");
var melody = balls[0];
var camera = document.querySelector("a-camera");
melody.addEventListener("mousedown", function () {
    melody.parentNode.removeChild(melody);
    camera.removeAttribute('mouse-cursor');
    balls = document.querySelectorAll("a-sphere");
    for (var i = 0; i < balls.length; i++) {
        let j = i;
        let anim = document.querySelector("#moveTo"+(j+1));
        let scale = document.querySelector("#scale"+(j+1));
        console.log();
        balls[j].setAttribute("animation__position", "property: position; easing: easeInOutQuad; dur: 500; to: " + (Math.round(3*Math.cos((j+1)*2*Math.PI/5))) + " " + (Math.round(3*Math.sin((j+1)*2*Math.PI/5))) + " -5;");
        balls[j].setAttribute("animation__scale", "property: scale; easing: easeInOutQuad; to: 0.8 0.8 0.8; dur: 500;");
        balls[j].addEventListener("mousedown", function () {
            balls[j].parentNode.removeChild(balls[j]);
            if (j <= 2) {
                window.location = "./fail.html";
            } else if (document.querySelectorAll("a-sphere").length == 3) {
                window.location = "./win.html"
            }
        });
    };
    camera.setAttribute('mouse-cursor');
});

function closeModal() {
    document.getElementById("modal-info").style.display = "none";
  }  