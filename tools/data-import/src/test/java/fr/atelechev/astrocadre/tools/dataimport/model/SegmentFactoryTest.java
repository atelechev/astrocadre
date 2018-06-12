package fr.atelechev.astrocadre.tools.dataimport.model;

import fr.atelechev.astrocadre.tools.dataimport.AbstractTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import static org.junit.Assert.assertEquals;

public class SegmentFactoryTest extends AbstractTest {

  @Autowired
  private SegmentFactory factory;

  @Test
  public void fromCsvRow_ReturnsExpectedSegment() {
    final String csv = "1,ORI,4.830833,6.950000,4.843611,8.900000";
    final Segment segment = factory.fromCsvRow(csv);
    final Segment expected = segment(4.830833, 6.95,4.843611,8.9);
    assertEquals(expected, segment);
  }

  private Segment segment(double ra0, double dec0, double ra1, double dec1) {
    final Segment segment = new Segment();
    segment.setRa0(ra0);
    segment.setRa1(ra1);
    segment.setDecl0(dec0);
    segment.setDecl1(dec1);
    return segment;
  }

}
