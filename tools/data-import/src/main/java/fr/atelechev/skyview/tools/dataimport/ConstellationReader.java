package fr.atelechev.skyview.tools.dataimport;

import lombok.Data;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class ConstellationReader {

  public List<Constellation> readConstellations(String mainFilePath, String namesFilePath) throws IOException {
    final List<Constellation> constellations = readMainFile(mainFilePath);
    final Map<String, Map<String, String>> names = readNamesFile(namesFilePath);
    constellations.forEach(constellation -> {
      final List<String> constNames = organizeNames(names.get(constellation.getCode().toUpperCase()));
      constellation.setNames(constNames);
    });
    return constellations;
  }

  private List<String> organizeNames(Map<String, String> names) {
    final List<String> organized = new ArrayList<>();
    names.entrySet().forEach(entry -> {
      if (entry.getKey().equalsIgnoreCase("la")) {
        organized.add(0, entry.getValue());
      } else {
        organized.add(entry.getValue());
      }
    });
    return organized;
  }

  private List<String> readLinesWithoutHeader(String filePath) throws IOException {
    final List<String> rawLines = Files.readAllLines(Paths.get(filePath));
    rawLines.remove(0); // the header
    return rawLines;
  }

  private Map<String, Map<String, String>> readNamesFile(String namesFilePath) throws IOException {
    final List<String> rawLines = readLinesWithoutHeader(namesFilePath);
    return rawLines.stream().map(line -> {
      final String[] split = line.split(",", 3);
      return new LocalizedName(split[0].toUpperCase().trim(), split[1].trim(), split[2]);
    }).collect(Collectors.groupingBy(LocalizedName::getConstCode,
                                     Collectors.toMap(LocalizedName::getLang, LocalizedName::getName)));
  }

  @Data
  private static class LocalizedName {
    final String constCode;
    final String lang;
    final String name;
    LocalizedName(String constCode, String lang, String name) {
      this.constCode = constCode;
      this.lang = lang;
      this.name = name;
    }
  }

  private List<Constellation> readMainFile(String mainFilePath) throws IOException {
    final List<String> rawLines = readLinesWithoutHeader(mainFilePath);
    return rawLines.stream().map(Constellation::fromCsvRow)
      .peek(CoordinatesUtil::convertCoords)
      .collect(Collectors.toList());
  }

}
