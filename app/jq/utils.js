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
