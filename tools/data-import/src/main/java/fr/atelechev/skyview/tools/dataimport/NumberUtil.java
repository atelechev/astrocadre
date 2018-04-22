package fr.atelechev.skyview.tools.dataimport;

public class NumberUtil {

  private static int NB_DECIMALS = 2;

  public static double round(double value, int decimals) {
    final int tmpMultiplier = (int) Math.pow(10, decimals);
    final int leftShifted = (int) Math.round(value * tmpMultiplier);
    return leftShifted / (double) tmpMultiplier;
  }

  public static double round(double value) {
    return round(value, NB_DECIMALS);
  }

}
