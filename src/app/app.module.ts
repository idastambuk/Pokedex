import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { RouterModule } from '@angular/router';
import { PokedexModule } from './pokedex/pokedex.module';
import { PaginationComponent } from './pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    HttpModule,
    routing,
    RouterModule,
    PokedexModule
  ],
  entryComponents: [PaginationComponent],
  providers: [PaginationComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
