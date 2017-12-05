
AFRAME.registerShader('uv', {
  schema: {
    color: {type: 'color', is: 'uniform', default: 'red'},
    opacity: {type: 'number', is: 'uniform', default: 1.0}
  },
  vertexShader:
    `
    varying vec3 col;

    void main() {
        col = vec3(uv, 1.0);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
    `
  ,
  fragmentShader:
    `
    varying vec3 col;

    void main(void) {
        gl_FragColor = vec4(col, 1.0);
    }

    `
});