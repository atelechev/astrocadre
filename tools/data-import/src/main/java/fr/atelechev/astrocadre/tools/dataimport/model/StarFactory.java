package fr.atelechev.astrocadre.tools.dataimport.model;

import fr.atelechev.astrocadre.tools.dataimport.util.CsvUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class StarFactory {

  @Autowired
  private CsvUtil csvUtil;


  public Star fromCsvRow(String csvRow) {
    final String[] rowSplit = csvUtil.split(csvRow, 18);
    final Star star = new Star();
    star.setId(csvUtil.parseInt(rowSplit[0], false)); // id
    star.setIdHip(csvUtil.parseInt(rowSplit[1], true)); // hip
    star.setIdHd(csvUtil.parseInt(rowSplit[2], true)); // hd
    star.setIdHr(csvUtil.parseInt(rowSplit[3], true)); // hr
    star.setGl(rowSplit[4]); // gl
    star.setStandardName(rowSplit[5]); // bf
    star.setProperName(rowSplit[6]); // proper
    star.setRa(csvUtil.parseDouble(rowSplit[7], false));
    star.setDec(csvUtil.parseDouble(rowSplit[8], false));
    star.setDistanceTo(csvUtil.parseDouble(rowSplit[9], true));
    star.setMagnitude(csvUtil.parseDouble(rowSplit[10], true));
    star.setAbsMagnitude(csvUtil.parseDouble(rowSplit[11], true));
    star.setSpectralClass(rowSplit[12]);
    star.setCi(csvUtil.parseDouble(rowSplit[13], true));
    star.setBayer(rowSplit[14]);
    star.setFlam(rowSplit[15]);
    star.setConstellationCode(rowSplit[16]);
    star.setLuminosity(csvUtil.parseDouble(rowSplit[17], true));
    return star;
  }

}
