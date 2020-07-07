import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FinancialAsset } from '../../../../src/domain/financial-asset';
import { Response } from '../../../../src/domain/response';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {
  private userId = '5f02d3d15b1ada4b2c13446a';
  assets: FinancialAsset[];
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
          console.log(data);
        }
      },
      () => {
        this.error = true;
        this.loading$.next(true);
      }
    );
  }

}
