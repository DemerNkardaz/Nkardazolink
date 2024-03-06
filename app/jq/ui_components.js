window.ui_components = {
  header: () => {
    nk.siteHeader.html(
      (!anUrlParameter.mode ?
        'This is default'
        :
        'This is ' + anUrlParameter.mode)
    );
  }
}

/* Object.values(window.ui_components).forEach(component => component()); */