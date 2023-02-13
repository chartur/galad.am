import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { RouterModule } from "@angular/router";
import { HeaderActionsButtonComponent } from './header-actions-button/header-actions-button.component';
import { BannerComponent } from './banner/banner.component';
import { VerticalProductItemComponent } from './vertical-product-item/vertical-product-item.component';
import { SideNavBarComponent } from './side-nav-bar/side-nav-bar.component';
import { SearchInputComponent } from './search-input/search-input.component';
import { LanguageSelectorComponent } from './language-selector/language-selector.component';
import { DirectivesModule } from "../directives/directives.module";
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [
    HeaderComponent,
    NavigationBarComponent,
    HeaderActionsButtonComponent,
    BannerComponent,
    VerticalProductItemComponent,
    SideNavBarComponent,
    SearchInputComponent,
    LanguageSelectorComponent,
    FooterComponent,
  ],
  exports: [
    HeaderComponent,
    BannerComponent,
    VerticalProductItemComponent,
    SideNavBarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule,
  ]
})
export class ComponentsModule { }
