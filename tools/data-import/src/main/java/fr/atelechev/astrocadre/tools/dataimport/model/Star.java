package fr.atelechev.astrocadre.tools.dataimport.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import fr.atelechev.astrocadre.tools.dataimport.util.CsvUtil;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode(of = { "id" })
public class Star {

  @JsonIgnore
  private int id;

  @JsonIgnore
  private Integer idHip;

  @JsonIgnore
  private Integer idHd;

  @JsonIgnore
  private Integer idHr;

  @JsonIgnore
  private String gl;

  @JsonIgnore
  private String standardName;

  @JsonIgnore
  private String properName;

  @JsonProperty("ra")
  private double ra;

  @JsonProperty("dec")
  private double dec;

  @JsonIgnore
  private Double distanceTo;

  @JsonProperty("mag")
  private double magnitude;

  @JsonIgnore
  private double absMagnitude;

  @JsonIgnore
  private String spectralClass;

  @JsonIgnore
  private Double ci;

  @JsonIgnore
  private String bayer;

  @JsonIgnore
  private String flam;

  @JsonIgnore
  private String constellationCode;

  @JsonIgnore
  private double luminosity;

}
