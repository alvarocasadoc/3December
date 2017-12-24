var controllerOptions = {};
var sword = document.getElementById("anchor");

var controller =  Leap.loop(controllerOptions, function(frame) {});
controller.on("gesture", function(gesture){
    if (gesture.type == "circle") {
        sword.emit('rotate');
    }
});