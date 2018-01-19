
# Book Reader

This project is based on the [ **Internet Archive BookReader** ](https://github.com/internetarchive/bookreader).
That Internet Archives project includes demo implementations that are included here.  

In addition, this project extends the Internet Archives project by adding a kiosk mode that can be used with touch screen kiosks.

## Kiosk Mode

`BookReader.js` is modified to accept a new configuration setting, `isKioskDisplay`, with a default value of `false`.  To initialize BookReader
in kiosk mode, set `br.isKioskDisplay = true` in `src/app/kiosk/KioskReader.js`.

Kiosks are typically configured for a specific display.  If needed, use `KioskReader.css` to adjust the layout.



## How to Use this Project

For syncrhonized browser testing, use one of the following:

The **Internet Archive BookReader** code is repackaged for use with the  [gulp](https://github.com/gulpjs/gulp) build system.

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

Each time you work in this project, a `dist` directory is created.  If you already have a `dist` directory, the contents
will be overwritten.  The `dist` directory contains code that can be deployed to a web server for access or
incorporated into another project or publication.

If you want to use this code base for different projects, you may want to fork the repository.

