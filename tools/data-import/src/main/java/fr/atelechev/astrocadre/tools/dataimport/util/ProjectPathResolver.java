package fr.atelechev.astrocadre.tools.dataimport.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.file.Paths;

@Component
public class ProjectPathResolver {

  @Value("${dir.source.data}")
  private String rawDataDir;

  public String getResourceAbsoluteFilePath(String fileName) {
    try {
      final String file = ProjectPathResolver.class.getResource(getClasspathResourcePath(fileName)).getFile().toString();
      if (file.matches("^\\/[A-Z]\\:\\/.*")) {
        return file.substring(1);
      }
      return file;
    } catch (NullPointerException ex) {
      throw new IllegalArgumentException("Failed to locate resource file: " + fileName);
    }
  }

  public String getClasspathResourcePath(String fileName) {
    return this.rawDataDir + fileName;
  }

  public String getProjectAbsolutePath() {
    return getCurrentDir();
  }

  private String getCurrentDir() {
    final String currentDir = System.getProperty("user.dir");
    final String targetSuffix = "target";
    if (currentDir.endsWith(targetSuffix)) {
      return currentDir.substring(0, currentDir.length() - targetSuffix.length());
    }
    return currentDir;
  }

  public String getTargetJsonOutputAbsolutePath() {
    final String projectPath = getProjectAbsolutePath();
    return Paths.get(projectPath).resolve("../../src/assets").normalize().toString();
  }

}
