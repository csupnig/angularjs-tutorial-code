module.exports = {
    dir:{
        build: 'build',
        compile: 'bin',
        assets: 'assets',
        vendor: 'vendor',
        app: 'app',
        lib: 'lib',
        src: 'src',
        config: 'config'
    },
    
    src:{
        css:['src/**/*.css'],
        config: 'config/**/*',
        assets: 'src/assets/**/*',
        js: ['src/**/*.js'],
        html:['src/**/*.html'],
        index: 'src/index.html',
        lib: {
            js: ['lib/**/*.js'],
            css: ['lib/**/*.css']
        }
    }
};