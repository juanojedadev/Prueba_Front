import { Observable } from 'rxjs';

export abstract class GenericInterfaceObject <Entity, Key>{
  abstract create(object: Entity): Observable<Entity>;
  abstract findAll(): Observable<Entity[]> ;
  abstract findOneById(id: Key): Observable<Entity> ;
  abstract update(object: Entity): Observable<Entity>;
  abstract deleteById(id: Key): Observable<void>;
}
