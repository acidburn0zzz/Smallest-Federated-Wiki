// Generated by CoffeeScript 1.3.3
(function() {

  window.plugins.efficiency = {
    emit: function(div, item) {
      wiki.log('efficiency', div, item);
      div.addClass('data');
      $('<p />').addClass('readout').appendTo(div).text("63%");
      return $('<p />').html(wiki.resolveLinks(item.text || 'efficiency')).appendTo(div);
    },
    bind: function(div, item) {
      var calculate, lastThumb, locate;
      lastThumb = null;
      div.find('p:first').dblclick(function(e) {
        return wiki.dialog("JSON for " + item.text, $('<pre/>').text("something good"));
      });
      div.find('p:last').dblclick(function() {
        return wiki.textEditor(div, item);
      });
      locate = function() {
        var idx, who;
        idx = $('.item').index(div);
        who = $(".item:lt(" + idx + ")").filter('.image').toArray().reverse();
        return who.last();
      };
      calculate = function(div) {
        var c, d, e, img, src;
        src = $(div).find('img').get(0).src;
        c = $('<canvas id="myCanvas" width="200" height="100" style="border:1px solid #c3c3c3;">');
        d = c.get(0).getContext("2d");
        img = new Image();
        img.src = src;
        d.drawImage(img, 0, 0);
        e = d.getImageData(0, 0, c.width, c.height);
        return console.log(e);
      };
      return calculate(locate());
    }
  };

}).call(this);
