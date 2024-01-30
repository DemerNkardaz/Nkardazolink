<?php

$repoSizeURL = 'https://img.shields.io/github/repo-size/demernkardaz/Nkardazolink?callback=?';
$repoCreatedURL = 'https://badges.pufler.dev/created/DemerNkardaz/Nkardazolink';

try {
    $response = file_get_contents($repoSizeURL);

    if ($response === FALSE) {
        throw new Exception('Error fetching repository size');
    }

    $parser = new DOMDocument();
    $parser->loadXML($response);
    $repoSizeElement = $parser->getElementsByTagName('title')->item(0);
    $repoSizeText = trim(explode(': ', $repoSizeElement->textContent)[1]);
} catch (Exception $error) {
    echo 'Error fetching repository size: ' . $error->getMessage();
}

try {
    $response = file_get_contents($repoCreatedURL);

    if ($response === FALSE) {
        throw new Exception('Error fetching repository born date');
    }

    $parser = new DOMDocument();
    $parser->loadXML($response);
    $repoDateElement = $parser->getElementsByTagName('title')->item(0);

    $repoDateText = trim(explode(': ', $repoDateElement->textContent)[1]);

    // Замена текста на HTML разметку с учетом адаптивности
    $repoDateText = preg_replace_callback('/(\d+) days ago/', function ($matches) {
        $days = $matches[1];
        if ($days == 1) {
            return '<span data-key="days-ago-first">' . $days . ' день назад</span>';
        } elseif ($days >= 2 && $days <= 4) {
            return '<span data-key="days-ago-secondary">' . $days . ' дня назад</span>';
        } else {
            return '<span data-key="days-ago">' . $days . ' дней назад</span>';
        }
    }, $repoDateText);

    $repoDateText = preg_replace_callback('/(\d+) months ago/', function ($matches) {
        $months = $matches[1];
        if ($months == 1) {
            return '<span data-key="months-ago-first">' . $months . ' месяц назад</span>';
        } elseif ($months >= 2 && $months <= 4) {
            return '<span data-key="months-ago-secondary">' . $months . ' месяца назад</span>';
        } else {
            return '<span data-key="months-ago">' . $months . ' месяцев назад</span>';
        }
    }, $repoDateText);

    $repoDateText = preg_replace_callback('/(\d+) years ago/', function ($matches) {
        $years = $matches[1];
        if ($years == 1) {
            return '<span data-key="years-ago-first">' . $years . ' год назад</span>';
        } elseif ($years >= 2 && $years <= 4) {
            return '<span data-key="years-ago-secondary">' . $years . ' года назад</span>';
        } else {
            return '<span data-key="years-ago">' . $years . ' лет назад</span>';
        }
    }, $repoDateText);
} catch (Exception $error) {
    echo 'Error fetching repository born date: ' . $error->getMessage();
}



?>

<!DOCTYPE html>

<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title id="siteTitle" data-key="Nkardazolink">Нкардазолинк</title>
    <link rel="icon" href="favicon.png" type="image/x-icon">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css">

    <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.min.js"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.13.2/themes/dark-hive/jquery-ui.css">

    <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>

    <script type="module" src="variables.js"></script>
    <script type="module" src="default.js"></script>
    <link rel="stylesheet" href="css/fonts.css">
    <link rel="stylesheet" href="css/default.css">
    <link rel="stylesheet" href="css/adaptive.css">
    <link rel="stylesheet" href="css/skins.css">
    <link rel="stylesheet" href="css/word.css">
</head>

