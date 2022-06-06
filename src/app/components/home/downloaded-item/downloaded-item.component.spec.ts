import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadedItemComponent } from './downloaded-item.component';

describe('DownloadedItemComponent', () => {
  let component: DownloadedItemComponent;
  let fixture: ComponentFixture<DownloadedItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DownloadedItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
