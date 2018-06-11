package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Star;
import fr.atelechev.astrocadre.tools.dataimport.util.CoordinatesUtil;
import lombok.extern.slf4j.Slf4j;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
public class StarsReader extends SourceDataReader {

  private String inputFileName;

  @Override
  public void setInputFiles(Map<String, String> inputFiles) {
    this.inputFileName = inputFiles.get("file");
  }

  @Override
  public Collection<Object> readSourceData() {
    log.info("Reading stars");
    final List<String> rawLines = readCsvDropHeader(this.inputFileName);
    final Collection<Object> stars = rawLines.stream().map(Star::fromCsvRow)
      .peek(CoordinatesUtil::convertRa)
      .collect(Collectors.toList());
    log.info("Read {} star entries.", stars.size());
    return stars;
  }

}
