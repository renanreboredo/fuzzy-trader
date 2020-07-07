import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Response } from '../../../../src/domain/response';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  private userId = '5f02d3d15b1ada4b2c13446a';
  assets: any[] = [];
  total = '10.0';
  error = false;
  message$: BehaviorSubject<string> = new BehaviorSubject<any>('');
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loading$.next(true);
    this.http.get(`https://bxblue-fuzzy-trader.herokuapp.com/api/wallet/${this.userId}`).subscribe(
      ({ data, error, message }: Response<any>) => {
        this.error = error;
        this.message$.next(message);
        this.loading$.next(false);
        if (!error) {
          this.assets = data.map(asset => ({
            buyingPrice: asset.buyingPrice,
            quantity: asset.quantity,
            symbol: asset.symbol,
            total: asset.buyingPrice * asset.quantity
          }));
          this.total = this.assets.reduce((prev, cur) => prev + cur.total, 0);
        }
      },
      () => {
        this.error = true;
        this.loading$.next(true);
      }
    );
  }

}
