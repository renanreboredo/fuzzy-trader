import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TraderComponent } from './trader/trader.component';
import { WalletComponent } from './wallet/wallet.component';


const routes: Routes = [
  {
    path: '',
    component: TraderComponent,
    data: {
      simulation: false
    }
  },
  {
    path: 'simulate',
    component: TraderComponent,
    data: {
      simulation: true
    }
  },
  {
    path: 'wallet',
    component: WalletComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
