import {Component, OnDestroy, OnInit} from '@angular/core';
import { CategoriesStore } from "@stores/categories.store";
import {filter, Observable, Subscription} from "rxjs";
import { CategoryWithProductCount } from "@interfaces/category-with-product-count";
import { publicPath } from "@environment/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss']
})
export class CategoriesSectionComponent implements OnInit, OnDestroy {
  public categories$: Observable<CategoryWithProductCount[]> = this.categoriesStore.categories$;
  private subscription: Subscription = new Subscription();

  constructor(
    private categoriesStore: CategoriesStore,
    public translateService: TranslateService
  ) {
  }

  ngOnInit() {
    this.subscription.add(
      this.categoriesStore.categoriesLoaded$.pipe(
        filter(state => !state)
      ).subscribe(() => {
        this.categoriesStore.loadCategories();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public assetPath(category: CategoryWithProductCount): string {
    return `url('${publicPath(category.link)}')`
  }
}
