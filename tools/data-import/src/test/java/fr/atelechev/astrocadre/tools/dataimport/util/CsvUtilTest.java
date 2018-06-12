package fr.atelechev.astrocadre.tools.dataimport.util;

import fr.atelechev.astrocadre.tools.dataimport.AbstractTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

public class CsvUtilTest extends AbstractTest {

  @Autowired
  private CsvUtil csvUtil;

  @Test
  public void split_ReturnsArrayWithExpectedNumberOfCells() {
    final String csv = "1,2,3";
    final String[] split = csvUtil.split(csv, 3);
    assertNotNull(split);
    assertEquals(3, split.length);
  }

  @Test(expected = IllegalArgumentException.class)
  public void split_ThrowsIAE_IfResultingNumberOfCellsDoesNotMatch() {
    csvUtil.split("1,2,3", 4);
  }

  @Test
  public void parseDouble_ReturnsNull_IfValueIsNull() {
    final Double parsed = csvUtil.parseDouble(null, true);
    assertNull(parsed);
  }

  @Test
  public void parseDouble_ReturnsNull_IfValueIsEmpty() {
    final Double parsed = csvUtil.parseDouble("   ", true);
    assertNull(parsed);
  }

  @Test
  public void parseInt_ReturnsNull_IfValueIsNull() {
    final Integer parsed = csvUtil.parseInt(null, true);
    assertNull(parsed);
  }

  @Test
  public void parseInt_ReturnsNull_IfValueIsEmpty() {
    final Integer parsed = csvUtil.parseInt("   ", true);
    assertNull(parsed);
  }

  @Test(expected = IllegalArgumentException.class)
  public void parseDouble_ThrowsIAE_ForNullArgAndNotNullableValue() {
    csvUtil.parseDouble(null, false);
  }

  @Test(expected = IllegalArgumentException.class)
  public void parseDouble_ThrowsIAE_ForEmptyArgAndNotNullableValue() {
    csvUtil.parseDouble("   ", false);
  }

  @Test(expected = IllegalArgumentException.class)
  public void parseInt_ThrowsIAE_ForNullArgAndNotNullableValue() {
    csvUtil.parseInt(null, false);
  }

  @Test(expected = IllegalArgumentException.class)
  public void parseInt_ThrowsIAE_ForEmptyArgAndNotNullableValue() {
    csvUtil.parseInt("   ", false);
  }

  @Test
  public void parseDouble_ReturnsExpectedValue() {
    final Double result = csvUtil.parseDouble("2", false);
    assertEquals(Double.valueOf(2d), result);
  }

  @Test
  public void parseInt_ReturnsExpectedValue() {
    final Integer result = csvUtil.parseInt("2", false);
    assertEquals(Integer.valueOf(2), result);
  }

}
