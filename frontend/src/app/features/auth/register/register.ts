import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from '../../../core/services/auth';
import { RegisterDto } from '../../../shared/interfaces/auth';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  authService = inject(Auth);
  router = inject(Router);

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
  });

  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }

    const data: RegisterDto = {
      email: this.registerForm.get('email')!.value ?? '',
      password: this.registerForm.get('password')!.value ?? '',
      firstName: this.registerForm.get('firstName')!.value ?? '',
      lastName: this.registerForm.get('lastName')!.value ?? '',
    };

    this.authService.register(data).subscribe({
      next: res => {
        this.router.navigate(['/login']);
      },
      error: err => {
        console.error('Registration failed', err);
      }
    });
  }
}
