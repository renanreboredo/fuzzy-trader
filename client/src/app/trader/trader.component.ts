import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Response } from '../../../../src/domain/response';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.scss']
})
export class TraderComponent implements OnInit {
  private userId = '5f02d3d15b1ada4b2c13446a';

  amount: number;
  simulation: boolean;
  error = false;
  message$: BehaviorSubject<string> = new BehaviorSubject<any>('');
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);

  conservative$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  moderate$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  aggressive$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): any {
    this.route.data.subscribe(value => this.simulation = value.simulation);
  }

  addToWallet(asset$: BehaviorSubject<any>): any {
    const asset = asset$.value;
    this.http.post(`https://bxblue-fuzzy-trader.herokuapp.com/api/wallet/${this.userId}`, {
        user_id: this.userId,
        type: asset.type,
        symbol: asset.symbol,
        buyingPrice: asset.buyingPrice,
        quantity: asset.quantity
    }).subscribe(() => this.router.navigateByUrl('wallet'));
  }

  suggest(): any {
    this.loading$.next(true);
    this.http.get(
      `https://bxblue-fuzzy-trader.herokuapp.com/api/investments/${this.amount}${this.simulation ? '/simulate' : '' }`
      ).subscribe(
      ({ data, error, message }: Response<any>) => {
        this.error = error;
        this.message$.next(message);
        this.loading$.next(false);
        if (!error) {
          this.conservative$.next({
            buyingPrice: data.conservative.buyingPrice,
            quantity: data.conservative.quantity,
            symbol: data.conservative.symbol,
            type: data.conservative.type,
            total: data.conservative.buyingPrice * data.conservative.quantity
          });
          this.moderate$.next({
            buyingPrice: data.moderate.buyingPrice,
            quantity: data.moderate.quantity,
            symbol: data.moderate.symbol,
            type: data.moderate.type,
            total: data.moderate.buyingPrice * data.moderate.quantity
          });
          this.aggressive$.next({
            buyingPrice: data.aggressive.buyingPrice,
            quantity: data.aggressive.quantity,
            symbol: data.aggressive.symbol,
            type: data.aggressive.type,
            total: data.aggressive.buyingPrice * data.aggressive.quantity
          });
        }
      },
      () => {
        this.loading$.next(false);
        this.error = true;
        this.message$.next('API is off ! Consider trying in simulation mode!');
      }
    );
  }
}
