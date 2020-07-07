import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Response } from '../../../../src/domain/response';

@Component({
  selector: 'app-trader',
  templateUrl: './trader.component.html',
  styleUrls: ['./trader.component.scss']
})
export class TraderComponent implements OnInit {
  amount: number;
  simulation: boolean;
  error = false;
  message$: BehaviorSubject<string> = new BehaviorSubject<any>('');
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<any>(false);

  conservative$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  moderate$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  aggressive$: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): any {
    this.route.data.subscribe(value => this.simulation = value.simulation);
  }

  trade(): any {
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
      },
      () => {
        this.loading$.next(false);
        this.error = true;
        this.message$.next('API is off ! Consider trying in simulation mode!');
      }
    );
  }
}
