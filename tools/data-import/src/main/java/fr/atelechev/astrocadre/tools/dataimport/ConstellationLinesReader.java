package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.ConstellationLine;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.util.CoordinatesUtil;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
public class ConstellationLinesReader extends SourceDataReader {

  private String inputFileName;

  @Override
  public void setInputFiles(Map<String, String> inputFiles) {
    this.inputFileName = inputFiles.get("file");
  }

  @Override
  public Collection<Object> readSourceData() {
    log.info("Reading constellation lines from {}", this.inputFileName);
    final List<String> rawLines = readCsvDropHeader(this.inputFileName);
    final Map<String, List<Segment>> parsedSegments = new HashMap<>();
    rawLines.forEach(line -> {
      final String[] split = line.split(",");
      final Segment segment = extractSegment(split);
      final String code = split[1].trim();
      parsedSegments.putIfAbsent(code, new ArrayList<>());
      parsedSegments.get(code).add(segment);
    });
    final List<ConstellationLine> lines = parsedSegments.entrySet().stream()
      .map(entry -> new ConstellationLine(entry.getKey(), entry.getValue()))
      .collect(Collectors.toList());
    log.info("Parsed {} constellation lines.", lines.size());
    final List<Object> segments = lines.stream()
      .flatMap(line -> line.getLines().stream())
      .peek(CoordinatesUtil::convertRa)
      .collect(Collectors.toList());
    log.info("Transformed lines into {} segments.", segments.size());
    return segments;
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
