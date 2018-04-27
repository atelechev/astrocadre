import { Observable } from 'rxjs/Observable';

export abstract class AbstractService {

  protected handleError(res: Response | any): Observable<any> {
    if (res instanceof Response) {
      const body = res.json() || '';
      return Observable.throw(res);
    }
    return Observable.throw('Failed to retrieve data JSON from server.');
  }

}
