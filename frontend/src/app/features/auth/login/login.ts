import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms';
import { Auth } from '../../../core/services/auth';
import { Router } from '@angular/router';
import { LoginDto } from '../../../shared/interfaces/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  authService = inject(Auth);
  router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const data: LoginDto = {
      email: this.loginForm.get('email')!.value ?? '',
      password: this.loginForm.get('password')!.value ?? '',
    };

    this.authService.login(data).subscribe({
      next: res => {
        this.authService.saveToken(res.access_token);
        this.router.navigate(['']);
      },
      error: err => {
        // แจ้งเตือน user หรือจัดการ error
      }
    });
  }
}
