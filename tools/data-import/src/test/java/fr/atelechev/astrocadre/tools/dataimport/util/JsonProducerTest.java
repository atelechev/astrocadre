package fr.atelechev.astrocadre.tools.dataimport.util;

import fr.atelechev.astrocadre.tools.dataimport.AbstractTest;
import fr.atelechev.astrocadre.tools.dataimport.model.Node;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

import static org.junit.Assert.assertEquals;

public class JsonProducerTest extends AbstractTest {

  @Autowired
  private JsonProducer jsonProducer;

  @Test(expected = IllegalArgumentException.class)
  public void toJson_ThrowsIAE_IfArgIsNull() {
    jsonProducer.toJson(null);
  }

  @Test
  public void toJson_ReturnsExpectedJson_ForEmptyCollectionArg() {
    final String result = jsonProducer.toJson(Collections.emptyList());
    assertEquals("[]", result);
  }

  @Test
  public void toJson_ReturnsExpectedJson_ForListOfNumbers() {
    final Collection<Object> numbers = Arrays.asList(1L, 2L, 3L);
    final String result = jsonProducer.toJson(numbers);
    assertEquals("[1,2,3]", result);
  }

  @Test
  public void toJson_ReturnsExpectedJson_ForListOfObjects() {
    final Collection<Object> objects = Arrays.asList(new Node(0d, 1d), new Node(2d, 3d));
    final String result = jsonProducer.toJson(objects);
    assertEquals("[[0.0,1.0],[2.0,3.0]]", result);
  }


}
