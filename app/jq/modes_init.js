if (!modeUrlPar) {
  $root_container.attr('actived', 'default');
  } else if (modeUrlPar) {
  if (modeUrlPar === 'kamon' || modeUrlPar === 'pattern' || modeUrlPar === 'banners') {
    $root_container.attr('actived', 'gallery');
  } else if (modeUrlPar === 'cv') {
    $root_container.attr('actived', 'cv');
  } else if (modeUrlPar === 'tree') {
    $root_container.attr('actived', 'linktree');
  }
} 