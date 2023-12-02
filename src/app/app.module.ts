import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DynamicTextComponent } from './components/hottext/dynamictext.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DynamicTextComponent],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
