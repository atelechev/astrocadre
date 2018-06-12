package fr.atelechev.astrocadre.tools.dataimport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.Banner;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.WebApplicationType;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.context.annotation.Profile;

@EnableAutoConfiguration
@SpringBootApplication
@Profile("!test")
public class Application implements CommandLineRunner {

  @Autowired
  private DataImporter dataImporter;

  public static void main(String[] args) {
    new SpringApplicationBuilder(Application.class)
      .web(WebApplicationType.NONE)
      .bannerMode(Banner.Mode.OFF)
      .run(args);
  }

  @Override
  public void run(String... args) {
    this.dataImporter.importAllData();
  }

}
