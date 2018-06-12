package fr.atelechev.astrocadre.tools.dataimport.model;

import fr.atelechev.astrocadre.tools.dataimport.AbstractTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;

public class StarFactoryTest extends AbstractTest {

  private static final double DELTA = 0d;

  @Autowired
  private StarFactory factory;

  @Test
  public void fromCsvRow_ReturnsExpectedStar() {
    final String csv = "90979,91262,172167,7001,Gl 721,Alp Lyr,Vega,18.61564,38.783692,7.6787,0.03,0.604,A0Vvar,-0.001,Alp,3,Lyr,49.9344188721";
    final Star star = factory.fromCsvRow(csv);
    final Star expected = vega();
    assertEquals(expected, star);
    assertEquals(expected.getId(), star.getId());
    assertEquals(expected.getIdHip(), star.getIdHip());
    assertEquals(expected.getIdHd(), star.getIdHd());
    assertEquals(expected.getIdHr(), star.getIdHr());
    assertEquals(expected.getGl(), star.getGl());
    assertEquals(expected.getStandardName(), star.getStandardName());
    assertEquals(expected.getProperName(), star.getProperName());
    assertEquals(expected.getRa(), star.getRa(), DELTA);
    assertEquals(expected.getDec(), star.getDec(), DELTA);
    assertEquals(expected.getDistanceTo(), star.getDistanceTo(), DELTA);
    assertEquals(expected.getMagnitude(), star.getMagnitude(), DELTA);
    assertEquals(expected.getAbsMagnitude(), star.getAbsMagnitude(), DELTA);
    assertEquals(expected.getSpectralClass(), star.getSpectralClass());
    assertEquals(expected.getCi(), star.getCi(), DELTA);
    assertEquals(expected.getBayer(), star.getBayer());
    assertEquals(expected.getFlam(), star.getFlam());
    assertEquals(expected.getConstellationCode(), star.getConstellationCode());
    assertEquals(expected.getLuminosity(), star.getLuminosity(), DELTA);
  }

  private Star vega() {
    final Star vega = new Star();
    vega.setId(90979);
    vega.setIdHip(91262);
    vega.setIdHd(172167);
    vega.setIdHr(7001);
    vega.setGl("Gl 721");
    vega.setStandardName("Alp Lyr");
    vega.setProperName("Vega");
    vega.setRa(18.61564);
    vega.setDec(38.783692);
    vega.setDistanceTo(7.6787);
    vega.setMagnitude(0.03);
    vega.setAbsMagnitude(0.604);
    vega.setSpectralClass("A0Vvar");
    vega.setCi(-0.001);
    vega.setBayer("Alp");
    vega.setFlam("3");
    vega.setConstellationCode("Lyr");
    vega.setLuminosity(49.9344188721);
    return vega;
  }

}
