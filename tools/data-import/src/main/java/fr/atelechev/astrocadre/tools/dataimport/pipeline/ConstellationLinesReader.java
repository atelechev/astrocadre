package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import fr.atelechev.astrocadre.tools.dataimport.model.ConstellationLine;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.model.SegmentFactory;
import fr.atelechev.astrocadre.tools.dataimport.util.CoordinatesUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
public class ConstellationLinesReader extends SourceDataReader {

  @Autowired
  private CoordinatesUtil coordinatesUtil;

  @Autowired
  private SegmentFactory segmentFactory;

  @Value("${file.source.constellation.lines}")
  private String inputFileName;

  @Override
  public Collection<Object> readSourceData() {
    log.info("Reading constellation lines from {}", this.inputFileName);
    final List<String> rawLines = readCsvDropHeader(this.inputFileName);
    final Map<String, List<Segment>> parsedSegments = new HashMap<>();
    rawLines.forEach(line -> {
      final Segment segment = segmentFactory.fromCsvRow(line);
      final String code = line.split(",")[0].trim();
      parsedSegments.putIfAbsent(code, new ArrayList<>());
      parsedSegments.get(code).add(segment);
    });
    final List<ConstellationLine> lines = parsedSegments.entrySet().stream()
      .map(entry -> new ConstellationLine(entry.getKey(), entry.getValue()))
      .collect(Collectors.toList());
    log.info("Parsed {} constellation lines.", lines.size());
    final List<Object> segments = lines.stream()
      .flatMap(line -> line.getLines().stream())
      .peek(coordinatesUtil::convertRa)
      .collect(Collectors.toList());
    log.info("Transformed lines into {} segments.", segments.size());
    return segments;
  }

}
