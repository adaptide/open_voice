import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  constructor(private api: ApiService) {}

  getStatistics() {
    return this.api.get('/statistics');
  }
} 