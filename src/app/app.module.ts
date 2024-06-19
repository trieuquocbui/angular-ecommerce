import {  CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { DisplayModelDirective } from './directives/display-model.directive';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { authInterceptorProviders } from './interceptors/AuthInterceptor';
import { UserRoutingModule } from './components/user/user-routing.module';
import { AdminRoutingModule } from './components/admin/admin-routing.module';


// TypeScript Decorator
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DisplayModelDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    UserRoutingModule ,
    AdminRoutingModule
  ],
  providers: [authInterceptorProviders, provideHttpClient(),HttpClient],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {} // TypeScript Module


// Metadata: data ( {} in NgModule ) about data (AppModule)


