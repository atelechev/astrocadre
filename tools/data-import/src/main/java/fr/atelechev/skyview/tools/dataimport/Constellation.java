package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.List;

import static fr.atelechev.skyview.tools.dataimport.CsvUtil.parseDouble;

@Data
public class Constellation {

  @JsonProperty("code")
  private String code;

  @JsonProperty("ra")
  private double centerRa;

  @JsonProperty("dec")
  private double centerDec;

  @JsonProperty("names")
  private List<String> names;

  public static Constellation fromCsvRow(String csvRow) {
    final String[] rowSplit =  CsvUtil.split(csvRow, 4);
    final Constellation constellation = new Constellation();
    constellation.setCode(rowSplit[3]);
    constellation.setCenterRa(parseDouble(rowSplit[1], false));
    constellation.setCenterDec(parseDouble(rowSplit[2], false));
    return constellation;
  }

}
