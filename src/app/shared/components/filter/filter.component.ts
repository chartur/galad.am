import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Filter} from "@interfaces/filter";
import {TagsStore} from "@stores/tags.store";
import {CategoriesStore} from "@stores/categories.store";
import { filter, Observable, zip, Subscription} from "rxjs";
import {Tag} from "@interfaces/tag";
import {CategoryWithProductCount} from "@interfaces/category-with-product-count";
import {FilterStore} from "@stores/filter.store";
import {filterPrices} from "@constants/filter-prices";
import {Options} from "ngx-slider-v2";
import {Category} from "@interfaces/category";
@Component({
  selector: 'app-filter-component',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit, OnDestroy {
  @Input() filter: Filter = {
    minPrice: filterPrices.min,
    maxPrice: filterPrices.max,
    category: new Set<number>(),
    tags: new Set<number>(),
    q: ''
  }
  @Output() onFilter: EventEmitter<Filter> = new EventEmitter<Filter>();
  @Output() onCloseMobileFilter: EventEmitter<void> = new EventEmitter<void>();
  public tags$: Observable<Tag[]> = this.tagsStore.tags$;
  public categories$: Observable<CategoryWithProductCount[]> = this.categoriesStore.categories$;
  public categoriesLoaded$: Observable<boolean> = this.categoriesStore.categoriesLoaded$;
  public tagsLoaded$: Observable<boolean> = this.tagsStore.loaded$;
  public priceSliderOptions: Options = {
    floor: filterPrices.min,
    ceil: filterPrices.max,
    step: filterPrices.step,
  }
  private subscriptions: Subscription = new Subscription();

  constructor(
    private tagsStore: TagsStore,
    private categoriesStore: CategoriesStore,
    private filterStore: FilterStore
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      zip([
        this.categoriesStore.categoriesLoaded$,
        this.tagsStore.loaded$
      ]).pipe(
        filter(([ categories, tags ]) => !categories || !tags),
      ).subscribe(( [categories, tags ]) => {
        if (!categories) {
          this.categoriesStore.loadCategories()
        }
        if (!tags) {
          this.tagsStore.loadTags()
        }
      })
    );
  }

  public closeMobileFilter(): void {
    this.onCloseMobileFilter.emit();
  }

  public toggleTagSelection(tag: Tag): void {
    if (this.filter.tags.has(tag.id)) {
      this.filter.tags.delete(tag.id);
    } else {
      this.filter.tags.add(tag.id)
    }
    this.onFilter.emit(this.filter);
  }

  public toggleCategoryState(category: Category): void {
    if (this.filter.category.has(category.id)) {
      this.filter.category.delete(category.id);
    } else {
      this.filter.category.add(category.id)
    }
    this.onFilter.emit(this.filter);
  }

  public applyFilter(): void {
    this.onFilter.emit(this.filter);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
