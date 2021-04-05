# AstroCadre

_Astronomy sky charts browsing application_

## Description

This application allows to view sky maps using a Web browser:

<img src="doc/screenshots/demo_01.png" alt="Full view screenshot" width="600">

It provides various possibilities for showing different layers and changing graphical appearance:

<img src="doc/screenshots/demo_03.png" alt="demo screenshot 3" width="300"> <img src="doc/screenshots/demo_04.png" alt="demo screenshot 4" width="300">

It is written in Angular/TypeScript and should work in any modern Web browser.

## What is This Thing for?

It was implemented just for fun, by an amateur astronomer. But it can be used to visualize sky charts for whatever purpose you want, and extended by adding more visualizable objects.

The application has been designed keeping in mind to make it flexible and provide a possibility for different further usages. For example, we can imagine it to be extended and reused in:

  * applications for educational purposes, in astronomy.
  * queezes and interactive tests.
  * helper UI tool for astronomical catalogues or presentations.
  * any other usage you can imagine it for :)

---

## The User Interface

You can navigate in the map by dragging it with the mouse or by using UI controls. The layers visibility can be toggled and the field of view in the viewport adjusted for your needs, using the UI control buttons.

### Main Viewport

The main viewport is interactive:
  * dragging with the mouse allows to navigate in all directions of the view.
  * a double click in the view aligns it on the North or South axis to the top, depending on the hemisphere where the view is centered.

### Control Panel / Tools

The UI controls component provide more features:

<img src="doc/screenshots/ui_controls.png" alt="UI controls" width="300">

All elements of the UI controls have tool tips. All their functionalities can be summarized as follows:

* "GoTo" section: type a constellation code ('lyr'), name ('Lyra'), star name ('sirius') or sky coordinate in decimal degrees ('185 -60') to center the view on the requested point.

* "Theme" drop-down: selection of graphical theme for the main view.

* "Layers" section: toggle the display of available layers, labels and stars by magnitude. Either proper ('Antares', 'Deneb'...) or standard/Bayer ('α', 'β', 'γ'...) stellar names can be shown.

* Field of view (FOV) controls: select the angular size of the view and press the "Change FOV" button to update it.

* Navigation buttons: they allow to change the view by the angular size in the FOV control.
  * first row: rotate clockwise, go up, rotate counter-clockwise buttons.
  * second row: go left, down or right buttons.

* Viewport size controls: select the width and the height of the viewport.

---

## Development

## Recommended Environment

### Front-End

