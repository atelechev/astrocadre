package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import fr.atelechev.astrocadre.tools.dataimport.util.ProjectPathResolver;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Properties;

public abstract class SourceDataReader {

  @Autowired
  private ProjectPathResolver pathResolver;

  public abstract Collection<Object> readSourceData();

  protected Properties readPropertiesFile(String fileName) {
    final Properties properties = new Properties();
    final String resourcePath = pathResolver.getClasspathResourcePath(fileName);
    try (InputStream is = getClass().getResourceAsStream(resourcePath)) {
      properties.load(is);
    } catch (IOException ex) {
      throw new IllegalStateException(ex);
    }
    return properties;
  }

  protected List<String> readCsvDropHeader(String fileName) {
    final String resourcePath = pathResolver.getClasspathResourcePath(fileName);
    final List<String> rawLines = readLines(resourcePath);
    rawLines.remove(0); // the header
    return rawLines;
  }

  private List<String> readLines(String resourcePath) {
    try (InputStream is = getClass().getResourceAsStream(resourcePath);
         InputStreamReader isr = new InputStreamReader(is);
         BufferedReader reader = new BufferedReader(isr)) {
      final List<String> lines = new ArrayList<>();
      String line = reader.readLine();
      while (line != null) {
        lines.add(line);
        line = reader.readLine();
      }
      return lines;
    } catch (IOException ex) {
      throw new IllegalStateException(ex);
    }
  }

}
