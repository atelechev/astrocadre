package fr.atelechev.skyview.tools.dataimport;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class JsonUtils {


  public static void outputJson(String json, String outputFilePrefix) throws IOException {
    final String outputFileName = String.format("%1$s_%2$s.json", outputFilePrefix, System.currentTimeMillis());
    final Path outputTo = Paths.get(System.getProperty("java.io.tmpdir"), outputFileName);
    Files.write(outputTo, json.getBytes());
  }

  public static ObjectMapper initObjectMapper() {
    final ObjectMapper mapper = new ObjectMapper();
    final SimpleModule module = new SimpleModule();
    module.addSerializer(Node.class, new NodeSerializer());
    module.addSerializer(Segment.class, new SegmentSerializer());
    module.addSerializer(Star.class, new StarSerializer());
    mapper.registerModule(module);
    return mapper;
  }

}
