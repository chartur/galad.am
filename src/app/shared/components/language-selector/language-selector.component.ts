import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";
import { filter, Subscription } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-language-selector',
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss']
})
export class LanguageSelectorComponent implements OnInit, OnDestroy {
  public currentLanguage: string;
  public availableLanguages: string[] = [];
  public listVisible: boolean = false;
  private languagesChangeSubscription: Subscription;

  constructor(
    private translateService: TranslateService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.languagesChangeSubscription = this.translateService.onLangChange.pipe(
      filter(language => !!language),
    ).subscribe(() => this.makeLanguageList());
    this.makeLanguageList()
  }

  ngOnDestroy() {
    this.languagesChangeSubscription?.unsubscribe();
  }

  public toggleListVisibility(event: Event): void {
    event.stopPropagation();
    this.listVisible = !this.listVisible;
  }

  public closeList(): void {
    if(this.listVisible) {
      this.listVisible = false;
    }
  }

  public switchLanguage(language: string): void {
    const url = this.router.url.replace(this.currentLanguage, language);
    this.router.navigateByUrl(url);
    this.closeList();
  }

  private makeLanguageList(): void {
    this.currentLanguage = this.translateService.currentLang;
    this.availableLanguages = this.translateService.langs.filter(language => language !== this.currentLanguage)
  }
}
