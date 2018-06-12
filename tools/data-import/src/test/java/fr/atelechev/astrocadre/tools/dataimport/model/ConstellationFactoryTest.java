package fr.atelechev.astrocadre.tools.dataimport.model;

import fr.atelechev.astrocadre.tools.dataimport.AbstractTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

public class ConstellationFactoryTest extends AbstractTest {

  @Autowired
  private ConstellationFactory factory;

  @Test
  public void fromCsvRow_ReturnsExpectedConstellation() {
    final String csv = "1,0.568780,38.906070,AND";
    final Constellation constellation = factory.fromCsvRow(csv);
    final Constellation expected = constellation("AND", 0.56878,38.90607);
    assertEquals(expected, constellation);
  }

  private Constellation constellation(String code, double ra, double dec) {
    final Constellation constellation = new Constellation();
    constellation.setCode(code);
    constellation.setCenterRa(ra);
    constellation.setCenterDec(dec);
    return constellation;
  }

}
