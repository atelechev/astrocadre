package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Constellation;
import fr.atelechev.astrocadre.tools.dataimport.model.SearchableItem;
import fr.atelechev.astrocadre.tools.dataimport.model.StarSearchable;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.SearchableItemsReader;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import static org.junit.Assert.*;

public class SearchableItemsTests extends DataTransformationTest {

  @Autowired
  private SearchableItemsReader reader;

  @Override
  public void readTestData() {
    final Collection<Object> items = reader.readSourceData();
    assertNotNull(items);

    final List<SearchableItem> expected = Arrays.asList(
      constellation("AND", 8.532, 38.906, "Andromeda", "Andromeda"),
      constellation("ANT", 150.722, -33.231, "Antlia", "Pump"),
      star("Alpheratz", 2.096865, 29.090432),
      star("Caph", 2.293305, 59.14978),
      star("Ankaa", 6.5708400000000005, -42.305981),
      star("Shedir", 10.126740000000002, 56.537331),
      star("Diphda", 10.89735, -17.986605)
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
    final String json = jsonProducer.toJson(items);
    final String expected = "[{\"type\":\"constellation\",\"code\":\"AND\",\"ra\":8.532,\"dec\":38.906,\"names\":[\"Andromeda\",\"Andromeda\"]},{\"type\":\"constellation\",\"code\":\"ANT\",\"ra\":150.722,\"dec\":-33.231,\"names\":[\"Antlia\",\"Pump\"]},{\"type\":\"star\",\"code\":\"Alpheratz\",\"ra\":2.096865,\"dec\":29.090432},{\"type\":\"star\",\"code\":\"Caph\",\"ra\":2.293305,\"dec\":59.14978},{\"type\":\"star\",\"code\":\"Ankaa\",\"ra\":6.5708400000000005,\"dec\":-42.305981},{\"type\":\"star\",\"code\":\"Shedir\",\"ra\":10.126740000000002,\"dec\":56.537331},{\"type\":\"star\",\"code\":\"Diphda\",\"ra\":10.89735,\"dec\":-17.986605}]";
    assertEquals(expected, json);
  }

}
