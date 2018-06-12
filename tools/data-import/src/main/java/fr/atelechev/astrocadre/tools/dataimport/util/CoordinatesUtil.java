package fr.atelechev.astrocadre.tools.dataimport.util;

import fr.atelechev.astrocadre.tools.dataimport.model.Constellation;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.model.Star;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CoordinatesUtil {

  private static double RA_CONVERSION_RATIO = 15.0d;

  @Autowired
  private NumberUtil numberUtil;

  public void convertRa(Segment segment) {
    segment.setRa0(convertRa(segment.getRa0()));
    segment.setRa1(convertRa(segment.getRa1()));
  }

  public void convertRa(Star star) {
    star.setRa(convertRa(star.getRa()));
  }

  public void convertRa(Constellation constellation) {
    constellation.setCenterRa(convertRa(constellation.getCenterRa()));
  }

  public void convertCoords(Constellation constellation) {
    final int nbDecimals = 3;
    final double ra = numberUtil.round(convertRa(constellation.getCenterRa()), nbDecimals);
    final double dec = numberUtil.round(constellation.getCenterDec(), nbDecimals);
    constellation.setCenterRa(ra);
    constellation.setCenterDec(dec);
  }

  public double convertRa(double ra) {
    return ra * RA_CONVERSION_RATIO;
  }

}
