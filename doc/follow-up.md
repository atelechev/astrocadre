# Notes about this app development

---

## Upcoming Features and Issues

* AC-025: _TODO Choose the next feature to implement_

### Ideas for New Features to Implement

* Current position of the Sun and of the Moon (probably, the planets also) - new layer.

* Messier objects layer.

* Transform the application into a component that can be easily integrated into a Web page. API to insert AstroCadre in a Web page.

* Make objects selectable in the view, probably with additional text info.

* Export the current view as raster images.

* Theme extensions (config through JSON theme definition):
  * configurable step for coordinate lines
  * configurable line width and dash style

* Possibility to add markers at any position in the viewport

### Known Issues

* The constellation boundaries layer has an offset on the longitudinal axis, to be fixed.

* See the `TODO`s and the `FIXME`s in the source code.

### Low Priority Improvements

* S-N direction arrow
* star colors depending on their class/temperature
* show the name of the constellation or another significant object that is most close to the center of the viewport

---

## Project Development History

_These notes are added from the most recent on the top, to the oldest at the bottom._

### February - April, 2021

* AC-024: Complete refactoring and update of the whole project.
  * A very deep review and refactoring of the application, impacting almost every previously existing source file.
  * Numerous incorrect practices and implementations were improved, a lot of over-engineered code removed.
  * The structure of the modules changed significantly.
  * Using the latest Angular 11 version.
  * Using PrimeNG as the lib for the UI controls.
  * More unit tests.
  * Configured ESLint as the linter.

---

### June 19th, 2018

* AC-023: Refactor the layers and themes loading. Decoupled from controls and improved events handling.

### June 17th, 2018

* AC-022:
  * Draggable and hidable UI controls.
  * Migrated on Angular 6 and RxJs 6.

### June 15th, 2018

* AC-021: View/Navigation using URL query params

### June 13th, 2018

* AC-020: Resizable viewport

### June 12th, 2018

* AC-019: Release preparation
  * detailed README.
  * add 'night-view', 'wiki' and 'tiny' themes.
  * replace ugly control buttons with textured ones.
  * refactor, clean-up and document tools/data-import.

### June 6th, 2018

* AC-018: Release preparation
  * more refactoring, clean-up, tests and inline doc in various parts. Refactoring preps phase is now complete.
  * ensure NPM commands complete successfully.
  * remove Protractor stubs, because e2e tests are meaningless at this stage of the project.

### June 4th, 2018

* AC-017: Release preparation
  * refactoring, clean-up, tests and inline doc in app/layers and related

### May 31st, 2018

* AC-016: Release preparation
  * refactoring, clean-up, tests and inline doc in app/viewport and related

### May 28th, 2018

* AC-015: Release preparation
  * refactoring, clean-up, tests and inline doc in app/core

### May 17th, 2018

* AC-012:
  * Layers model refactored to support hierarchical structures.
  * Constellation code labels are rendered in the view.

* AC-013:
  * Constellation names instead of codes are used in labels.
  * GoTo support selection by name, alongside with the selection by code.
  * GoTo allows selection by RA/DEC coordinates.

* AC-014:
  * Show star names for those that have own names, as an enablable layer.
  * Show Greek letters for stars identified with letters, as an enablable layer.

### May 11th, 2018

* AC-011: - GoTo feature in the UI controls
  * Search by constellation codes: the view is centered on the typed constellation.
  * extra: view alignment with NS axis, depending on hemisphere.

### May 9th, 2018

* AC-010: - Load available themes and layers lists from static JSON instead of using hardcoded ones.

### May 8th, 2018

* AC-009: - Decided to remove the center screen position indicator from UI controls, because it does not bring much.
  * Refactoring of all events processing into shared services.
  * Removed last remaining enums in favor of string identifiers.

### May 4th, 2018

* AC-008: - Initial intention: define an "internal sphere" camera to allow better view projections. But: discovered and understood miscalculations in coordinates conversion between sky coordinates and XYZ. Corrected the issue and the world origin view projection became usable.
* Refactoring in different parts.
* Tests for VectorUtil class.

### May 3rd, 2018

* AC-007: - Viewport UI control support:
  * camera control buttons allow to navigate in the view (N, E, S, W)
  * the view is rotatable (configurable angle of rotation)
  * the field of view angle is configurable
  * (N-S axis alignment and zoom are postponed)

### May 2nd, 2018

* AC-006: - Primitive UI controls allowing to:
  * toggle layers
  * change themes
* Complete refactoring of all components, now using event driven communication, with very few dependencies between components.

### April 24th, 2018

* AC-005 - Add graphic themes support. Introduce SkyChart theme.

### April 23rd, 2018

* AC-004 - Render the stars of magnitudes down to level 6.

### April 21st, 2018

* AC-002 - Render the constellation boundaries.
  * Static JSON asset contains constellation boundaries coordinates.
  * Constellation boundaries are rendered in the view.
  * Style changes in the view.

* AC-003 - Render the constellation lines.
  * Static JSON asset contains constellation lines coordinates.
  * Constellation lines are rendered in the view.

### April 17th, 2018

* The project is now using Angular & TypeScript. I postponed the idea of plugging all the stuff recommended in the Pluralsight course. The primary objective is to render a simple POC before wrapping it in all other stuff.

* ThreeJS is used as 3D rendering lib. A simple animation is implemented to check how it works with Angular & TypeScript. The dedicated branch is `setup-threejs`, it might be reused for other experiences as quick starter project.

* AC-001: stub for a scrollable sky view. Wireframe of the sky sphere, with meridians and parallels. The viewport is in the center and the image is scrollable in all directions.


### April 15th, 2018

_The project set-up (now obsolete)_

Followed the guidelines from Pluralsight "Building a JavaScript Development Environment" course.

_Initial set-up:_

  * .editorconfig

  * npm

  * Express as dev server

  * localtunnel to share the app externally

  * nsp security checks also enabled, but with default config only

---
