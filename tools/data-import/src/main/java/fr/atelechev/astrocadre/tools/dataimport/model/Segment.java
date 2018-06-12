package fr.atelechev.astrocadre.tools.dataimport.model;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@EqualsAndHashCode
public class Segment {

  private double ra0;

  private double decl0;

  private double ra1;

  private double decl1;

  public Segment(Node origin, Node target) {
    this.ra0 = origin.getRa();
    this.ra1 = target.getRa();
    this.decl0 = origin.getDec();
    this.decl1 = target.getDec();
  }

}