<body>
    <div id="siteBackdrop"></div>

    <div id="rootContainer">
        <div id="siteBackdropInverter"></div>
        <div class="contentContainerBlock">

            <div id="personBlock">
                <div id="personBanner">
                    <div id="personBannerImg"></div>
                </div>
                <div id="personAvatar">

                    <a id="personAvatarImg" href="#" class="gallery-trigger avatarThumbnail" data-fullres="resources/cherepkhed32.png" data-src="resources/cherepkhed32.png">
                        <img src="resources/cherepkhed32.png" alt="All Elements" width="74">
                        <span class="galleryTitle">
                            <h1>Личный ОС-Фурсона — Хертахирон</h1>
                        </span>
                    </a>

                </div>
                <span class="personFlex">
                    <span class="personFlexButton">
                        <span class="material-icons" id="settingsOpt">settings</span>
                    </span>
                    <span class="personPlate">
                        <h1 id="personName" data-key="DemerNkardaz">Демер Нкардаз</h1>
                    </span>
                    <span class="personFlexButton">
                        <span class="material-icons" id="moreInfoOpt">menu</span>
                    </span>
                </span>

                <span class="personInfo">
                    <span>Оммёдзи из Сайтамы</span>
                </span>
                <div class="blockumInformatorum">
                    <div id="moreInfoBlock">
                        <div class="listButton d-flex justify-content-between mb-3">
                            <span>Редкость:</span>
                            <span><span class="emoji-small elemental" style="margin: 0;">💠💠💠💠💠</span></span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Стихия:</span>
                            <span><span class="emoji-small elemental" style="filter: hue-rotate(200deg);">☢️</span>Интери</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Созвездие:</span>
                            <span><span class="emoji-small elemental">🌊</span>Водный Скорпион</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Луна:</span>
                            <span><span class="emoji-small elemental"><img src="resources/svg/chinese_coin_silver.svg" width="18px"></span>Металлический Дракон</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Регион:</span>
                            <span><span class="emoji-small elemental">⛩</span>Нихонсимагуни</span>
                        </div>
                        <hr class="col-9 mx-auto">
                        <div class="listButton d-flex justify-content-between">
                            <span>Пассивный навык:</span>
                            <span>Лень</span>
                        </div>
                        <hr class="col-9 mx-auto">
                        <div class="listButton d-flex justify-content-between">
                            <span>Открыть мон-дзо<span class="diacritic macron">̄</span>сё</span>
                            <span class="emoji-small">⚜️</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Открыть моньё-тэнто<span class="diacritic macron">̄</span></span>
                            <span class="emoji-small">🎎</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Показать веб-проекты</span>
                            <span class="emoji-small">💻</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Показать моды</span>
                            <span class="emoji-small">🥼</span>
                        </div>
                        <hr class="col-9 mx-auto">
                        <h2 class="mx-auto">Имена</h2>
                        <div class="listButton d-flex justify-content-between">
                            <span>Наэда Китэцуги</span>
                            <span>菜枝&#x3000;鬼鉄義</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Хёсугэ Хисахидэ</span>
                            <span>氷笥気&#x3000;久秀</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Ōниномё</span>
                            <span>鬼の名</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Тяньсяосю</span>
                            <span>天魈秀</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Никаикадзути-но Тацу-но<br>Дэйдара-но Микото</span>
                            <span style="text-align: end;">荷渦雷龍<br>出異田荒尊</span>
                        </div>

                        <a href="#" class="gallery-trigger personSeal" data-fullres="resources/svg/NkardazSeal.svg" data-src="resources/svg/NkardazSeal.svg">
                            <img src="resources/svg/NkardazSeal.svg" width="74">
                            <h1 class="galleryTitle">Личная печать,「荷渦雷龍出異田荒」</h1>
                        </a>

                    </div>
                    <div id="settingsBlock">
                        <div class="listButton d-flex justify-content-between">
                            <span>Язык:</span>
                            <span class="emoji-small elemental">🇷🇺</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Внешний вид:</span>
                            <span><span class="emoji-small elemental">🏯</span>Бьякудзё</span>
                        </div>
                        <div class="listButton d-flex justify-content-between">
                            <span>Обложка:</span>
                            <span><span class="emoji-small elemental">🌿</span>Аса-но ха</span>
                        </div>
                        <span class="mt-auto">

                        </span>
                        <div id="repoSize" class="listButton d-flex justify-content-between">
                            <span>Размер репозитория:</span>
                            <?php echo '<span>' . $repoSizeText . '</span>'; ?>
                        </div>
                        <div id="repoCreated" class="listButton d-flex justify-content-between">
                            <span>Создано:</span>
                            <?php echo '<span>' . $repoDateText . '</span>'; ?>
                        </div>
                        <div id="repoUpdated" class="listButton d-flex justify-content-between">
                            <span>Обновлено:</span>
                            <?php echo '<span>' . '</span>'; ?>
                        </div>
                        <hr class="col-9 mx-auto">
                        <h2 class="mx-auto">Библиотеки</h2>
                        <a href="https://github.com/twbs/bootstrap" target="_blank" class="listButton d-flex justify-content-between">
                            <span>Bootstrap 5.3.2</span>
                            <span><img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" width="20"></span>
                        </a>
                        <a href="https://github.com/jquery/jquery" target="_blank" class="listButton d-flex justify-content-between">
                            <span>JQuery 3.7.1</span>
                            <span><img src="https://avatars.githubusercontent.com/u/70142?s=48&v=4" width="20"></span>
                        </a>
                        <a href="https://github.com/jquery/jquery" target="_blank" class="listButton d-flex justify-content-between" style="display: none !important;">
                            <span>ReactJS 18 [планируется]</span>
                            <span><img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" width="20"></span>
                        </a>
                    </div>
                </div>
                <div id="personInformationBlock">
                    <div class="personDescription">
                        <span>Писатель в жанре фэнтези, автор вселенной «Царства Шагора», Hard-Surface моделлер, художник и верстальщик.</span>
                    </div>

                    <div id="miniFolioBlock">
                        <div class="miniFolioMain">

                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <span class="nav-link active" id="artwork-tab" data-bs-toggle="tab" data-bs-target="#artwork" type="button" role="tab" aria-controls="artwork" aria-selected="true">
                                        <img src="resources/svg/icos/art.svg" width="28">
                                    </span>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <span class="nav-link" id="modeling-tab" data-bs-toggle="tab" data-bs-target="#modeling" type="button" role="tab" aria-controls="modeling" aria-selected="false">
                                        <img src="resources/svg/icos/3d.svg" width="28">
                                    </span>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <span class="nav-link" id="layout-tab" data-bs-toggle="tab" data-bs-target="#layout" type="button" role="tab" aria-controls="layout" aria-selected="false">
                                        <img src="resources/svg/icos/book.svg" width="28">
                                    </span>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <span class="nav-link" id="git-tab" data-bs-toggle="tab" data-bs-target="#git" type="button" role="tab" aria-controls="git" aria-selected="false">
                                        <img src="resources/svg/icos/github.svg" width="24">
                                    </span>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <span class="nav-link" id="mods-tab" data-bs-toggle="tab" data-bs-target="#mods" type="button" role="tab" aria-controls="layout" aria-selected="false">
                                        <img src="resources/svg/icos/mods.svg" width="24">
                                    </span>
                                </li>
                            </ul>

                            <div class="tab-content">
                                <div class="tab-pane active" id="artwork" role="tabpanel" aria-labelledby="artwork-tab">

                                    <div class="galleryGrid">
                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail" data-fullres="resources/png/japan/sashimono_of_deidara_clan_set.png" data-src="resources/png/japan/kamon_of_deidara_clan.png">
                                            <img src="resources/png/japan/kamon_of_deidara_clan.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Камон и сасимоно рода Дэидара【「出居田荒氏」家紋と指物の旗】</h1>
                                        </a>

                                        <a href="#" class="gallery-trigger galleryThumbnail" data-fullres="resources/png/magic/all_elements.png" data-src="resources/png/magic/lunna_03_fire_02.png">
                                            <img src="resources/png/magic/lunna_03_fire_02.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Сеты иконок магических стихий и чакр (справа)</h1>
                                        </a>

                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/japan/chars/Samurai_Glyphs_Set.png" data-src="resources/png/japan/chars/D_Hatagama_Musatada_Glyph_thumb.png">
                                            <img src="resources/png/japan/chars/D_Hatagama_Musatada_Glyph_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Глифы персонажей «Датэ Масамунэ», «Дэидара Угимаса», «Хатагама Мусатада — муж ветра и дождя», «Хатиман — бог войны и стрельбы из лука» и «Хатиман-но Инэкама»</h1>
                                        </a>

                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/japan/Map_of_Taira_Hashirama.png" data-src="resources/png/japan/Map_of_Taira_Hashirama.png">
                                            <img src="resources/png/japan/Map_of_Taira_Hashirama.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Ветхая карта полководца Тайра-но Хасирамы для обсуждения стратегии войны</h1>
                                        </a>

                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/china/jiangu_full_bg_golden v2.png" data-src="resources/png/china/jiangu_full_bg_golden v2_thumb.png">
                                            <img src="resources/png/china/jiangu_full_bg_golden v2_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Горы близь к янтарному духу-змею Хуану Фэнцяну, где-то в провинции Кань</h1>
                                        </a>

                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/magic/AllZodiacs horiz_small.png" data-src="resources/png/magic/zodiac_wheel_thumb.png">
                                            <img src="resources/png/magic/zodiac_wheel_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Шестнадцать зодиаков Шагора</h1>
                                        </a>

                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/magic/shining_core.png" data-src="resources/png/magic/shining_core_thumb.png">
                                            <img src="resources/png/magic/shining_core_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Сияющее ядро</h1>
                                        </a>

                                        <a href="#" class="gallery-trigger galleryThumbnail sashimono" data-fullres="resources/png/japan/set_of_sashimono_01.png" data-src="resources/png/japan/sashimono_of_matsudaira_clan_royal.png">
                                            <img src="resources/png/japan/sashimono_of_matsudaira_clan_royal.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Знамёна «Сасимоно»</h1>
                                        </a>

                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sashimono" data-fullres="resources/png/japan/set_of_sashimono_02.png" data-src="resources/png/japan/sashimono_of_sakatori_clan.png">
                                            <img src="resources/png/japan/sashimono_of_sakatori_clan.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Знамёна «Сасимоно»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sashimono" data-fullres="resources/png/japan/set_of_sashimono_03.png" data-src="resources/png/japan/sashimono_of_arima_clan.png">
                                            <img src="resources/png/japan/sashimono_of_arima_clan.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Знамёна «Сасимоно»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/darksesses/general_ash.png" data-src="resources/png/darksesses/general_ash_thumb.png">
                                            <img src="resources/png/darksesses/general_ash_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">«Эш» — один из генералов Гакхора</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/Corbodon_armor.png" data-src="resources/png/ferrolyths/Corbodon_armor_thumb.png">
                                            <img src="resources/png/ferrolyths/Corbodon_armor_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Броня «Корбодон» фракции Йерхон</h1>
                                        </a>

                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sashimono" data-fullres="resources/png/vietnam/set_of_vietnamese_banners.png" data-src="resources/png/vietnam/banner_of_vietnam_empire.png">
                                            <img src="resources/png/vietnam/banner_of_vietnam_empire.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Штандарты и гербы царств «Вьетнам», «Намвьет», «Дайнгу», «Ун» и «Да Фанн»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sashimono" data-fullres="resources/png/japan/cards_of_clans/Set_of_Cards.png" data-src="resources/png/japan/cards_of_clans/Card_of_Matsudaira_thumb.png">
                                            <img src="resources/png/japan/cards_of_clans/Card_of_Matsudaira_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Рубашки карт кланов «Акэти», «Мацудайра» и «Умицуга»</h1>
                                        </a>

                                    </div>

                                </div>
                                <div class="tab-pane" id="modeling" role="tabpanel" aria-labelledby="modeling-tab">

                                    <div class="galleryGrid">
                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail" data-fullres="resources/png/3DBooks/Nakabashira.png" data-src="resources/png/3DBooks/Nakabashira_thumb.png">
                                            <img src="resources/png/3DBooks/Nakabashira_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Книга «Сказ о деревушке Накабасира»,「中柱村物語」</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail" data-fullres="resources/png/3DBooks/Lorebook_Yamato.png" data-src="resources/png/3DBooks/Lorebook_Yamato_thumb.png">
                                            <img src="resources/png/3DBooks/Lorebook_Yamato_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Лорбук «Самураи. Нихонсимагуни. Ямато»,「侍・日本島国・大和」</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail" data-fullres="resources/png/3DBooks/Lorebook_Set.png" data-src="resources/png/3DBooks/Lorebook_Nindo_thumb.png">
                                            <img src="resources/png/3DBooks/Lorebook_Nindo_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Лорбуки «Кланы. Нихонсимагуни. Истории кланов», «Управление Тёмного и Светлого начал. Нихонсимагуни. Магические техники», «Старые письма. Нихонсимагуни. Летописи великих», «Записи о терпеливой флейте. Нихонсимагуни. Путь
                                                Синоби»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/AT12.png" data-src="resources/png/ferrolyths/AT12_thumb.png">
                                            <img src="resources/png/ferrolyths/AT12_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">AT-12 — средний штурмовой танк фракции Йерхон Ферролитов</h1>
                                        </a>

                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/AT12A7.png" data-src="resources/png/ferrolyths/AT12A7_thumb.png">
                                            <img src="resources/png/ferrolyths/AT12A7_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">AT-12A7 — средняя САУ калибра 160-мм</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/HT1.png" data-src="resources/png/ferrolyths/HT1_thumb.png">
                                            <img src="resources/png/ferrolyths/HT1_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">HT-1 — тяжёлый штурмовой танк</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/Lander.png" data-src="resources/png/ferrolyths/Lander_thumb.png">
                                            <img src="resources/png/ferrolyths/Lander_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Лэндер / Поверхностный Рейдер — малый танк</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease tank" data-fullres="resources/png/ferrolyths/Sch_stpz.png" data-src="resources/png/ferrolyths/Sch_stpz_thumb.png">
                                            <img src="resources/png/ferrolyths/Sch_stpz_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">«Schnell Sturmpanzer VI FE» (Sch. StPz. VI FE) — лёгкий танк фракции Йерхон со 110-мм орудием</h1>
                                        </a>

                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/Lasgun_rigel.png" data-src="resources/png/ferrolyths/Lasgun_rigel_thumb.png">
                                            <img src="resources/png/ferrolyths/Lasgun_rigel_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Лазвинтовка образца «Ригель»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease gun" data-fullres="resources/png/ferrolyths/Lasraycaster_rigel.png" data-src="resources/png/ferrolyths/Lasraycaster_rigel_thumb.png">
                                            <img src="resources/png/ferrolyths/Lasraycaster_rigel_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Лучемёт образца «Ригель»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/Lacrimator_HMG.png" data-src="resources/png/ferrolyths/Lacrimator_HMG_thumb.png">
                                            <img src="resources/png/ferrolyths/Lacrimator_HMG_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">«Лакриматор» — тяжёлый пулемёт калибра 15-мм</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/Maser_weapons.png" data-src="resources/png/ferrolyths/Mascannon_rigel_thumb.png">
                                            <img src="resources/png/ferrolyths/Mascannon_rigel_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Мазерное (микроволновое) оружие образца «Ригель»</h1>
                                        </a>

                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/factorio_mods/Factorio_resources_PLORD_vol_1.png" data-src="resources/png/factorio_mods/16_tin_thumb.png">
                                            <img src="resources/png/factorio_mods/16_tin_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Ресурсы для мода Факторио</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/factorio_mods/Prometheus_tech.png" data-src="resources/png/factorio_mods/Prometheus_tech_thumb.png">
                                            <img src="resources/png/factorio_mods/Prometheus_tech_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Гранаты 40-мм для «Прометея»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/Stone_1.png" data-src="resources/png/Stone_1_thumb.png">
                                            <img src="resources/png/Stone_1_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Просто камушек</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/Stone_2.png" data-src="resources/png/Stone_2_thumb.png">
                                            <img src="resources/png/Stone_2_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Ещё одни просто камушки</h1>
                                        </a>

                                    </div>

                                </div>
                                <div class="tab-pane" id="layout" role="tabpanel" aria-labelledby="layout-tab">
                                    <div class="galleryGrid">
                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/magic/elements_binary_reactions_ru.png" data-src="resources/png/magic/elements_binary_reactions_ru_thumb.png" data-pdf="resources/pdf/elements_binary_reactions_ru.pdf">
                                            <img src="resources/png/magic/elements_binary_reactions_ru_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Бинарные реакции стихий</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/astro/Shagor_during_year.png" data-src="resources/png/astro/Shagor_during_year_thumb.png.png">
                                            <img src="resources/png/astro/Shagor_during_year_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Положение Шагора в течение оборота вокруг Балгримура</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/ferrolyths/Sonma_lascannon_sheet.png" data-src="resources/png/ferrolyths/Sonma_lascannon_sheet_thumb.png" data-pdf="resources/pdf/Sonma_lascannon_sheet.pdf">
                                            <img src="resources/png/ferrolyths/Sonma_lascannon_sheet_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">«Сонма» — характеристики лазерного орудия</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/magic/AstralConnection_ru.png" data-src="resources/png/magic/AstralConnection_ru_thumb.png">
                                            <img src="resources/png/magic/AstralConnection_ru_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Схема творения магической техники</h1>
                                        </a>

                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/magic/MagatePeriodicTable_v4.png" data-src="resources/png/magic/MagatePeriodicTable_v4_thumb.png">
                                            <img src="resources/png/magic/MagatePeriodicTable_v4_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Таблица магатов (магических модификаций) химических элементов</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/2DBooks/Nakabashira_cover.png" data-src="resources/png/2DBooks/Nakabashira_cover_thumb.png" data-pdf="resources/pdf/Nakabashira_cover.pdf">
                                            <img src="resources/png/2DBooks/Nakabashira_cover_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Обложка «Сказ о деревушке Накабасира. Том 1»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/2DBooks/Nakabashira_Title.png" data-src="resources/png/2DBooks/Nakabashira_Title_thumb.png" data-pdf="resources/pdf/Nakabashira_cutpart.pdf">
                                            <img src="resources/png/2DBooks/Nakabashira_Title_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Образец разворота «Сказ о деревушке Накабасира. Том 1»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Title.png" data-src="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Title_thumb.png" data-pdf="resources/pdf/Nakabashira_cutpart.pdf">
                                            <img src="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Title_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Образец разворота «Сказ о деревушке Накабасира. Том 1»</h1>
                                        </a>

                                        <!-- Stack -->
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_1_2.png" data-src="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_1_2_thumb.png" data-pdf="resources/pdf/Nakabashira_cutpart.pdf">
                                            <img src="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_1_2_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Образец разворота «Сказ о деревушке Накабасира. Том 1»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_3_4.png" data-src="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_3_4_thumb.png" data-pdf="resources/pdf/Nakabashira_cutpart.pdf">
                                            <img src="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_3_4_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Образец разворота «Сказ о деревушке Накабасира. Том 1»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_5_6.png" data-src="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_5_6_thumb.png" data-pdf="resources/pdf/Nakabashira_cutpart.pdf">
                                            <img src="resources/png/2DBooks/Nakabashira_Chapter_1_Edisode_1_Pages_5_6_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Образец разворота «Сказ о деревушке Накабасира. Том 1»</h1>
                                        </a>
                                        <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/2DBooks/Iron_Armorium_preview.png" data-src="resources/png/2DBooks/Iron_Armorium_preview_thumb.png" data-pdf="resources/pdf/Iron_Armorium_preview.pdf">
                                            <img src="resources/png/2DBooks/Iron_Armorium_preview_thumb.png" width="74" loading="lazy">
                                            <h1 class="galleryTitle">Образец разворота «Железного Армориума» [Версия наброска]</h1>
                                        </a>

                                        <!-- Stack -->
                                    </div>
                                </div>

                                <div class="tab-pane" id="git" role="tabpanel" aria-labelledby="layout-tab">

                                    <div class="galleryGrid vertical">

                                        <div class="verticalGalleryBlock">
                                            <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/gif/mechanicodeus.gif" data-src="resources/png/mechanicodeus_thumb.png">
                                                <img src="resources/png/mechanicodeus_thumb.png" width="74" loading="lazy">
                                                <h1 class="galleryTitle">МеханиКодеус</h1>
                                            </a>
                                            <div class="vertGallDesc">
                                                <a href="https://demernkardaz.github.io/MechaniCodeus/" target="_blank">
                                                    <span class="d-flex justify-content-between">
                                                        <h5>МеханиКодеус</h5><img src="https://cdn2.steamgriddb.com/icon/8c9b3de1e2d4afbb00c8d0ed13c9da34/32/256x256.png" width="18" height="18" loading="eager">
                                                    </span>
                                                </a>
                                                <p>Разрабатываемый интерфейс для нужд моддинга Dawn of War.</p>
                                            </div>
                                        </div>
                                        <div class="verticalGalleryBlock">
                                            <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/misc_scripts.png" data-src="resources/png/misc_scripts_thumb.png">
                                                <img src="resources/png/misc_scripts_thumb.png" width="74" loading="lazy">
                                                <h1 class="galleryTitle">Различные скрипты...</h1>
                                            </a>
                                            <div class="vertGallDesc">
                                                <a href="https://github.com/DemerNkardaz/Misc-Scripts" target="_blank">
                                                    <span class="d-flex justify-content-between">
                                                        <h5>Misc Scripts</h5><img src="https://avatars.githubusercontent.com/u/11524380?s=48&v=4" width="18" height="18" loading="eager">
                                                    </span>
                                                </a>
                                                <p>Репозиторий со всякими скриптами...</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                                <div class="tab-pane" id="mods" role="tabpanel" aria-labelledby="layout-tab">

                                    <div class="galleryGrid vertical">

                                        <div class="verticalGalleryBlock">
                                            <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/factorio_mods/prometheus.png" data-src="resources/png/factorio_mods/prometheus_thumb.png" data-youtube="https://www.youtube.com/embed/-ib1mqXvNl4">
                                                <img src="resources/png/factorio_mods/prometheus_thumb.png" width="74" loading="lazy">
                                                <h1 class="galleryTitle">«Прометей» 40-мм</h1>
                                            </a>
                                            <div class="vertGallDesc">
                                                <a href="https://mods.factorio.com/mod/PLORD_Prometheus_GrenadeLauncher" target="_blank">
                                                    <span class="d-flex justify-content-between">
                                                        <h5>«Прометей» 40-мм</h5><img src="https://factorio.com/static/img/factorio-wheel.png" width="18" height="18" loading="eager">
                                                    </span>
                                                </a>
                                                <p>Мод для Факторио, добавляющий ручной и стационарный гранатомёты с различными типами боеприпасов.</p>
                                            </div>
                                        </div>
                                        <div class="verticalGalleryBlock">
                                            <a href="#" class="gallery-trigger galleryThumbnail sizeIncrease" data-fullres="resources/png/factorio_mods/plord.png" data-src="resources/png/factorio_mods/plord_thumb.png" data-youtube="https://www.youtube.com/embed/v3LDboXqSHI">
                                                <img src="resources/png/factorio_mods/plord_thumb.png" width="74" loading="lazy">
                                                <h1 class="galleryTitle">Пласторданция (В разработке)</h1>
                                            </a>
                                            <div class="vertGallDesc">
                                                <a href="https://mods.factorio.com/user/demernkardaz" target="_blank">
                                                    <span class="d-flex justify-content-between">
                                                        <h5>Пласторданция <sup style="font-size: 10px">(В разработке)</sup></h5><img src="https://factorio.com/static/img/factorio-wheel.png" width="18" height="18" loading="eager">
                                                    </span>
                                                </a>
                                                <p>Мод для Факторио, добавляющий новые предметы, рецепты, технологии и взаимодействия.</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="personKamon">
                        <div class="personKamonParent">
                            <a href="#" class="gallery-trigger" data-fullres="resources/svg/NkardazKamon_Full.svg" data-src="resources/svg/NkardazKamon.svg">
                                <img src="resources/svg/NkardazKamon.svg" width="40">
                                <h1 class="galleryTitle">Личный мон (герб) — цветок горечавки, ветви глицинии, половина цветка хризантемы и 3 томоэ</h1>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div id="linkBlock">
                <div id="personLinksBlock">
                    <div id="linkBlockParent">
                        <div class="linksOfPerson" id="linksContent">
                            <span class="linksOfPersonHeader">
                                <hr>
                                <h1>Контент</h1>
                                <hr>
                            </span>
                            <div class="linksSetParent">
                                <div class="scrollControlsParent">
                                    <div class="scrollControls">
                                        <span class="material-icons" data-scroll="up">keyboard_double_arrow_up</span>
                                        <span class="material-icons" data-scroll="down">keyboard_double_arrow_down</span>
                                    </div>
                                </div>
                                <div class="linksSet">
                                    <a href="https://ficbook.net/authors/4241255" class="linkBlock" target="_blank" data-bg="url(https://assets.ficbook.net/assets/design/profile_default_bg.png), #f6ecda" data-bg-size="150%" data-bg-pos="50% 45%" data-avatar="https://images.ficbook.net/avatars/hWUeiDGi2ZgPcI72heSScy8DLQ1wkNun.jpg" data-avatar-tooltip="tooltip" data-avatar-tooltip-pos="right" data-avatar-tooltip-title="Аниме «Чёрный Клевер»" data-avatar-tooltip-title-key="Blackclover_Anime" data-title="Книга Фанфиков" data-title-key="Fickbook" data-types="writing" data-site="external/fickbook_logo.svg" data-site-scale="50px" data-site-pos="-2px, -2px">
                                    </a>
                                    <a href="https://author.today/u/demer_nkardaz" class="linkBlock" target="_blank" data-bg="url(https://cm.author.today/content/2023/07/07/4bac28c43b3b4d6eaa6c6646bf977220.jpg), #7b85a3" data-bg-pos="50% 5%" data-arrow-blend="color-dodge" data-avatar="https://cm.author.today/content/2023/09/08/d1419456461a4cf9adf4163ea03fce55.jpg" data-avatar-tooltip="tooltip" data-avatar-tooltip-pos="right" data-avatar-tooltip-title="Автор Peropicnic, аниме «Повесть о доме Тайра»" data-avatar-tooltip-title-key="Peropicnic_Heike_Art" data-title="Author.Today" data-title-key="AutorToday" data-types="writing" data-site="external/author_today_logo.svg" data-site-scale="70px" data-site-pos="-12px, -15px">
                                    </a>
                                    <a href="https://www.artstation.com/demernkardaz" class="linkBlock" target="_blank" data-bg="url(https://cdnb.artstation.com/p/users/covers/004/308/091/default/ed360d2bc08458597cbfa650a51c8f7e.jpg), #b85d14" data-bg-size="150%" data-bg-pos="50% 0%" data-arrow-blend="color-dodge" data-avatar="https://cdnb.artstation.com/p/users/avatars/004/308/091/large/9e05d5d5427f31d392d6d6df0ecd2331.jpg" data-avatar-tooltip="tooltip" data-avatar-tooltip-pos="right" data-avatar-tooltip-title="Хатиман, бог войны" data-avatar-tooltip-title-key="HachimanJin" data-title="ArtStation" data-title-key="ArtStation" data-types="artwork, modeling, layout" data-site="external/artstation_logo.svg" data-site-scale="70px" data-site-pos="-12px, -15px">
                                    </a>

                                    <a href="https://vk.com/club203543966" class="linkBlock" target="_blank" data-bg="url('../resources/png/china/jiangu_full_bg_golden v2_thumb.png'), #fffd51" data-bg-pos="50% 60%" data-arrow-blend="color-dodge" data-avatar="resources/png/japan/icons/bf_00_Hachiman_yellow_s.png" data-avatar-tooltip="tooltip" data-avatar-tooltip-pos="right" data-avatar-tooltip-title="Хатиман, бог войны" data-avatar-tooltip-title-key="HachimanJin" data-title="Царства Шагора" data-title-key="ShagorRealms" data-types="artwork, modeling, layout, writing" data-site="external/VK_logo.svg" data-site-scale="70px" data-site-pos="-20px, -15px">
                                    </a>

                                    <a href="https://dtf.ru/u/266902-demer-nkardaz" class="linkBlock" target="_blank" data-bg="url('https://leonardo.osnova.io/15784ecb-c2bd-54ca-91d3-fbaf396d3002/-/scale_crop/960/-/format/webp/'), #dbe1da" data-bg-pos="50% 40%" data-avatar="https://leonardo.osnova.io/3c89e2c2-a2e8-5256-9f0c-096a75d34923/-/scale_crop/200x200/-/format/webp/" data-avatar-tooltip="tooltip" data-avatar-tooltip-pos="right" data-avatar-tooltip-title="Аниме «Наруто»" data-avatar-tooltip-title-key="Naruto_Anime" data-title="Блог на DTF" data-title-key="DTF_Blog" data-types="artwork, modeling, layout, writing" data-site="external/DTF_logo.svg" data-site-scale="100px" data-site-pos="-5px, -10px">
                                    </a>

                                    <a href="https://vk.com/public219642160" class="linkBlock mid_grey_arrow inactive" target="_blank" data-bg="url('../external/Ghost_of_Tsushima.jpg'), #a14643" data-bg-pos="50% 50%" data-arrow-blend="color-dodge" data-avatar="resources/cherepkhed32.png" data-avatar-tooltip="tooltip" data-avatar-tooltip-pos="right" data-avatar-tooltip-title="Хертахирон" data-avatar-tooltip-title-key="Khertahiron" data-title="Наэда Китэцуги" data-title-key="NaedaKitetsugi" data-types="artwork" data-site="external/VK_logo.svg" data-site-scale="70px" data-site-pos="-20px, -15px">
                                    </a>

                                </div>
                            </div>
                        </div>
                        <div class="linksOfPerson">
                            <span class="linksOfPersonHeader">
                                <hr>
                                <h1>Социалус</h1>
                                <hr>
                            </span>
                            <div class="linksSetParent" id="linksSocialus">
                                <div class="scrollControlsParent">
                                    <div class="scrollControls">
                                        <span class="material-icons" data-scroll="up">keyboard_double_arrow_up</span>
                                        <span class="material-icons" data-scroll="down">keyboard_double_arrow_down</span>
                                    </div>
                                </div>
                                <div class="linksSet">
                                    <a href="https://shikimori.one/Демер+Нкардаз" class="linkBlock" target="_blank" data-bg="url(https://i.imgur.com/Lh1C2F0l.jpg), #ffcad4" data-bg-size="100%" data-bg-pos="50% 57%" data-avatar="https://desu.shikimori.one/system/users/x160/1137748.png?1658010531" data-avatar-tooltip="tooltip" data-avatar-tooltip-pos="right" data-avatar-tooltip-title="Аниме «Наруто»" data-avatar-tooltip-title-key="Naruto_Anime" data-title="Шикимори" data-title-key="Shikimori" data-text="Манганимешный список" data-site="external/shikimori_logo.svg" data-site-scale="60px" data-site-pos="-13px, -15px">
                                    </a>
                                    <a href="https://steamcommunity.com/profiles/76561198177249942" class="linkBlock" target="_blank" data-bg="url(https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/570/51c2cf9ddfe8a170b458fc37ff55b083f6a5ec6c.jpg), #2868ee" data-bg-size="110%" data-bg-pos="50% 25%" data-arrow-blend="color-dodge" data-avatar="https://cdn.akamai.steamstatic.com/steamcommunity/public/images/items/2022180/2b76687e49715a75da390cd0ff4f84f5c5382cb2.gif" data-avatar-tooltip="tooltip" data-avatar-tooltip-pos="right" data-avatar-tooltip-title="Привет" data-avatar-tooltip-title-key="Hello" data-title="STEAM" data-text="Игрульки" data-site="external/steam_logo.svg" data-site-scale="70px" data-site-pos="5px, 2px">
                                    </a>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="lightBoxContainer">
                    <span id="lightBoxGalleryCloseBtn" class="material-icons">close</span>
                    <div id="lightBoxGalleryList">

                    </div>
                    <div id="lightBoxGalleryPicture">

                        <div id="selectedPictureContainer">
                            <div id="selectedPictureParent">
                                <img src alt id="selectedGalleryPicture">
                                <iframe id="selectedYouTubeVideo" width="100%" src frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>
                            </div>
                            <span id="selectedPictureControls" class="personInfo">
                                <span class="material-icons" id="selectedPictureDownload">download</span>
                                <span class="material-icons" id="selectedPictureFullscreen">fullscreen</span>
                                <span class="material-icons" id="selectedPictureBlankPage">launch</span>
                            </span>
                            <span id="selectedPictureSpecials" class="personInfo">
                                <span class="material-icons" id="selectedPicturePDFVersion" data-pdf>picture_as_pdf</span>
                                <span class="material-icons" id="selectedPictureYouTubeVideo" data-pdf><img src="resources/svg/social_youtube_dark.svg" width="20" class="socialIconSVG"></span>
                            </span>
                            <h1 id="selectedGalleryTitle"></h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>
    <div class="progress_bar_block" id="progressEntityDummy">
        <div class="progress_folder"><img src="resources/svg/NkardazKamon.svg" width="100"></div>
    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>