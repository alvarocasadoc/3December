var camera = document.querySelector('a-camera');
var scene  = document.querySelector('a-scene');
var sky    = document.querySelector('#sky');

camera.addEventListener('gazed', function (event) {
  var angle = event.detail.angle;
  if (angle == 45) {
      createRect(4, 2, 0.2, -8, 1, -3, 30, 0, "violet");
      createRect(4, 2, 0.2, -8, 3.2, -3, 30, 300, "teal");
  } else if (angle == -45) {
    createRect(4, 2, 0.2, 4.5, 1, -5, -30, 0, "orange");
    createRect(4, 2, 0.2, 4.5, 3.2, -5, -30, 300, "yellowgreen");
  }
});

function createRect(w, h, r, x, y, z, a, delay, color) {
    var rect = document.createElement('a-entity');
    rect.setAttribute('rounded', 'width: ' + w + '; height: ' + h + '; radius: '+ r);

    if (color == "violet") {
        rect.setAttribute('material', 'shader: gradient; topColor: 114 73 108; bottomColor: 83 73 114; opacity: 0.75');
    } else if (color == "teal") {
        rect.setAttribute('material', 'shader: gradient; topColor: 224 249 239; bottomColor: 53 180 132; opacity: 0.75');
    } else if (color == "orange") {
        rect.setAttribute('material', 'shader: gradient; topColor: 249 227 136; bottomColor: 249 193 136; opacity: 0.75');
    } else {
        rect.setAttribute('material', 'shader: gradient; topColor: 250 251 244; bottomColor: 189 225 138; opacity: 0.75');
    }

    rect.setAttribute('position', x + ' ' + y + ' ' + z);
    rect.setAttribute('rotation', '0 ' + a + ' 0');
    rect.setAttribute('scale', '0 0 0');

    rect.addEventListener('click', function() {
        sky.setAttribute('material', this.getAttribute('material'));
    });


    var anim = document.createElement('a-animation');
    anim.setAttribute('attribute', 'scale');
    anim.setAttribute('from', '0 0 0');
    anim.setAttribute('to', '1 1 1');
    anim.setAttribute('duration', '1000');
    anim.setAttribute('delay', delay);
    
    rect.appendChild(anim);
    scene.appendChild(rect);
}