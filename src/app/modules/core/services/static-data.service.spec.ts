import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { asyncData, asyncError, emptyThemeDef } from '#core/models/abstract-factories.spec';
import { ConstellationMetadata } from '#core/models/constellation-metadata';
import { StaticDataService } from '#core/services/static-data.service';


describe('StaticDataService', () => {

  let httpClientSpy: { get: jasmine.Spy };
  let service: StaticDataService;

  const errorResponse = (code: number, cause: string) => new HttpErrorResponse({
    error: `${code} ${cause}`,
    status: code,
    statusText: cause
  });

  const errorNotFound = errorResponse(404, 'Not found');

  const errorInternal = errorResponse(500, 'Internal error');

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new StaticDataService(httpClientSpy as any);
  });

  const expectSuccessfulRequest = (reqFunct: () => Observable<any>,
    expectedData: any,
    nbCalls: number) => {
    reqFunct().subscribe(
      retrieved => expect(retrieved).toEqual(expectedData),
      fail
    );
    expect(httpClientSpy.get.calls.count()).toBe(nbCalls);
  };

  const execFailingRequest = (reqFunct: () => Observable<any>, expectedMessage: string) => {
    reqFunct().subscribe(
      _ => fail('Expected an error, but got successful response'),
      error => expect(error).toContain(expectedMessage)
    );
  };

  const prepareExpectedGetData = (expectedData: any) => {
    httpClientSpy.get.and.returnValue(asyncData(expectedData));
  };

  const prepareErrorGetData = (expectedError: any) => {
    httpClientSpy.get.and.returnValue(asyncError(expectedError));
  };

  describe('getThemeDefinition should return', () => {

    it('expected ThemeDefinition', () => {
      const expectedData = Object.create(emptyThemeDef);
      prepareExpectedGetData(expectedData);

      expectSuccessfulRequest(() => service.getThemeDefinition('test'), expectedData, 1);
    });

    it('an error when the theme was not found', () => {
      prepareErrorGetData(errorNotFound);

      execFailingRequest(() => service.getThemeDefinition('unknown'), '404 Not found');
    });

  });

  describe('getConstellationBoundaries should return', () => {

    it('expected data', () => {
      const expectedData = [[305.0, -57.0, 305.0, -45.5], [90.0, -61.0, 82.5, -61.0]];
      prepareExpectedGetData(expectedData);

      expectSuccessfulRequest(() => service.getConstellationBoundaries(), expectedData, 1);
    });

    it('an error when data cannot be retrieved', () => {
      prepareErrorGetData(errorInternal);

      execFailingRequest(() => service.getConstellationBoundaries(), '500 Internal error');
    });

  });

  describe('getConstellationLines should return', () => {

    it('expected data', () => {
      const expectedData = [[56.05, -64.8, 63.6, -62.47], [59.69, -61.4, 56.05, -64.8]];
      prepareExpectedGetData(expectedData);

      expectSuccessfulRequest(() => service.getConstellationLines(), expectedData, 1);
    });

    it('an error when data cannot be retrieved', () => {
      prepareErrorGetData(errorInternal);

      execFailingRequest(() => service.getConstellationLines(), '500 Internal error');
    });

  });

  describe('getStarsByMagnitudeClass should return', () => {

    it('expected data', () => {
      const expectedData = [[24.43, -57.24, 0.5, 'Achernar', 'ALP ERI']];
      prepareExpectedGetData(expectedData);

      expectSuccessfulRequest(() => service.getStarsByMagnitudeClass(2), expectedData, 1);
    });

    it('an error when data cannot be retrieved', () => {
      prepareErrorGetData(errorNotFound);

      execFailingRequest(() => service.getStarsByMagnitudeClass(10), '404 Not found');
    });

  });

  describe('getConstellationsMetadata should return', () => {

    it('expected data', () => {
      const serviceResponseData = [{ type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda'] }];
      prepareExpectedGetData(serviceResponseData);
      const expectedData = [new ConstellationMetadata('AND', 8.532, 38.906, ['Andromeda'])];

      expectSuccessfulRequest(() => service.getConstellationsMetadata(), expectedData, 1);
    });

    it('an error when data cannot be retrieved', () => {
      prepareErrorGetData(errorInternal);

      execFailingRequest(() => service.getConstellationsMetadata(), '500 Internal error');
    });

  });

  describe('getAvailableThemes should return', () => {

    it('expected data', () => {
      const expectedData = { selectable: true, items: [{ code: 'test', label: 'Test', description: null, selected: true }] };
      prepareExpectedGetData(expectedData);

      expectSuccessfulRequest(() => service.getAvailableThemes(), expectedData, 1);
    });

    it('an error when data cannot be retrieved', () => {
      prepareErrorGetData(errorInternal);

      execFailingRequest(() => service.getAvailableThemes(), '500 Internal error');
    });

  });

  describe('getAvailableLayers should return', () => {

    it('expected data', () => {
      const expectedData = {
        selectable: true,
        items: [{ code: 'sky-grid', label: 'Coordinates grid', description: null, selected: true }]
      };
      prepareExpectedGetData(expectedData);

      expectSuccessfulRequest(() => service.getAvailableLayers(), expectedData, 1);
    });

    it('an error when data cannot be retrieved', () => {
      prepareErrorGetData(errorInternal);

      execFailingRequest(() => service.getAvailableLayers(), '500 Internal error');
    });

  });

  describe('getSearchableItems should return', () => {

    it('expected data', () => {
      const expectedData = [{ type: 'constellation', code: 'AND', ra: 8.532, dec: 38.906, names: ['Andromeda'] }];
      prepareExpectedGetData(expectedData);

      expectSuccessfulRequest(() => service.getSearchableItems(), expectedData, 1);
    });

    it('an error when data cannot be retrieved', () => {
      prepareErrorGetData(errorInternal);

      execFailingRequest(() => service.getSearchableItems(), '500 Internal error');
    });

  });

});