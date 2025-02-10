import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { AuthApiService } from '../../services/authapi.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  loginForm!: FormGroup;

  constructor(
    private authApi: AuthApiService, 
    private builder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.builder.group({
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.authApi.login(this.loginForm.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.authApi.storeToken(data.token); 
        this.loginForm.reset();
        this.router.navigate(['/bike']); 
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}





