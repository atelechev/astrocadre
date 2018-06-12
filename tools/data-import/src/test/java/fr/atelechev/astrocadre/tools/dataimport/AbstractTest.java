package fr.atelechev.astrocadre.tools.dataimport;

import org.junit.runner.RunWith;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = { TestApplication.class, AppConfig.class })
@ActiveProfiles("test")
public abstract class AbstractTest {


}
