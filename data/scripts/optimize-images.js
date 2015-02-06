(function () {
  var fs = require("fs-extra");
  var path = require("path");
  var im = require("imagemagick");
  var _ = require("lodash-node");
  var when = require("when");

  var TARGET_WIDTH = 550;

  module.exports = function () {
    return when.promise(function (resolve, reject) {
      var files = _(fs.readdirSync('./data/srcimages')).reject(function (file) {
        return file.indexOf(".") === 0;
      }).valueOf();

      //Begin analysis and processing
      var processFile = function (file, rest) {
        console.log("Analyzing " + file);
        var done = function (err, stdout, stderr) {
          if (err || stderr) {
            console.log(err || stderr);
          } else if (stdout) {
            console.log(stdout);
          }

          if (rest.length) {
            return processFile(_.first(rest), _.tail(rest));
          } else {
            resolve();
          }
        };
        fs.copy(path.join("data", "srcimages", file), path.join("data", "images", file), function (err) {
          if (!err) {
            var myFile = path.join("data", "images", file);
            im.identify(myFile, function (err, features) {
              if (features && features.format.toLowerCase().indexOf("j") === 0) {
                var commands = [myFile, '-quality', 50];
                if (features.width > TARGET_WIDTH) {
                  commands = commands.concat(["-resize", TARGET_WIDTH]);
                }
                commands = commands.concat(myFile);
                im.convert(commands, done);
              }
              else if (features && features.width > TARGET_WIDTH) {
                im.resize({srcPath: myFile, dstPath: myFile, width: TARGET_WIDTH}, done);
              } else {
                done();
              }
            });
          } else {
            console.log(err);
          }
        });
      };

      processFile(_.first(files), _.tail(files));
    });
  };

})();
