package fr.atelechev.skyview.tools.dataimport;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.stream.Collectors;

public class ConstellationBoundaryReader {

  public List<Boundary> readBoundaries(String fromFilePath) {
    final Properties boundaryProperties = loadPropertiesFile(fromFilePath);
    final Map<String, List<String>> rawPolygons =
        boundaryProperties.keySet().stream()
                          .map(Object::toString)
                          .collect(Collectors.groupingBy(this::extractCode,
                                   Collectors.mapping(boundaryProperties::getProperty, Collectors.toList())));
    return rawPolygons.entrySet().stream()
                        .map(entry -> {
                          final List<List<Node>> parsedPolys =
                              entry.getValue().stream()
                                   .map(this::parsePolygon).collect(Collectors.toList());
                          return new Boundary(entry.getKey(), parsedPolys);
                        })
        .collect(Collectors.toList());
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

  private Properties loadPropertiesFile(String fromFilePath) {
    final Properties properties = new Properties();
    try (InputStream is = Files.newInputStream(Paths.get(fromFilePath))) {
      properties.load(is);
    } catch (IOException ex) {
      throw new IllegalStateException(ex);
    }
    return properties;
  }

}
