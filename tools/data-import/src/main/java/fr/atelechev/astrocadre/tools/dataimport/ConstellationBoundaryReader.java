package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Boundary;
import fr.atelechev.astrocadre.tools.dataimport.model.Node;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.stream.Collectors;

@Slf4j
public class ConstellationBoundaryReader extends SourceDataReader {

  private String inputFileName;

  @Override
  public void setInputFiles(Map<String, String> inputFiles) {
    this.inputFileName = inputFiles.get("file");
  }

  @Override
  public Collection<Object> readSourceData() {
    log.info("Reading constellation boundaries from {}", this.inputFileName);
    final Properties boundaryProperties = readPropertiesFile(this.inputFileName);
    final Map<String, List<String>> rawPolygons =
      boundaryProperties.keySet().stream()
        .map(Object::toString)
        .collect(Collectors.groupingBy(this::extractCode,
          Collectors.mapping(boundaryProperties::getProperty, Collectors.toList())));
    final List<Boundary> boundaries = rawPolygons.entrySet().stream()
      .map(entry -> {
        final List<List<Node>> parsedPolys =
          entry.getValue().stream()
            .map(this::parsePolygon).collect(Collectors.toList());
        return new Boundary(entry.getKey(), parsedPolys);
      })
      .collect(Collectors.toList());
    log.info("Parsed {} constellation boundaries.", boundaries.size());
    final List<Object> segments = asSegments(boundaries);
    log.info("Transformed boundaries into {} segments.", segments.size());
    return segments;
  }

  private List<Object> asSegments(List<Boundary> boundaries) {
    return boundaries.stream().flatMap(boundary -> boundary.getBoundary().stream())
      .flatMap(nodes -> toSegments(nodes).stream())
      .collect(Collectors.toSet()).stream()
      .collect(Collectors.toList());
  }

  private List<Segment> toSegments(List<Node> nodes) {
    if (nodes.size() < 2) {
      log.error("Invalid polygon: {}", nodes);
      return Collections.emptyList();
    }
    final List<Segment> segments = new ArrayList<>(nodes.size() / 2 + 1);
    for (int i = 1; i < nodes.size(); i++) {
      segments.add(new Segment(nodes.get(i - 1), nodes.get(i)));
    }
    segments.add(new Segment(nodes.get(nodes.size() - 1), nodes.get(0)));
    return segments;
  }

  private String extractCode(String key) {
    return key.substring(0, key.indexOf('.'));
  }

  private List<Node> parsePolygon(String serialized) {
    final String[] rawCoords = serialized.trim().substring(1, serialized.trim().length() - 1).split("\\),\\(");
    return Arrays.stream(rawCoords).map(rawCoord -> {
      final String[] coords = rawCoord.split(",");
      return new Node(Double.parseDouble(coords[0]), Double.parseDouble(coords[1]));
    }).collect(Collectors.toList());
  }

}
