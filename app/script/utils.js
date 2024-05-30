$.fn.countTextVolume = function() {
		let char_count = 0;
		this.each(function() {
				char_count += $(this).text().trim().length;
		});
		let formatted_count = char_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, String.fromCharCode(0x2007));
		return formatted_count;
};

$.fn.countAuthorLists = function() {
		let char_count = parseInt(this.countTextVolume().replace(/\s/g,''));
		let formatted_volume = (char_count / 40000).toFixed(2);
		return formatted_volume;
};


async function replaceTextLinkToTag (text) {
  const linkRegex = /((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/gi;
  const links = text.match(linkRegex);
  if (!links) { return text; }

  for (let i = 0; i < links.length; i++) {
    const url = links[i];
    try {
      const response = await fetch(url);
      const html = await response.text();
      const title = html.match(/<title>(.*?)<\/title>/i)[1];
      text = text.replace(url, `<a href="${url}" target="_blank" title="${title}">${title}</a>`);
    } catch (err) {
      console.error('Ошибка при запросе:', err);
    }
  }
  return text;
}
window.replaceTextLinkToTag = replaceTextLinkToTag;

String.prototype.stripHTML = function() {
  return this.replace(/<[^>]+>/g, '');
};

function unpackArrayToStrings(text) {
	if (Array.isArray(text)) {
		return text.join('\n');
	} else {
		return text;
	}
}
String.prototype.unpackArray = function() {
  return this;
};
Array.prototype.unpackArray = function() {
  return unpackArrayToStrings(this);
}

function ideographicsSpaceToCJKV(text) {
		const regex = /([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}])\s+([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}])/gu;
		return text.replace(regex, '$1\u3000$2');
}
String.prototype.ideoSpaceToCJKV = function() {
  return ideographicsSpaceToCJKV(this);
}

const socials = {
  '@twitter': ['https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg', 'Twitter', ['(x.com)']],
  '@pixiv': ['https://upload.wikimedia.org/wikipedia/commons/7/7e/Pixiv_Icon.svg', 'Pixiv.net'],
}

function replaceSocials(text) {
  return text.replace(/@\w+\b/g, (match) => {
    if (socials[match]) {
      const src = socials[match][0];
      const alt = `${socials[match][1]}${socials[match][2] ? `&nbsp;${socials[match][2]}` : ''}`;
      const classes = `mark-logo__${socials[match][1].split('.')[0].toLowerCase()}`;
      const template = `<span class="tooltip--event-less tooltip-bottom mark-logo ${classes}" data-tooltip="${alt}"><img src="${src}" alt="${alt}" draggable="false"></span>`;
      return template;
    } else {
      return match;
    }
  });
}

String.prototype.replaceSocials = function() {
  return replaceSocials(this);
}

let searchEngines = {
  'Google:': 'https://www.google.com/search?q=',
  'Wikipedia.en:': 'https://en.wikipedia.org/w/index.php?search=',
  'Wikipedia.ru:': 'https://ru.wikipedia.org/w/index.php?search=',
  'Wikipedia.ja:': 'https://ja.wikipedia.org/w/index.php?search=',
  'Wikipedia.zh:': 'https://zh.wikipedia.org/w/index.php?search=',
  'Wikipedia.ko:': 'https://ko.wikipedia.org/w/index.php?search=',
  'Wikipedia.vi:': 'https://vi.wikipedia.org/w/index.php?search=',
}


function replaceSearching(text) {
  searchEngines['Wikipedia:'] = `https://${nk.settingConfig.get('lang')}.wikipedia.org/w/index.php?search=`;
  const searchRegex = new RegExp(`(${Object.keys(searchEngines).join('|')})(.*?)\\-\\?`, 'g');
  return text.replace(searchRegex, (match, engine, query) => {
    const baseUrl = searchEngines[engine];
    if (baseUrl) {
      let queryArray;
      let engineQuery = query;
      if (query.includes('/')) {
        queryArray = query.split('/');
        query = queryArray[0];
        engineQuery = queryArray[1];
      }
      return `<a href="${baseUrl}${encodeURIComponent(engineQuery)}" target="_blank">${query}</a>`;
    } else {
      return match;
    }
  });
}


String.prototype.replaceSearching = function() {
  return replaceSearching(this);
}


