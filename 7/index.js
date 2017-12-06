    var scene = document.querySelector('a-scene');
    var trees = [];

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
      
    scene.addEventListener('mouseup', debounce(function (e) {
        var cursor = document.querySelector('#plumbob');
        var pos = cursor.getAttribute('position');
        if (!(pos.x == 0 && pos.y == 0 && pos.z == 0)) {
            var tree = document.createElement('a-entity');
            
            var ran = Math.floor(Math.random() * 4) + 1;
            console.log("PLANTING A PLANT!" +  ran);
            console.log(trees);
            
            tree.setAttribute('class', 'ignore-ray');
            tree.setAttribute('collada-model', '#tree' + ran);
            tree.setAttribute('scale', '0.3 0.3 0.3');
            tree.setAttribute('position', pos.x + ' 0 ' + pos.z);
            trees.push(tree);
            scene.appendChild(trees[trees.length-1]);
        }
    }, 10));