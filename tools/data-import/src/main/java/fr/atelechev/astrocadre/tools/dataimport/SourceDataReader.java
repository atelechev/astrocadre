package fr.atelechev.astrocadre.tools.dataimport;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Properties;

abstract class SourceDataReader {

  public abstract void setInputFiles(Map<String, String> inputFiles);

  public abstract Collection<Object> readSourceData();

  protected Properties readPropertiesFile(String fromFilePath) {
    final Properties properties = new Properties();
    try (InputStream is = Files.newInputStream(Paths.get(fromFilePath))) {
      properties.load(is);
    } catch (IOException ex) {
      throw new IllegalStateException(ex);
    }
    return properties;
  }

  protected List<String> readCsvDropHeader(String fromFilePath) {
    try {
      final List<String> rawLines = Files.readAllLines(Paths.get(fromFilePath));
      rawLines.remove(0); // the header
      return rawLines;
    } catch (IOException ex) {
      throw new IllegalArgumentException(ex);
    }
  }

}
