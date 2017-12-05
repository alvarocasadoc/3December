AFRAME.registerShader('normal', {
  schema: {
    color: {type: 'color', is: 'uniform', default: 'red'},
    opacity: {type: 'number', is: 'uniform', default: 1.0}
  },
  vertexShader:
    `
    attribute float displacement;
    varying vec3 vNormal;
    
    void main() {
      vNormal = normal;
    
      gl_Position = projectionMatrix *
                    modelViewMatrix *
                    vec4(position, 1.0);
    }
    `
  ,
  fragmentShader:
    `
    precision highp float;
    varying vec3 vNormal;
    
    void main () {
      gl_FragColor = vec4(vNormal, 1.0);
    }
    `
});