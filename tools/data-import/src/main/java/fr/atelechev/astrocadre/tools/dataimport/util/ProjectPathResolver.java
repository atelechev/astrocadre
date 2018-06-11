package fr.atelechev.astrocadre.tools.dataimport.util;

import java.nio.file.Paths;

public class ProjectPathResolver {

  private static final String RAW_DATA_DIR = "/raw_data/";

  public String getResourceFilePath(String fileName) {
    try {
      final String file = ProjectPathResolver.class.getResource(RAW_DATA_DIR + fileName).getFile().toString();
      if (file.matches("^\\/[A-Z]\\:\\/.*")) {
        return file.substring(1);
      }
      return file;
    } catch (NullPointerException ex) {
      throw new IllegalArgumentException("failed to locate resource file: " + fileName);
    }
  }

  public String getProjectPath() {
    final String resourcesRoot = getResourceFilePath("/");
    return Paths.get(resourcesRoot).resolve("../../..")
                .normalize().toString();
  }

  public String getTargetJsonOutputFolder() {
    final String projectPath = getProjectPath();
    return Paths.get(projectPath).resolve("../../src/assets").normalize().toString();
  }

}
