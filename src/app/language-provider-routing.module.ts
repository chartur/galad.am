import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {authGuard} from "@guards/auth.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    loadChildren: () => import("./pages/home/home.module").then(m => m.HomeModule)
  },
  {
    path: "product",
    loadChildren: () => import("./pages/product/product.module").then(m => m.ProductModule)
  },
  {
    path: "gift",
    loadChildren: () => import("./pages/gift/gift.module").then(m => m.GiftModule)
  },
  {
    path: "filter",
    loadChildren: () => import("./pages/filter/filter.module").then(m => m.FilterModule)
  },
  {
    path: "auth",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "favorites",
    loadChildren: () => import("./pages/favorites/favorites.module").then(m => m.FavoritesModule)
  },
  {
    path: "checkout",
    loadChildren: () => import("./pages/checkout/checkout.module").then(m => m.CheckoutModule)
  },
  {
    path: "portal",
    canActivate: [authGuard],
    loadChildren: () => import("./pages/portal/portal.module").then(m => m.PortalModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class LanguageProviderRoutingModule { }
