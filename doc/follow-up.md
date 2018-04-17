## Notes about this app development

Started on 2018-04-15.

### Project Set-Up

Followed the guidelines from Pluralsight "Building a JavaScript Development Environment" course.

_Initial set-up:_

  * .editorconfig

  * npm

  * Express as dev server

  * localtunnel to share the app externally

  * nsp security checks also enabled, but with default config only

To start the app:

    npm start

### April 17th, 2018

* The project is now using Angular & TypeScript. I postponed the idea of plugging all the stuff recommended in the Pluralsight course. The primary objective is to render a simple POC before wrapping it in all other stuff.

* ThreeJS is used as 3D rendering lib. A simple animation is implemented to check how it works with Angular & TypeScript. The dedicated branch is `setup-threejs`, it might be reused for other experiences as quick starter project.

* SV-001: stub for a scrollable sky view. Wireframe of the sky sphere, with meridians and parallels. The viewport is in the center and the image is scrollable in all directions.

### Next Steps

SV-002 - Render constellation boundaries.
  * Mock a back-end service providing constellation boundaries.
  * Render the constellation boundaries in the view.
  * Make the coordinates grid dimmer and the background color dark blue.

Major Features:
  * Constellation lines
  * Stars
  * Constellation names
  * Star names
  * Rendering themes
  * Toggling layers
  * S-N direction arrow

Low priority improvements for POC:
  * remove hardcoded CSS width and height for the canvas container, use constants
  * flexible canvas size (?)
  * do not render portions of meridian circles close to the poles
  * 
