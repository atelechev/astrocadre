package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.model.Node;
import fr.atelechev.astrocadre.tools.dataimport.model.Segment;
import fr.atelechev.astrocadre.tools.dataimport.util.JsonProducer;
import fr.atelechev.astrocadre.tools.dataimport.util.ProjectPathResolver;
import org.junit.Test;

import java.util.HashMap;
import java.util.Map;

public abstract class DataTransformationTest<R extends SourceDataReader> {

  protected static final ProjectPathResolver PATH_RESOLVER = new ProjectPathResolver();

  protected static final JsonProducer JSON_PRODUCER = new JsonProducer();

  protected final R reader;

  protected abstract void initInputFileNames();

  protected Map<String, String> singleInputFile(String fileName) {
    final String file = PATH_RESOLVER.getResourceFilePath(fileName);
    final Map<String, String> filesMap = new HashMap<>();
    filesMap.put("file", file);
    return filesMap;
  }

  protected DataTransformationTest(Class<R> readerClass) {
    try {
      this.reader = readerClass.newInstance();
      initInputFileNames();
    } catch (InstantiationException | IllegalAccessException ex) {
      throw new IllegalStateException(ex);
    }
  }

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
