import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListComponent } from './list.component';
import { TravelService } from '../../services/travel.service';
import { ExpenseStatus } from '../../enums/ExpenseStatus';
import { UpdateStatus } from '../../enums/UpdateStatus';
import { of } from 'rxjs';
import { ENV_CONFIG } from 'src/app/interfaces/environment-config.interface';
import { AddComponent } from 'src/app/components/add/add.component';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let travelService: TravelService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent, AddComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ TravelService, { provide: ENV_CONFIG, useValue: { environment: { apiURL: 'http://localhost:3000' } } } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    travelService = TestBed.inject(TravelService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set the status to EDIT when edit button is clicked', () => {
    spyOn(travelService, 'setEditData');
    component.edit(0);
    expect(travelService.setEditData).toHaveBeenCalledWith(0);
  });

  it('should set the status to DELETE when delete button is clicked', () => {
    spyOn(travelService, 'setRemoveData').and.callFake(() => {
      // Mock implementation goes here
    });
    component.remove(0);
    expect(travelService.setRemoveData).toHaveBeenCalledWith(0);
  });

  it('should change the status when mark button is clicked', () => {
    spyOn(travelService, 'markExpense').and.callFake((index) => {
      // Mock implementation here
    });
    component.mark(0);
    expect(travelService.markExpense).toHaveBeenCalledWith(0);
  });

  it('should get payouts when settle up button is clicked', () => {
    spyOn(travelService, 'getPayouts').and.callFake(() => {
      // Mock implementation goes here
    });
    component.settleUp();
    expect(travelService.getPayouts).toHaveBeenCalled();
  });

  it('should update the form status when an expense is selected for edit', () => {
    spyOn(travelService, 'setEditData').and.callFake(() => {
      // Mock implementation goes here
    });
    // spyOnProperty(travelService, 'formStatus$', 'get').and.returnValue(of(UpdateStatus.EDIT));
    component.ngOnInit();
    expect(component.status).toEqual(UpdateStatus.EDIT);
  });

  it('should update the expense list when an expense is added', (done: DoneFn) => {
    const mockExpenseList = [{
      name: 'John Doe',
      amount: 100,
      status: ExpenseStatus.ACTIVE
    }];
    spyOn(travelService, 'addExpense').and.callFake(() => {
      // Mock implementation goes here
    });
    // spyOnProperty(travelService, 'expenseList$', 'get').and.returnValue(of(mockExpenseList));
    component.ngOnInit();
    component.expenseList.subscribe(expenseList => {
      expect(expenseList).toEqual(mockExpenseList);
      done();
    });
  });;
});