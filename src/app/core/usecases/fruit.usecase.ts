import { FruitGateway } from '@coreelements/gateways/fruit.gateway';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { Fruit } from '@coreelements/models/fruit';


@Injectable({
  providedIn: 'root'
})

export abstract class FruitUseCase{
  constructor(private _fruitGateway: FruitGateway){}

  createNewFruit(fruit: Fruit): Observable<Fruit>{
    return this._fruitGateway.create(fruit);
  }

  getListOfFruits(): Observable<Fruit[]>{
    return this._fruitGateway.findAll();
  }

  getFruitById(id: number): Observable<Fruit>{
    return this._fruitGateway.findOneById(id);
  }

  updateFruit(fruit: Fruit): Observable<Fruit>{
    return this._fruitGateway.update(fruit);
  }

  deleteFruitbyId(id: number): Observable<void>{
    return this._fruitGateway.deleteById(id);
  }

}
