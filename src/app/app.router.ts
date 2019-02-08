import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { RouterModule, Routes } from '@angular/router';
import { LogoutComponent } from './authentication/logout.component';

export const AppRoutes: Routes = [
    { path: 'logout', component: LogoutComponent },
];

export const RoutingModule: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
