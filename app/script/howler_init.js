if (isMobileDevice() !== true) {
  $(document).ready(function () {
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
        $('.track-info__title').text(ambientCurrentTrack());
      }
    });
    ambient.on('load', function () {
      $('.track-info__title').text(ambientCurrentTrack());
      $('.track-info__time').text(`${ambientTrackTime('current')} / ${ambientTrackTime()}`);
      $('.track-info__player-progress').css('--progress', `${ambientTrackProgress()}%`);
      setInterval(function () {
        $('.track-info__time').text(`${ambientTrackTime('current')} / ${ambientTrackTime()}`);
        $('.track-info__player-progress').css('--progress', `${ambientTrackProgress()}%`);
      }, 1000);
    });
    ambient.play();

    window.ambientCurrentTrack = function () {
      return Object.keys(playlist).find(key => playlist[key] === ambient._src);
    }
    window.ambientTrackTime = function (mode) {
      if (ambient._state === 'loaded') {
        var duration = mode === 'current' ? ambient.seek() : ambient._duration;
        var minutes = Math.floor(duration / 60);
        var seconds = Math.floor(duration % 60);
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
      } else {
        return '00:00';
      }
    }

    window.ambientTrackProgress = function () {
      if (ambient._state === 'loaded') {
        var currentTime = ambient.seek();
        var duration = ambient._duration;
        var progress = Math.floor((currentTime / duration) * 100);
        return Math.min(Math.max(progress, 0), 100);
      } else {
        return 0;
      }
    }
    window.pauseAmbient = function () {
      ambient.pause();
    }

    window.resumeAmbient = function () {
      ambient.play();
    }

    window.randomAmbient = function () {
      var randomTrack = keys[Math.floor(Math.random() * keys.length)];
      ambient.stop();
      ambient = new Howl({ src: [playlist[randomTrack]], volume: 0.1 });
      ambient.play();
      $('.track-info__title').text(window.ambientCurrentTrack());
    }
  });

}