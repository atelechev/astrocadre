package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import fr.atelechev.astrocadre.tools.dataimport.model.StarFactory;
import fr.atelechev.astrocadre.tools.dataimport.util.CoordinatesUtil;
import lombok.Getter;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class StarsReader extends SourceDataReader {

  @Autowired
  private StarFactory starFactory;

  @Autowired
  private CoordinatesUtil coordinatesUtil;

  @Getter
  @Value("${file.source.stars}")
  private String inputFileName;

  @Override
  public Collection<Object> readSourceData() {
    log.info("Reading stars");
    final List<String> rawLines = readCsvDropHeader(this.inputFileName);
    final Collection<Object> stars = rawLines.stream().map(starFactory::fromCsvRow)
      .peek(coordinatesUtil::convertRa)
      .collect(Collectors.toList());
    log.info("Read {} star entries.", stars.size());
    return stars;
  }

}
