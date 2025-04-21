import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherGradeItemComponent } from './grade-item.component';

describe('GradeItemComponent', () => {
  let component: TeacherGradeItemComponent;
  let fixture: ComponentFixture<TeacherGradeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherGradeItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TeacherGradeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
