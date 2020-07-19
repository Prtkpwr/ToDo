import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToDoComponent } from './to-do/to-do.component';

@NgModule({
  declarations: [
    AppComponent,
    ToDoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgSelectModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
