package fr.atelechev.astrocadre.tools.dataimport.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class JsonProducer {

  @Autowired
  private ObjectMapper mapper;

  public String toJson(Object items) {
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
