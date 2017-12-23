var controllerOptions = {};
var world = document.querySelector('a-scene').systems.physics.driver.world;
console.log(world)
Leap.loop(controllerOptions, function(frame) {
    if (frame.hands.length > 0) {
        var hand = frame.hands[0];
        if(hand.palmNormal[1] < -0.5 && hand.palmVelocity[1] < -1000 && hand.grabStrength < 0.5) {
            world.gravity.set(0,-9.8,0);
            setTimeout(function() {
                for (var i = 0; i < world.bodies.length; i++) {
                    world.bodies[i].angularVelocity.set(0,0,0);
                }
            },500);
        } else if(hand.palmNormal[1] > 0.5 && hand.palmVelocity[1] > 1000 && hand.grabStrength < 0.5) {
            world.gravity.set(0,3.8,0);
            setTimeout(function() {
                for (var i = 0; i < world.bodies.length; i++) {
                    world.bodies[i].angularVelocity.set(Math.random()-0.5, Math.random()-0.5, Math.random()-0.5);
                }
            },500);
        }
    }
});