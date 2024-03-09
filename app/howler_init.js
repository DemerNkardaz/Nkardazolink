$(document).ready(function () {
  var howl = new Howl({
    src: ['../sound/mkx.mp3'],
    html5: true,
    volume: 0.5,
  });

  howl.play();
});