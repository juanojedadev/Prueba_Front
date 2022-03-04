import { Observable, Subject } from 'rxjs';
import { Injectable } from "@angular/core";
import { CharacterGateway } from '@coreelements/gateways/character.gateway';
import { Character } from '@coreelements/models/character';


@Injectable({
  providedIn: 'root'
})

export class CharacterUseCase{

  constructor(private _characterGateway: CharacterGateway){}

  setRefresh(): Subject<void>{
    return this._characterGateway._getRefresher();
  }

  createNewCharacter(Character: Character): Observable<Character>{
    return this._characterGateway.create(Character);
  }

  getListOfCharacters(): Observable<Character[]>{
    return this._characterGateway.findAll();
  }

  getCharacterById(id: number): Observable<Character>{
    return this._characterGateway.findOneById(id);
  }

  updateCharacter(Character: Character): Observable<Character>{
    return this._characterGateway.update(Character);
  }

  deleteCharacterbyId(id: number): Observable<void>{
    return this._characterGateway.deleteById(id);
  }

}
