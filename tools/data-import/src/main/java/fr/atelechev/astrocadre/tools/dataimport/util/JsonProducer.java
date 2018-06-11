package fr.atelechev.astrocadre.tools.dataimport.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import fr.atelechev.astrocadre.tools.dataimport.model.Node;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.model.Star;
import fr.atelechev.astrocadre.tools.dataimport.serializer.NodeSerializer;
import fr.atelechev.astrocadre.tools.dataimport.serializer.SegmentSerializer;
import fr.atelechev.astrocadre.tools.dataimport.serializer.StarSerializer;

import java.util.Collection;

public class JsonProducer {

  private static final ObjectMapper MAPPER = initObjectMapper();

  public static ObjectMapper initObjectMapper() {
    final ObjectMapper mapper = new ObjectMapper();
    final SimpleModule module = new SimpleModule();
    module.addSerializer(Node.class, new NodeSerializer());
    module.addSerializer(Segment.class, new SegmentSerializer());
    module.addSerializer(Star.class, new StarSerializer());
    mapper.registerModule(module);
    return mapper;
  }

  public String toJson(Collection<?> items) {
    if (items == null) {
      throw new IllegalArgumentException("items arg must not be null");
    }
    try {
      return MAPPER.writeValueAsString(items);
    } catch (JsonProcessingException ex) {
      throw new IllegalStateException(ex);
    }
  }

}
