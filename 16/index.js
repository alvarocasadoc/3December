var modeDiv = document.getElementById('measuring-div');

modeDiv.addEventListener('click', function() {
    if (this.innerHTML === 'C2C') {
        this.innerHTML = 'E2E';
        document.querySelector('a-scene').setAttribute('ar-measure', 'centerMeasure: false');
    } else {
        this.innerHTML = 'C2C';
        document.querySelector('a-scene').setAttribute('ar-measure', 'centerMeasure: true');
    }
});