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
        balls[j].appendChild(anim);
        balls[j].appendChild(scale);
        anim.setAttribute('to', 2*Math.cos((j+1)*2*Math.PI/5) + "  " + 2*Math.sin((j+1)*2*Math.PI/5) + " -5");
        balls[j].addEventListener("mousedown", function () {
            balls[j].parentNode.removeChild(balls[j]);
            if (j <= 2) {
                document.getElementById("modal-fail").style.display = "block";
            } else if (document.querySelectorAll("a-sphere").length == 3) {
                document.getElementById("modal-win").style.display = "block";
            }
        });
    }
  camera.setAttribute('mouse-cursor');
});