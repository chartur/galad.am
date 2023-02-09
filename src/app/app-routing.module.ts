import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { defaultLanguage } from "./constants/languages";
import { LanguageGuard } from "./shared/guards/language.guard";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: (localStorage.getItem("lang") || defaultLanguage)
  },
  {
    path: ":language",
    canActivate: [LanguageGuard],
    loadChildren: () => import("./language-provider.module").then(m => m.LanguageProviderModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
