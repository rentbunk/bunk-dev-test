import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { TravelService } from '../../services/travel.service';
import { BehaviorSubject } from 'rxjs';
import { Expense } from '../../interfaces/travel.interface';
import { AddComponent } from "src/app/components/add/add.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // Import the FontAwesomeModule

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let travelService: jasmine.SpyObj<TravelService>;

  beforeEach(() => {
    // Create a spy object for TravelService
    const travelServiceSpy = jasmine.createSpyObj('TravelService', [
      'setEditData',
      'setRemoveData',
    ]);

    TestBed.configureTestingModule({
      declarations: [ListComponent, AddComponent],
      providers: [{ provide: TravelService, useValue: travelServiceSpy }],
    });

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    travelService = TestBed.inject(TravelService) as jasmine.SpyObj<TravelService>;
  });

  it('should toggle status correctly when clicking edit and delete buttons', () => {
    // Set up a sample expense list
    const sampleExpenseList = [
      { name: 'Expense 1', amount: 100, status: 'ACTIVE' },
      { name: 'Expense 2', amount: 200, status: 'ACTIVE' },
    ];
    component.expenseList = new BehaviorSubject<Expense[]>(sampleExpenseList);

    // Initialize the component
    fixture.detectChanges();

    // Simulate clicking the edit button for the first expense
    component.edit(0);

    // Expect setEditData to be called with the correct index
    expect(travelService.setEditData).toHaveBeenCalledWith(0);

    // Simulate clicking the delete button for the second expense
    component.remove(1);

    // Expect setRemoveData to be called with the correct index
    expect(travelService.setRemoveData).toHaveBeenCalledWith(1);

    // Verify that the status has been updated in the component's expenseList
    expect(sampleExpenseList[0].status).toBe('EDITING');
    expect(sampleExpenseList[1].status).toBe('DELETING');
  });
});
