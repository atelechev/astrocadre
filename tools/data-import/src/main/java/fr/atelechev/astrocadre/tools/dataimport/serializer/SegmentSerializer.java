package fr.atelechev.astrocadre.tools.dataimport.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.util.NumberUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class SegmentSerializer extends StdSerializer<Segment> {

  @Autowired
  private NumberUtil numberUtil;

  public SegmentSerializer() {
    super(Segment.class);
  }

  @Override
  public void serialize(Segment segment, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
    final double[] coords = { numberUtil.round(segment.getRa0()),
                              numberUtil.round(segment.getDecl0()),
                              numberUtil.round(segment.getRa1()),
                              numberUtil.round(segment.getDecl1())};
    jsonGenerator.writeArray(coords, 0, coords.length);
  }

}
