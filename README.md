
# Book Reader

This project is based on the [ **Internet Archive BookReader** ](https://github.com/internetarchive/bookreader) project.
That project includes demo implementations that are included here.  

This project also extends the original Internet Archives project with a custom kiosk mode that can be used with touch screen kiosk displays.

**Internet Archive BookReader** code is repackaged for use with the  [gulp](https://github.com/gulpjs/gulp) build system.
For syncrhonized browser testing, use the following:

```javascript
gulp --mode kiosk

gulp --mode simple

gulp --mode embed

gulp --mode iiif
```

To just build the code use:

```javascript
gulp build --mode kiosk

gulp build --mode simple

gulp build --mode embed

gulp build --mode iiif
```

Gulp is configured to accept a `--mode` parameter that identifies the subdirectory for the version of the project to be used.