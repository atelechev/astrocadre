package fr.atelechev.astrocadre.tools.dataimport;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
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


  public static Star fromCsvRow(String csvRow) {
    final String[] rowSplit = CsvUtil.split(csvRow, 18);
    final Star star = new Star();
    star.setId(CsvUtil.parseInt(rowSplit[0], false)); // id
    star.setIdHip(CsvUtil.parseInt(rowSplit[1], true)); // hip
    star.setIdHd(CsvUtil.parseInt(rowSplit[2], true)); // hd
    star.setIdHr(CsvUtil.parseInt(rowSplit[3], true)); // hr
    star.setGl(rowSplit[4]); // gl
    star.setStandardName(rowSplit[5]); // bf
    star.setProperName(rowSplit[6]); // proper
    star.setRa(CsvUtil.parseDouble(rowSplit[7], false));
    star.setDec(CsvUtil.parseDouble(rowSplit[8], false));
    star.setDistanceTo(CsvUtil.parseDouble(rowSplit[9], true));
    star.setMagnitude(CsvUtil.parseDouble(rowSplit[10], true));
    star.setAbsMagnitude(CsvUtil.parseDouble(rowSplit[11], true));
    star.setSpectralClass(rowSplit[12]);
    star.setCi(CsvUtil.parseDouble(rowSplit[13], true));
    star.setBayer(rowSplit[14]);
    star.setFlam(rowSplit[15]);
    star.setConstellationCode(rowSplit[16]);
    star.setLuminosity(CsvUtil.parseDouble(rowSplit[17], true));
    return star;
  }

}
