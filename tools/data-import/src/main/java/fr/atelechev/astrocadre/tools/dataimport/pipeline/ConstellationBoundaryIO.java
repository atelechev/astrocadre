package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Data
@Component
public class ConstellationBoundaryIO extends DataIO {

  @Autowired
  private ConstellationBoundaryReader reader;

  @Autowired
  private ConstellationBoundaryWriter writer;

  public ConstellationBoundaryIO() {
    super("Constellation boundaries");
  }

}
