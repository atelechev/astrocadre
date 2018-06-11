package fr.atelechev.astrocadre.tools.dataimport.util;

import fr.atelechev.astrocadre.tools.dataimport.model.Constellation;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.model.Star;

import static fr.atelechev.astrocadre.tools.dataimport.util.NumberUtil.round;

public class CoordinatesUtil {

  private static double RA_CONVERSION_RATIO = 15.0d;

  public static void convertRa(Segment segment) {
    segment.setRa0(convertRa(segment.getRa0()));
    segment.setRa1(convertRa(segment.getRa1()));
  }

  public static void convertRa(Star star) {
    star.setRa(convertRa(star.getRa()));
  }

  public static void convertRa(Constellation constellation) {
    constellation.setCenterRa(convertRa(constellation.getCenterRa()));
  }

  public static void convertCoords(Constellation constellation) {
    final int nbDecimals = 3;
    final double ra = NumberUtil.round(convertRa(constellation.getCenterRa()), nbDecimals);
    final double dec = NumberUtil.round(constellation.getCenterDec(), nbDecimals);
    constellation.setCenterRa(ra);
    constellation.setCenterDec(dec);
  }

  public static double convertRa(double ra) {
    return ra * RA_CONVERSION_RATIO;
  }

}
