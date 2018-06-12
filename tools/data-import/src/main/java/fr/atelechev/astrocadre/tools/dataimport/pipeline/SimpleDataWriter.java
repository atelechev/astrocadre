package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import java.util.Collection;

public abstract class SimpleDataWriter extends ParsedDataWriter {

  @Override
  public void writeData(Collection<Object> data) {
    final String json = jsonProducer.toJson(data);
    outputJson(json, getOutputFileName());
  }

  public abstract String getOutputFileName();

}
