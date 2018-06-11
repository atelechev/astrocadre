package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Star;
import lombok.extern.slf4j.Slf4j;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
public class StarsWriter extends ParsedDataWriter {

  private static final double[] MAGNITUDE_STEPS = {2d, 2.5d, 3d, 3.5d, 4d, 4.5d, 5d, 5.5d, 6d};

  private String getFileNameForMagnitudeClass(double magnitude) {
    return String.format("stars-mag%1$s.json", magnitude);
  }

  private double classifyByMagnitude(double magnitude) {
    for (double magClass : MAGNITUDE_STEPS) {
      if (magnitude <= magClass) {
        return magClass;
      }
    }
    return MAGNITUDE_STEPS[MAGNITUDE_STEPS.length - 1];
  }

  @Override
  public void writeData(Collection<Object> data) {
    final Map<Double, List<Star>> classifiedByMagnitude = readStarsClassifyingByMagnitude(data);
    classifiedByMagnitude.entrySet().forEach(entry -> {
      final String fileName = getFileNameForMagnitudeClass(entry.getKey());
      log.info("{} star entries for magnitude {}", entry.getValue().size(), entry.getKey());
      final String json = jsonProducer.toJson(entry.getValue());
      outputJson(json, fileName);
    });
  }

  private Map<Double, List<Star>> readStarsClassifyingByMagnitude(Collection<Object> data) {
    return data.stream().map(obj -> (Star) obj)
      .collect(Collectors.groupingBy(star -> classifyByMagnitude(star.getMagnitude())));
  }

}
