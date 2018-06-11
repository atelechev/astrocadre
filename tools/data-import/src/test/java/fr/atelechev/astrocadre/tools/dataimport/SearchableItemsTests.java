package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Constellation;
import fr.atelechev.astrocadre.tools.dataimport.model.SearchableItem;

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
    reader.setInputFiles(filesMap);
  }

  @Override
  public void readTestData() {
    final Collection<Object> items = reader.readSourceData();
    assertNotNull(items);

    final List<SearchableItem> expected = Arrays.asList(
      constellation("AND", 8.532, 38.906, "Andromeda", "Andromeda"),
      constellation("ANT", 150.722, -33.231, "Antlia", "Pump")
    );

    assertEquals(expected.size(), items.size());
    items.forEach(item ->
      assertTrue(String.format("Item %1$s not found in expected %2$s", item, expected),
                 expected.contains(item))
    );
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
    final String expected = "[{\"type\":\"constellation\",\"code\":\"AND\",\"ra\":8.532,\"dec\":38.906,\"names\":[\"Andromeda\",\"Andromeda\"]},{\"type\":\"constellation\",\"code\":\"ANT\",\"ra\":150.722,\"dec\":-33.231,\"names\":[\"Antlia\",\"Pump\"]}]";
    assertEquals(expected, json);
  }

}
