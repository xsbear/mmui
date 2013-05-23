/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
          '<%= grunt.template.today("yyyy-mm-dd") %> */\n',
    // Task configuration.
    transport: {
      options: {
        debug: false
      },
      mmui: {
        options: {
          idleading: 'lib/<%= pkg.name %>/<%= pkg.version %>/'
        },
        files: [{
          cwd: 'src',
          src: '*.js',
          dest: '.build'
        }]
      }
    },
    concat: {
      mmui: {
        options: {
          include: 'relative'
        },
        files: {
          'dist/mmui.js': ['.build/mmui.js']
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      mmui: {
        files: {
          'dist/mmui.js': ['dist/mmui.js']
        }
      }
    },
    clean: {
      build: ['.build']
    }
  });

  //
  grunt.registerTask("d2syb", "Deploy mmui to syb.", function(mode) {
    var dest = '/Users/hwp/Maimiao/Webpage/shengyb/static/lib/mmui/';
    if(!grunt.file.isDir(dest, grunt.config('pkg.version'))){
      grunt.file.mkdir(dest + grunt.config('pkg.version'));
    }
    grunt.file.copy('dist/mmui.js', dest + grunt.config('pkg.version') + '/mmui.js');

    grunt.file.copy('src/mmui.css', '/Users/hwp/Maimiao/Webpage/shengyb/static/css/mmui.css');
  })

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('build', ['transport:mmui', 'concat:mmui', 'uglify:mmui', 'clean']);
  // Default task.
  grunt.registerTask('default', ['build', 'd2syb']);
};
