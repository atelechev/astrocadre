package fr.atelechev.astrocadre.tools.dataimport.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class SearchableItem {

  @JsonProperty("type")
  private String type;

  @JsonProperty("ra")
  private double centerRa;

  @JsonProperty("dec")
  private double centerDec;

}
