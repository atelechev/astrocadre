package fr.atelechev.skyview.tools.dataimport;

public class PathUtil {

  public static String getResourceFilePath(String fileName) {
    final String file = PathUtil.class.getResource(fileName).getFile().toString();
    if (file.matches("^\\/[A-Z]\\:\\/.*")) {
      return file.substring(1);
    }
    return file;
  }

}
