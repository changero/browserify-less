/**
 * Created by Administrator on 2017/4/29 0029.
 */
var less = require("less")
    , through = require('through')
    , path = require('path'),
    fs = require('fs');

module.exports = function(file, opts) {
    var input = '',filename = `${path.basename(file).replace(/(.*)\.less/,'$1')}.css`;
    if (/\.less$/i.test(file) === false) {
        return through();
    }

    function write(data) { input += data; }
    function end() {
        var self = this;
        var lessOpts = (opts || {});

        lessOpts.filename = file;
        lessOpts.paths = [path.dirname(file)];

        less.render(input, lessOpts, function(err, output) {
            if (err) {
                self.emit('error', new Error(err.message + ': ' + err.filename + '(' + err.line + ')'));
            } else {
                fs.writeFileSync(path.resolve(opts.output,filename),output.css)
            }

            output.imports.forEach(function(f) {
                self.emit('file', f);
            });
            self.queue(null);
        });
    }

    return through(write, end);
}
