window.modeUrlPar = new URLSearchParams(window.location.search).get('mode')?.toLowerCase();
window.selUrlPar = new URLSearchParams(window.location.search).get('sel')?.toLowerCase();

window.selfOriginURL = window.location.href;
window.localHostIP = window.selfOriginURL.startsWith("http://localhost") || window.selfOriginURL.startsWith("http://127.0.0.1") || window.selfOriginURL.startsWith("http://192.168");

window.redirOrigin = function() {
  if (window.localHostIP) {
    window.location.replace('index.html');
  } else {
    window.location.replace('./');
  }
}
window.redirTo = function({ index, url }) {
  if (index) {
    if (window.localHostIP) {
      window.location.replace('index.html' + url);
    } else {
      window.location.replace('./' + url);
    }
  } else {
    window.location.replace(url);
  }
}
