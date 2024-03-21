/*$(document).ready(function () {
  var music_author = 'ValentineSeasons';
  var playlist = {
    'Missing in wind': 'https://cdn.pixabay.com/download/audio/2023/09/17/audio_fee1f2b797.mp3?filename=missing-in-wind-japanese-ancient-flute-simulate-wind-sound-166932.mp3',
    'Sakura dance': 'https://cdn.pixabay.com/download/audio/2023/09/06/audio_360729c9ac.mp3?filename=sakura-dance-background-music-traditional-japanese-165338.mp3'
  };
  

  
  var backmusic = new Howl({
    src: ,
    loop: true,
    volume: 0.1
  })

  backmusic.play();
});*/



$(document).ready(function () {
  var trackTitle = $('.trackTitle');
  var trackTime = $('.trackTime');
  var trackProgress = $('.trackProgress');
  window.playlist = {
    'ValentineSeasons — Missing in wind': 'https://cdn.pixabay.com/download/audio/2023/09/17/audio_fee1f2b797.mp3?filename=missing-in-wind-japanese-ancient-flute-simulate-wind-sound-166932.mp3',
    'ValentineSeasons — Sakura dance': 'https://cdn.pixabay.com/download/audio/2023/09/06/audio_360729c9ac.mp3?filename=sakura-dance-background-music-traditional-japanese-165338.mp3'
  };

  var keys = Object.keys(playlist);
  var randomTrack = keys[Math.floor(Math.random() * keys.length)];

  window.ambient = new Howl({
    src: [playlist[randomTrack]],
    volume: 0.1,
    onend: function () {
      var randomTrack = keys[Math.floor(Math.random() * keys.length)];
      ambient.stop();
      ambient = new Howl({ src: [playlist[randomTrack]], volume: 0.1 });
      ambient.play();
      $('.trackTitle').text(window.getCurrentTrack());
    }
  });
  ambient.on('load', function() {
    var currentTime = window.getCurrentTrackTime();
    var progressTime = window.getCurrentTrackTimeProgress();
    var progress = window.getCurrentProgress();
    $('.trackTitle').text(window.getCurrentTrack());
    $('.trackTime').text(`${progressTime} / ${currentTime}`);
    $('.trackProgress').css('--progress', `${progress}%`);
    setInterval(function () {
      currentTime = window.getCurrentTrackTime();
      progressTime = window.getCurrentTrackTimeProgress();
      progress = window.getCurrentProgress();
      $('.trackTime').text(`${progressTime} / ${currentTime}`);
      $('.trackProgress').css('--progress', `${progress}%`);
    }, 1000);
  });
  ambient.play();

  window.getCurrentTrack = function () {
    return Object.keys(playlist).find(key => playlist[key] === ambient._src);
  }
  window.getCurrentTrackTime = function () {
    if (ambient._state === 'loaded') {
      var duration = ambient._duration;
      var minutes = Math.floor(duration / 60);
      var seconds = Math.floor(duration % 60);
      return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    } else {
      return '00:00';
    }
  }
  window.getCurrentTrackTimeProgress = function () {
    if (ambient._state === 'loaded') {
      var currentTime = ambient.seek();
      var minutes = Math.floor(currentTime / 60);
      var seconds = Math.floor(currentTime % 60);
      return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    } else {
      return '00:00';
    }
  }

  window.getCurrentProgress = function () {
    if (ambient._state === 'loaded') {
      var currentTime = ambient.seek();
      var duration = ambient._duration;
      var progress = Math.floor((currentTime / duration) * 100);
      return Math.min(Math.max(progress, 0), 100);
    } else {
      return 0;
    }
  }
  window.pauseAmbient = function() {
    ambient.pause();
  }

  window.resumeAmbient = function() {
    ambient.play();
  }

  window.randomAmbient = function() {
    var randomTrack = keys[Math.floor(Math.random() * keys.length)];
    ambient.stop();
    ambient = new Howl({ src: [playlist[randomTrack]], volume: 0.1 });
    ambient.play();
    $('.trackTitle').text(window.getCurrentTrack());
  }
});

