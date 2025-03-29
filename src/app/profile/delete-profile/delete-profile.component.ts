import { Component } from '@angular/core';
import {TranslatePipe} from "@ngx-translate/core";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-delete-profile',
  standalone: true,
  imports: [
    TranslatePipe,
    NgClass
  ],
  templateUrl: './delete-profile.component.html',
  styleUrl: './delete-profile.component.scss'
})
export class DeleteProfileComponent {

  isActive = true;


  setActive(state: boolean) {
    this.isActive = state;
    console.log('Текущее состояние:', this.isActive ? 'Оставить' : 'Удалить');
  }
}
