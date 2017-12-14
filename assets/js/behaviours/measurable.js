AFRAME.registerComponent('measurable', {
    init: function() {
        var scene = this.el.sceneEl;
        var start, end, startP, endP;
        var mapV = new THREE.Vector3(0, 1, 0);
        this.el.addEventListener('click', debounce( function(e) {
            var normal = e.detail.intersection.face.normal;
            normal = AFRAME.utils.coordinates.toVector3(normal);
            var angle =  mapV.angleTo(normal) * 180 / Math.PI;
            var sprite = document.createElement('a-sprite');
            sprite.setAttribute('src', '../assets/img/pointer.png');
            sprite.setAttribute('resize', '0.5 0.5 0.5');
            sprite.setAttribute('position', e.detail.intersection.point);
            console.log('0 ' + angle + ' 0');
            sprite.setAttribute('rotation', '0 ' + angle + ' 0');
            scene.appendChild(sprite);
                if(start == null) {
                    start = sprite;
                    startP = e.detail.intersection.point;
                    startP = AFRAME.utils.coordinates.toVector3(startP);
                } else if (end == null) {
                    end = sprite;
                    endP = e.detail.intersection.point;
                    endP = AFRAME.utils.coordinates.toVector3(endP);
                    console.log(startP);
                    alert(startP.distanceTo(endP));
                } else {
                    scene.removeChild(start);
                    scene.removeChild(end);
                    start = null;
                    end = null;
                    start = sprite;
                    startP = e.detail.intersection.point;
                    startP = AFRAME.utils.coordinates.toVector3(startP);
                } 
            }, 10));

        function debounce(fn,time){
            var timerId = null;
            return function(e){
                if(timerId)
                    return;
        
                timerId = setTimeout(function(){
                    fn(e);
                    timerId = null;
                },time);
            }
        }
    }
  });