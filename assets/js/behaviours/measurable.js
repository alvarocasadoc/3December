AFRAME.registerComponent('measurable', {
    schema: {
        size: {type: 'number', default: 0.5}
    },
    init: function() {
        var scene = this.el.sceneEl;
        var start, end, startP, endP;
        var mapV = new THREE.Vector3(0, 1, 0);
        var data = this.data;
        this.el.addEventListener('click', debounce( function(e) {
            var inter = e.detail.intersection;
            var sprite = document.createElement('a-entity');
            sprite.setAttribute('geometry', 'primitive: sphere; radius:' + data.size/2);
            scene.appendChild(sprite);
            
            var mat = inter.object.matrixWorld;
            mat.setPosition(new THREE.Vector3(0, 0, 0));
            var global_normal = e.detail.intersection.face.normal.clone().applyMatrix4(mat).normalize();
            var lookAtTarget = new THREE.Vector3().addVectors(inter.point, global_normal);
            sprite.object3D.lookAt(lookAtTarget);
            var pointerPosition = new THREE.Vector3().addVectors(inter.point, global_normal.multiplyScalar(data.size/2));

            sprite.setAttribute("position", pointerPosition);
                if(start == null) {
                    start = sprite;
                    startP = e.detail.intersection.point;
                    startP = AFRAME.utils.coordinates.toVector3(startP);
                } else if (end == null) {
                    end = sprite;
                    endP = e.detail.intersection.point;
                    endP = AFRAME.utils.coordinates.toVector3(endP);
                    console.log(startP);
                    document.getElementById('measure').innerHTML = Math.round(startP.distanceTo(endP)*100)/100 + 'cm';
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