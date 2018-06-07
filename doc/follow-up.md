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

### April 21st, 2018

* SV-002 - Render constellation boundaries.
  * Static JSON asset contains constellation boundaries coordinates.
  * Constellation boundaries are rendered in the view.
  * Style changes in the view.

* SV-003 - Render constallation lines.
  * Static JSON asset contains constellation lines coordinates.
  * Constellation lines are rendered in the view.

### April 23rd, 2018

* SV-004 - Render stars of magnitudes down to level 6

### April 24th, 2018

* SV-005 - Add graphic themes support. Introduce SkyChart theme.

### May 2nd, 2018

* SV-006: - Primitive UI controls allowing to:
  * toggle layers
  * change themes
* Complete refactoring of all components, now using event driven communication, with very few dependencies between components left.

### May 3rd, 2018

* SV-007: - Viewport UI control support:
  * camera control buttons allow to navigate in the view (N, E, S, W)
  * the view is rotatable (configurable angle of rotation)
  * the field of view angle is configurable
  * (N-S axis alignment and zoom are postponed)

### May 4th, 2018

* SV-008: - Initial intention: define an "internal sphere" camera to allow better view projections. But: discovered and understood miscalculations in coordinates conversion between sky coordinates and XYZ. Corrected the issue and the world origin view projection became usable.
* Refactoring in different parts.
* Tests for VectorUtil class.

### May 8th, 2018

* SV-009: - Deciced to remove the center screen position indicator from UI controls, because it does not bring much.
  * Refactoring of all events processing into shared services.
  * Removed last remainign enums in favor of string identifiers.

### May 9th, 2018

* SV-010: - Load available themes and layers lists from static JSON instead of using hardcoded in controls.

### May 11th, 2018

* SV-011: - GoTo feature in UI controls
  * Search by constellation codes: the view is centered on the typed constellation.
  * extra: view alignment with NS axis, depending on hemisphere.

### May 17th, 2018

* SV-012:
  * Layers model refactored to support hierarchical structures.
  * Constellation code labels are rendered in the view.

* SV-013:
  * Constellation names instead of codes are used in labels.
  * GoTo support selection by name, alongside with the selection by code.
  * GoTo allows selection by RA/DEC coordinates.

* SV-014:
  * Show star names for those that have own names, as an enablable layer.
  * Show Greek letters for stars identified with letters, as an enablable layer.

### May 28th, 2018

* SV-015: Release preparation
  * refactoring, clean-up, tests and inline doc in app/core

### May 31st, 2018

* SV-016: Release preparation
  * refactoring, clean-up, tests and inline doc in app/viewport and related

### June 4th, 2018

* SV-017: Release preparation
  * refactoring, clean-up, tests and inline doc in app/layers and related

### June 6th, 2018

* SV-018: Release preparation
  * more refactoring, clean-up, tests and inline doc in various parts. Refactoring preps phase is now complete.
  * ensure NPM commands complete successfully.
  * remove Protractor stubs, because e2e tests are meaningless at this stage of the project.

### Next Steps

* SV-019: Release preparation
  * detailed README.md
  * add 'night-view' and 'wiki' themes
  * replace ugly control buttons with textured ones.

* SV-020: Release preparation
  * refactor, clean-up and document tools/data-import

* SV-021: Resizable viewport feature

#### Major Features

_None scheduled currently before first public release is done._

#### TODOs for Release and Distribution

* API to insert SkyView in a Web page

#### Features after First Public Release

* Export of current view as image
* Current position of the Sun and of the Moon (probably, the planets also) - new layer
* Messier objects layer

* Theme extensions (config through JSON theme definition):
  * configurable step for coordinate lines
  * configurable line width and dash style
  * pre-defined star magnitudes shown

#### Low priority improvements for POC

* S-N direction arrow
* star colors depending on their class/temperature
* show the name of the constellation or another significant object that is most close to the center of the viewport
