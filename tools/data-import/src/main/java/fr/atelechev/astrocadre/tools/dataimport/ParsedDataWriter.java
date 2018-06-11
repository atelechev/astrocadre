package fr.atelechev.astrocadre.tools.dataimport;

import fr.atelechev.astrocadre.tools.dataimport.util.JsonProducer;
import fr.atelechev.astrocadre.tools.dataimport.util.ProjectPathResolver;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Collection;

@Slf4j
public abstract class ParsedDataWriter {

  private final ProjectPathResolver pathResolver;

  protected final JsonProducer jsonProducer;

  public ParsedDataWriter() {
    this.jsonProducer = new JsonProducer();
    this.pathResolver = new ProjectPathResolver();
  }

  public abstract void writeData(Collection<Object> data);


  protected void outputJson(String json, String outputFileName) {
    final String outputFolder = pathResolver.getTargetJsonOutputFolder();
    final Path outputTo = Paths.get(outputFolder, outputFileName);
    log.info("JSON output file: {}", outputTo);
    try {
      Files.write(outputTo, json.getBytes(), StandardOpenOption.TRUNCATE_EXISTING, StandardOpenOption.CREATE);
    } catch (IOException ex) {
      throw new IllegalStateException(ex);
    }
  }

}
