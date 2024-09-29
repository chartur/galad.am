import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LanguageGuard } from "@guards/language.guard";
import {selectedLanguage} from "@constants/languages";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: selectedLanguage
  },
  {
    path: ":language",
    canActivate: [LanguageGuard],
    loadChildren: () => import("./language-provider.module").then(m => m.LanguageProviderModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: "enabled"
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
