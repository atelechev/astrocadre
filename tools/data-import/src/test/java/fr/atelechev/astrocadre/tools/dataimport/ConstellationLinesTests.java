package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.ConstellationLinesReader;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.junit.Assert.*;


public class ConstellationLinesTests extends DataTransformationTest {

  @Autowired
  private ConstellationLinesReader reader;

  @Override
  public void readTestData() {
    final Collection<Object> lines = reader.readSourceData();
    assertNotNull(lines);

    final List<Segment> expected = Arrays.asList(
      segment(72.462495, 6.95, 72.654165, 8.9),
      segment(72.804165, 5.6, 72.462495, 6.95),
      segment(98.224995, 7.3333, 100.24167, 9.883333)
    );

    assertEquals(expected.size(), lines.size());
    lines.forEach(line ->
      assertTrue(String.format("Line %1$s not found in expected %2$s", line, expected), expected.contains(line))
    );
  }

  @Override
  public void produceExpectedJson() {
    final Collection<Object> lines = reader.readSourceData();
    final String json = jsonProducer.toJson(lines);
    final String expected = "[[72.46,6.95,72.65,8.9],[72.8,5.6,72.46,6.95],[98.22,7.33,100.24,9.88]]";
    assertEquals(expected, json);
  }

}
