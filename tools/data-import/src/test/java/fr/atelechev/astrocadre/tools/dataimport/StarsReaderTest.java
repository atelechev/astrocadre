package fr.atelechev.astrocadre.tools.dataimport;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import static org.junit.Assert.assertEquals;

public class StarsReaderTest {

  private static final String STARS_FILE = PathUtil.getResourceFilePath("/astrocadre/stars_hyg_v3_mag6.csv");

  private static final ObjectMapper MAPPER = JsonUtils.initObjectMapper();


  private final StarsReader reader = new StarsReader();

  @Test
  public void parseAllStars() throws IOException {
    final List<Star> allStars = reader.readStars(STARS_FILE);
    assertEquals(5017, allStars.size());
  }

  @Test
  public void parseAndClassify() throws IOException {
    final Map<Double, List<Star>> stars = reader.readStarsClassifyingByMagnitude(STARS_FILE);
    assertEquals(50, stars.get(2d).size());
    assertEquals(44, stars.get(2.5d).size());
    assertEquals(85, stars.get(3.0d).size());
    assertEquals(112, stars.get(3.5d).size());
    assertEquals(232, stars.get(4d).size());
    assertEquals(402, stars.get(4.5d).size());
    assertEquals(712, stars.get(5.0d).size());
    assertEquals(1228, stars.get(5.5d).size());
    assertEquals(2152, stars.get(6.0d).size());

    stars.entrySet().forEach(entry -> {
      saveStarsForMagnitude(entry.getValue(), entry.getKey());
    });
  }

  private void saveStarsForMagnitude(List<Star> stars, double magClass) {
    try {
      System.out.println(String.format("%1$s stars for magnitude class %2$s", stars.size(), magClass));
      final String json = MAPPER.writeValueAsString(stars);
      final String fileName = String.format("stars-mag%1$s", magClass);
      JsonUtils.outputJson(json, fileName);
    } catch (IOException ex) {
      throw new IllegalStateException(ex);
    }
  }

}
