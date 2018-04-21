package fr.atelechev.skyview.tools.dataimport;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ConstellationLinesReader {

  public List<ConstellationLine> readLines(String fromFilePath) throws IOException {
    final List<String> rawLines = Files.readAllLines(Paths.get(fromFilePath));
    rawLines.remove(0); // the header
    final Map<String, List<Segment>> parsedSegments = new HashMap<>();
    rawLines.forEach(line -> {
      final String[] split = line.split(",");
      final Segment segment = extractSegment(split);
      final String code = split[1].trim();
      parsedSegments.putIfAbsent(code, new ArrayList<>());
      parsedSegments.get(code).add(segment);
    });
    return parsedSegments.entrySet().stream()
        .map(entry -> new ConstellationLine(entry.getKey(), entry.getValue()))
        .collect(Collectors.toList());
  }

  private Segment extractSegment(String[] lineSplit) {
    final Segment segment = new Segment();
    segment.setRa0(toDouble(lineSplit[2]));
    segment.setDecl0(toDouble(lineSplit[3]));
    segment.setRa1(toDouble(lineSplit[4]));
    segment.setDecl1(toDouble(lineSplit[5]));
    return segment;
  }

  private static double toDouble(String value) {
    return Double.parseDouble(value);
  }


}
