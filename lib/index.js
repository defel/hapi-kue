
var kue = require('kue');

exports.register = function (plugin, options, next) {
  var queue = kue.createQueue(options);

  plugin.expose('queue', queue);

  next(null);
}

exports.register.attributes = {
    name: 'hapi-kue'
};
