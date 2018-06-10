package fr.atelechev.astrocadre.tools.dataimport;

import java.nio.file.Paths;

public class PathUtil {

  public static String getResourceFilePath(String fileName) {
    final String file = PathUtil.class.getResource(fileName).getFile().toString();
    if (file.matches("^\\/[A-Z]\\:\\/.*")) {
      return file.substring(1);
    }
    return file;
  }

  public static String getProjectPath() {
    final String resourcesRoot = getResourceFilePath("/");
    return Paths.get(resourcesRoot).resolve("../..")
                .normalize().toString();
  }

  public static String getTargetJsonOutputFolder() {
    final String projectPath = getProjectPath();
    return Paths.get(projectPath).resolve("../../src/assets").normalize().toString();
  }

}
