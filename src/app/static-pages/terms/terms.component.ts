import { Component } from '@angular/core';
import {FooterComponent} from "../../common-blocks/footer/footer.component";

@Component({
  selector: 'app-terms',
  standalone: true,
    imports: [
        FooterComponent
    ],
  templateUrl: './terms.component.html',
  styleUrl: './terms.component.scss'
})
export class TermsComponent {

}
