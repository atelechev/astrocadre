package fr.atelechev.astrocadre.tools.dataimport.model;

import fr.atelechev.astrocadre.tools.dataimport.util.CsvUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SegmentFactory {

  @Autowired
  private CsvUtil csvUtil;

  public Segment fromCsvRow(String csvRow) {
    final String[] rowSplit = csvUtil.split(csvRow, 6);
    final Segment segment = new Segment();
    segment.setRa0(csvUtil.parseDouble(rowSplit[2], false));
    segment.setDecl0(csvUtil.parseDouble(rowSplit[3], false));
    segment.setRa1(csvUtil.parseDouble(rowSplit[4], false));
    segment.setDecl1(csvUtil.parseDouble(rowSplit[5], false));
    return segment;
  }

}
