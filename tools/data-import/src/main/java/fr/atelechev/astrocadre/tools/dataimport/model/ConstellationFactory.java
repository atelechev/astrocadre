package fr.atelechev.astrocadre.tools.dataimport.model;

import fr.atelechev.astrocadre.tools.dataimport.util.CsvUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConstellationFactory {

  @Autowired
  private CsvUtil csvUtil;

  public Constellation fromCsvRow(String csvRow) {
    final String[] rowSplit = csvUtil.split(csvRow, 4);
    final Constellation constellation = new Constellation();
    constellation.setCode(rowSplit[3]);
    constellation.setCenterRa(csvUtil.parseDouble(rowSplit[1], false));
    constellation.setCenterDec(csvUtil.parseDouble(rowSplit[2], false));
    return constellation;
  }

}
