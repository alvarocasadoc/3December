AFRAME.registerComponent('camera-listener', {
    multiple: true,
    schema: {
      angle: {type: 'number', default: 0},
      axis: {type: 'string', default: 'y'}
    },
    init: function() {
        this.detected = false;
    },
    tick: function() {
        if (this.detected == false) {
            var data = this.data;
            var rotation = this.el.getAttribute('rotation');
            if (data.axis == 'x' && Math.abs(data.angle - rotation.x) < 2) {
                this.el.emit('gazed', {angle: data.angle, axis: data.axis}, false);
                this.detected = true;
            } else if (data.axis == 'y' && Math.abs(data.angle - rotation.y) < 2) {
                this.el.emit('gazed', {angle: data.angle, axis: data.axis}, false);
                this.detected = true;
            } else if (rotation[2] == Math.abs(data.angle - rotation.z) < 2) {
                this.el.emit('gazed', {angle: data.angle, axis: data.axis}, false);
                this.detected = true;
            }
        }
    }
  });