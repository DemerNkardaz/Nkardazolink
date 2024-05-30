export const MANIFEST = {
  id: 'com.demernkardaz.app',
  name: { ru: 'Нкардазолинк', en: 'Nkardazolink' },
  short_name: { ru: 'Нкардаз', en: 'Nkardaz' },
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
        { src: './icon-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: './icon-128x128.png', sizes: '128x128', type: 'image/png' }
      ]
    },
    {
      name: { ru: 'Сасимоно Тэнранкай | Выставка Штандартов', en: 'Sashimono Tenrankai | The Banners Exhibition' },
      url: '/Nkardazolink/?mode=banners',
      icons: [
        { src: './icon-64x64.png', sizes: '64x64', type: 'image/png' },
        { src: './icon-128x128.png', sizes: '128x128', type: 'image/png' }
      ]
    }
  ],
  icons: [
    { src: './icon-64x64.png', sizes: '64x64', type: 'image/png' },
    { src: './icon-128x128.png', sizes: '128x128', type: 'image/png' },
    { src: './icon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: './icon-256x256.png', sizes: '256x256', type: 'image/png' },
    { src: './icon-512x512.png', sizes: '512x512', type: 'image/png' },
    { src: './icon-512x512mask.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
  ],
  screenshots: [
    { src: './screenshot720p_win.webp', sizes: '1280x720', type: 'image/webp', form_factor: 'wide', platform: 'windows' },
    { src: './screenshot720p_mob.webp', sizes: '324x720', type: 'image/webp', form_factor: 'narrow', platform: 'android' }
  ],
  serviceworker: { src: './serviceworker.js', scope: './', use_cache: true }
}
