import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PanelModule } from 'primeng/panel';
import { SelectButtonModule } from 'primeng/selectbutton';
import { SliderModule } from 'primeng/slider';
import { CameraService } from '#core/services/camera.service';
import { EventsService } from '#core/services/events.service';
import { LayerService } from '#core/services/layer.service';
import { LayersFactoryService } from '#core/services/layers-factory.service';
import { MaterialsService } from '#core/services/materials.service';
import { SceneService } from '#core/services/scene.service';
import { SearchService } from '#core/services/search.service';
import { StaticDataService } from '#core/services/static-data.service';
import { ThemeService } from '#core/services/theme.service';
import { ViewportService } from '#core/services/viewport.service';
import { MockStaticDataService } from '#core/test-utils/mock-static-data-service.spec';
import { ControlsModule } from '#controls/controls.module';

export class TestContext {

  private readonly _imports: Array<any> = [
    HttpClientModule,
    HttpClientTestingModule
  ];

  private readonly _importsUi: Array<any> = [
    BrowserModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    PanelModule,
    SelectButtonModule,
    SliderModule
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

  private readonly _declarations: Array<any>;

  private _testedComponent: Type<any>;

  private _fixture: ComponentFixture<any>;

  constructor() {
    this._declarations = [];
    this._fixture = undefined;
  }

  public get cameraService(): CameraService {
    return TestBed.inject(CameraService);
  }

  public get layerService(): LayerService {
    return TestBed.inject(LayerService);
  }

  public get layersFactory(): LayersFactoryService {
    return TestBed.inject(LayersFactoryService);
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

  public get themeService(): ThemeService {
    return TestBed.inject(ThemeService);
  }

  public get viewportService(): ViewportService {
    return TestBed.inject(ViewportService);
  }

  public getComponent<T>(targetType: Type<T>): T {
    return this._fixture?.componentInstance as T;
  }

  public withUIImports(): TestContext {
    this._importsUi.forEach(
      (item: any) => this._imports.push(item)
    );
    return this;
  }

  public withFullUI(): TestContext {
    this._imports.push(ControlsModule);
    this._imports.push(NoopAnimationsModule);
    return this;
  }

  public withDeclarations(declarations: Array<Type<any>>): TestContext {
    declarations?.forEach(
      (component: Type<any>) => this._declarations.push(component)
    );
    return this;
  }

  public forComponent(component: Type<any>): TestContext {
    this._declarations.push(component);
    this._testedComponent = component;
    return this;
  }

  public configure(): TestContext {
    TestBed.configureTestingModule({
      declarations: this._declarations,
      imports: this._imports,
      providers: this._providers
    });
    if (this._testedComponent) {
      this._fixture = TestBed.createComponent(this._testedComponent);
    }
    return this;
  }

}
