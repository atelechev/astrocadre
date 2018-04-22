package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.function.Function;

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
    final String[] rowSplit = csvRow.split(",");
    if (rowSplit.length != 18) {
      throw new IllegalArgumentException(String.format("Invalid number of cells: %1$s for row '%2$s'", rowSplit.length, csvRow));
    }
    final Star star = new Star();
    star.setId(parseInt(rowSplit[0], false));
    star.setIdHip(parseInt(rowSplit[1], true));
    star.setIdHd(parseInt(rowSplit[2], true));
    star.setIdHr(parseInt(rowSplit[3], true));
    star.setGl(rowSplit[4]);
    star.setStandardName(rowSplit[5]);
    star.setProperName(rowSplit[6]);
    star.setRa(parseDouble(rowSplit[7], false));
    star.setDec(parseDouble(rowSplit[8], false));
    star.setDistanceTo(parseDouble(rowSplit[9], true));
    star.setMagnitude(parseDouble(rowSplit[10], true));
    star.setAbsMagnitude(parseDouble(rowSplit[11], true));
    star.setSpectralClass(rowSplit[12]);
    star.setCi(parseDouble(rowSplit[13], true));
    star.setBayer(rowSplit[14]);
    star.setFlam(rowSplit[15]);
    star.setConstellationCode(rowSplit[16]);
    star.setLuminosity(parseDouble(rowSplit[17], true));
    return star;
  }

  private static Double parseDouble(String value, boolean nullable) {
    return parseNumber(value, nullable, Double::parseDouble);
  }

  private static Integer parseInt(String value, boolean nullable) {
    return parseNumber(value, nullable, Integer::parseInt);
  }

  private static <T extends Number> T parseNumber(String value, boolean isNullable, Function<String, T> parseFuncion) {
    if (isNullable && (value == null || value.trim().isEmpty())) {
      return null;
    }
    return parseFuncion.apply(value);
  }

}
