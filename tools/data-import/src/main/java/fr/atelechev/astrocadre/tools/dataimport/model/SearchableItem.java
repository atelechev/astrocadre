package fr.atelechev.astrocadre.tools.dataimport.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(of = { "type", "code", "ra", "dec" })
public abstract class SearchableItem {

  @JsonProperty("type")
  private final String type;

  @JsonProperty("code")
  private String code;

  @JsonProperty("ra")
  private double centerRa;

  @JsonProperty("dec")
  private double centerDec;

  protected SearchableItem(String type) {
    this.type = type;
  }

}
