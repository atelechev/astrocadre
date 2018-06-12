package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import fr.atelechev.astrocadre.tools.dataimport.model.Constellation;
import fr.atelechev.astrocadre.tools.dataimport.model.ConstellationFactory;
import fr.atelechev.astrocadre.tools.dataimport.model.SearchableItem;
import fr.atelechev.astrocadre.tools.dataimport.model.Star;
import fr.atelechev.astrocadre.tools.dataimport.model.StarSearchable;
import fr.atelechev.astrocadre.tools.dataimport.util.CoordinatesUtil;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@Component
public class SearchableItemsReader extends SourceDataReader {

  @Autowired
  private StarsReader starsReader;

  @Autowired
  private ConstellationFactory constellationFactory;

  @Autowired
  private CoordinatesUtil coordinatesUtil;

  @Value("${file.source.searchable-items.constellations.centers}")
  private String inputFileConstellationCenters;

  @Value("${file.source.searchable-items.constellations.labels}")
  private String inputFileConstellationLabels;

  @Override
  public Collection<Object> readSourceData() {
    log.info("Reading searchable items");
    final List<Object> items = new ArrayList<>();
    readConstellations(items);
    readStars(items);
    return items;
  }

  private void readStars(List<Object> allItems) {
    log.info("Reading stars file {}", this.starsReader.getInputFileName());
    final List<SearchableItem> stars = starsReader.readSourceData().stream()
      .map(obj -> (Star) obj)
      .filter(star -> star.getProperName() != null && !star.getProperName().trim().isEmpty())
      .map(this::toSearchableItem)
      .collect(Collectors.toList());
    log.info("Took {} stars as searchable items.", stars.size());
    allItems.addAll(stars);
  }

  private SearchableItem toSearchableItem(Star star) {
    final SearchableItem item = new StarSearchable();
    item.setCode(star.getProperName());
    item.setCenterRa(star.getRa());
    item.setCenterDec(star.getDec());
    return item;
  }

  private void readConstellations(List<Object> allItems) {
    final List<Constellation> constellations = readMainFile(this.inputFileConstellationCenters);
    final Map<String, Map<String, String>> names = readNamesFile(this.inputFileConstellationLabels);
    constellations.forEach(constellation -> {
      final List<String> constNames = organizeNames(names.get(constellation.getCode().toUpperCase()));
      constellation.setNames(constNames);
    });
    log.info("Read names for {} constellations.", constellations.size());
    allItems.addAll(constellations);
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

  private Map<String, Map<String, String>> readNamesFile(String namesFilePath) {
    log.info("Reading constellation names file {}", namesFilePath);
    final List<String> rawLines = readCsvDropHeader(namesFilePath);
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

  private List<Constellation> readMainFile(String mainFilePath) {
    log.info("Reading constellation centers file {}", mainFilePath);
    final List<String> rawLines = readCsvDropHeader(mainFilePath);
    return rawLines.stream().map(constellationFactory::fromCsvRow)
      .peek(coordinatesUtil::convertCoords)
      .collect(Collectors.toList());
  }

}
