export const MANIFEST = {
  id: 'com.demernkardaz.app',
  name: { ru: 'Нкардазолинк', en: 'Nkardazolink' },
  short_name: { ru: 'Нкардаз', en: 'Nkardaz', ja: 'ナカルダズ', zh: '尼卡尔达兹', ko: '니카르다즈', vi: 'Nkarđaz' },
  description: { ru: 'Персональный сайт Демера Нкардаз', en: 'Demer Nkardaz’s personal website' },
  start_url: '/Nkardazolink/',
  display_override: ['window-controls-overlay'],
  display: 'standalone',
  orientation: 'any',
  theme_color: '#E2B13C',
  background_color: '#333333',
  launch_handler: { client_mode: ['focus-existing', 'auto'] },
  categories: ['books', 'literature', '3d', 'art', 'design', 'graphics', 'layout', 'wolrdbuilding', 'lore', 'artist', 'developer'],
  shortcuts: [
    {
      name: { ru: 'Мондзёсё | Галерей Гербов', en: 'Monjōshō | The Gallery of Crests' },
      url: '/Nkardazolink/?mode=kamon',
      icons: [
        { src: './android/android_48x48.png', sizes: '48x48', type: 'image/png' },
        { src: './android/android_72x72.png', sizes: '72x72', type: 'image/png' },
        { src: './android/android_96x96.png', sizes: '96x96', type: 'image/png' },
        { src: './android/android_144x144.png', sizes: '144x144', type: 'image/png' },
        { src: './android/android_192x192.png', sizes: '192x192', type: 'image/png' }
      ]
    },
    {
      name: { ru: 'Сасимоно Тэнранкай | Выставка Штандартов', en: 'Sashimono Tenrankai | The Banners Exhibition' },
      url: '/Nkardazolink/?mode=banners',
      icons: [
        { src: './android/android_48x48.png', sizes: '48x48', type: 'image/png' },
        { src: './android/android_72x72.png', sizes: '72x72', type: 'image/png' },
        { src: './android/android_96x96.png', sizes: '96x96', type: 'image/png' },
        { src: './android/android_144x144.png', sizes: '144x144', type: 'image/png' },
        { src: './android/android_192x192.png', sizes: '192x192', type: 'image/png' }
      ]
    }
  ],
  icons: [
    { src: './android/android_48x48.png', sizes: '48x48', type: 'image/png' },
    { src: './android/android_72x72.png', sizes: '72x72', type: 'image/png' },
    { src: './android/android_96x96.png', sizes: '96x96', type: 'image/png' },
    { src: './android/android_144x144.png', sizes: '144x144', type: 'image/png' },
    { src: './android/android_192x192.png', sizes: '192x192', type: 'image/png' },
    { src: './android/android_256x256.png', sizes: '256x256', type: 'image/png' },
    { src: './android/android_512x512.png', sizes: '512x512', type: 'image/png' },
    { src: './android/android_48x48-mask.png', sizes: '48x48', type: 'image/png', purpose: 'maskable' },
    { src: './android/android_72x72-mask.png', sizes: '72x72', type: 'image/png', purpose: 'maskable' },
    { src: './android/android_96x96-mask.png', sizes: '96x96', type: 'image/png', purpose: 'maskable' },
    { src: './android/android_144x144-mask.png', sizes: '144x144', type: 'image/png', purpose: 'maskable' },
    { src: './android/android_192x192-mask.png', sizes: '192x192', type: 'image/png', purpose: 'maskable' },
    { src: './android/android_256x256-mask.png', sizes: '256x256', type: 'image/png', purpose: 'maskable' },
    { src: './android/android_512x512-mask.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ],
  screenshots: [
    { src: './screenshot720p_win.webp', sizes: '1280x720', type: 'image/webp', form_factor: 'wide', platform: 'windows' },
    { src: './screenshot720p_mob.webp', sizes: '324x720', type: 'image/webp', form_factor: 'narrow', platform: 'android' }
  ],
  serviceworker: { src: './serviceworker.js', scope: './', use_cache: true }
}
