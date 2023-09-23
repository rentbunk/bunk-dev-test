import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultComponent } from './result.component';
import { TravelService } from 'src/app/services/travel.service';
import { AddComponent } from 'src/app/components/add/add.component';

describe('ResultComponent', () => {
  let component: ResultComponent;
  let fixture: ComponentFixture<ResultComponent>;
  let travelService: TravelService;

  beforeEach(async () => {
    const travelServiceSpy = jasmine.createSpyObj('TravelService', [
      'setRemoveData',
      'getPayouts',
      'setEditData',
      'markExpense',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ ResultComponent, AddComponent ],
      providers: [{ provide: TravelService, useValue: travelServiceSpy }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultComponent);
    component = fixture.componentInstance;
    travelService = TestBed.inject(TravelService) as jasmine.SpyObj<TravelService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
