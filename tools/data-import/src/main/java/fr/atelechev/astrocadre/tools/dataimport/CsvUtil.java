package fr.atelechev.astrocadre.tools.dataimport;

import java.util.function.Function;

public final class CsvUtil {

  protected static String[] split(String csvRow, int nbCells) {
    final String[] rowSplit = csvRow.split(",");
    if (rowSplit.length != nbCells) {
      throw new IllegalArgumentException(String.format("Invalid number of cells: %1$s for row '%2$s'", rowSplit.length, csvRow));
    }
    return rowSplit;
  }

  protected static Double parseDouble(String value, boolean nullable) {
    return parseNumber(value, nullable, Double::parseDouble);
  }

  protected static Integer parseInt(String value, boolean nullable) {
    return parseNumber(value, nullable, Integer::parseInt);
  }

  private static <T extends Number> T parseNumber(String value, boolean isNullable, Function<String, T> parseFuncion) {
    if (isNullable && (value == null || value.trim().isEmpty())) {
      return null;
    }
    return parseFuncion.apply(value);
  }

}
