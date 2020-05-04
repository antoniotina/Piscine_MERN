let fs = require('fs');

const create = function(name) {
    return new Promise(function(resolve, reject) {
        fs.appendFile(name, 'test', { flag: 'wx' },
            function(err, file) {
                if (err) resolve('Create ' + name + ':KO');
                resolve('Create ' + name + ':OK');
            })
    })
}

const read = function(name) {
    return new Promise(function(resolve, reject) {
        fs.readFile(name, 'utf8', function(err, file) {
            if (err) return resolve('Read ' + name + ':KO');
            console.log('Read ' + name + ':OK');
            resolve(file)
        })
    })
}

const update = function(name, content) {
    return new Promise(function(resolve, reject) {
        fs.writeFile(name, content, function(err) {
            if (err) {
                resolve('Update ' + name + ':KO');
            }
            resolve('Update ' + name + ':OK');
        })
    })
}


module.exports = {
    create,
    read,
    update,
    delete: function(name) {
        return new Promise(function(resolve, reject) {
            fs.unlink(name, function(err) {
                if (err) resolve('Delete ' + name + ':KO');
                resolve('Delete ' + name + ':OK');
            })
        })
    }
};