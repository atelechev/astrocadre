package fr.atelechev.astrocadre.tools.dataimport.util;

import fr.atelechev.astrocadre.tools.dataimport.AbstractTest;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

public class ProjectPathResolverTest extends AbstractTest {

  @Value("${dir.source.data}")
  private String rawDataDir;

  @Value("${file.source.constellation.lines}")
  private String testFileName;

  @Autowired
  private ProjectPathResolver resolver;

  @Test
  public void getResourceFileAbsolutePath_ReturnsExpectedPath_ForExistingResource() {
    final String path = resolver.getResourceAbsoluteFilePath(testFileName);
    assertNotNull(path);
    final String expectedPathSuffix = String.format("/tools/data-import/target/test-classes%1$s%2$s", rawDataDir, testFileName);
    assertTrue(String.format("Path '%1$s' does not end with expected suffix: %2$s", path, expectedPathSuffix),
      path.endsWith(expectedPathSuffix));
  }

  @Test(expected = IllegalArgumentException.class)
  public void getResourceFileAbsolutePath_ThrowsIAE_IfReourceFileDoesNotExist() {
    resolver.getResourceAbsoluteFilePath("test.csv");
  }

  private String normalizeSeparators(String path) {
    return path.replaceAll("\\\\", "/");
  }

  @Test
  public void getProjectAbsolutePath_ReturnsExpectedPathToProject() {
    final String path = resolver.getProjectAbsolutePath();
    assertNotNull(path);
    assertTrue("Unexpected project path: " + path,
      normalizeSeparators(path).endsWith("/tools/data-import"));
  }

  @Test
  public void getTargetJsonOutputAbsolutePath_ReturnsExpectedPath() {
    final String path = resolver.getTargetJsonOutputAbsolutePath();
    assertNotNull(path);
    assertTrue("Unexpected JSON output path: " + path,
      normalizeSeparators(path).endsWith("/src/assets"));
  }

}
