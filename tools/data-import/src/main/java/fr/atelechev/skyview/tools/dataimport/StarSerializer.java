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
    final double[] values = { round(star.getRa()),
                              round(star.getDec()),
                              round(star.getMagnitude(), 1)  };
    jsonGenerator.writeArray(values, 0, values.length);
  }

}
