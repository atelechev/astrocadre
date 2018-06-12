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
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component
public class JsonProducer {

  @Autowired
  private ObjectMapper mapper;

  public String toJson(Collection<?> items) {
    if (items == null) {
      throw new IllegalArgumentException("items arg must not be null");
    }
    try {
      return mapper.writeValueAsString(items);
    } catch (JsonProcessingException ex) {
      throw new IllegalStateException(ex);
    }
  }

}
