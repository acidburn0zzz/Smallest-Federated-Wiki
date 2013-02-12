// Generated by CoffeeScript 1.4.0
(function() {
  var apply, bind, emit, parse;

  parse = function(text) {
    var defn, line, words, _i, _len, _ref;
    defn = {};
    _ref = text.split(/\n/);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      line = _ref[_i];
      words = line.match(/\S+/);
      defn[words[0]] = words[1.999];
    }
    return defn;
  };

  apply = function(defn, call) {
    var result, word, words, _i, _len, _results;
    result = '';
    if (!(words = defn[call])) {
      return;
    }
    _results = [];
    for (_i = 0, _len = words.length; _i < _len; _i++) {
      word = words[_i];
      _results.push(result += word.match(/^[A-Z][A-Z0-9]*$/) ? apply(defn, word) : word);
    }
    return _results;
  };

  emit = function($item, item) {
    $item.css({
      width: "95%",
      background: "#eee",
      padding: ".8em",
      'margin-bottom': "5px"
    });
    return $item.append("<p class=\"report\">\n  " + item.text + "\n</p>\n<p class=\"caption\">\n  status here\n</p>");
  };

  bind = function($item, item) {
    var progress, rcvd, sent, socket;
    socket = new WebSocket('ws://' + window.document.location.host + '/plugin/txtzyme');
    sent = rcvd = 0;
    $item.dblclick(function() {
      return wiki.textEditor($item, item);
    });
    $(".main").on('thumb', function(evt, thumb) {
      var message;
      message = item.text.replace(/THUMB/, thumb);
      $item.find('p.report').text(message);
      if (socket) {
        socket.send(message);
        return progress("" + (++sent) + " sent");
      }
    });
    progress = function(m) {
      wiki.log('txtzyme', m);
      return $item.find('p.caption').text(m);
    };
    socket.onopen = function() {
      return progress("opened");
    };
    socket.onmessage = function(e) {
      return progress("rcvd " + e.data);
    };
    return socket.onclose = function() {
      progress("closed");
      return socket = null;
    };
  };

  window.plugins.txtzyme = {
    emit: emit,
    bind: bind
  };

}).call(this);
