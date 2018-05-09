package fr.atelechev.skyview.tools.dataimport;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Collectors;

public class ConstellationReader {

  public List<Constellation> readConstellations(String fromFilePath) throws IOException {
    final List<String> rawLines = Files.readAllLines(Paths.get(fromFilePath));
    rawLines.remove(0); // the header
    return rawLines.stream().map(Constellation::fromCsvRow)
      .peek(CoordinatesUtil::convertCoords)
      .collect(Collectors.toList());
  }

}
