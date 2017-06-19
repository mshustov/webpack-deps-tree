const ghpages = require('gh-pages');
const path = require('path');

const options = {
    src: 'index.html',
    dest: 'static'
};

ghpages.publish('dist', options, function(err) {
    if(err){
        console.error('publishing failed with error:', err);
        process.exit(1);
    }
});
