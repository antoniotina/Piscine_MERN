let fs = require('fs');

const create = function(name) {
    fs.appendFile(name, 'test', { flag: 'wx' },
        function(err, file) {
            if (err) return console.log('Create ' + name + ':KO');
            console.log('Create ' + name + ':OK');
        });
}

const read = function(name) {
    fs.readFile(name, 'utf8', function(err, file) {
        if (err) return console.log('Read ' + name + ':KO');
        console.log('Read ' + name + ':OK');
    });
}

const update = function(name, content) {
    fs.writeFile(name, content, function(err) {
        if (err) {
            return console.log('Update ' + name + ':KO');
        }
        console.log('Update ' + name + ':OK');
    });
}


module.exports = {
    create,
    read,
    update,
    delete: function(name) {
        fs.unlink(name, function(err) {
            if (err) console.log('Delete ' + name + ':KO');
            console.log('Delete ' + name + ':OK');
        });
    }
};