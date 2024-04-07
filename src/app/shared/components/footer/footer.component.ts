import {Component, OnInit} from '@angular/core';
import {SeoStore} from "@stores/seo.store";
import {SeoData} from "@interfaces/seo-data";
import {filter, map, switchMap} from "rxjs";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  public loaded: boolean = false;
  public seoData: SeoData;

  constructor(
    private seoStore: SeoStore
  ) {}

  ngOnInit() {
    this.seoStore.loaded$
      .pipe(
        filter(state => !!state),
        switchMap(() => this.seoStore.data$),
        map(data => data.home)
      ).subscribe((seoData: SeoData) => {
        this.seoData = seoData;
        this.loaded = true;
      });
  }
}
