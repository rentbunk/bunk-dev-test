import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';

import { TravelService } from '../../services/travel.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of, BehaviorSubject  } from 'rxjs';
import { Expense } from '../../interfaces/travel.interface';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let travelService: TravelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListComponent],
      imports: [RouterTestingModule],
      providers: [TravelService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  it('should toggle status correctly when clicking edit and delete buttons', () => {
    // Create a sample expense with an initial status
    const sampleExpense = { name: 'Expense 1', amount: 100, status: 'EDITING' };
    // Mock the expenseList$ property with a BehaviorSubject
    const expenseListSubject = new BehaviorSubject<Expense[]>([sampleExpense]);
    const getExpenseListSpy = spyOnProperty(travelService, 'expenseList$', 'get').and.returnValue(expenseListSubject.asObservable());


    // Create a spy for the travelService methods
    spyOn(travelService, 'setEditData');
    spyOn(travelService, 'setRemoveData');

    fixture.detectChanges();

    // Get the edit and delete buttons
    const editButton = fixture.nativeElement.querySelector('.fa-edit');
    const deleteButton = fixture.nativeElement.querySelector('.fa-trash');

    // Click the edit button to change status to 'DONE'
    editButton.click();
    fixture.detectChanges();
    expect(sampleExpense.status).toBe('DONE');

    // Click the delete button to change status to 'DELETING'
    deleteButton.click();
    fixture.detectChanges();
    expect(sampleExpense.status).toBe('DELETING');

    // Click the edit button again to change status back to 'EDITING'
    editButton.click();
    fixture.detectChanges();
    expect(sampleExpense.status).toBe('EDITING');

    // Verify that the appropriate service methods were called
    expect(travelService.setEditData).toHaveBeenCalledTimes(2);
    expect(travelService.setRemoveData).toHaveBeenCalledTimes(1);
  });

});
