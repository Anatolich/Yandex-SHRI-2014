window.onload = function () {

    var small_eq = new equalizerJS(document.getElementById('equalizer_small'), 1000, 2, 'down');

    var normal_eq = new equalizerJS(document.getElementById('equalizer_normal'), 1000, 2, 'up');

   	var big_eq = new equalizerJS(document.getElementById('equalizer_big'), 1000, 2, 'down');
};