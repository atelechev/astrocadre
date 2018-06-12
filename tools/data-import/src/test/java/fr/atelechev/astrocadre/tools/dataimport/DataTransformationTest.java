package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Node;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.SourceDataReader;
import fr.atelechev.astrocadre.tools.dataimport.util.JsonProducer;
import fr.atelechev.astrocadre.tools.dataimport.util.ProjectPathResolver;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.HashMap;
import java.util.Map;

public abstract class DataTransformationTest extends AbstractTest {

  @Autowired
  protected JsonProducer jsonProducer;

  protected Segment segment(double ra0, double dec0, double ra1, double dec1) {
    final Node node0 = new Node(ra0, dec0);
    final Node node1 = new Node(ra1, dec1);
    return new Segment(node0, node1);
  }

  @Test
  public abstract void readTestData();

  @Test
  public abstract void produceExpectedJson();

}
