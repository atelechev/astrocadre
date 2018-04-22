package fr.atelechev.skyview.tools.dataimport;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class StarsReader {

  private static final double[] MAGNITUDE_STEPS = { 2d, 2.5d, 3d, 3.5d, 4d, 4.5d, 5d, 5.5d, 6d };

  public List<Star> readStars(String fromFilePath) throws IOException {
    final List<String> rawLines = Files.readAllLines(Paths.get(fromFilePath));
    rawLines.remove(0); // the header
    return rawLines.stream().map(Star::fromCsvRow)
      .peek(CoordinatesUtil::convertRa)
      .collect(Collectors.toList());
  }

  public Map<Double, List<Star>> readStarsClassifyingByMagnitude(String fromFilePath) throws IOException {
    return readStars(fromFilePath).stream()
      .collect(Collectors.groupingBy(star -> classifyByMagnitude(star.getMagnitude())));
  }

  private double classifyByMagnitude(double magnitude) {
    for (double magClass: MAGNITUDE_STEPS) {
      if (magnitude <= magClass) {
        return magClass;
      }
    }
    return MAGNITUDE_STEPS[MAGNITUDE_STEPS.length - 1];
  }

}
