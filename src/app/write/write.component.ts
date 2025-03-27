import {Component, ElementRef, HostListener, OnInit} from '@angular/core';
import {NavComponent} from "../common-blocks/nav/nav.component";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {NgClass, NgForOf, NgIf, NgStyle} from "@angular/common";
import {RouterLink} from "@angular/router";
import {WriteService} from "../services/write.service";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";

const domains = [
  {id: 1, name: 'Сельское хозяство и продовольствие'},
  {id: 2, name: 'Автомобилестроение и транспорт'},
  {id: 3, name: 'Финансы'},
  {id: 4, name: 'Основные'},
  {id: 5, name: 'Здравохранение'},
  {id: 6, name: 'История, право и управление'},
  {id: 7, name: 'Основы языка (например, цифры, буквы, деньги)'},
  {id: 8, name: 'Медиа и развлечения'},
  {id: 9, name: 'Природа и окружение'},
  {id: 10, name: 'Новости и текущие события'},
  {id: 11, name: 'Сфера услуг и розничная торговля'},
  {id: 12, name: 'Технологии и робототехника'},
  ];

@Component({
  selector: 'app-write',
  standalone: true,
  imports: [
    NavComponent,
    TranslatePipe,
    NgClass,
    NgStyle,
    RouterLink,
    NgIf,
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './write.component.html',
  styleUrl: './write.component.scss'
})
export class WriteComponent implements OnInit {
  isQuoteHelpOpen: any;
  currentLanguage: any;
  domains: any;
  domainIsFocused = false;
  selectedDomains: any[] = [];
  filteredDomains: any[] = [];
  searchQuery: string = '';
  categories: any;

  constructor(private translateService: TranslateService, private writeService: WriteService) {}


  form = new FormGroup({
    sentence: new FormControl('', [Validators.required]),
    domains: new FormControl<number[]>([]),
    source: new FormControl('', [Validators.required]),
    category_id: new FormControl('', [Validators.required]),
  })

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
    this.domains = domains;
    this.getCategories();
    this.updateFilteredDomains();
    console.log(this.domains);
  }

  getCategories() {
    this.writeService.getCategories().subscribe((data: any) => {
      this.categories = data;
    });
  }

  onFocusIn() {
    this.domainIsFocused = true;
  }

  onFocusOut() {
    this.domainIsFocused = false;
  }

  onSearch(event: any) {
    this.searchQuery = event.target.value;
    this.updateFilteredDomains();
  }

  selectDomain(domain: any) {
    this.domainIsFocused = false;

    const index = this.selectedDomains.findIndex(c => c.id === domain.id);
    if (index === -1) {
      this.selectedDomains.push(domain);
    } else {
      this.selectedDomains.splice(index, 1);
    }

    this.searchQuery = '';
    this.updateFilteredDomains();
  }

  updateFilteredDomains() {
    this.filteredDomains = this.domains
      .filter((category: { id: any; }) => !this.selectedDomains.some(selected => selected.id === category.id))
      .filter((category: { name: string; }) => category.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
  }

  removeDomain(domain: any) {
    this.selectedDomains = this.selectedDomains.filter(d => d.id !== domain.id);
    this.updateFilteredDomains();
  }

  submit() {
    this.form.patchValue({ domains: this.selectedDomains.map(d => d.id) });

    this.writeService.submit(this.form.value).subscribe((data: any) => {
      console.log(data);
    });
  }
}

