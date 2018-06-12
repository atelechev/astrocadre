package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Data
public class ConstellationLineIO extends DataIO {

  @Autowired
  private ConstellationLinesReader reader;

  @Autowired
  private ConstellationLinesWriter writer;

  public ConstellationLineIO() {
    super("Constellation lines");
  }

}
