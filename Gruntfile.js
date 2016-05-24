module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      src: [
        'src/js/**/*.js',
        '!src/js/_bower.js'
      ]
    },
    bower_concat: {
      all: {
        dest: {
          'js': 'src/js/_bower.js',
          'css': 'src/scss/_bower.scss'
        },
        mainFiles: {
          bootstrap: [
            'dist/js/bootstrap.js',
            'dist/css/bootstrap.css'
          ]
        },
        dependencies: {
          bootstrap: [
            "jquery"
          ]
        }
      },
    },
    sass: {
      expanded: {
        options: { outputStyle: 'expanded' },
        files: { 'build/_css/app.css': 'src/scss/style.scss' }
      },
      compressed: {
        options: { outputStyle: 'compressed' },
        files: { 'build/_css/app.min.css': 'src/scss/style.scss' }
      }
    },
    concat: {
      dist: {
        src: [
          'src/js/_bower.js',
          'src/js/app.js',
          'src/js/**/*.js'
        ],
        dest: 'build/_js/app.js'
      }
    },
    uglify: {
      'build/_js/app.min.js': 'build/_js/app.js'
    },
    watch: {
      configFiles: {
        files: ['Gruntfile.js', 'package.json'],
        options: { reload: true }
      },
      scss: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass'],
        options: { livereload: true }
      },
      js: {
        files: ['src/js/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
        options: { livereload: true }
      },
      index: {
        files: ['build/index.html'],
        options: { livereload: true }
      }
    },
    replace: {
      production: {
        options: {
          patterns: [{
            match: /app\.js/,
            replacement: function(){
              return 'app.min.js';
            }
          },{
            match: /app\.css/,
            replacement: function(){
              return 'app.min.css';
            }
          }]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['build/index.html'],
            dest: "build/"
          }
        ]
      },
      development: {
        options: {
          patterns: [{
            match: /app\.min\.js/,
            replacement: function(){
              return 'app.js';
            }
          },{
            match: /app\.min\.css/,
            replacement: function(){
              return 'app.css';
            }
          }]
        },
        files: [
          {
            expand: true,
            flatten: true,
            src: ['build/index.html'],
            dest: "build/"
          }
        ]
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'bower_concat', 'sass:expanded', 'concat', 'uglify', 'replace:development', 'watch']);
  grunt.registerTask('deploy', ['jshint', 'bower_concat', 'sass:compressed', 'concat', 'uglify', 'replace:production']);
};
