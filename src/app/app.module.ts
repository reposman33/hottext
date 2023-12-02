import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HottextComponent } from './components/hottext/hottext.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HottextComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
