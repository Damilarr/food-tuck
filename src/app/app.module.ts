import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ShopComponent } from './components/shop/shop.component';
import { HttpClientModule } from '@angular/common/http';
import { CountComponent } from './components/count/count.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactComponent } from './components/contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    BlogComponent,
    AboutComponent,
    ShopComponent,
    CountComponent,
    MenuComponent,
    LoginComponent,
    ProfileComponent,
    SignUpComponent,
    ContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatBadgeModule,
    MatIconModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
