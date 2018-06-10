package fr.atelechev.astrocadre.tools.dataimport;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.IOException;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class ConstellationReaderTest {

  private static final String CONSTELLATIONS_FILE = PathUtil.getResourceFilePath("/astrocadre/constellations_18.csv");
  private static final String CONSTELLATIONS_NAMES_FILE = PathUtil.getResourceFilePath("/astrocadre/constellations_names.csv");

  private final ConstellationReader reader = new ConstellationReader();

  @Test
  public void parseAllConstellations() throws IOException {
    final List<Constellation> allConstellations = reader.readConstellations(CONSTELLATIONS_FILE, CONSTELLATIONS_NAMES_FILE);
    allConstellations.forEach(System.out::println);
    assertEquals(89, allConstellations.size());

    final ObjectMapper mapper = JsonUtils.initObjectMapper();
    final String json = mapper.writeValueAsString(allConstellations);

    System.out.println(json);

    JsonUtils.outputJson(json, "searchable-items");
  }

}
