import { Response, Http } from '@angular/Http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

export abstract class AbstractService {

  constructor(private http: Http) {

  }

  protected handleError(res: Response | any): Observable<any> {
    if (res instanceof Response) {
      const body = res.json() || '';
      return Observable.throw(res);
    }
    return Observable.throw('Failed to retrieve data JSON from server.');
  }

  protected execGetRequestForUrl(url: string): Observable<any> {
    return this.http.get(url)
                    .map((res: Response) => res.json())
                    .catch(this.handleError);
  }

}
