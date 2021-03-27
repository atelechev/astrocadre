import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { CameraService } from 'src/app/modules2/core/services/camera.service';
import { EventsService } from 'src/app/modules2/core/services/events.service';
import { LayerService } from 'src/app/modules2/core/services/layer.service';
import { LayersFactoryService } from 'src/app/modules2/core/services/layers-factory.service';
import { MaterialsService } from 'src/app/modules2/core/services/materials.service';
import { SceneService } from 'src/app/modules2/core/services/scene.service';
import { SearchService } from 'src/app/modules2/core/services/search.service';
import { StaticDataService } from 'src/app/modules2/core/services/static-data.service';
import { ThemeService } from 'src/app/modules2/core/services/theme.service';
import { ViewportService } from 'src/app/modules2/core/services/viewport.service';
import { MockStaticDataService } from 'src/app/modules2/core/test-utils/mock-static-data-service.spec';

export class TestContext {

  private readonly _imports: Array<any> = [
    HttpClientModule,
    HttpClientTestingModule
  ];

  private readonly _providers: Array<any> = [
    CameraService,
    EventsService,
    LayerService,
    LayersFactoryService,
    MaterialsService,
    {
      provide: StaticDataService,
      useClass: MockStaticDataService
    },
    SceneService,
    SearchService,
    ThemeService,
    ViewportService
  ];

  public configure(): TestContext {
    TestBed.configureTestingModule({
      imports: this._imports,
      providers: this._providers
    });
    return this;
  }

  public get layerService(): LayerService {
    return TestBed.inject(LayerService);
  }

  public get materialsService(): MaterialsService {
    return TestBed.inject(MaterialsService);
  }

  public get eventsService(): EventsService {
    return TestBed.inject(EventsService);
  }

  public get sceneService(): SceneService {
    return TestBed.inject(SceneService);
  }

}
