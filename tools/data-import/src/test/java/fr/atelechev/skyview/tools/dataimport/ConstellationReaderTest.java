package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static fr.atelechev.skyview.tools.dataimport.JsonUtils.initObjectMapper;
import static fr.atelechev.skyview.tools.dataimport.JsonUtils.outputJson;
import static org.junit.Assert.assertEquals;

public class ConstellationReaderTest {

  private static final String CONSTELLATIONS_FILE = PathUtil.getResourceFilePath("/skyview/constellations_18.csv");
  private static final String CONSTELLATIONS_NAMES_FILE = PathUtil.getResourceFilePath("/skyview/constellations_names.csv");

  private final ConstellationReader reader = new ConstellationReader();

  @Test
  public void parseAllConstellations() throws IOException {
    final List<Constellation> allConstellations = reader.readConstellations(CONSTELLATIONS_FILE, CONSTELLATIONS_NAMES_FILE);
    allConstellations.forEach(System.out::println);
    assertEquals(89, allConstellations.size());

    final ObjectMapper mapper = initObjectMapper();
    final String json = mapper.writeValueAsString(allConstellations);

    System.out.println(json);

    outputJson(json, "constellations");
  }

}
