AFRAME.registerComponent('fenced', {
    schema: {
      xMin: {type: 'number', default: -10},
      xMax: {type: 'number', default:  10},
      zMin: {type: 'number', default: -10},
      zMax: {type: 'number', default:  10}
    },
    tick: function() {
        var data = this.data;

        var position = this.el.getAttribute('position');

        position.x = Math.min( data.xMax, position.x);
        position.x = Math.max( data.xMin, position.x);

        position.z = Math.min( data.zMax, position.z);
        position.z = Math.max( data.zMin, position.z);

        this.el.setAttribute('position', position);
    }
  });