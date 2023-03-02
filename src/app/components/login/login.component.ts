import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { HttpErrorResponse } from '@angular/common/http';
import { SocialAuthService, SocialLoginModule, SocialUser } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[SocialLoginModule]
})
export class LoginComponent implements OnInit {
  user:any;
  loggedIn: any;
  loginData:any;
  submitted=false;
  toastText:any = ''
  showPassword: any;
  private signInSub:any;
  private authSub:any;
  private googleSub:any;
  constructor(private router:Router,private fb:FormBuilder,private regservice:AuthRegisterService,private authService: SocialAuthService) { 
    this.loginData= this.fb.group({
      email:["", [Validators.required, Validators.email]],
      password:["", [Validators.required]],
    })
  }
  clickBtn(){
    document?.getElementById('sgn-btn')?.click()
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
    this.signInSub = this.regservice.signIn(this.loginData.value).subscribe((response)=>{
    this.submitted=false;
    if (response.auth) {
      this.validateResponse(response)
    }
    },(error: HttpErrorResponse) => {
        this.toastText = error.error.message
        document?.getElementById('toastBtn')?.click()
        this.submitted = false
    })
  }
  validateResponse(resp:any){
    this.toastText = resp.message
    document?.getElementById('toastBtn')?.click()
    this.regservice.setUser(resp.user)
    sessionStorage.setItem('TOKEN',resp.token);
    setTimeout(() => {
      this.router.navigate(['/profile'])
    }, 4000);
  }
  ngOnInit():void {
   this.authSub = this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      this.googleSub = this.regservice.signWithGoogle(user).subscribe((response)=>{
        if (response.auth) {
          this.validateResponse(response)
        }
        },(error: HttpErrorResponse) => {
            this.toastText = 'Failed to sign in. Please try again in a minutes'
            document?.getElementById('toastBtn')?.click()
        })
    });
    window?.scrollTo(0,0);
  }

  show() {
    this.showPassword = document?.getElementById('passwordInp')
    this.showPassword.type == 'password'
      ? (this.showPassword.type = 'text')
      : (this.showPassword.type = 'password');
  }
  ngOnDestroy(): void {
    this.googleSub.unsubscribe();
    this.signInSub.unsubscribe()
    this.authSub.unsubscribe();
  }

}
