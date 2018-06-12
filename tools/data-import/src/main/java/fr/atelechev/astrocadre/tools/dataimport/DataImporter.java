package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.pipeline.ConstellationBoundaryIO;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.ConstellationLineIO;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.DataIO;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.SearchableItemsIO;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.StarsIO;
import fr.atelechev.astrocadre.tools.dataimport.util.ProjectPathResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Component
public class DataImporter {

  @Autowired
  private ProjectPathResolver pathResolver;

  @Autowired
  private ConstellationBoundaryIO constellationBoundaryIO;

  @Autowired
  private ConstellationLineIO constellationLineIO;

  @Autowired
  private StarsIO starsIO;

  @Autowired
  private SearchableItemsIO searchableItemsIO;

  private final List<DataIO> sourceDataReaders;

  public DataImporter() {
    this.sourceDataReaders = new ArrayList<>();
  }

  @PostConstruct
  private void initIOPipeline() {
    this.sourceDataReaders.add(this.constellationBoundaryIO);
    this.sourceDataReaders.add(this.constellationLineIO);
    this.sourceDataReaders.add(this.starsIO);
    this.sourceDataReaders.add(this.searchableItemsIO);
  }

  public void importAllData() {
    log.info("Starting data import...");
    this.sourceDataReaders.forEach(dataIO -> {
      log.info("--> {} <--", dataIO.getHeader());
      final Collection<Object> items = dataIO.getReader().readSourceData();
      dataIO.getWriter().writeData(items);
    });
    log.info("Data import finished!");
  }

}
