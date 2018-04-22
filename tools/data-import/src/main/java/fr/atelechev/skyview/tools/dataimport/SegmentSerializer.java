package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

import static fr.atelechev.skyview.tools.dataimport.NumberUtil.round;

public class SegmentSerializer extends StdSerializer<Segment> {

  public SegmentSerializer() {
    super(Segment.class);
  }

  @Override
  public void serialize(Segment segment, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    final double[] coords = { round(segment.getRa0()),
                              round(segment.getDecl0()),
                              round(segment.getRa1()),
                              round(segment.getDecl1())};
    jsonGenerator.writeArray(coords, 0, coords.length);
  }

}
