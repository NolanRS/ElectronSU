import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { AppComponent }   from './app.component';

import { AdminLayoutComponent } from './layouts/admin/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth/auth-layout.component';
import { AppRoutes } from './app.routing';
import {AuthGuard} from "./auth.guard";
import {LoginGuard} from "./login.guard";
import {AuthService} from "./pages/login/auth.service";
import {ApiService} from "./api.service";
import {LockService} from "./pages/lock/lock.service";
@NgModule({
    imports:      [
        BrowserModule,
        RouterModule.forRoot(AppRoutes),
        HttpModule,
    ],
    declarations: [
        AppComponent,
        AdminLayoutComponent,
        AuthLayoutComponent,
    ],
    bootstrap:    [ AppComponent ],
    providers: [AuthGuard,AuthService,LoginGuard,ApiService,LockService]
})
export class AppModule { }
