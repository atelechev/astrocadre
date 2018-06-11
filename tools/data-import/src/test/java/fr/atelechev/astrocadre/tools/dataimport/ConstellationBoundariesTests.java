package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Segment;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.junit.Assert.*;

public class ConstellationBoundariesTests extends DataTransformationTest<ConstellationBoundaryReader> {

  public ConstellationBoundariesTests() {
    super(ConstellationBoundaryReader.class);
  }

  @Override
  protected void initInputFileNames() {
    reader.setInputFiles(singleInputFile("constellations_bounds_test.properties"));
  }

  @Override
  public void readTestData() {
    final Collection<Object> boundaries = reader.readSourceData();
    assertNotNull(boundaries);

    final List<Segment> expected = Arrays.asList(
      segment(146.25, -24.0, 140.5, -24.0),
      segment(350.0, 52.5, 343.0, 34.5),
      segment(140.5, -24.0, 146.25, -24.0),
      segment(343.0, 34.5, 343.0, 52.5),
      segment(343.0, 52.5, 350.0, 52.5)
    );

    assertEquals(expected.size(), boundaries.size());
    boundaries.forEach(segment ->
      assertTrue(String.format("Segment %1$s not found in expected %2$s", segment, expected), expected.contains(segment))
    );

  }

  @Override
  public void produceExpectedJson() {
    final Collection<Object> boundaries = reader.readSourceData();
    final String json = JSON_PRODUCER.toJson(boundaries);
    final String expected = "[[350.0,52.5,343.0,34.5],[140.5,-24.0,146.25,-24.0],[343.0,52.5,350.0,52.5],[146.25,-24.0,140.5,-24.0],[343.0,34.5,343.0,52.5]]";
    assertEquals(expected, json);
  }

}
