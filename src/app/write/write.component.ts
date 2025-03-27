import { Component } from '@angular/core';
import {NavComponent} from "../common-blocks/nav/nav.component";

@Component({
  selector: 'app-write',
  standalone: true,
    imports: [
        NavComponent
    ],
  templateUrl: './write.component.html',
  styleUrl: './write.component.scss'
})
export class WriteComponent {

}
