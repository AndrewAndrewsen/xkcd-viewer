require('dotenv').config()
const withImages = require('next-images');
module.exports = withImages({
    images:{
        domains:['localhost', 'imgs.xkcd.com']
    },
});

