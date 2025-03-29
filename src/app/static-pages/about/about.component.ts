import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {FooterComponent} from "../../common-blocks/footer/footer.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgForOf,
    FooterComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {

}
