package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Constellation;
import fr.atelechev.astrocadre.tools.dataimport.model.SearchableItem;
import fr.atelechev.astrocadre.tools.dataimport.model.StarSearchable;

import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class SearchableItemsTests extends DataTransformationTest<SearchableItemsReader> {

  public SearchableItemsTests() {
    super(SearchableItemsReader.class);
  }

  @Override
  protected void initInputFileNames() {
    final Map<String, String> filesMap = new HashMap<>();
    filesMap.put("file.constellations.centers", PATH_RESOLVER.getResourceFilePath("constellations_centers_test.csv"));
    filesMap.put("file.constellations.labels", PATH_RESOLVER.getResourceFilePath("constellations_names_test.csv"));
    filesMap.put("file.stars", PATH_RESOLVER.getResourceFilePath("stars_searchable_test.csv"));
    reader.setInputFiles(filesMap);
  }

  @Override
  public void readTestData() {
    final Collection<Object> items = reader.readSourceData();
    assertNotNull(items);

    final List<SearchableItem> expected = Arrays.asList(
      constellation("AND", 8.532, 38.906, "Andromeda", "Andromeda"),
      constellation("ANT", 150.722, -33.231, "Antlia", "Pump"),
      star("Rigel", 78.63447, -8.20164),
      star("Pollux", 116.329155, 28.026199),
      star("Vega", 279.2346, 38.783692),
      star("Sheliak", 282.51997500000004, 33.362667)
    );

    assertEquals(expected.size(), items.size());
    items.forEach(item ->
      assertTrue(String.format("Item %1$s not found in expected %2$s", item, expected),
                 expected.contains(item))
    );
  }

  private SearchableItem star(String name, double ra, double dec) {
    final StarSearchable star = new StarSearchable();
    star.setCode(name);
    star.setCenterRa(ra);
    star.setCenterDec(dec);
    return star;
  }

  private SearchableItem constellation(String code, double ra, double dec, String... names) {
    final Constellation constellation = new Constellation();
    constellation.setCode(code);
    constellation.setCenterRa(ra);
    constellation.setCenterDec(dec);
    constellation.setNames(Arrays.stream(names).collect(Collectors.toList()));
    return constellation;
  }

  @Override
  public void produceExpectedJson() {
    final Collection<Object> items = reader.readSourceData();
    final String json = JSON_PRODUCER.toJson(items);
    final String expected = "[{\"type\":\"constellation\",\"code\":\"AND\",\"ra\":8.532,\"dec\":38.906,\"names\":[\"Andromeda\",\"Andromeda\"]},{\"type\":\"constellation\",\"code\":\"ANT\",\"ra\":150.722,\"dec\":-33.231,\"names\":[\"Antlia\",\"Pump\"]},{\"type\":\"star\",\"code\":\"Rigel\",\"ra\":78.63447,\"dec\":-8.20164},{\"type\":\"star\",\"code\":\"Pollux\",\"ra\":116.329155,\"dec\":28.026199},{\"type\":\"star\",\"code\":\"Vega\",\"ra\":279.2346,\"dec\":38.783692},{\"type\":\"star\",\"code\":\"Sheliak\",\"ra\":282.51997500000004,\"dec\":33.362667}]";
    assertEquals(expected, json);
  }

}
