package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

public class ConstellationLinesReaderTest {

  private static double RA_CONVERSION_RATIO = 15.0d;

  private List<ConstellationLine> loadConstellationLines() {
    try {
      final String file = PathUtil.getResourceFilePath("/skyview/constellation_lines.csv");
      final ConstellationLinesReader reader = new ConstellationLinesReader();
      return reader.readLines(file);
    } catch (IOException ex) {
      throw new IllegalStateException(ex);
    }
  }

  private void convertRa(Segment segment) {
    segment.setRa0(segment.getRa0() * RA_CONVERSION_RATIO);
    segment.setRa1(segment.getRa1() * RA_CONVERSION_RATIO);
  }

  @Test
  public void parseConstellationLines() throws IOException {
    final List<Segment> lines = loadConstellationLines().stream()
        .flatMap(line -> line.getLines().stream())
        .peek(this::convertRa)
        .collect(Collectors.toList());
    final ObjectMapper mapper = JsonUtils.initObjectMapper();
    final String json = mapper.writeValueAsString(lines);

    System.out.println(json);

    JsonUtils.outputJson(json, "constellation_lines");
  }

}
