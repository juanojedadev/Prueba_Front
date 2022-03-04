import { Contact } from './../../core/models/contact';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CharacterGateway } from '@coreelements/gateways/character.gateway';
import { Character } from '@coreelements/models/character';
import { Subject, Observable, of } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class CharacterService extends CharacterGateway{

  private _refresher = new Subject<void>();

  private _imageUsers: Array<string> = [];

  private _characters : Array<Character> = [];

  constructor(private http: HttpClient){super();}


  _getRefresher(): Subject<void> {
    return this._refresher;
  }

  create(object: Character): Observable<Character> {
    var characters: Character[] = JSON.parse(localStorage.getItem('characters') as string) as Character[];
    this._characters = characters;
    localStorage.removeItem('characters');
    object.id = (this._characters.slice(0)[0].id) + 1;
    this._characters.push({id: object.id,
    name: object.name,
    status: object.status,
    species : object.species,
    gender : object.gender,
    image : object.image,
    created : new Date(),
    contact: object.contact});

    this._characters.sort((a:any, b:any) => {return b.id - a.id});

    if(!localStorage.getItem('characters')){
      localStorage.setItem('characters', JSON.stringify(this._characters));
    }

    return of(object).pipe(tap(() => {this._refresher.next()}));
  }

  findAll(): Observable<Character[]> {
    return this.http.get<any>(`${environment.HOST}/?name=rick&status=alive`)
        .pipe(map(((p:any) => {
          var result: Character[] = [];
          p.results.forEach((obj:any) => {
            const contact : Contact = {phone: '1234567890', address: 'av siempre viva', country: 'N.Y'}
            const object: Character = {
              id: obj['id'],
              name: obj['name'],
              status: obj['status'],
              species : obj['species'],
              gender : obj['gender'],
              image : obj['image'],
              created : obj['created'],
              contact: contact
            };

            result.push(object);
          });


          if(!localStorage.getItem('characters')){
            var nuevos = result.sort((a:any, b:any) => {return b.id - a.id}) as Character[];
            localStorage.setItem('characters', JSON.stringify(nuevos));
          }else{
            this._characters = JSON.parse(localStorage.getItem('characters') as string) as Character[];
          }

          return this._characters;
        })));
  }

  findOneById(id: Number): Observable<Character> {
    var characters: Character[] = JSON.parse(localStorage.getItem('characters') as string) as Character[];
    const _founded = characters.filter((p) => p.id == id);
    return of(_founded[0]).pipe();

  }

  update(object: Character): Observable<Character> {
    var characters: Character[] = JSON.parse(localStorage.getItem('characters') as string) as Character[];

    var _founded = characters.find((p) => p.id == object.id);

    this._characters = characters.filter((p) => p.id !== object.id);

    localStorage.removeItem('characters');

    this._characters.push({id: _founded!.id,
      name: object.name,
      status: object.status,
      species : object.species,
      gender : object.gender,
      image : object.image,
      created : new Date(),
      contact: object.contact});


    this._characters.sort((a:any, b:any) => {return b.id - a.id});

    if(!localStorage.getItem('characters')){
      localStorage.setItem('characters', JSON.stringify(this._characters));
    }

    return of(object).pipe(tap(() => {this._refresher.next()}));
  }


  deleteById(id: Number): Observable<void> {
    var characters: Character[] = JSON.parse(localStorage.getItem('characters') as string) as Character[];

    this._characters = characters.filter((p) => p.id !== id);

    localStorage.removeItem('characters');

    this._characters.sort((a:any, b:any) => {return b.id - a.id});

    if(!localStorage.getItem('characters')){
      localStorage.setItem('characters', JSON.stringify(this._characters));
    }

    this._refresher.next();
    return of();
  }

}
