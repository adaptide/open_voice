import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioRecorderService {
  private mediaRecorder!: MediaRecorder;
  private audioChunks: Blob[] = [];
  private stream!: MediaStream;
  private startTime!: number;
  private stopTimeout!: NodeJS.Timeout;

  async startRecording(): Promise<void> {
    this.audioChunks = [];
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(this.stream);
      this.startTime = Date.now();

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();

      this.stopTimeout = setTimeout(() => {
        this.stopRecording().catch(console.error);
      }, 30000);
    } catch (error) {
      console.error('Ошибка при начале записи:', error);
      throw error;
    }
  }

  stopRecording(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state !== 'recording') {
        return reject(new Error('Невозможно остановить запись: запись не идет'));
      }

      const elapsedTime = (Date.now() - this.startTime) / 1000;
      if (elapsedTime < 1) {
        return reject(new Error('Минимальная длина записи — 1 секунда'));
      }

      clearTimeout(this.stopTimeout);

      this.mediaRecorder.onstop = () => {
        if (this.audioChunks.length === 0) {
          reject(new Error('Запись не удалась, получен пустой аудиофайл'));
          return;
        }

        const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
        this.stream.getTracks().forEach(track => track.stop());
        const audioUrl = URL.createObjectURL(audioBlob);
        resolve(audioUrl);
      };

      this.mediaRecorder.stop();
    });
  }
}
