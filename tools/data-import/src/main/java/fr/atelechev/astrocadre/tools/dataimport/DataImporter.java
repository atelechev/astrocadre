package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.util.ProjectPathResolver;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
public class DataImporter {

  private final ProjectPathResolver pathResolver;

  private final List<DataIO> sourceDataReaders;

  public DataImporter() {
    this.pathResolver = new ProjectPathResolver();
    this.sourceDataReaders = Arrays.asList(
      initConstellationBoundaryIO(),
      initConstellationLinesIO(),
      initSearchableItemsIO(),
      initStarsIO()
    );
  }

  private DataIO initStarsIO() {
    final SourceDataReader reader = initStarsReader();
    final ParsedDataWriter writer = new StarsWriter();
    return new DataIO("Stars", reader, writer);
  }

  private SourceDataReader initStarsReader() {
    final StarsReader reader = new StarsReader();
    reader.setInputFiles(asMapWithSingleFileKey(withPath("stars_hyg_v3_mag6.csv")));
    return reader;
  }

  private DataIO initSearchableItemsIO() {
    final SourceDataReader reader = initSearchableItemsReader();
    final ParsedDataWriter writer = new SimpleDataWriter("searchable-items.json");
    return new DataIO("Searchable items", reader, writer);
  }

  private SourceDataReader initSearchableItemsReader() {
    final SearchableItemsReader reader = new SearchableItemsReader();
    final Map<String, String> fileMap = new HashMap<>();
    fileMap.put("file.constellations.centers", withPath("constellations_18.csv"));
    fileMap.put("file.constellations.labels", withPath("constellations_names.csv"));
    fileMap.put("file.stars", withPath("stars_hyg_v3_mag6.csv"));
    reader.setInputFiles(fileMap);
    return reader;
  }

  private String withPath(String fileName) {
    return this.pathResolver.getResourceFilePath(fileName);
  }

  private DataIO initConstellationBoundaryIO() {
    final SourceDataReader reader = initConstellationBoundaryReader();
    final SimpleDataWriter writer = new SimpleDataWriter("constellation-boundaries.json");
    return new DataIO("Constellation boundaries", reader, writer);
  }

  private SourceDataReader initConstellationBoundaryReader() {
    final ConstellationBoundaryReader reader = new ConstellationBoundaryReader();
    reader.setInputFiles(asMapWithSingleFileKey(withPath("constellations_bounds_18.properties")));
    return reader;
  }

  private DataIO initConstellationLinesIO() {
    final SourceDataReader reader = initConstellationLinesReader();
    final SimpleDataWriter writer = new SimpleDataWriter("constellation-lines.json");
    return new DataIO("Constellation lines", reader, writer);
  }

  private SourceDataReader initConstellationLinesReader() {
    final ConstellationLinesReader reader = new ConstellationLinesReader();
    reader.setInputFiles(asMapWithSingleFileKey(withPath("constellation_lines.csv")));
    return reader;
  }

  private Map<String, String> asMapWithSingleFileKey(String fileName) {
    final Map<String, String> fileMap = new HashMap<>();
    fileMap.put("file", fileName);
    return fileMap;
  }

  public void importAllData() {
    log.info("Starting data import...");
    this.sourceDataReaders.forEach(dataIO -> {
      log.info("--> {} <--", dataIO.header);
      final Collection<Object> items = dataIO.reader.readSourceData();
      dataIO.writer.writeData(items);
    });
    log.info("Data import finished!");
  }

  public static void main(String[] args) {
    new DataImporter().importAllData();
  }

  private static class DataIO {
    private final String header;
    private final SourceDataReader reader;
    private final ParsedDataWriter writer;

    private DataIO(String header, SourceDataReader reader, ParsedDataWriter writer) {
      this.header = header;
      this.reader = reader;
      this.writer = writer;
    }
  }

}
