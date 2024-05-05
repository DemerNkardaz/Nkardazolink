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


window.unpackArrayToStrings = function (text) {
	if (Array.isArray(text)) {
		return text.join('\n');
	} else {
		return text;
	}
}

function ideographicsSpaceToCJKV(text) {
		const regex = /([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}])\s+([\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}])/gu;
		return text.replace(regex, '$1\u3000$2');
}

window.transcriptReplacement = function (text) {
  return text
    .replace(/\″(.*?)\←(.*?)\″/g, function (match, p1, p2) {
      return `<ruby>${p1}<rt>${p2}</rt></ruby>`;
    })
    .replace(/\—{(.*?)\}—/g, function (match, p1) {
      return `<ruby class='ruby_bottom'>${p1}</ruby>`;
    })
    .replace(/([^$])\{\.(.*?)\.\}/g, function (match, p1, p2) {
      return `${p1}<ruby>${p2}</ruby>`;
    })
    .replace(/\(\.(.*?)\:(.*?)\.\)/g, function (match, p1, p2) {
      return `${p1}<rt>${p2}</rt>`;
    })
    .replace(/\≈\[(.*?)\]≈/g, function (match, p1) {
      return `<rt>${p1}</rt>`;
    });
}

window.defaultReplacement = function (text) {
	return text
		.replace(/\/n/g, '<br>')
    .replace(/\/t/g, '&Tab;')
}


window.textUnPacker = function (text) {
  let unpacked = transcriptReplacement(
		defaultReplacement(
			ideographicsSpaceToCJKV(
				unpackArrayToStrings(text)
			)
		)
	);
	return unpacked;
}

window.checkKeyDowned = function () {
	document.addEventListener("keydown", function(event) {
		console.log(event.which);
	})
}

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

//setDiacritic('place-macron', 'sub', 0.25);
/* ------------------------ DIACRITICS ------------------------ */
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
window.setDiacritic = function (type, pos, margins) {
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

  const base = `<span class="diacritic ${type} ${pos ? pos : ''}" style="${margin.left !== null ? `--mleft: -${margin.left}em; ` : ''}${margin.top !== null ? `--top: ${margin.top}px;` : ''}">${symbol}</span>`;
  if (typePlace === 'place') {
    return base;
  } else {
    return symbol;
  }
};




