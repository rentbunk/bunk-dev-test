import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { PayoutResponse } from '../../interfaces/travel.interface';
import { TravelService } from '../../services/travel.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  payoutData: Observable<PayoutResponse> = this.travelService.payoutData$;

  isLoading: Observable<boolean> = this.travelService.isLoading$;

  constructor(
    private travelService: TravelService
  ) {}
}
