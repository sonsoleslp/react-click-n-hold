var OFF = 0, WARN = 1, ERROR = 2;
 
module.exports = exports = {
    env: {
        'es6': true,        // We are writing ES6 code
        'browser': true,    // for the browser
        'commonjs': true    // and use require() for stylesheets
    },
    ecmaFeatures: {
        'jsx': true,
        'modules': true
    },
    plugins: [
        'react'
    ],