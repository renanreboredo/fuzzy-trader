import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TraderComponent } from './trader/trader.component';
import { WalletComponent } from './wallet/wallet.component';
import { AssetComponent } from './asset/asset.component';

@NgModule({
  declarations: [
    AppComponent,
    TraderComponent,
    WalletComponent,
    AssetComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
