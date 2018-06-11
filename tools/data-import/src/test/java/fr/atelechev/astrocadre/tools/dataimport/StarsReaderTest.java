package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Star;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import static org.junit.Assert.*;

public class StarsReaderTest extends DataTransformationTest<StarsReader> {


  public StarsReaderTest() {
    super(StarsReader.class);
  }

  @Override
  protected void initInputFileNames() {
    reader.setInputFiles(singleInputFile("stars_test.csv"));
  }

  @Override
  public void readTestData() {
    final Collection<Object> stars = reader.readSourceData();
    assertNotNull(stars);

    final List<Star> expected = Arrays.asList(
      star(88, "Tau Phe", 0.269115, -48.809876, 5.71),
      star(676, "Alp And", 2.096865, 29.090432, 2.07),
      star(744, "Bet Cas", 2.293305, 59.14978, 2.28),
      star(763, "Eps Phe", 2.35254, -45.747426, 3.88),
      star(1559, "Iot Cet", 4.856985, -8.823921, 3.56),
      star(2076, "Alp Phe", 6.5708400000000005, -42.305981, 2.4),
      star(2914, "Zet Cas", 9.24282, 53.896909, 3.69),
      star(3172, "Alp Cas", 10.126740000000002, 56.537331, 2.24),
      star(3293, "Xi  Cas", 10.516214999999999, 50.512526, 4.8),
      star(3413, "Bet Cet", 10.89735, -17.986605, 2.04)
    );

    assertEquals(expected.size(), stars.size());
    stars.forEach(star ->
      assertTrue(String.format("Star %1$s not found among expected %2$s", star, expected), expected.contains(star))
    );
  }

  private Star star(int id, String stdName, double ra, double dec, double magnitude) {
    final Star star = new Star();
    star.setId(id);
    star.setStandardName(stdName);
    star.setRa(ra);
    star.setDec(dec);
    star.setMagnitude(magnitude);
    return star;
  }

  @Override
  public void produceExpectedJson() {
    final Collection<Object> stars = reader.readSourceData();
    final String json = JSON_PRODUCER.toJson(stars);
    final String expected = "[[0.27,-48.81,5.7,\"TAU PHE\"],[2.1,29.09,2.1,\"Alpheratz\",\"ALP AND\"],[2.29,59.15,2.3,\"Caph\",\"BET CAS\"],[2.35,-45.75,3.9,\"EPS PHE\"],[4.86,-8.82,3.6,\"IOT CET\"],[6.57,-42.31,2.4,\"Ankaa\",\"ALP PHE\"],[9.24,53.9,3.7,\"ZET CAS\"],[10.13,56.54,2.2,\"Shedir\",\"ALP CAS\"],[10.52,50.51,4.8,\"XI CAS\"],[10.9,-17.99,2.0,\"Diphda\",\"BET CET\"]]";
    assertEquals(expected, json);
  }

}
