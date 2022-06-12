import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { SearchResultItemComponent } from './components/search-result/search-result-item/search-result-item.component';
import { FormsModule } from '@angular/forms';
import { SpinnerOverlayComponent } from './components/spinner-overlay/spinner-overlay.component';
import { SpinnerInterceptor } from './interceptors/SpinnerInterceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { OverlayModule } from '@angular/cdk/overlay';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { FooterComponent } from './components/footer/footer.component';
import { AuthorItemComponent } from './components/home/author-item/author-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DownloadedItemComponent } from './components/home/downloaded-item/downloaded-item.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DarkmodeDirective } from './directives/darkmode.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SearchResultComponent,
    SearchResultItemComponent,
    SpinnerOverlayComponent,
    FooterComponent,
    AuthorItemComponent,
    DownloadedItemComponent,
    DarkmodeDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        HttpClientModule,
        FormsModule,
        MatProgressSpinnerModule,
        OverlayModule,
        MatCardModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        MatSlideToggleModule
    ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor,
    multi: true
  },
  MatDatepickerModule,
  MatNativeDateModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
