import { Component, OnInit } from '@angular/core';
import { CategoriesStore } from "@stores/categories.store";
import { Observable } from "rxjs";
import { CategoryWithProductCount } from "@interfaces/category-with-product-count";
import { publicPath } from "@environment/environment";

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss']
})
export class CategoriesSectionComponent implements OnInit {
  public categories$: Observable<CategoryWithProductCount[]> = this.categoriesStore.categories$;

  constructor(
    private categoriesStore: CategoriesStore
  ) {
  }

  ngOnInit() {
    this.categoriesStore.loadCategories();
  }

  public assetPath(category: CategoryWithProductCount): string {
    return `url('${publicPath(category.link)}')`
  }
}
