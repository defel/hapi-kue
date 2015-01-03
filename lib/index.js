
var 
  kue = require('kue'),
  Boom = require('boom')
  chalk = require('chalk');

exports.register = function (plugin, options, next) {
  var queue = kue.createQueue(options);

  console.log(chalk.bgBlue.white.bold('[plugin]'), chalk.white.bold('GET /job/{id}'));
  plugin.route({
    method: 'GET',
    path: '/job/{id}',
    handler: function(req, reply) {
      var id = req.params.id; 

      kue.Job.get(id, function(err, job) {
        if(err) {
          console.log(chalk.yellow.bold('[info]'), chalk.red.bold(err.message));
          reply(new Boom.notFound())
        }
        reply(job);
      });

      console.log('GET JOB: ', req.payload, req.query, req.params.id);
    }
  });

  plugin.expose('queue', queue);

  next(null);
}

exports.register.attributes = {
    name: 'hapi-kue'
};