The [Visual Studio Code](https://code.visualstudio.com/) IDE is recommended.

The following VSC extensions are also recommended:

* EditorConfig for VS Code (v.0.12.4+), uses the `./.editorconfig` file.
* ESLint (v2.1+), with the default configuration.

### Back-End & Tools

For the tools/data processing part, any IDE supporting Java+Maven projects may be used. However, [IntelliJ IDEA CE](https://www.jetbrains.com/idea/download) was used for the development.

Currently, the application does not have a specific back-end part. All the served resources are static and they are generated using the `./tools/data-import` sub-project.

---

## NPM Commands and Tasks

### Pre-Requisites

[NodeJS](https://nodejs.org/en/download/) v5.6.0+ must be installed in order to lauch the application in development mode.

### Commands

The following commands runnable with `npm {command}` or `npm run {command}` are defined in `package.json`:

* `clean`: removes the contents of the current `dist` directory, supposed to contain the last production build files.
* `start`: executes a build in _development_ mode and launches the server on `http://localhost:4200`.
* `build:dev`: executes a build in the _development_ mode, without starting the server.
* `build:prod`: cleans the current distribution files and executes a build in the _production_ mode. The resulting files are placed in the `./dist` folder.
* `test`: executes the unit tests.
* `lint`: executes linting checks.

_Quickstart after cloning the source repository:_

* `npm install` to retrieve all the necessary dependencies.
* `npm start` command should launch the application at `http://localhost:4200`.

The commands above should work equally from the VSC integrated terminals or from any terminal/CLI tools.

### Production Build

When the command `build:prod` is issued, the build sequence adds a prefix to the URLs handled by the application. This is done by passing ` --base-href /astrocadre --deploy-url /astrocadre/` args to `ng build --prod` command in `package.json`.

All the paths to the assets are also processed by using `environment.pathInContext` function (from `environments/environment[.prod].ts`), which appends the prefix depending on the build target.

---

## Project Structure

The project is structured as follows:

```text
./
 |- /dist              // distribution files for production deployment
 |- /doc               // additional documentation
 |- /src               // the source code and related files
 |   |- /app           // main and test source code files
 |   |- /assets        // static resources served by the back-end of the app
 |   |- /environments  // environment configuration files
 |   |- /raw           // raw source files for assets, excluded from dist
 |   |- main.ts        // main entry point of the application
 |   |- test.ts        // test entry point of the application
 |- /tools
 |   |- /data-import   // static resources generation utility
 |   |   |- README.md  // documentation for the tools
 |- LICENSE            // license file
 |- README.md          // this README file
 |- {other configuration files}
```

`./tools/data-import` contains a Maven project written in Java, allowing to generate static resource JSON files with stellar and other data used in the application. The generated files are placed into `./src/assets` folder and then included into the distribution. For more information about how to generate the static resources and their format, please check the respective `README.md` file in [`./tools/data-import`](./tools/data-import/README.md).

---

## Configuration

The graphic properties of the application can be configured by providing a few JSON files placed in `/src/assets/themes`.

### Themes

The themes allow to switch easily between different sets of graphical representation. For example, the following series of images contain exactly the same view, rendered with various themes.

1. `Sky Chart` theme:

<img src="doc/screenshots/theme_sky-chart.png" alt="Sky chart theme screenshot" width="300">

2. `Wikipedia` theme:

<img src="doc/screenshots/theme_wiki.png" alt="Wikipedia theme screenshot" width="300">

3. `Night View` theme:

<img src="doc/screenshots/theme_night-view.png" alt="Night view theme screenshot" width="300">

4. `Tiny` theme:

<img src="doc/screenshots/theme_tiny.png" alt="Tiny theme screenshot" width="300">


### Theme Metadata

All available graphic themes are described in `/src/assets/themes/themes.json` file. To add a new theme definition, the following structure should be appended to the JSON array:
  
```
{
  "code": "theme-code",         // mandatory, should be alphanumeric, without spaces.
  "label": "Theme label",       // optinal, the label to show in the UI controls.
  "description": "description", // optional description shown in the UI controls.
}
```

To remove an existing theme, simply delete the respective JSON object from the array.

The first item of the array is the theme loaded by default when the application starts.

### Theme Properties Definition

For each theme item declared in `themes.json`, a corresponding `.json` file must exist in the same folder. The name of the file must be `{code}.json`, where `{code}` is the value used as the `"code"` property for the respective theme item in `themes.json`. For example, for the theme metadata definition above, there must be a file named `theme-code.json`.

The themes have the following configurable properties:

```
{
  "code": "string",    // redundant with respective "code" value from themes.json
  "background": {
    // the background color of the viewport
    "color": "string"  // CSS RGB color definition, for example 'rgb(10, 10, 10)'
  },
  // properties of the coordinates grid
  "skyGrid": {
    // most of existing lines
    "normal": {
      "color": "string"   // CSS RGB color definition
    },
    // equator and 0-meridian lines
    "reference": {
      "color": "string"   // CSS RGB color definition
    }
  },
  // properties of the constellations
  "constellation": {
    // constellation boundaries (area limits)
    "boundaries": {
      "color": "string"   // CSS RGB color definition
    },
    // lines between the stars in a constellation
    "lines": {
      "color": "string"   // CSS RGB color definition
    },
    // constellation name labels
    "names": {
      "fontSize": "string",   // CSS size of the font in pixels, for example "16px"
      "fontFamily": "string", // CSS font-family
      "fontStyle": "string",  // CSS font-style, "italic" or "normal"
      "fontWeight": "string", // CSS font-weight, "bold" or "normal
      "color": "string"       // CSS RGB color definition, for the font
    }
  },
  // properties of stars
  "stars": {
    // the magnitudes to show, in descending order
    "magnitudes": [ 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6 ],
    // the texture to use for a point representing a star
    "texture": {
      // path to the image file, relative to /src
      "image": "assets/textures/star.png",
      // multiplication ratio between the min (6) and max (2) magnitudes
      // value of 3 means that max magnitude stars will be shown 3 times bigger than minimal
      "sizeMultiplier": 3
    },
    // star name labels
    "names": {
      // labels for the proper names, see constellation.names for details
      "proper": {
        "fontSize": "string",
        "fontFamily": "string",
        "fontStyle": "string",
        "fontWeight": "string",
        "color": "string"
      },
      // labels for the standard names, see constellation.names for details
      "standard": {
        "fontSize": "string",
        "fontFamily": "string",
        "fontStyle": "string",
        "fontWeight": "string",
        "color": "string"
      }
    }
  }
}
```

---

## Release History

This project started in April 2018 and an initial prototype was published in June 2018 (version 18.6).

After having acquired more experience in the front-end development with Angular and TypeScript, the author
started a huge refactoring & update of the project in February 2021. It allowed to publish a much cleaner and improved version of the application in April 2021 (version 21.4).

More details on the evolution of the project are available in the [follow-up documentation](./doc/follow-up.md).

---

## Workflow

The most recent validated version of the project is available on the `master` branch.

The development branches should be prefixed with `dev-`. When a feature is implemented on its `dev` branch, a
pull request should be created in order to review and merge it.

---

## License

This software is distributed under MIT license conditions.

Please check more details in `LICENSE` file.

--- 

(c) 2018 Anton Telechev
