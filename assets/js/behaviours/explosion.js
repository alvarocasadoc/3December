AFRAME.registerShader('explosion', {
  schema: {
    timeMsec: {type:'time', is:'uniform'}
  },
  vertexShader: pnoise3 + `

//
// Based on @thespite's article:
// 
// "Vertex displacement with a noise function using GLSL and three.js"
// Source: https://www.clicktorelease.com/blog/vertex-displacement-noise-3d-webgl-glsl-three-js/
//

varying float noise;
uniform float timeMsec; // A-Frame time in milliseconds.

float turbulence( vec3 p ) {

  float w = 100.0;
  float t = -.5;

  for (float f = 1.0 ; f <= 10.0 ; f++ ){
    float power = pow( 2.0, f );
    t += abs( pnoise3( vec3( power * p ), vec3( 10.0, 10.0, 10.0 ) ) / power );
  }

  return t;

}

void main() {
  float time = timeMsec / 1000.0; // Convert from A-Frame milliseconds to typical time in seconds.
  noise = 10.0 *  -.10 * turbulence( .5 * normal + time / 3.0 );
  float b = 5.0 * pnoise3( 0.05 * position, vec3( 100.0 ) );
  float displacement = (- 10. * noise + b) / 50.0;

  vec3 newPosition = position + normal * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}

`,
  fragmentShader: `

varying float noise;

void main() {

  vec3 color = vec3(1. - 2. * noise);
  gl_FragColor = vec4( color.rgb, 1.0 );

}

`
});