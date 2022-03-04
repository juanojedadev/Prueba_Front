import { CharactersComponent } from './../../../presentation/home/characters/characters.component';
import { CharacterUseCase } from './../../../core/usecases/character.usecase';
import { FormControl, Validators } from '@angular/forms';
import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomErrorStateMatcher } from '@coreelements/validator/MatcherError';
import { Character } from '@coreelements/models/character';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit, OnDestroy {

  matcherError = new CustomErrorStateMatcher();
  characterForm !: FormGroup;
  images: Array<{name:string, url: string}> = [];
  isImageSelected = false;
  title = 'Add Character';
  state = ['Alive', 'Sick'];
  action = '';
  _subscribers$ : Array<Subscription> = [];

  constructor(private fb: FormBuilder, private _characterUseCase: CharacterUseCase, private _modalRef: MatDialogRef<CharactersComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any) { }


  ngOnDestroy(): void {
    this._subscribers$.forEach(p => {
      p.unsubscribe();
    })
  }

  ngOnInit(): void {
    this.validateCharacterForm();
    this.getImages();

    if(this.data.action == 'create'){
      this.action = this.data.action;
    }

    if(this.data.action == 'watch'){
      this.action = this.data.action;
      this.title = 'View character';
      const _subscriber$ = this._characterUseCase.getCharacterById(this.data.value).subscribe((p) => {
        this.characterForm.setValue(p);
        this.characterForm.disable();
      });

      this._subscribers$.push(_subscriber$);
    }

    if(this.data.action == 'edit'){
      this.title = 'Edit character';
      this.action = this.data.action;
      const _subscriber$ = this._characterUseCase.getCharacterById(this.data.value).subscribe((p) => {
        this.characterForm.setValue(p);
      });
      this._subscribers$.push(_subscriber$);
    }
  }

  async getImages(){
    var characters: Character[] = JSON.parse(localStorage.getItem('characters') as string) as Character[];
    this.images = await characters.map((res) => {return {name: res.name, url: res.image}});
  }

  validateCharacterForm(){
    this.characterForm = this.fb.group({
        id: new FormControl('',{}),
        created: new FormControl('',{}),
        name: new FormControl('',{validators:[Validators.required]}),
        species: new FormControl('',{validators:[Validators.required]}),
        status: new FormControl('',{validators:[Validators.required]}),
        gender: new FormControl('',{validators:[Validators.required]}),
        image: new FormControl('',{validators:[Validators.required]}),
        contact: this.fb.group({
          phone: new FormControl('',{validators:[Validators.required]}),
          address: new FormControl('',{validators:[Validators.required]}),
          country: new FormControl('',{validators:[Validators.required]}),
        })
    });
  }

  save(){
    if(this.characterForm.invalid){
      Swal.default.fire(
        {
          title: 'Error',
          text: 'The requeriments are incomplete',
          toast: true,
          position: 'top-right',
          timerProgressBar: true,
          timer: 4000,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'Go to space of form'
        }
      ).then((p) => {
        if(p.isConfirmed){
          this.focusError(this.characterForm);
        }
      });
      return;
    }


    const _subscriber$ = this._characterUseCase.createNewCharacter(this.characterForm.value).subscribe((p) => {
      Swal.default.fire({
        title: 'Saved',
        text: 'Character saved correctly',
        toast: true,
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((p) => {
        if(p.isConfirmed){
          this._modalRef.close();
        }
      });
    });

    this._subscribers$.push(_subscriber$);
  }

  edit(){
    if(this.characterForm.invalid){
      Swal.default.fire(
        {
          title: 'Error',
          text: 'The requeriments are incomplete',
          toast: true,
          position: 'top-right',
          timerProgressBar: true,
          timer: 4000,
          icon: 'error',
          showConfirmButton: true,
          confirmButtonText: 'Go to space of form'
        }
      ).then((p) => {
        if(p.isConfirmed){
          this.focusError(this.characterForm);
        }
      });
      return;
    }

    const _subscriber$ = this._characterUseCase.updateCharacter(this.characterForm.value).subscribe((p) => {
      Swal.default.fire({
        title: 'Saved',
        text: 'Character edited correctly',
        toast: true,
        position: 'top-end',
        timer: 5000,
        timerProgressBar: true,
        icon: 'success',
        confirmButtonText: 'Ok'
      }).then((p) => {
        if(p.isConfirmed){
          this._modalRef.close();
        }
      });
    });

    this._subscribers$.push(_subscriber$);
  }

  cancel(){
    this._modalRef.close();
  }

  focusError(form: FormGroup){
    for(const key of Object.keys(form.controls)){
      if (form.controls[key].invalid) {
        const invalidControl:any = document.querySelector('[formControlName="' + key + '"]');
        invalidControl.focus();
        break;
     }
    }
  }

  get name(){return this.characterForm.get('name')}
  get species(){return this.characterForm.get('species')}
  get gender(){return this.characterForm.get('gender')}
  get status(){return this.characterForm.get('status')}
  get image(){return this.characterForm.get('image')}
  get contact(){return this.characterForm.get('contact')}


}
