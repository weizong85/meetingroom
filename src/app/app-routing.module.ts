import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules, RouteReuseStrategy } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'booking', pathMatch: 'full' },
	{ path: 'booking', loadChildren: './booking/booking.module#BookingModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
