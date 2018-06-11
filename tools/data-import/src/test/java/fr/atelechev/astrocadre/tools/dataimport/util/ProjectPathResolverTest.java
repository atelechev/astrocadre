package fr.atelechev.astrocadre.tools.dataimport.util;

import fr.atelechev.astrocadre.tools.dataimport.util.ProjectPathResolver;
import org.junit.Test;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class ProjectPathResolverTest {

  private final ProjectPathResolver resolver = new ProjectPathResolver();

  @Test
  public void getResourceFilePath_ReturnsExpectedPath_ForExistingResource() {
    final String path = resolver.getResourceFilePath("constellation_lines.csv");
    assertNotNull(path);
    assertTrue("Path does not end with expected suffix: " + path,
               path.endsWith("/tools/data-import/target/classes/raw_data/constellation_lines.csv"));
  }

  @Test(expected = IllegalArgumentException.class)
  public void getResourceFilePath_ThrowsIAE_IfReourceFileDoesNotExist() {
    resolver.getResourceFilePath("test.csv");
  }

  private String normalizeSeparators(String path) {
    return path.replaceAll("\\\\", "/");
  }

  @Test
  public void getProjectPath_ReturnsExpectedPathToProject() {
    final String path = resolver.getProjectPath();
    assertNotNull(path);
    assertTrue("Unexpected project path: " + path,
      normalizeSeparators(path).endsWith("/tools/data-import"));
  }

  @Test
  public void getTargetJsonOutputFolder_ReturnsExpectedPath() {
    final String path = resolver.getTargetJsonOutputFolder();
    assertNotNull(path);
    assertTrue("Unexpected JSON output path: " + path,
               normalizeSeparators(path).endsWith("/src/assets"));
  }

}
