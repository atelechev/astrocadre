# Data Import Tool

This sub-project contains a utility application that allows to generate static resource JSON files for the AstroCadre application.

## Pre-Requisites

This project is written in Java, using [Spring](http://spring.io/) framework and [Maven](http://maven.apache.org/) build tool.

## Usage

To build the project, use the standard command

```bash
cd {path/to/AstroCadre}/tools/data-import
mvn clean install
```

To generate static JSON files, use

```bash
cd target
java -jar data-import-0.1.jar
```

The .jar file should be executed from `data-import` or `data-import/target` folders, so that the target output directory could be reached properly.

When this .jar file is executed successfully, most of the `.json` files in `{AstroCadre}/src/assets` will be overwritten.

## Source Data

The source data files are placed in `src/main/resources/raw_data`.

The data originates from:

* http://pbarbier.com/
* http://www.astronexus.com/hyg

### Expected Formats

#### Constellation Lines

_Input_

The file `constellation_lines.csv` contains the definitions of line edges joining stars in constellations.

The raw data is has the following columns:

* `id_line_edge` - number, the id of the edge.
* `constellation_code` - string, the code of the constellation to which the line edge belongs.
* `point1_ra` - number, the right ascension of the first point in decimal hours.
* `point1_dec` - number, the declination of the first point in decimal degrees.
* `point2_ra` - number, the right ascension of the second point in decimal hours.
* `point2_dec` - number, the declination of the second point in decimal degrees.

_Output_

`constellation-lines.json` is a 2D array of numbers:

```
[[72.46,6.95,72.65,8.9],[72.8,5.6,72.46,6.95],...]
```

Each second-level array of numbers represents a line edge from the original CSV file, encoded as `[ra1, dec1, ra2, dec2]`. Each number is represented in _decimal degrees_ (0 to 360 for RA, -90 to 90 for DEC).

#### Constellation Boundaries

_Input_

The file `constellation_bounds_18.properties` contains the definitions of polygons forming constellation boundaries.

The raw data has the following format:

```
{constellation_code}=(ra1,dec1),...(raN,decN)
```

NB! If a boundary line crosses the 0-th meridian, it is split into two segments around the point crossing the meridian. For example:

```
// initial line:
(350,2),(10,2)

// becomes:
(350,2),(360,2),(0,2),(10,2)
```

_Output_

The output file is `constellation-boundaries.json`. Its format is exactly the same as for constellation lines.


#### Constellation Names

_Input_

The file `constellations_18.csv` contains the definitions of constellation codes and their center points. It has the following format:

* `id_constellation` - number, the id of the constellation
* `center_ra` - number, the right ascension of the center point, in decimal hours.
* `center_dec` - number, the declination of the center point, in decimal degrees.
* `constellation_code` - string, the code of the constellation.

The file `constellation_names.csv` contains the associations between constellation codes, language and name. It has the following format:

* `constellation_code` - string, the code of the constellation, as in the previous file.
* `lang` - string, the 2-chars ISO code of the language in which the name is given.
* `name` - string, the name of the constellation in this language.

_Output_

The output file is `searchable-items.json`. It contains an array of objects having the following structure:

```json
[
  {
    "type": "constellation",
    "code": "string",        // the code of the constellation
    "ra": number,            // center point right ascension in decimal degrees
    "dec": number,           // center point declinations in decimal degrees
    "names": ["string",...]  // array with names
  },...
]
```

#### Stars

_Input_

The file `stars_hyg_v3_mag6.csv` contains stellar data. It has the following format:

* `id` - number, the id of the star.
* `hip` - number, the id in HIPPARCOS catalog.
* `hd` - number, the id in Henry Draper catalog.
* `hr` - number, the id in the Harvard Revised catalog.
* `gl` - string, the id in the third edition of the Gliese Catalog of Nearby Stars.
* `bf` - the Bayer / Flamsteed combined designation.
* `proper` - string, the proper name of the star.
* `ra` - number, the right ascension in decimal hours.
* `dec` - number, the declination in decimal hours.
* `dist` - number, the distance to the star from the Sun, in light years.
* `mag` - number, the apparent magnitude of the star.
* `absmag` - number, the absolute magnitude of the star.
* `spect` - string, the spectral class.
* `ci` - number, the color index of the star.
* `bayer` - string, the Bayer designation.
* `flam` - string, the Flamsteed designation.
* `con` - string, the constellation code.
* `lum` - number, the luminosity of the star.

_Output_

After reading the source data for stars, the entries are grouped by apparent magnitude and output in JSON files per magnitude groups:

* the stars having magnitude less or equal than 2 are output into `star-mag2.0.json`.
* the stars having magnitude greater than 2 and less or equal to 2.5 are output into `star-mag2.5.json`
* ...
* the stars having magnitude greater than 5.5 and less or equal to 6 are output into `star-mag6.0.json`

The output is a 2D array of object, having the following format:

```
[[24.43,-57.24,0.5,"Achernar","ALP ERI"],[37.95,89.26,2.0,"Polaris","ALP UMI",...]
```

Each second-level array corresponds to a star entry, encoded as `[ ra, dec, magnitude, "proper name", "standard name" ]`. Right ascension and declination are in decimal degrees. Proper and standard names are optional.

The stars having defined proper name values are also output into `searchable-items.json` file described above, with `"type": "star"`.

### Configuration

`application.properties` files in `src/main/resources` and `src/test/resources` define the name of input and output files to process and generate. The keys used in the configuration files are self-explanatory.

