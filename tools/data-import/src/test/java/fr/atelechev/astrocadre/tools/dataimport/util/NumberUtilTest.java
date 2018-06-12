package fr.atelechev.astrocadre.tools.dataimport.util;

import fr.atelechev.astrocadre.tools.dataimport.AbstractTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

public class NumberUtilTest extends AbstractTest {

  private static final double DELTA = 0d;

  @Autowired
  private NumberUtil util;

  @Test
  public void round_OneArg_RoundsNumberToTwoDecimals_WithFloor() {
    final double result = util.round(1.234d);
    assertEquals(1.23d, result, DELTA);
  }

  @Test
  public void round_OneArg_RoundsNumberToTwoDecimals_WithCeiling() {
    final double result = util.round(1.235d);
    assertEquals(1.24d, result, DELTA);
  }

  @Test
  public void round_TwoArgs_RoundsNumberToSpecifiedDecimals_WithFloor() {
    final double result = util.round(1.234561d, 5);
    assertEquals(1.23456d, result, DELTA);
  }

  @Test
  public void round_TwoArgs_RoundsNumberToSpecifiedDecimals_WithCeiling() {
    final double result = util.round(1.234567d, 5);
    assertEquals(1.23457d, result, DELTA);
  }

}
