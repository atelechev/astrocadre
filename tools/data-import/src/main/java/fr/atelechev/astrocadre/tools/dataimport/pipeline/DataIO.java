package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;

@Data
public abstract class DataIO {

  private final String header;

  protected DataIO(String header) {
    this.header = header;
  }

  public abstract SourceDataReader getReader();

  public abstract ParsedDataWriter getWriter();

}
