package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Data
public class ConstellationsIO extends DataIO {

  @Autowired
  private ConstellationsReader reader;

  @Autowired
  private ConstellationsWriter writer;


  public ConstellationsIO() {
    super("Constellations");
  }

}
