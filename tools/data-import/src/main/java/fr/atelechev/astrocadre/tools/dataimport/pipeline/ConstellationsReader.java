package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import fr.atelechev.astrocadre.tools.dataimport.model.Constellation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
public class ConstellationsReader extends SourceDataReader {

  @Autowired
  private ConstellationBoundaryReader boundaryReader;

  @Autowired
  private ConstellationLinesReader linesReader;

  @Autowired
  private SearchableItemsReader searchableItemsReader;

  /**
   * Returns a list of collections containing
   * the boundaries, the lines and the searchable items.
   */
  @Override
  public List<Object> readSourceData() {
    final Collection<Object> constellations =
        searchableItemsReader.readSourceData()
            .stream()
            .filter(item -> item instanceof Constellation)
            .collect(Collectors.toList());
    return Arrays.asList(
        boundaryReader.readSourceData(),
        linesReader.readSourceData(),
        constellations
    );
  }

}
