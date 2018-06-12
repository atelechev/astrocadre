package fr.atelechev.astrocadre.tools.dataimport.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;
import fr.atelechev.astrocadre.tools.dataimport.util.CsvUtil;
import lombok.Data;

import java.util.List;

@Data
@JsonPropertyOrder({ "type", "code", "ra", "dec", "names" })
public class Constellation extends SearchableItem {

  @JsonProperty("names")
  private List<String> names;

  public Constellation() {
    super("constellation");
  }

}
