import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: "auth",
    loadChildren: () => import("./pages/auth/auth.module").then(m => m.AuthModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LanguageProviderRoutingModule { }
