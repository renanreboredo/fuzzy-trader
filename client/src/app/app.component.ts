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
  offers$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  constructor(private http: HttpClient) {}
  trade(): any {
    this.http.get(`https://bxblue-fuzzy-trader.herokuapp.com/api/investments/${this.amount}`).subscribe(
      (res: Response<any>) => this.offers$.next(res.data)
    );
  }
}
