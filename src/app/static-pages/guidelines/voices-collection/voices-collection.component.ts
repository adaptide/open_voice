import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-voices-collection',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgForOf
  ],
  templateUrl: './voices-collection.component.html',
  styleUrl: './voices-collection.component.scss'
})
export class VoicesCollectionComponent implements OnInit {
  @ViewChild('differentPronunciation') differentPronunciation!: ElementRef;
  @ViewChild('offensiveContent') offensiveContent!: ElementRef;
  @ViewChild('misreading') misreading!: ElementRef;
  @ViewChild('background_noise') backgroundNoise!: ElementRef;
  @ViewChild('background_voices') backgroundVoices!: ElementRef;
  @ViewChild('volume') volume!: ElementRef;
  @ViewChild('reading_effects') readingEffects!: ElementRef;
  @ViewChild('not_sure') notSure!: ElementRef;
  activeFragment: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  scrollToSection(section: string) {
    setTimeout(() => {
      if (section === 'different_pronunciation' && this.differentPronunciation) {
        this.differentPronunciation.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'offensive_content' && this.offensiveContent) {
        this.offensiveContent.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'misreading' && this.misreading) {
        this.misreading.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'background_noise' && this.backgroundNoise) {
        this.backgroundNoise.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'background_voices' && this.backgroundVoices) {
        this.backgroundVoices.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'volume' && this.volume) {
        this.volume.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'reading_effects' && this.readingEffects) {
        this.readingEffects.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      if (section === 'not_sure' && this.notSure) {
        this.notSure.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
