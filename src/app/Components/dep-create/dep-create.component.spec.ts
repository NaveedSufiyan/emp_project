import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepCreateComponent } from './dep-create.component';

describe('DepCreateComponent', () => {
  let component: DepCreateComponent;
  let fixture: ComponentFixture<DepCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
