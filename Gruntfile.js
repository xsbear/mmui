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
      cmd: {
        options: {
          idleading: 'lib/<%= pkg.name %>/<%= pkg.version %>/'
        },
        files: [{
          cwd: 'src',
          src: 'mmui.js',
          dest: '.build'
        }]
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      mmui: {
        files: {
          'dist/<%= pkg.version %>/mmui.js': ['.build/mmui.js']
        }
      }
    },
    cssmin:{
      mmui: {
        options: {
          banner: '<%= banner %>'
        },
        files: {
          'dist/<%= pkg.version %>/mmui.css': ['src/mmui.css']
        }
      }
    },
    copy: {
      debug: {
        src: 'src/mmui.js',
        dest: 'dist/<%= pkg.version %>/mmui-debug.js',
      },
      img: {
        src: 'src/loading-bars.gif',
        dest: 'dist/<%= pkg.version %>/loading-bars.gif',
      }
    },
    clean: {
      build: ['.build']
    }
  });


  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Default task.
  grunt.registerTask('default', ['transport', 'uglify', 'cssmin', 'copy', 'clean']);
};
