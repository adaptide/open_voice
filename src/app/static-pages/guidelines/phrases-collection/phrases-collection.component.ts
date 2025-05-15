import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-phrases-collection',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    RouterLink
  ],
  templateUrl: './phrases-collection.component.html',
  styleUrl: './phrases-collection.component.scss'
})
export class PhrasesCollectionComponent implements OnInit {
  @ViewChild('public_domain') publicDomain!: ElementRef;
  @ViewChild('quoting_sentences') quotingSentences!: ElementRef;
  @ViewChild('adding_sentences') addingSentences!: ElementRef;
  @ViewChild('view_sentences') viewSentences!: ElementRef;
  @ViewChild('domain_sentences') domainSentences!: ElementRef;
  activeFragment: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  scrollToSection(section: string) {
    setTimeout(() => {
      if (section === 'public_domain' && this.publicDomain) {
        this.publicDomain.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'quoting_sentences' && this.quotingSentences) {
        this.quotingSentences.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'adding_sentences' && this.addingSentences) {
        this.addingSentences.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'view_sentences' && this.viewSentences) {
        this.viewSentences.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'domain_sentences' && this.domainSentences) {
        this.domainSentences.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  }

  ngOnInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        this.activeFragment = fragment;
        this.scrollToSection(fragment);
      }
    });
  }

  isActive(fragment: string): boolean {
    return this.activeFragment === fragment;
  }
}
