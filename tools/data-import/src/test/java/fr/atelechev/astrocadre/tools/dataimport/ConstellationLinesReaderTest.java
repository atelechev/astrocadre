package fr.atelechev.astrocadre.tools.dataimport;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class ConstellationLinesReaderTest {


  private List<ConstellationLine> loadConstellationLines() {
    try {
      final String file = PathUtil.getResourceFilePath("/astrocadre/constellation_lines.csv");
      final ConstellationLinesReader reader = new ConstellationLinesReader();
      return reader.readLines(file);
    } catch (IOException ex) {
      throw new IllegalStateException(ex);
    }
  }

  @Test
  public void parseConstellationLines() throws IOException {
    final List<Segment> lines = loadConstellationLines().stream()
        .flatMap(line -> line.getLines().stream())
        .peek(CoordinatesUtil::convertRa)
        .collect(Collectors.toList());
    final ObjectMapper mapper = JsonUtils.initObjectMapper();
    final String json = mapper.writeValueAsString(lines);

    System.out.println(json);

    JsonUtils.outputJson(json, "constellation-lines");
  }

}
