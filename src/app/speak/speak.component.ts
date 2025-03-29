import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {RecordService} from "../services/record.service";
import {AudioRecorderService} from "../services/audio-recorder.service";
import {CommonModule, isPlatformBrowser} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import { firstValueFrom } from 'rxjs';
import {animate, style, transition, trigger} from "@angular/animations";
import {NavComponent} from "../common-blocks/nav/nav.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const reportTypes = [
  { key: 'offensive_language', value: 'offensive_language', description: 'offensive_language_text' },
  { key: 'grammar_error', value: 'grammar_error', description: 'grammar_error_text' },
  { key: 'foreign_language', value: 'foreign_language', description: 'foreign_language_text' },
  { key: 'difficult_to_pronounce', value: 'difficult_to_pronounce', description: 'difficult_to_pronounce_text' }
];

@Component({
  selector: 'app-speak',
  standalone: true,
  imports: [
    TranslatePipe,
    CommonModule,
    NavComponent,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './speak.component.html',
  styleUrl: './speak.component.scss',
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
export class SpeakComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private recordService: RecordService,
    private cdr: ChangeDetectorRef,
    private audioRecorderService: AudioRecorderService,
    private router: Router,
    private translateService: TranslateService,
  ) {}

  currentLanguage: any;

  isModalOpen = false;
  private startTime!: number;
  private autoStopTimeout!: any;

  text: any;
  showText = true;
  isRecording = false;
  audioUrl: any;
  isSendDisabled = true;
  currentTextIndex = 1;
  textsQueue: any[] = [];

  selectedReports: string[] = [];
  isOtherChecked = false;
  otherText = '';

  isLoading = true;

  reportTypes = reportTypes;
  isReportModalOpen = false;


  ngOnInit() {
    this.getRandomTexts();
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeunload', this.beforeUnloadHandler);
    }

    this.currentLanguage = this.translateService.currentLang;
  }

  get isSubmitEnabled(): boolean {
    return this.selectedReports.length > 0 || (this.isOtherChecked && this.otherText.trim().length > 0);
  }

  ngOnDestroy() {
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('beforeunload', this.beforeUnloadHandler);
    }
  }

  async getRandomTexts() {
    this.isLoading = true;
    try {
      const response: any = await firstValueFrom(this.recordService.getRandomText());

      if (response?.data?.length > 0) {
        this.textsQueue = this.shuffleArray(response.data);
        this.showNextText();
        this.isLoading = false;
      } else {
        console.error('Нет доступных текстов.');
      }
    } catch (error) {
      console.error('Ошибка загрузки текстов:', error);
    }
  }


  shuffleArray(array: any[]): any[] {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  }


  showNextText() {
    if (this.textsQueue.length === 0) {
      this.getRandomTexts();
      return;
    }

    this.text = this.textsQueue.shift();
    this.showText = true;
    this.cdr.detectChanges();
  }



  async toggleRecording() {
    if (!this.isRecording) {
      await this.startRecording();
    } else {
      await this.stopRecording();
    }
  }

  async startRecording() {
    try {
      this.isRecording = true;
      this.isSendDisabled = true;
      this.audioUrl = null;
      this.startTime = Date.now();
      this.cdr.detectChanges();

      await this.audioRecorderService.startRecording();

      this.autoStopTimeout = setTimeout(() => {
        if (this.isRecording) {
          this.stopRecording();
        }
      }, 30000);
    } catch (error) {
      console.error('Ошибка при начале записи:', error);
    }
  }

  async stopRecording() {
    if (!this.isRecording) return;

    const elapsedTime = (Date.now() - this.startTime) / 1000;
    if (elapsedTime < 1) {
      console.warn('Запись слишком короткая. Минимум 1 секунда.');
      return;
    }

    this.isRecording = false;
    clearTimeout(this.autoStopTimeout);

    try {
      this.audioUrl = await this.audioRecorderService.stopRecording();
      this.isSendDisabled = false;
    } catch (error) {
      console.error('Ошибка при остановке записи:', error);
    }

    this.cdr.detectChanges();
  }

  async sendRecording() {
    if (!this.audioUrl || !this.text || !this.text.id) {
      console.error('Missing data:', this.audioUrl, this.text);
      return;
    }

    const response = await fetch(this.audioUrl);
    const audioBlob = await response.blob();

    const formData = new FormData();
    formData.append('path', audioBlob, 'recording.wav');
    formData.append('text_id', this.text.id.toString());

    this.recordService.sendRecord(formData).subscribe(
      (response) => {
        console.log('Recording sent successfully', response);
        this.nextLevel();
      },
      (error) => {
        console.error('Error sending recording:', error);
      }
    );
  }

  skipText() {
    this.recordService.skipSpeakText(this.text.id).subscribe(() => {
      this.showNextText();
    });
  }

  nextLevel() {
    if (this.currentTextIndex < 5) {
      this.isSendDisabled = true;
      this.audioUrl = null;
      this.currentTextIndex++;
      this.showNextText();
    } else {
      this.isModalOpen = true;
    }
  }


  restartLevels() {
    this.currentTextIndex = 1;
    this.getRandomTexts();
    this.isModalOpen = false;
  }

  finishSession() {
    this.isModalOpen = false;
    this.router.navigate(['/kk']);
  }

  beforeUnloadHandler = (event: BeforeUnloadEvent) => {
    if (this.currentTextIndex > 1) {
      event.preventDefault();
      event.returnValue = 'Вы уверены? Ваш прогресс не сохранится!';
    }
  };

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
      report: [...this.selectedReports]
    };

    if (this.isOtherChecked && this.otherText.trim()) {
      reportPayload.report.push(this.otherText.trim());
    }

    if (reportPayload.report.length > 0) {
      console.log('Отправка жалобы:', reportPayload);
      this.recordService.sendSpeakReport(this.text.id, reportPayload).subscribe((response) => {
        console.log(response);
      });
    }
  }
}
