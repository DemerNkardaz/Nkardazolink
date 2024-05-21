(nk.url.mode && !availableModes.includes(nk.url.mode)) ||
((nk.url.mode === 'cv') && (!nk.url.select || !availableSelects.includes(nk.url.select))) ? redirect.origin() : null;

nk.settingConfig.get('lang') ? $('html').attr('lang', nk.settingConfig.get('lang')) : $('html').attr('lang', 'ru');


var metaData = {
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


//if (nk.settingConfig.get('turn_off_preloader') !== true) { $('body').prepend(new nk.ui.Preloader()) };



let dataArray = [];
let dataTimer;
dataArray.push({ to: 'nk.locale', source: 'app/data/miscellaneous.json', as: 'miscellaneous' });
dataArray.push({ to: 'nk.locale', source: 'app/data/locale.json',        as: 'languageJSON' });
dataArray.push({ to: 'window',    source: 'repository-info.json',        as: 'repositoryInfoJSON' });
(nk.url.mode === 'tree' || nk.url.mode === null) && dataArray.push({ to: 'nk.items', source: 'app/data/links.json', as: 'links' });
nk.url.mode === 'license' && dataArray.push({ to: 'nk.locale', source: 'app/data/license.json', as: 'licenseJSON' });
['kamon', 'banners'].includes(nk.url.mode) && dataArray.push({ to: 'nk.items',  source: `app/data/${nk.url.mode}.json`, as: `${nk.url.mode}`  });
DataExtend(dataArray, true, nk.timers.data).then((loadedData) => { });
