package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
@Data
public class ConstellationLinesWriter extends SimpleDataWriter {

  @Value("${file.target.constellation.lines}")
  private String outputFileName;

}
