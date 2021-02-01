import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncludePublicationComponent } from './include-publication.component';

describe('IncludePublicationComponent', () => {
  let component: IncludePublicationComponent;
  let fixture: ComponentFixture<IncludePublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncludePublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncludePublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
