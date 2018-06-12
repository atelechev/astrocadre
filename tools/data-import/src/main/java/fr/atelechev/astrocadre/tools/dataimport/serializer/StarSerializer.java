package fr.atelechev.astrocadre.tools.dataimport.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import fr.atelechev.astrocadre.tools.dataimport.model.Star;
import fr.atelechev.astrocadre.tools.dataimport.util.NumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class StarSerializer extends StdSerializer<Star> {

  @Autowired
  private NumberUtil numberUtil;

  public StarSerializer() {
    super(Star.class);
  }

  @Override
  public void serialize(Star star, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    jsonGenerator.writeStartArray();
    jsonGenerator.writeNumber(numberUtil.round(star.getRa()));
    jsonGenerator.writeNumber(numberUtil.round(star.getDec()));
    jsonGenerator.writeNumber(numberUtil.round(star.getMagnitude(), 1));
    writeStarName(star, jsonGenerator);
    jsonGenerator.writeEndArray();
  }

  private static boolean isDefined(String value) {
    return value != null && !value.trim().isEmpty();
  }

  private void writeStarName(Star star, JsonGenerator jsonGenerator) throws IOException {
    if (isDefined(star.getProperName())) {
      jsonGenerator.writeString(star.getProperName().trim());
    }
    if (isDefined(star.getStandardName())) {
      jsonGenerator.writeString(normalizeStandardName(star.getStandardName()));
    }
  }

  private String normalizeStandardName(String name) {
    return name.trim().toUpperCase().replaceAll("\\s+", " ");
  }

}