const diacritics = {
  macron:        { sup: '&#772;', sub: '&#817;' },
  caron:         { sup: '&#780;', sub: '&#812;' },
  circumflex:    { sup: '&#770;', sub: '&#813;' },
  gravis:        { sup: '&#768;', sub: '&#790;' },
  ogonek:        { sup: '&#777;', sub: '&#808;' },
  dot:           { sup: '&#776;', sub: '&#804;' },
  x2dot:         { sup: '&#775;', sub: '&#803;' },
  breve:         { sup: '&#774;', sub: '&#814;' },
  invertBreve:   { sup: '&#785;', sub: '&#815;' },
  acute:         { sup: '&#769;', sub: '&#791;' },
  overline:      { sup: '&#773;', sub: '&#817;' },
  x2gravis:      { sup: '&#783;' },
  x2acute:       { sup: '&#779;' },
  x2overline:    { sup: '&#831;' },
  tilde:         { sup: '&#771;', sub: '&#816;', mid: '&#820;', vert: '&#830;' }
};

//setDiacritic('place-macron', 'sub', 0.25);
/* ------------------------ DIACRITICS ------------------------ */
String.prototype.removeCJK = function() {
  return this.replace(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]|[\u3000-\u303F]/gu, '');
}
String.prototype.removeQuotes = function() {
  const quetesArray = ['“', '”', '‘', '’', '«', '»', '„', '»', '‹', '›', '「', '」', '『', '』', '〝', '〞', '〟', '﹄', '﹃', '﹁', '﹂', '\'', '\"'];
  return this.replace(new RegExp(`[${quetesArray.join('')}]`, 'gu'), '');
}
window.setDiacritic = function (type, pos, margins) {
  if (typeof type !== 'string') {
    type.margins ? margins = type.margins : margins = margins;
    type.pos ? pos = type.pos : pos = pos;
    type.type ? type = type.type : type = type;
  }
  if (!Object.keys(diacritics).includes(type.split('-')[1])) {
    console.buildType(`[DIACRITIC] → Unknown diacritic type: ${type}`, 'error');
    return;
  }
  let symbol, typeSplit, typePlace;
  let margin = {};
  if (type.includes('-')) {
    typeSplit = type.split('-');
    typePlace = typeSplit[0];
    type = typeSplit[1];
  }

  symbol = diacritics[type][pos ? pos : 'sup'];

  margin.left = margins && margins.left ? margins.left : (margins && !margins.top ? margins : null);
  margin.top = margins && margins.top ? margins.top : null;

  const base = `<span class="diacritic-symbol-decorator" style="${margin.left !== null ? `--mleft: -${margin.left}em; ` : ''}${margin.top !== null ? `--top: ${margin.top}em;` : ''}">${symbol}</span>`;
  if (typePlace === 'place') {
    return base;
  } else {
    return symbol;
  }
};

function diacriticReplaces(text) {
  const diacriticRegex = /\(\⁛(.*?)\⁛\)/g;
  const matches = Array.from(text.matchAll(diacriticRegex), match => match[1]);
  if (matches === null || matches.length === 0 || matches[0] === null || matches === undefined) {
    return text;
  }
  const splitMatches = matches.map(match => match.split('_'));
  let params = {};

  let type = `place-${splitMatches[0][0].split(',')[0]}`;
  let pos = splitMatches[0][0].split(',')[1] || null;
  let margins = splitMatches[0][1] ? splitMatches[0][1].split(',').map(item => parseFloat(item.trim())) : null;

  if (margins !== null && margins.length === 1) {
    margins = margins[0];
  } else if (margins !== null && margins.length === 2) {
    margins = { left: margins[0], top: margins[1] };
    if (typeof margins.left !== 'number' || margins.left === 0) {
      delete margins.left;
    }
  }
  
  params.type = type;
  pos !== null && (params.pos = pos);
  margins !== null && (params.margins = margins);

  return text.replace(diacriticRegex, setDiacritic(params));
  
  //return text.replace(diacriticRegex, '2');
};
String.prototype.diacritics = function () {
  return diacriticReplaces(this);
}

function transcriptReplacement(text) {
  return text
    .replace(/\<\s(.*?)\s\/\>/g, function (match, p1) {
      p1 = p1
        .replace(/\/(.*?)\/\?/g, function (match, sub) {
          return `<ruby class='ruby_bottom'>${sub}</ruby>`;
        })
        .replace(/\{(.*?)\}/g, function (match, sub) {
          return `<ruby>${sub}</ruby>`;
        })
        .replace(/\[(.*?)\]/g, function (match, sub) {
          return `<rt>${sub}</rt>`;
        })
        .replace(/\″(.*?)\←(.*?)\″/g, function (match, sub1, sub2) {
          return `<ruby>${sub1}<rt>${sub2}</rt></ruby>`;
        })
        .replace(/\((.*?)\:(.*?)\)/g, function (match, sub1, sub2) {
          return `${sub1}<rt>${sub2}</rt>`;
        });
      return p1;
    });
}

String.prototype.transcripts = function () {
  return transcriptReplacement(this);
}

