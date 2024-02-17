import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TzSelectorComponent } from './tz-selector.component';

describe('TzSelectorComponent', () => {
  let component: TzSelectorComponent;
  let fixture: ComponentFixture<TzSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TzSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TzSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
