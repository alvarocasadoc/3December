var center = document.getElementById('center');
center.setAttribute('material','shader: uv');
var scene = document.querySelector('a-scene');

// first ring
for(let i = 0; i < 5; i++) {
    var dod = document.createElement('a-tetrahedron');
    dod.setAttribute('material','shader: normal');
    dod.setAttribute('radius','3');
    dod.setAttribute('rotation', (i*2*Math.PI/5) + ' ' + (i*2*Math.PI/5) + ' 0');
    dod.setAttribute('position', 8 * Math.cos(i*2*Math.PI/5) + ' 0 ' + 8 * Math.sin(i*2*Math.PI/5));
    var anim = document.createElement('a-animation');
    anim.setAttribute('attribute', 'rotation');
    anim.setAttribute('from', (i*2*Math.PI/5) + ' ' + (i*2*Math.PI/5) + ' 0');
    anim.setAttribute('to', (i*2*Math.PI/5) + 360 + ' ' + (i*2*Math.PI/5) + 360 + ' 0');
    anim.setAttribute('easing', 'linear');
    anim.setAttribute('repeat', 'indefinite');
    anim.setAttribute('dur', '6000');
    dod.appendChild(anim);
    center.appendChild(dod);
}

//second ring
var ring = document.createElement('a-entity');
for(let i = 0; i < 9; i ++) {
    var sp = document.createElement('a-box');
    sp.setAttribute('material','shader: uv;');
    sp.setAttribute('scale','3 3 3');
    sp.setAttribute('position', 10 * Math.cos(i*2*Math.PI/9)  + ' ' + 10 * Math.cos(i*2*Math.PI/9) + ' ' + 12 * Math.sin(i*2*Math.PI/9));
    ring.appendChild(sp);
}
ring.setAttribute('rotation', '0 0 -45');
var anim = document.createElement('a-animation');
anim.setAttribute('attribute', 'rotation');
anim.setAttribute('from', '0 0 0');
anim.setAttribute('to','360 0 0');
anim.setAttribute('easing', 'linear');
anim.setAttribute('repeat', 'indefinite');
anim.setAttribute('dur', '4000');
ring.appendChild(anim);
scene.appendChild(ring);

//third ring
var flower = document.createElement('a-entity');
for(let i = 0; i < 9; i ++) {
    var oct = document.createElement('a-octahedron');
    oct.setAttribute('material', 'shader: normal');
    oct.setAttribute('radius','2');
    oct.setAttribute('position', 17 * Math.cos(i*2*Math.PI/9) + ' ' + 17 * Math.sin(i*2*Math.PI/9) + ' 0');
    var anim = document.createElement('a-animation');
    anim.setAttribute('attribute', 'rotation');
    anim.setAttribute('from', '0 0 0');
    anim.setAttribute('to','360 0 360');
    anim.setAttribute('easing', 'linear');
    anim.setAttribute('repeat', 'indefinite');
    anim.setAttribute('dur', '3000');
    oct.appendChild(anim);
    flower.appendChild(oct);
}
var anim = document.createElement('a-animation');
anim.setAttribute('attribute', 'scale');
anim.setAttribute('from', '0 0 0');
anim.setAttribute('to','1 1 1');
anim.setAttribute('easing', 'ease-in-out-quad');
anim.setAttribute('repeat', 'indefinite');
anim.setAttribute('direction', 'alternate');
anim.setAttribute('dur', '2500');
flower.appendChild(anim);
scene.appendChild(flower);