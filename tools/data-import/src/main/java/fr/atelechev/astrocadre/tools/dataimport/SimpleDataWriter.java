package fr.atelechev.astrocadre.tools.dataimport;

import java.util.Collection;

public class SimpleDataWriter extends ParsedDataWriter {

  private final String outputFileName;

  public SimpleDataWriter(String outputFileName) {
    this.outputFileName = outputFileName;
  }

  @Override
  public void writeData(Collection<Object> data) {
    final String json = jsonProducer.toJson(data);
    outputJson(json, this.outputFileName);
  }

}
