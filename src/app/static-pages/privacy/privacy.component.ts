import { Component } from '@angular/core';
import {FooterComponent} from "../../common-blocks/footer/footer.component";
import {NgIf} from "@angular/common";
import {PhrasesCollectionComponent} from "../guidelines/phrases-collection/phrases-collection.component";
import {VoicesCollectionComponent} from "../guidelines/voices-collection/voices-collection.component";

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [
    FooterComponent,
    NgIf,
    PhrasesCollectionComponent,
    VoicesCollectionComponent
  ],
  templateUrl: './privacy.component.html',
  styleUrl: './privacy.component.scss'
})
export class PrivacyComponent {

  protected readonly Date = Date;
}
