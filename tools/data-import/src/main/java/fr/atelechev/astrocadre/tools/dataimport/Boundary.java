package fr.atelechev.astrocadre.tools.dataimport;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Boundary {

  @JsonProperty("code")
  private String constellationCode;

  @JsonProperty("boundary")
  private List<List<Node>> boundary;

}
