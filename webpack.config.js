var Encore = require('@symfony/webpack-encore');

Encore
    // Directorio donde se almacenarán los assets ya compilados.
    .setOutputPath('public/build/')

    .setPublicPath('/build')

    // Nuestro archivo app.js, que será compilado y almacenado en /web/build/app.js
    .addEntry('app', './assets/js/app.js')
    // .addEntry('buscarRepuesto', './assets/js/Components/buscar repuesto/buscarRepuesto.js')

    // Habilitar el mapeo de recursos en Desarrollo.
    .enableSourceMaps(!Encore.isProduction())

    // Borra el contenido del directorio /web/build antes de volver a compilar una nueva versión.
    .cleanupOutputBeforeBuild()

    // Muestra una notificación cuando se ha finalizado la compilación.
    .enableBuildNotifications()
    
    // Activa React
    .enableReactPreset()

    // .configureBabel(function(babelConfig) {
    //     // add additional presets
    //     babelConfig.presets.push('@babel/preset-flow');

    //     // no plugins are added by default, but you can add some
    //     babelConfig.plugins.push('styled-jsx/babel');
    // }, {
    //     // node_modules is not processed through Babel by default
    //     // but you can whitelist specific modules to process
    //     includeNodeModules: ['foundation-sites'],

    //     // or completely control the exclude rule (note that you
    //     // can't use both "includeNodeModules" and "exclude" at
    //     // the same time)
    //     exclude: /bower_components/
    // })
;

// Exporta la configuración final
module.exports = Encore.getWebpackConfig();

