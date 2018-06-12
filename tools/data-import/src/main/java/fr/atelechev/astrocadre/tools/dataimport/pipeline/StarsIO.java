package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Data
public class StarsIO extends DataIO {

  @Autowired
  private StarsReader reader;

  @Autowired
  private StarsWriter writer;

  public StarsIO() {
    super("Stars");
  }

}
