var Encore = require('@symfony/webpack-encore');

Encore
    // Directorio donde se almacenarán los assets ya compilados.
    .setOutputPath('public/build/')

    .setPublicPath('/build')

    // Nuestro archivo app.js, que será compilado y almacenado en /web/build/app.js
    .addEntry('app', './assets/js/app.js')
    .addEntry('buscarRepuesto', './assets/js/buscarRepuesto.js')

    // Habilitar el mapeo de recursos en Desarrollo.
    .enableSourceMaps(!Encore.isProduction())

    // Borra el contenido del directorio /web/build antes de volver a compilar una nueva versión.
    .cleanupOutputBeforeBuild()

    // Muestra una notificación cuando se ha finalizado la compilación.
    .enableBuildNotifications()
    
    // Activa React
    .enableReactPreset()
;

// Exporta la configuración final
module.exports = Encore.getWebpackConfig();
