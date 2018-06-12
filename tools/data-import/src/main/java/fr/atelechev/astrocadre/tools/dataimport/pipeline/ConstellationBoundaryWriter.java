package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Data
public class ConstellationBoundaryWriter extends SimpleDataWriter {

  @Value("${file.target.constellation.boundaries}")
  private String outputFileName;

}
