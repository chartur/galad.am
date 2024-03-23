import {Component, OnInit} from '@angular/core';
import {SeoHelper} from "../../shared/helpers/seo.helper";
import {SeoService} from "@services/seo.service";
import {SeoPages} from "@enums/seo-pages";
import {TranslateService} from "@ngx-translate/core";
import {SeoData} from "@interfaces/seo-data";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private seoHelper: SeoHelper,
    private seoService: SeoService,
    private translateService: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.setMetaData();
  }

  private setMetaData(): void {
    const currentLang = this.translateService.currentLang;
    const props = ['title', 'keywords', 'description']
      .reduce((accumulator: Record<string, keyof SeoData>, current) => {
        accumulator[current] = `${currentLang}_${current}` as keyof SeoData;
        return accumulator;
      }, {});
    this.seoService.getPage(SeoPages.HomePage)
      .subscribe((seoData: SeoData) => {
        const { title, keywords, description } = props;
        this.seoHelper.setTitle(seoData[title]);
        this.seoHelper.setKeywords(seoData[keywords]);
        this.seoHelper.setDescription(seoData[description]);
      });
  }
}
