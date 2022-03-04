import { Router } from '@angular/router';
import { Character } from '@coreelements/models/character';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CharacterUseCase } from '@coreelements/usecases/character.usecase';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CharacterComponent } from '@sharedelements/components/character/character.component';
import  Swal from 'sweetalert2';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss']
})
export class CharactersComponent implements OnInit, OnDestroy{

  firstTime = localStorage.getItem('first-time');
  sortSelected = '';

  displayedColumns: string[] = ['image', 'id','name', 'status', 'species','gender',  'actions'];
  dataSource = new MatTableDataSource<Character>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private _characterUseCase: CharacterUseCase, private _dialogComponent: MatDialog, private router: Router) { }

  _listOfSubscriptions!: Subscription;

  subscription!: Subscription;

  _subscribers$: Array<Subscription> = [];

  ngOnInit(): void {
    if(!this.firstTime){
      Swal.fire({
        title: 'Rick and Morty Api',
        text: 'this api is free and i use for this test because got pretty data c:',
        allowOutsideClick: false,
        confirmButtonText: 'Begin',
        icon: 'info'
      }).then((p) => {
        if(p.isConfirmed){
          localStorage.removeItem('first-time');
          console.log('reloading...');
          localStorage.setItem('first-time', 'none');
          window.location.reload();
        }
      })
    }

    this.getListOfSubscriptions();
    this.subscription = this._characterUseCase.setRefresh().subscribe(() => {
      this.getListOfSubscriptions();
    });

    this._subscribers$.push(this.subscription);
  }

  ngOnDestroy(): void {
    this._subscribers$.forEach(p => {
      p.unsubscribe();
    })
  }

  getListOfSubscriptions(){
    const _subscribe$ = this._characterUseCase.getListOfCharacters().subscribe((res) => {
      this.dataSource = new MatTableDataSource<Character>(res as Character[]);
      this.dataSource.paginator = this.paginator;
    });

    this._subscribers$.push(_subscribe$);
  }

  watch(id: number){
    this._dialogComponent.open(CharacterComponent, {
      maxWidth: '50rem',
      maxHeight: '85vh',
      width: '50rem',
      height: 'auto',
      panelClass: 'class-dialog',
      data: {action: 'watch', value: id}
    });
  }

  edit(id: number){
    this._dialogComponent.open(CharacterComponent, {
      maxWidth: '50rem',
      maxHeight: '85vh',
      width: '50rem',
      height: 'auto',
      panelClass: 'class-dialog',
      data: {action: 'edit', value: id}
    });
  }

  remove(id: number){
    this._characterUseCase.deleteCharacterbyId(id).subscribe(() => {
      Swal.fire({
        title: 'Removed',
        text: 'Character removed correctly',
        toast: true,
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        icon: 'success',
        confirmButtonText: 'Ok'
      })
    });
  }

  addNewCharacter(){
    this._dialogComponent.open(CharacterComponent, {
      maxWidth: '50rem',
      maxHeight: '85vh',
      width: '50rem',
      height: 'auto',
      panelClass: 'class-dialog',
      data: {action: 'create', value: ''}
    });
  }

  applyFilter(event: Event) {
    this.sortSelected = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.sortSelected.trim().toLowerCase();
  }
}
