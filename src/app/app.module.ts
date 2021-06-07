import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { SERVER_DATA } from '@views/service/channels.cervice';
import { ErrorService } from '@views/service/error.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChannelsComponent } from './channels/channels.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [AppComponent, ChannelsComponent, HeaderComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [SERVER_DATA, ErrorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
