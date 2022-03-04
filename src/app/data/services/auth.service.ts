import { Router } from '@angular/router';
import { Observable, of, throwError, Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Person } from '@coreelements/models/person';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  _refreshRole: Subject<void> = new Subject<void>();

  _persons: Array<Person> = [
    {
      id: 1,
      active: true,
      email: 'jhondoe1@any.com',
      password: '12345',
      createDate: new Date(),
      firstName: 'John',
      secondName: 'Magnus',
      lastName: 'Doe',
      secondLastName: 'Morrigan',
      role: 'Admin'
    },
    {
      id: 1,
      active: true,
      email: 'jhondoe2@any.com',
      password: '12345',
      createDate: new Date(),
      firstName: 'John',
      secondName: 'Magnus',
      lastName: 'Doe',
      secondLastName: 'Morrigan',
      role: 'User'
    }
  ]

  constructor(private router: Router) { }

  authenticateUserAdmin(email: string, password: string): Observable<string>{
    const user = this._persons.filter(p => p.email === email && p.password === password);
    var _response = user.length > 0?true: false;

    if(!_response){
      throw throwError(() => new Error('el usuario no está autenticado'));
    }

    localStorage.setItem('role', user[0].role);
    return of(user[0].role).pipe(tap(() => {this._refreshRole.next()}));
  }

  closeSession():Observable<string>{
    localStorage.removeItem('role');
    localStorage.removeItem('first-time');
    localStorage.removeItem('characters');
    this.router.navigate(['/auth']);
    return of('Bye bye').pipe(tap(() => {this._refreshRole.next()}));
  }


}
