import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData:any;
  submitted=false;
  toastText:any = ''
  showPassword='password'
  constructor(private router:Router,private fb:FormBuilder,private regservice:AuthRegisterService) {
    this.loginData= this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required]],
    })
  }
  showToast() {
    document?.getElementById("myToast")?.classList.remove("hidden");
    setTimeout(function () {
        document?.getElementById("myToast")?.classList.add("hidden");
    }, 5000);
  }
  get password() {
    return this.loginData.get("password");
  }
  get email() {
    return this.loginData.get("email");
  }
  login(){
    this.submitted=true;
    this.regservice.signIn(this.loginData.value).subscribe((response)=>{
    this.submitted=false;
    console.log(response);
    if (response.auth) {
      this.toastText = response.message
      document?.getElementById('toastBtn')?.click()
      this.regservice.setUser(response.user)
      sessionStorage.setItem('TOKEN',response.token);
      setTimeout(() => {
        this.router.navigate(['/profile'])
      }, 4000);
    }
    },(error: HttpErrorResponse) => {
        console.log(error.error.message)
        this.toastText = error.error.message
        console.log('message set');
        document?.getElementById('toastBtn')?.click()
        this.submitted = false
    })
  }
  ngOnInit(): void {
    window?.scrollTo(0,0)
  }

  show() {
    this.showPassword == 'password'
      ? (this.showPassword = 'text')
      : (this.showPassword = 'password');
  }

}
