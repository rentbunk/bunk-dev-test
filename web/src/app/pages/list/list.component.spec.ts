import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { TravelService } from 'src/app/services/travel.service';
import { AddComponent } from 'src/app/components/add/add.component';
import { FormsModule } from '@angular/forms';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let travelService: TravelService;

  beforeEach(async () => {
    const travelServiceSpy = jasmine.createSpyObj('TravelService', [
      'setRemoveData',
      'getPayouts',
      'setEditData',
      'markExpense',
    ]);

    await TestBed.configureTestingModule({
      declarations: [ ListComponent, AddComponent ],
      imports: [ FormsModule,],
      providers: [{ provide: TravelService, useValue: travelServiceSpy }],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    travelService = TestBed.inject(TravelService) as jasmine.SpyObj<TravelService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
