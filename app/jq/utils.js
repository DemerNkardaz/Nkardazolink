$.fn.countTextVolume = function() {
		var char_count = 0;
		this.each(function() {
				char_count += $(this).text().trim().length;
		});
		var formatted_count = char_count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, String.fromCharCode(0x2007));
		return formatted_count;
};

$.fn.countAuthorLists = function() {
		var char_count = parseInt(this.countTextVolume().replace(/\s/g,''));
		var formatted_volume = (char_count / 40000).toFixed(2);
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
	var isMouseDown = false,
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
	var target = document.elementFromPoint(e.clientX, e.clientY);
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
		var position = currentElement.position();
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
			var dx = e.pageX - prevPosition.x;
			var dy = e.pageY - prevPosition.y;
			prevPosition = { x: e.pageX, y: e.pageY };
			if (container) {
				var containerWidth = container.width();
				var containerHeight = container.height();
				var elementWidth = currentElement.width();
				var elementHeight = currentElement.height();
				var left = Math.min(
					Math.max(e.pageX - offset.x, 0),
					containerWidth - elementWidth
				);
				var top = Math.min(
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

window.setDiacritic = function (type, pos, margins) {
  let symbol, typeSplit, typePlace;
  let margin = {};
  if (type.includes('-')) {
    typeSplit = type.split('-');
    typePlace = typeSplit[0];
    type = typeSplit[1];
  }
  
  if (type === 'macron') { pos && pos === 'sub' ? symbol = '&#817;' : symbol = '&#772;' }
  if (type === 'caron') { pos && pos === 'sub' ? symbol = '&#812;' : symbol = '&#780;' }
  if (type === 'circumflex') { pos && pos === 'sub' ? symbol = '&#813;' : symbol = '&#770;' }
  if (type === 'gravis') { pos && pos === 'sub' ? symbol = '&#790;' : symbol = '&#768;' }
  if (type === 'ogonek') { pos && pos === 'sub' ? symbol = '&#808;' : symbol = '&#777;' }
  if (type === 'dot') { pos && pos === 'sub' ? symbol = '&#804;' : symbol = '&#776;' }
  if (type === 'x2dot') { pos && pos === 'sub' ? symbol = '&#803;' : symbol = '&#775;' }
  if (type === 'breve') { pos && pos === 'sub' ? symbol = '&#814;' : symbol = '&#774;' }
  if (type === 'invertBreve') { pos && pos === 'sub' ? symbol = '&#815;' : symbol = '&#785;' }
  if (type === 'acute') { pos && pos === 'sub' ? symbol = '&#791;' : symbol = '&#769;' }
  if (type === 'overline') { pos && pos === 'sub' ? symbol = '&#817;' : symbol = '&#773;' }
  if (type === 'x2gravis') { symbol = '&#783;' }
  if (type === 'x2acute') { symbol = '&#779;' }
  if (type === 'x2overline') { symbol = '&#831;' }
  
  if (type === 'tilde') { pos && pos === 'sub' ? symbol = '&#816;' : (pos && pos === 'mid' ? symbol = '&#820;' : (pos && pos === 'vert' ? symbol = '&#830;' : symbol = '&#771;')) }

  margin.left = margins && margins.left ? margins.left : (margins && !margins.top ? margins : null);
  margin.top = margins && margins.top ? margins.top : null;

  const base = `<span class="diacritic ${type} ${pos ? pos : ''}" style="${margin.left !== null ? `--mleft: -${margin.left}em; ` : ''}${margin.top !== null ? `--top: ${margin.top}px;` : ''}">${symbol}</span>`;
  if (typePlace === 'place') {
    return base;
  } else {
    return symbol;
  }
};




