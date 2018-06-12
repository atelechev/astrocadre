package fr.atelechev.astrocadre.tools.dataimport.util;

import org.springframework.stereotype.Component;

import java.util.function.Function;

@Component
public final class CsvUtil {

  public String[] split(String csvRow, int nbCells) {
    final String[] rowSplit = csvRow.split(",");
    if (rowSplit.length != nbCells) {
      throw new IllegalArgumentException(String.format("Invalid number of cells: %1$s for row '%2$s'", rowSplit.length, csvRow));
    }
    return rowSplit;
  }

  public Double parseDouble(String value, boolean nullable) {
    return parseNumber(value, nullable, Double::parseDouble);
  }

  public Integer parseInt(String value, boolean nullable) {
    return parseNumber(value, nullable, Integer::parseInt);
  }

  private <T extends Number> T parseNumber(String value, boolean isNullable, Function<String, T> parseFuncion) {
    try {
      if (isNullable && (value == null || value.trim().isEmpty())) {
        return null;
      }
      return parseFuncion.apply(value);
    } catch (NumberFormatException | NullPointerException ex) {
      throw new IllegalArgumentException("Illegal value to parse: " + value, ex);
    }
  }

}
