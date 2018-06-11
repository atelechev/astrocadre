package fr.atelechev.astrocadre.tools.dataimport.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConstellationLine {

  @JsonProperty("code")
  private String constellationCode;

  @JsonProperty("lines")
  private List<Segment> lines;

}
