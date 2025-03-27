import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {RecordService} from "../services/record.service";
import {AudioRecorderService} from "../services/audio-recorder.service";
import {CommonModule} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import { firstValueFrom } from 'rxjs';
import {animate, style, transition, trigger} from "@angular/animations";
import {NavComponent} from "../common-blocks/nav/nav.component";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from "@angular/forms";

const reportTypes = [
  { key: 'offensive_language', value: 'offensive_language', description: 'offensive_language_text' },
  { key: 'grammar_error', value: 'grammar_error', description: 'grammar_error_text' },
  { key: 'foreign_language', value: 'foreign_language', description: 'foreign_language_text' },
  { key: 'difficult_to_pronounce', value: 'difficult_to_pronounce', description: 'difficult_to_pronounce_text' }
];

@Component({
  selector: 'app-listen',
  standalone: true,
  imports: [
    CommonModule,
    TranslatePipe,
    NavComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './listen.component.html',
  styleUrl: './listen.component.scss',
  animations: [
    trigger('textSwitch', [
      transition(':leave', [
        animate('500ms ease-in-out', style({ opacity: 0, transform: 'translateX(-100%)' })),
      ]),
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(100%)' }),
        animate('500ms ease-in-out', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
    ]),
  ]
})
export class ListenComponent implements OnInit {
  constructor(
    private recordService: RecordService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private translateService: TranslateService
  ) {}

  currentLanguage: any;

  isModalOpen = false;
  audio!: HTMLAudioElement;
  text: any;
  availableTexts: any[] = [];
  showText = true;
  isListening = false;
  audioUrl: any;
  isSendDisabled = true;
  currentTextIndex = 1;

  isReportModalOpen = false;

  selectedReports: string[] = [];
  isOtherChecked = false;
  otherText = '';

  isLoading = true;

  reportTypes = reportTypes;

  ngOnInit() {
    this.getRandomRecord();

    this.currentLanguage = this.translateService.currentLang;
  }

  openReportModal() {
    this.selectedReports = [];
    this.isOtherChecked = false;
    this.otherText = '';
    this.isReportModalOpen = true;
  }

  closeReportModal() {
    this.selectedReports = [];
    this.isOtherChecked = false;
    this.otherText = '';
    this.isReportModalOpen = false;
  }

  async getRandomRecord() {
    this.isLoading = true;
    this.recordService.getRandomRecord().subscribe(
      (response: any) => {
        this.availableTexts = [...response];
        this.getRandomText();
        this.isLoading = false;
      },
      (error) => {
        console.error("Ошибка запроса:", error);
        this.isLoading = false;
      }
    );
  }

  submitEvaluation(isCorrect: boolean) {
    const evaluationPayload = {
      rating: Number(isCorrect)
    };

    console.log("Отправка оценки:", evaluationPayload);

    this.recordService.sendEvaluation(this.text.id, evaluationPayload).subscribe(() => {
      this.availableTexts = this.availableTexts.filter(item => item.id !== this.text.id);
      this.nextLevel();
      this.getRandomText();
    });
  }

  getRandomText() {
    if (this.availableTexts.length === 0) {
      console.warn("Все записи просмотрены");
      this.getRandomRecord();
      return;
    }

    const randomIndex = Math.floor(Math.random() * this.availableTexts.length);
    this.text = this.availableTexts[randomIndex];

    this.availableTexts.splice(randomIndex, 1);
  }

  async toggleListening() {
    if (!this.isListening) {
      await this.startAudio();
    } else {
      await this.stopAudio();
    }
  }

  async startAudio() {
    try {
      this.isListening = true;
      this.isSendDisabled = true;
      this.audioUrl = this.text?.full_path || null;
      this.cdr.detectChanges();

      if (this.audioUrl) {
        this.audio = new Audio(this.audioUrl);
        this.audio.play();

        this.audio.onended = () => {
          this.isListening = false;
          this.isSendDisabled = false;
          this.cdr.detectChanges();
        };
      }
    } catch (error) {
      console.error('Ошибка при начале записи:', error);
    }
  }

  async stopAudio() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
    this.isListening = false;
    this.cdr.detectChanges();
  }

  skipText() {
    this.getRandomRecord();
  }

  nextLevel() {
    if (this.currentTextIndex < 5) {
      this.isSendDisabled = true;
      this.audioUrl = null;
      this.currentTextIndex++;
      this.getRandomRecord();
    } else {
      this.isModalOpen = true;
    }
  }

  restartLevels() {
    this.currentTextIndex = 1;
    this.getRandomRecord();
    this.isModalOpen = false;
  }

  finishSession() {
    this.isModalOpen = false;
    this.router.navigate(['/kk']);
  }

  get isSubmitEnabled(): boolean {
    return this.selectedReports.length > 0 || (this.isOtherChecked && this.otherText.trim().length > 0);
  }

  toggleReport(type: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedReports.push(type);
    } else {
      this.selectedReports = this.selectedReports.filter(t => t !== type);
    }
  }

  toggleOther(event: Event) {
    this.isOtherChecked = (event.target as HTMLInputElement).checked;
    if (!this.isOtherChecked) {
      this.otherText = '';
    }
  }

  submitReport() {
    let reportPayload = {
      textId: this.text.id,
      report: [...this.selectedReports]
    };

    if (this.isOtherChecked && this.otherText.trim()) {
      reportPayload.report.push(this.otherText.trim());
    }

    if (reportPayload.report.length > 0) {
      console.log('Отправка жалобы:', reportPayload);
      // TODO: Отправить на сервер
    }
  }
}
