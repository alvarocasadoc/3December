AFRAME.registerComponent('ar-measure', {
    schema: {
        size: {type: 'number', default: 9.4} //the actual size of your AR marker
    },
    tick: function() {
        var posAmarker = document.querySelectorAll('a-marker')[0].object3D;
        var posBmarker = document.querySelectorAll('a-marker')[1].object3D;
        
        if( posAmarker.visible === true && posBmarker.visible === true ){
            var distance = posAmarker.position.distanceTo(posBmarker.position);
            //adjusting the distance to measure BETWEEN markers
            distance = Math.abs(Math.round(distance*this.data.size*100)/100);
            distance -= this.data.size; // 1/2*markerALength + 1/2*markerBLength
            
            document.querySelector('.loading').innerHTML = Math.round(distance*100)/100 + 'cm';
        }
    }
  });