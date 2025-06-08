import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {
  #http = inject(HttpClient);
  #auth = inject(Auth);

  testAuth() {
    this.#http.get('http://localhost:3000/api/protected').subscribe({
      next: res => console.log('Success:', res),
      error: err => console.log('Error:', err),
    });
  }

  logout() {
    this.#auth.logout();
  }
}
