// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { By }              from '@angular/platform-browser';
// import { DebugElement }    from '@angular/core';

// import { QueryRowComponent } from './queryrow.component';

// describe('QueryRowComponent (inline template)', () => {

//   let comp:    QueryRowComponent;
//   let fixture: ComponentFixture<QueryRowComponent>;
//   let de:      DebugElement;
//   let queryTextEl:      HTMLElement;

//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       declarations: [ QueryRowComponent ], // declare the test component
//     });

//     fixture = TestBed.createComponent(QueryRowComponent);

//     comp = fixture.componentInstance; // QueryRowComponent test instance

//     comp.query = {
//       requestUrl: "http://graph.microsoft.com/v1.0/me/drive",
//       category: ""
//     }

//     // query for the title <h1> by CSS element selector
//     de = fixture.debugElement.query(By.css('div.query'));
//     queryTextEl = de.nativeElement;
//   });

//   it('should display original title', () => {
//     fixture.detectChanges();
//     expect(queryTextEl.textContent).toContain(comp.query.requestUrl);
//   });

//   it('should display a different test title', () => {
//     comp.query.requestUrl = 'Test Title';
//     fixture.detectChanges();
//     expect(queryTextEl.textContent).toContain('Test Title');
//   });
// });