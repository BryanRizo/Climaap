import { Routes } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { NotFoundComponent } from './pages/notfound/notfound.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        component: IndexComponent
    },
    {
        path: '**',
        component: NotFoundComponent
    }
];
