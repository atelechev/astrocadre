package fr.atelechev.astrocadre.tools.dataimport;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import fr.atelechev.astrocadre.tools.dataimport.model.Node;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.model.Star;
import fr.atelechev.astrocadre.tools.dataimport.serializer.NodeSerializer;
import fr.atelechev.astrocadre.tools.dataimport.serializer.SegmentSerializer;
import fr.atelechev.astrocadre.tools.dataimport.serializer.StarSerializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

  @Bean
  public ObjectMapper objectMapper(@Autowired NodeSerializer nodeSerializer,
                                   @Autowired SegmentSerializer segmentSerializer,
                                   @Autowired StarSerializer starSerializer) {
    final ObjectMapper mapper = new ObjectMapper();
    final SimpleModule module = new SimpleModule();
    module.addSerializer(Node.class, nodeSerializer);
    module.addSerializer(Segment.class, segmentSerializer);
    module.addSerializer(Star.class, starSerializer);
    mapper.registerModule(module);
    return mapper;
  }

}
