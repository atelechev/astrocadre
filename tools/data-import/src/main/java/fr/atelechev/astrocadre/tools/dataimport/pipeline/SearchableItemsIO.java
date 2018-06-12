package fr.atelechev.astrocadre.tools.dataimport.pipeline;

import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
@Data
public class SearchableItemsIO extends DataIO {

  @Autowired
  private SearchableItemsReader reader;

  @Autowired
  private SearchableItemsWriter writer;

  public SearchableItemsIO() {
    super("Searchable items");
  }

}
