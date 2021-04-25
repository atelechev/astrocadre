package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@Data
public class ConstellationsWriter extends SimpleDataWriter {

  @Value("${file.target.constellations}")
  private String outputFileName;

  @Override
  public void writeData(Collection<Object> data) {
    if (data.size() != 3) {
      final String message =
          String.format("Expected exactly 3 items in the input data collection, but got %1$s.", data.size());
      throw new IllegalArgumentException(message);
    }
    final List<Object> inputList = new ArrayList<>(data);
    final Map<String, Object> outputMap = new HashMap<>();
    outputMap.put("boundaries", inputList.get(0));
    outputMap.put("lines", inputList.get(1));
    outputMap.put("names", inputList.get(2));
    final String json = jsonProducer.toJson(Arrays.asList(outputMap));
    outputJson(json, getOutputFileName());
  }

}
