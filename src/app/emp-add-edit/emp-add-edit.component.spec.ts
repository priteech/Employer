import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { EmpAddEditComponent } from './emp-add-edit.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('EmpAddEditComponent', () => {
  let component: EmpAddEditComponent;
  let fixture: ComponentFixture<EmpAddEditComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [EmpAddEditComponent]
    }).compileComponents();
    // });
    // fixture = TestBed.createComponent(EmpAddEditComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  }));
  beforeEach(()=>{
    fixture = TestBed.createComponent(EmpAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it ("check title", ()=>{
    expect(component['componentName']).toBe("user")
    
  })
});
