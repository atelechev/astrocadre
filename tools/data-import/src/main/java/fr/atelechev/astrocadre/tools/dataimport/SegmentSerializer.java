package fr.atelechev.astrocadre.tools.dataimport;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

import static fr.atelechev.astrocadre.tools.dataimport.NumberUtil.round;

public class SegmentSerializer extends StdSerializer<Segment> {

  public SegmentSerializer() {
    super(Segment.class);
  }

  @Override
  public void serialize(Segment segment, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    final double[] coords = { NumberUtil.round(segment.getRa0()),
                              NumberUtil.round(segment.getDecl0()),
                              NumberUtil.round(segment.getRa1()),
                              NumberUtil.round(segment.getDecl1())};
    jsonGenerator.writeArray(coords, 0, coords.length);
  }

}
