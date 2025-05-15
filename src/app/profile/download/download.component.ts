import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {TranslatePipe} from "@ngx-translate/core";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-download',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslatePipe,
    NgClass
  ],
  templateUrl: './download.component.html',
  styleUrl: './download.component.scss'
})
export class DownloadComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService) {
  }

  downloadIsLoading = false;
  currentLanguage: any;
  currentUser: any;

  ngOnInit() {
    this.authService.user().subscribe((data) => {
      this.currentUser = data;
    });
  }


  downloadUserInfo(): void {
    if (!this.currentUser) return;

    const createdAt = new Date(this.currentUser.created_at).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    const content = `Email: ${this.currentUser.email}\nName: ${this.currentUser.name}\nCreated At: ${createdAt}`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'user_info.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }

  downloadUserRecords(): void {
    this.downloadIsLoading = true;
    const parsedName = this.currentUser.name.replace(/\s+/g, '_').toLowerCase();

    this.userService.downloadUserRecords().subscribe({
      next: (response) => {
        const fileName = `${parsedName}.zip`;
        saveAs(response, fileName);
        this.downloadIsLoading = false;
      },
      error: (error) => {
        console.error('Error downloading user records:', error);
      },
    })
  }
}
