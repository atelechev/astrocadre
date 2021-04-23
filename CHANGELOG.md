## Project Development History (Changelog)

_These notes are added from the most recent on the top, to the oldest at the bottom._

Next version: 21.4.29

### 2021-04-23 - v21.4.28

Changed the versioning system. Now the major.minor version is `21.4`. The third number is
the ordinal of the feature, which corresponds to the former counter of issues `AC-{number}`.

* Added the Solar system objects, with trajectories
* Support of configurable dashes and width for the lines styling.

### 2021-04-16

AC-027: Use a standard sidebar for the UI controls.

  * Replaced the toggleable panel with a sidebar in the UI controls.
  * Improved the layout of the controls.
  * Removed DraggableElementsHandler. 

### 2021-04-14

AC-026: Added the Messier objects layer.

### 2021-04-11

AC-025: Extracted all the object layers into (almost) autonomous modules in dedicated folders.

  * Decoupled the UI controls from the concrete layers implementations.

### 2021-04-05

AC-024: Complete refactoring and update of the whole project.

  * A very deep review and refactoring of the application, impacting almost every previously existing source file.
  * Numerous incorrect practices and implementations were improved, a lot of over-engineered code removed.
  * The structure of the modules changed significantly.
  * Using the latest Angular 11 version.
  * Using PrimeNG as the lib for the UI controls.
  * More unit tests.
  * Configured ESLint as the linter.

---

### 2018-06-19

AC-023: Refactor the layers and themes loading. Decoupled from controls and improved events handling.

### 2018-06-17

AC-022:

  * Draggable and hidable UI controls.
  * Migrated on Angular 6 and RxJs 6.

### 2018-06-15

AC-021: View/Navigation using URL query params

### 2018-06-13

AC-020: Resizable viewport

### 2018-06-12

AC-019: Release preparation

  * detailed README.
  * add 'night-view', 'wiki' and 'tiny' themes.
  * replace ugly control buttons with textured ones.
  * refactor, clean-up and document tools/data-import.

### 2018-06-06

AC-018: Release preparation

  * more refactoring, clean-up, tests and inline doc in various parts. Refactoring preps phase is now complete.
  * ensure NPM commands complete successfully.
  * remove Protractor stubs, because e2e tests are meaningless at this stage of the project.

### 2018-06-04

AC-017: Release preparation

  * refactoring, clean-up, tests and inline doc in app/layers and related

### 2018-05-31

AC-016: Release preparation

  * refactoring, clean-up, tests and inline doc in app/viewport and related

### 2018-05-28

AC-015: Release preparation

  * refactoring, clean-up, tests and inline doc in app/core

### 2018-05-17

AC-012:

  * Layers model refactored to support hierarchical structures.
  * Constellation code labels are rendered in the view.

AC-013:

  * Constellation names instead of codes are used in labels.
  * GoTo support selection by name, alongside with the selection by code.
  * GoTo allows selection by RA/DEC coordinates.

AC-014:

  * Show star names for those that have own names, as an enablable layer.
  * Show Greek letters for stars identified with letters, as an enablable layer.

### 2018-05-11

AC-011: - GoTo feature in the UI controls

  * Search by constellation codes: the view is centered on the typed constellation.
  * extra: view alignment with NS axis, depending on hemisphere.

### 2018-05-09

AC-010: - Load available themes and layers lists from static JSON instead of using hardcoded ones.

### 2018-05-08

AC-009: - Decided to remove the center screen position indicator from UI controls, because it does not bring much.

  * Refactoring of all events processing into shared services.
  * Removed last remaining enums in favor of string identifiers.

### 2018-05-04

AC-008: 

* Initial intention: define an "internal sphere" camera to allow better view projections. But: discovered and understood miscalculations in coordinates conversion between sky coordinates and XYZ. Corrected the issue and the world origin view projection became usable.
* Refactoring in different parts.
* Tests for VectorUtil class.

### 2018-05-03

AC-007: - Viewport UI controls support

  * camera control buttons allow to navigate in the view (N, E, S, W)
  * the view is rotatable (configurable angle of rotation)
  * the field of view angle is configurable
  * (N-S axis alignment and zoom are postponed)

### 2018-05-02

AC-006: - Primitive UI controls allowing to:

  * toggle layers
  * change themes

* Complete refactoring of all components, now using event driven communication, with very few dependencies between components.

### 2018-04-24

AC-005 - Add graphic themes support. Introduce SkyChart theme.

### 2018-04-23

AC-004 - Render the stars of magnitudes down to level 6.

### 2018-04-21

AC-002 - Render the constellation boundaries.

  * Static JSON asset contains constellation boundaries coordinates.
  * Constellation boundaries are rendered in the view.
  * Style changes in the view.

AC-003 - Render the constellation lines.

  * Static JSON asset contains constellation lines coordinates.
  * Constellation lines are rendered in the view.

### 2018-04-17

* The project is now using Angular & TypeScript. I postponed the idea of plugging all the stuff recommended in the Pluralsight course. The primary objective is to render a simple POC before wrapping it in all other stuff.

* ThreeJS is used as 3D rendering lib. A simple animation is implemented to check how it works with Angular & TypeScript. The dedicated branch is `setup-threejs`, it might be reused for other experiences as quick starter project.

* AC-001: stub for a scrollable sky view. Wireframe of the sky sphere, with meridians and parallels. The viewport is in the center and the image is scrollable in all directions.


### 2018-04-15

* Initial project set-up.
