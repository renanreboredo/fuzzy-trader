import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss']
})
export class AssetComponent {
  @Input() data: {
    buyingPrice: string,
    quantity: number,
    symbol: string,
    total: number
  };
  @Input() label = '';
  @Input() showLabel = true;
}
