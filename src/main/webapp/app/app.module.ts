import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { App4SharedModule } from 'app/shared/shared.module';
import { App4CoreModule } from 'app/core/core.module';
import { App4AppRoutingModule } from './app-routing.module';
import { App4HomeModule } from './home/home.module';
import { App4EntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    App4SharedModule,
    App4CoreModule,
    App4HomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    App4EntityModule,
    App4AppRoutingModule
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent]
})
export class App4AppModule {}
