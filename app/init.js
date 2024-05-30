(nk.url.mode && !availableModes.includes(nk.url.mode)) ||
((nk.url.mode === 'cv') && (!nk.url.select || !availableSelects.includes(nk.url.select))) ? redirect.origin() : null;

nk.settingConfig.get('lang') ? $('html').attr('lang', nk.settingConfig.get('lang')) : $('html').attr('lang', 'ru');

const ACTIVATE_INTERFACE_TYPE =
  nk.url.mode === 'cv' ? 'cv' :
    nk.url.mode === 'tree' ? 'linktree' :
      nk.url.mode === 'license' ? 'license' :
        nk.url.mode === 'landing' ? 'landing' :
          nk.url.mode === 'reader' ? 'reader' :
            ['kamon', 'pattern', 'banners', 'clans'].includes(nk.url.mode) ? 'gallery' : null;
nk.rootContainer.attr('data-active-interface', ACTIVATE_INTERFACE_TYPE ? ACTIVATE_INTERFACE_TYPE : 'default');

let metaData = {
  "title": {
    "common": {
      ru: 'Демер Нкардаз・2D・3D・Писательство・Вёрстка',
      en: 'Demer Nkardaz・2D・3D・Writing・Design',
      ja: 'デメル・Nカードザ・2D・3D・書評・デサザ',
      zh: 'Nkardaz・2D・3D・写作・设计',
      ko: 'Demer Nkardaz・2D・3D・텍스트・デサザ',
      vi: 'Nkardaz・2D・3D・Vềt liên・Thiết kế'
    },
    "kamon": {
      ru: 'Галерея Монсё・Царства Шагора・Демер Нкардаз',
      en: 'Monshō Gallery・St. SHAGOR REALMS・Demer Nkardaz',
      ja: 'モンソゴ・シガス・シガルム・デメル・Nカードザ',
      zh: 'Monshō Gallery・St. SHAGOR REALMS・Demer Nkardaz',
      ko: 'Monshō Gallery・St. SHAGOR REALMS・Demer Nkardaz',
      vi: 'Monshō Gallery・St. SHAGOR REALMS・Demer Nkardaz'
    },
    "cv": {
      "2d": {
        ru: 'Демер Нкардаз・2D-Художник',
        en: 'Demer Nkardaz・2D Artist',
        ja: 'デメル・Nカードザ・2D-アーティスト',
        zh: 'Nkardaz・2D Artist',
        ko: 'Demer Nkardaz・2D Artist',
        vi: 'Nkardaz・2D Artist'
      },
      "3d": {
        ru: 'Демер Нкардаз・3D-Художник',
        en: 'Demer Nkardaz・3D Artist',
        ja: 'デメル・Nカードザ・3D-アーティスト',
        zh: 'Nkardaz・3D Artist',
        ko: 'Demer Nkardaz・3D Artist',
        vi: 'Nkardaz・3D Artist'
      }
    }
  }
}


if (nk.settingConfig.get('turn_off_preloader') !== true) { $('body').prepend(new nk.ui.Preloader()) };

async function generateSingleManifest(userLang, MANIFEST) {
  let nameFallback = MANIFEST.name.en;
  let shortNameFallback = MANIFEST.short_name.en;
  let descriptionFallback = MANIFEST.description.en;

  let name = MANIFEST.name[userLang] || nameFallback;
  let shortName = MANIFEST.short_name[userLang] || shortNameFallback;
  let description = MANIFEST.description[userLang] || descriptionFallback;

  let manifest = {
    lang: userLang,
    id: MANIFEST.id,
    name: name,
    short_name: shortName,
    description: description,
    start_url: MANIFEST.start_url,
    display_override: MANIFEST.display_override,
    display: MANIFEST.display,
    orientation: MANIFEST.orientation,
    theme_color: MANIFEST.theme_color,
    background_color: MANIFEST.background_color,
    launch_handler: MANIFEST.launch_handler,
    categories: MANIFEST.categories,
    icons: MANIFEST.icons,
    screenshots: MANIFEST.screenshots,
    serviceworker: MANIFEST.serviceworker
  };

  manifest.shortcuts = [];
  for (let shortcut of MANIFEST.shortcuts) {
    let shortcutName = shortcut.name[userLang] || shortcut.name.en;
    let shortcutUrl = shortcut.url;
    let shortcutIcons = shortcut.icons;

    let translatedShortcut = {
      name: shortcutName,
      url: shortcutUrl,
      icons: shortcutIcons
    };

    manifest.shortcuts.push(translatedShortcut);
  }
  return manifest;
}

async function generateManifest(allLangs = false) {
  if (typeof JSZip === 'undefined') {
    let jsZipScript = document.createElement('script');
    jsZipScript.src = './app/libs/standalone/JSZip/jszip.min.js';
    jsZipScript.onload = function() {
      generateManifest(allLangs);
    };
    document.head.appendChild(jsZipScript);
    return;
  }

  let module = await import(`./templates/manifest_template.js`);
  const MANIFEST = module.MANIFEST;

  async function generateAndDownloadManifest(lang) {
    let manifest = await generateSingleManifest(lang, MANIFEST);
    let manifestJson = JSON.stringify(manifest);
    let fileName = `manifest.${lang}.webmanifest`;

    if (allLangs) {
      return { fileName, manifestJson };
    } else {
      let manifestBlob = new Blob([manifestJson], { type: 'application/json' });
      let manifestBlobUrl = URL.createObjectURL(manifestBlob);

      let downloadLink = document.createElement('a');
      downloadLink.href = manifestBlobUrl;
      downloadLink.setAttribute('download', fileName);
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  }

  if (allLangs) {
    let zip = new JSZip();
    let promises = [];
    for (let lang in nk.langs.list) {
      promises.push(generateAndDownloadManifest(lang));
    }
    let manifestDataArray = await Promise.all(promises);
    manifestDataArray.forEach(({ fileName, manifestJson }) => {
      zip.file(fileName, manifestJson);
    });

    zip.generateAsync({ type: "blob" }).then(function(content) {
      let downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(content);
      downloadLink.setAttribute('download', 'manifests.zip');
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  } else {
    let userLang = nk.settingConfig.get('lang');
    await generateAndDownloadManifest(userLang);
  }
}
window.generateManifest = generateManifest;

let dataArray = [];
let dataTimer;
dataArray.push({ to: 'nk.locale',              source: 'app/data/locale/misc.json',              as: 'misc' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/asset.templates.json', as: 'templates' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/asset.common.json',    as: 'common' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/main.ru.json',         as: 'ru' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/main.en.json',         as: 'en' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/main.ja.json',         as: 'ja' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/main.zh.json',         as: 'zh' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/main.ko.json',         as: 'ko' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/main.vi.json',         as: 'vi' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/main.mo.json',         as: 'mo' });
dataArray.push({ to: 'nk.locale.languageJSON', source: 'app/data/locale/common/main.ro.json',         as: 'ro' });

(nk.url.mode === 'tree' || nk.url.mode === null) && dataArray.push({ to: 'nk.items', source: 'app/data/items/links.json', as: 'links' });
nk.url.mode === 'license' && dataArray.push({ to: 'nk.locale', source: 'app/data/locale/license.json', as: 'licenseJSON' });
['kamon', 'banners'].includes(nk.url.mode) && dataArray.push({ to: 'nk.items',  source: `app/data/items/${nk.url.mode}.json`, as: `${nk.url.mode}`  });
DataExtend(dataArray, true, nk.timers.data).then((loadedData) => {});
