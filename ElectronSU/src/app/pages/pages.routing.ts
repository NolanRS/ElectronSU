import { Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { PricingComponent } from './sudblander/pricing.component';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard} from "../auth.guard"
import {LoginGuard} from "../login.guard";

export const PagesRoutes: Routes = [

    {
        path: '',
        children: [ {
            path: 'login',
            component: LoginComponent,
            canActivate: [LoginGuard],

        },{
            path: 'lock',
            component: LockComponent,
            canActivate: [AuthGuard],

        },{
            path: 'register',
            component: RegisterComponent,
            canActivate: [AuthGuard],
        },{
            path: 'sudblander',
            component: PricingComponent,
            canActivate: [AuthGuard],
        }]
    }
];
