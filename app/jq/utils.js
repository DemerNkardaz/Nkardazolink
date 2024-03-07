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


window.transcriptReplacement = function (text) {
  return text
    .replace(/\n/g, '<br>')
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
    .replace(/\n/g, '<br>')
    .replace(/\t/g, '&Tab;')
}

window.textUnPacker = function (htmlString) {
  var stage_1 = defaultReplacement(htmlString);
  var stage_2 = transcriptReplacement(stage_1);
  return stage_2;
}