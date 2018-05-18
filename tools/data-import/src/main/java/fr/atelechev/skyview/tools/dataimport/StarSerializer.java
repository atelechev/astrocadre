package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

import static fr.atelechev.skyview.tools.dataimport.NumberUtil.round;

public class StarSerializer extends StdSerializer<Star> {

  public StarSerializer() {
    super(Star.class);
  }

  @Override
  public void serialize(Star star, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    jsonGenerator.writeStartArray();
    jsonGenerator.writeNumber(round(star.getRa()));
    jsonGenerator.writeNumber(round(star.getDec()));
    jsonGenerator.writeNumber(round(star.getMagnitude(), 1));
    writeStarName(star, jsonGenerator);
    jsonGenerator.writeEndArray();
  }

  private static boolean isDefined(String value) {
    return value != null && !value.trim().isEmpty();
  }

  private void writeStarName(Star star, JsonGenerator jsonGenerator) throws IOException {
    if (isDefined(star.getProperName())) {
      jsonGenerator.writeString(star.getProperName().trim());
    } else if (isDefined(star.getStandardName())) {
      jsonGenerator.writeString(normalizeStandardName(star.getStandardName()));
    }
  }

  private String normalizeStandardName(String name) {
    return name.trim().toUpperCase().replaceAll("\\s+", " ");
  }

}