function defaultReplacement(text) {
	return text
		.replace(/\/n\b/g, '<br>') 
    .replace(/\/t\b/g, '&Tab;');
}


String.prototype.defReplace = function () {
  return defaultReplacement(this);
}

function evalLocaleGet(text) { 
  text = text
    .replace(/\{{ \?skin-title }}/g, function (match) { 
      return nk.skins.check('emoji').removeCJK().removeQuotes();
    })
    .replace(/\{{ \?skin-key }}/g, function (match) { 
      return nk.locale.get(nk.skins.check('locale_key'));
    })
    .replace(/\{{ \?skin }}/g, function (match) { 
      return nk.skins.check('locale');
    })
    .replace(/\{{ \?copy }}/g, function (match) { 
      return returnCopyright();
    })
    .replace(/\{{ \?drop-head: (.*?) }}/g, function (match, p1) {
      let p1Array = p1.split('^');
      return nk.ui.dropdownHeader(p1Array[0], p1Array[1]);
    })
    .replace(/\{{ \?tooltip-h1: (.*?) }}/g, function (match, p1) {
      let p1Array = p1.split('^');
      return nk.ui.tooltipInfo.header(p1Array[0], p1Array[1]);
    })
    .replace(/\{{ \?tooltip-quest: (.*?) }}/g, function (match, p1) {
      let p1Array = p1.split('^');
      return nk.ui.tooltipInfo.quest({key: p1Array[0], meta: p1Array[2] ? p1Array[2] : null}, p1Array[1]);
    })
    .replace(/\{{ (.*?)\ }}/g, function (match, p1) {
      return nk.locale.get(p1);
    });

  return text;
}

String.prototype.evalLocaleGet = function () {
  return evalLocaleGet(this);
}

function textUnPacker(text) {/*
  let unpacked = transcriptReplacement(
		defaultReplacement(
			ideographicsSpaceToCJKV(
				unpackArrayToStrings(text)
			)
		)
  );
  unpacked = diacriticReplaces(unpacked);*/
  let unpacked = text.unpackArray().evalLocaleGet().ideoSpaceToCJKV().defReplace().transcripts().diacritics().replaceSocials().replaceSearching();
	return unpacked;
}
String.prototype.unpackText = function () {
  return textUnPacker(this);
}
Array.prototype.unpackText = function () {
  return textUnPacker(this);
}
window.checkKeyDowned = function () {
	document.addEventListener("keydown", function(event) {
		console.log(event.which);
	})
}

let samopl = "sf { fs }";

$.fn.isdrag = function(options) {
	let isMouseDown = false,
		isResizing = false,
		currentElement = null,
		offset = { x: 0, y: 0 },
		prevPosition = { x: 0, y: 0 },
		container = (options && options.container ? $(options.container) : null);

	this.on('mousedown', function(e) {
		if (['both', 'horizontal', 'vertical', 'block'].includes($(e.target).css('resize'))) {
		isResizing = true; 
		return;
	}
	let target = document.elementFromPoint(e.clientX, e.clientY);
		if (
			$(e.target).is('input, textarea') ||
			((["SPAN", "LABEL", "BUTTON", "P", "UL", "OL", "LI", "H1", "H2", "H3", "H4", "H5", "H6", "PRE", "BLOCKQUOTE"].includes(target.tagName)) &&
				target.innerText.trim() !== "" &&
				!target.closest('.forceDrag'))
		) {
			return;
		}
		isMouseDown = true;
		currentElement = $(this);
		let position = currentElement.position();
		offset = {
			x: e.pageX - position.left,
			y: e.pageY - position.top
		};
		prevPosition = { x: e.pageX, y: e.pageY };
	});

	$(document).on('mouseup', function() {
		isMouseDown = false;
		currentElement = null;
		isResizing = false;
	});

	$(document).on('mousemove', function(e) {
		if (isMouseDown && !isResizing) {
			let dx = e.pageX - prevPosition.x;
			let dy = e.pageY - prevPosition.y;
			prevPosition = { x: e.pageX, y: e.pageY };
			if (container) {
				let containerWidth = container.width();
				let containerHeight = container.height();
				let elementWidth = currentElement.width();
				let elementHeight = currentElement.height();
				let left = Math.min(
					Math.max(e.pageX - offset.x, 0),
					containerWidth - elementWidth
				);
				let top = Math.min(
				Math.max(e.pageY - offset.y, 0),
				containerHeight - elementHeight
				);
				currentElement.css({
				left: left,
				top: top
				});
			} else {
				currentElement.css({
					left: e.pageX - offset.x,
					top: e.pageY - offset.y
				});
			}
		}
	});
};



