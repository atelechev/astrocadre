package fr.atelechev.astrocadre.tools.dataimport.model;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({ "type", "code", "ra", "dec" })
public class StarSearchable extends SearchableItem {

  public StarSearchable() {
    super("star");
  }


}
