var visible = 0;
var scene = document.querySelector('a-scene');
var frames = document.getElementsByClassName('frame');

scene.addEventListener('click', function() {
  for (let i = 0; i < 3; i++) {
    let frame = frames[i];
    if(i == visible) {
      frame.setAttribute('visible', 'false');
    } else if (i == (visible + 1) % 3) {
      frame.setAttribute('visible', 'true');
    }
  }
  visible = (visible + 1) % 3;
});