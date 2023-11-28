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
import { DirectivesModule } from "@directives/directives.module";
import { FooterComponent } from './footer/footer.component';
import { SmallItemCardComponent } from './small-item-card/small-item-card.component';
import { FeaturedProductsListComponent } from './featured-products-list/featured-products-list.component';
import { BadgeComponent } from './badge/badge.component';
import { PipesModule } from "../pipes/pipes.module";
import { TranslateModule } from "@ngx-translate/core";
import { ProductPlaceholderComponent } from './product-placeholder/product-placeholder.component';
import { ProductAssetSliderComponent } from './product-asset-slider/product-asset-slider.component';
import {YouTubePlayerModule} from "@angular/youtube-player";



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
    SmallItemCardComponent,
    FeaturedProductsListComponent,
    BadgeComponent,
    ProductPlaceholderComponent,
    ProductAssetSliderComponent,
  ],
  exports: [
    HeaderComponent,
    BannerComponent,
    VerticalProductItemComponent,
    SideNavBarComponent,
    FooterComponent,
    FeaturedProductsListComponent,
    ProductPlaceholderComponent,
    ProductAssetSliderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    DirectivesModule,
    PipesModule,
    TranslateModule,
    YouTubePlayerModule
  ]
})
export class ComponentsModule { }
