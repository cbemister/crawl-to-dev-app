const dir = require('node-dir');
 
// dir.subdirs(__dirname + '/public/', function(err, subdirs) {
//     if (err) throw err;
//     console.log(subdirs);
// });

//readFiles( dir, [options], fileCallback, [finishedCallback] )

dir.readFiles(__dirname + '/public/', {
    excludeDir: ['node_modules', '.git', 'css'],
    recursive: false,
    shortName: true
    }, function(err, content, next) {
        if (err) throw err;
        //console.log('content:', content);
        next();
    },
    function(err, files){
        if (err) throw err;
        console.log('finished reading files:',files);
    });