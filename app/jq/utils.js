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
		.replace(/\″(.*?)\←(.*?)\″/g, function(match, p1, p2) {
			return "<ruby>" + p1 + "<rt>" + p2 + "</rt></ruby>";
		})
		.replace(/\—{(.*?)\}—/g, function(match, p1) {
			return "<ruby class=\'ruby_bottom\'>" + p1 + "</ruby>";
		})
		.replace(/\{(.*?)\}/g, function(match, p1) {
			return "<ruby>" + p1 + "</ruby>";
		})
		.replace(/\((.*?)\:(.*?)\)/g, function(match, p1, p2) {
			return p1 + "<rt>" + p2 + "</rt>";
		})
		.replace(/\[(.*?)\]/g, function(match, p1) {
			return "<rt>" + p1 + "</rt>";
		});
}

window.defaultReplacement = function (text) {
	return text
		.replace(/\/n/g, '<br>')
		.replace(/\/t/g, '&Tab;')
}

window.textUnPacker = function (text) {
	return transcriptReplacement(
		defaultReplacement(
			ideographicsSpaceToCJKV(
				unpackArrayToStrings(text)
			)
		)
	);
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



