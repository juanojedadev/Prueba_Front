import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FruitGateway } from '@coreelements/gateways/fruit.gateway';
import { Fruit } from '@coreelements/models/fruit';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class FruitsService extends FruitGateway{

  private _refresher = new Subject<void>();

  constructor(private http: HttpClient){super();}

  setRefreshDataTap(): Subject<void> {
    throw new Error('Method not implemented.');
  }
  create(object: Fruit): Observable<Fruit> {
    throw new Error('Method not implemented.');
  }
  findAll(): Observable<Fruit[]> {
    return of(localStorage.getItem('fruits'))
    .pipe(
        switchMap(facts => {
            if (!facts) {
                return this.http.get<Fruit[]>(`${environment.HOST}/all`)
                    .pipe(tap(ar => {localStorage.setItem('fruits', JSON.stringify(ar))}));
            }
            return of(JSON.parse(facts));
        })
    );
  }


  findOneById(id: Number): Observable<Fruit> {
    throw new Error('Method not implemented.');
  }
  update(object: Fruit): Observable<Fruit> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: Number): Observable<void> {
    throw new Error('Method not implemented.');
  }

}
