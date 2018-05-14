package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Ignore;
import org.junit.Test;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

import static fr.atelechev.skyview.tools.dataimport.JsonUtils.initObjectMapper;
import static fr.atelechev.skyview.tools.dataimport.JsonUtils.outputJson;
import static org.junit.Assert.assertEquals;

public class ConstellationBoundaryReaderTest {

  private List<Boundary> readBoundaries() {
    final String file = PathUtil.getResourceFilePath("/skyview/constellations_bounds_18.properties");
    final ConstellationBoundaryReader reader = new ConstellationBoundaryReader();
    return reader.readBoundaries(file);
  }

  @Test
  @Ignore // this was an initial attempt, the output format is not used.
  public void parseConstellationBoundaries() throws IOException {
    final List<Boundary> boundaries = readBoundaries();

    assertEquals(89, boundaries.size());

    final ObjectMapper mapper = initObjectMapper();
    final String json = mapper.writeValueAsString(boundaries);

    System.out.println(json);

    outputJson(json, "constellation-boundaries");
  }

  @Test
  public void transformBoundariesToSegments() throws IOException {
    final List<Segment> allSegments = asSegments(readBoundaries());
    final ObjectMapper mapper = initObjectMapper();
    final String json = mapper.writeValueAsString(allSegments);
    System.out.println(json);

    outputJson(json, "constellation-boundaries");
  }

  private List<Segment> asSegments(List<Boundary> boundaries) {
    return boundaries.stream().flatMap(boundary -> boundary.getBoundary().stream())
        .flatMap(nodes -> toSegments(nodes).stream())
        .collect(Collectors.toSet()).stream()
        .collect(Collectors.toList());
  }

  private List<Segment> toSegments(List<Node> nodes) {
    if (nodes.size() < 2) {
      System.out.println("Invalid polygon: " + nodes);
      return Collections.emptyList();
    }
    final List<Segment> segments = new ArrayList<>(nodes.size() / 2 + 1);
    for (int i = 1; i < nodes.size(); i++) {
      segments.add(new Segment(nodes.get(i - 1), nodes.get(i)));
    }
    segments.add(new Segment(nodes.get(nodes.size() - 1), nodes.get(0)));
    return segments;
  }

  @Test
  public void transformSingleConstellation() throws IOException {
    final Set<String> constellations = new HashSet<>(Arrays.asList("UMI"));
    final List<Boundary> boundaries =
        readBoundaries().stream().filter(boundary ->
            constellations.contains(boundary.getConstellationCode())).collect(Collectors.toList());
    assertEquals(1, boundaries.size());

    final List<Segment> segments = asSegments(boundaries);

    final ObjectMapper mapper = initObjectMapper();
    final String json = mapper.writeValueAsString(segments);
    System.out.println(json);

    outputJson(json, "constellation-boundaries");
  }


}
