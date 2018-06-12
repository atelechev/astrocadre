package fr.atelechev.astrocadre.tools.dataimport.util;

import org.springframework.stereotype.Component;

@Component
public class NumberUtil {

  private static int NB_DECIMALS = 2;

  public double round(double value, int decimals) {
    final int tmpMultiplier = (int) Math.pow(10, decimals);
    final int leftShifted = (int) Math.round(value * tmpMultiplier);
    return leftShifted / (double) tmpMultiplier;
  }

  public double round(double value) {
    return round(value, NB_DECIMALS);
  }

}
