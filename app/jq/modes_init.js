var actived_type =
  (['kamon', 'pattern', 'banners', 'clans'].includes(anUrlParameter.mode) ? 'gallery' :
    (anUrlParameter.mode === 'cv' ? 'cv' :
      (anUrlParameter.mode === 'tree' ? 'linktree' :
        (anUrlParameter.mode === 'license' ? 'license' :
          (anUrlParameter.mode === 'landing' ? 'landing' :
            (anUrlParameter.mode === 'reader' ? 'reader' :
              null
            )
          )
        )
      )
    )
  );

if (anUrlParameter.mode && actived_type !== null) {
  nk.rootContainer.attr('actived', actived_type);
} else {
  nk.rootContainer.attr('actived', 'default');
}
