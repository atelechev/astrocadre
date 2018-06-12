package fr.atelechev.astrocadre.tools.dataimport.util;

import fr.atelechev.astrocadre.tools.dataimport.AbstractTest;
import fr.atelechev.astrocadre.tools.dataimport.model.Constellation;
import fr.atelechev.astrocadre.tools.dataimport.model.Node;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.model.Star;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

public class CoordinatesUtilTest extends AbstractTest {

  private static final double DELTA = 0d;

  @Autowired
  private CoordinatesUtil util;

  @Test
  public void convertRa_DoubleArg_ReturnsExpectedValue_ForArg0() {
    assertEquals(0d, util.convertRa(0d), DELTA);
  }

  @Test
  public void convertRa_DoubleArg_ReturnsExpectedValue_ForArg1() {
    assertEquals(15d, util.convertRa(1d), DELTA);
  }

  @Test
  public void convertRa_DoubleArg_ReturnsExpectedValue_ForArg1dot5() {
    assertEquals(22.5d, util.convertRa(1.5d), DELTA);
  }

  @Test
  public void convertRa_SegmentArg_ConvertsExpectedFields() {
    final Segment segment = new Segment(new Node(1d, 10d), new Node(2d, 20d));
    util.convertRa(segment);
    assertEquals(15d, segment.getRa0(), DELTA);
    assertEquals(30d, segment.getRa1(), DELTA);
  }

  @Test
  public void convertRa_StarArg_ConvertsExpectedFields() {
    final Star star = new Star();
    star.setRa(3d);
    util.convertRa(star);
    assertEquals(45d, star.getRa(), DELTA);
  }

  @Test
  public void convertRa_ConstellationArg_ConvertsExpectedFields() {
    final Constellation constellation = new Constellation();
    constellation.setCenterRa(4d);
    util.convertRa(constellation);
    assertEquals(60d, constellation.getCenterRa(), DELTA);
  }

  @Test
  public void convertCoords_ConvertsAndRoundsExpectedCoordinates() {
    final Constellation constellation = new Constellation();
    constellation.setCenterRa(5.5123456d);
    constellation.setCenterDec(6.7890123d);
    util.convertCoords(constellation);
    assertEquals(82.685d, constellation.getCenterRa(), DELTA);
    assertEquals(6.789d, constellation.getCenterDec(), DELTA);
  }



}
