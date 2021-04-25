package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.pipeline.ConstellationsIO;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.DataIO;
import fr.atelechev.astrocadre.tools.dataimport.pipeline.StarsIO;
import fr.atelechev.astrocadre.tools.dataimport.util.ProjectPathResolver;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Slf4j
@Component
public class DataImporter {

  @Autowired
  private ProjectPathResolver pathResolver;

  @Autowired
  private ConstellationsIO constellationsIO;

  @Autowired
  private StarsIO starsIO;

  private final List<DataIO> sourceDataReaders;

  public DataImporter() {
    this.sourceDataReaders = new ArrayList<>();
  }

  @PostConstruct
  private void initIOPipeline() {
    this.sourceDataReaders.add(this.constellationsIO);
    this.sourceDataReaders.add(this.starsIO);
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
