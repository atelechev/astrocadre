package fr.atelechev.skyview.tools.dataimport;

public class CoordinatesUtil {

  private static double RA_CONVERSION_RATIO = 15.0d;

  public static void convertRa(Segment segment) {
    segment.setRa0(convertRa(segment.getRa0()));
    segment.setRa1(convertRa(segment.getRa1()));
  }

  public static void convertRa(Star star) {
    star.setRa(convertRa(star.getRa()));
  }

  public static double convertRa(double ra) {
    return ra * RA_CONVERSION_RATIO;
  }

}
