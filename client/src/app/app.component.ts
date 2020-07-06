import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Response } from '../../../src/domain/response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fuzzy Trader';
  amount: number;
  conservative$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  moderate$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  aggressive$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {}
  trade(): any {
    this.http.get(`https://bxblue-fuzzy-trader.herokuapp.com/api/investments/${this.amount}/simulate`).subscribe(
      ({ data }: Response<any>) => {
        this.conservative$.next({
          buyingPrice: data.conservative.buyingPrice,
          quantity: data.conservative.quantity,
          symbol: data.conservative.symbol,
          total: data.conservative.buyingPrice * data.conservative.quantity
        });
        this.moderate$.next({
          buyingPrice: data.moderate.buyingPrice,
          quantity: data.moderate.quantity,
          symbol: data.moderate.symbol,
          total: data.moderate.buyingPrice * data.moderate.quantity
        });
        this.aggressive$.next({
          buyingPrice: data.aggressive.buyingPrice,
          quantity: data.aggressive.quantity,
          symbol: data.aggressive.symbol,
          total: data.aggressive.buyingPrice * data.aggressive.quantity
        });
      }
    );
  }
}
