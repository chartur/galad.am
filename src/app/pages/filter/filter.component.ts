import {Component, OnInit} from '@angular/core';
import {Filter} from "@interfaces/filter";
import {filterPrices} from "@constants/filter-prices";
import {ActivatedRoute, Router} from "@angular/router";
import {FilterStore} from "@stores/filter.store";
import {Observable} from "rxjs";
import {Product} from "@interfaces/product";

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit {
  public filter: Filter = {
    minPrice: filterPrices.min,
    maxPrice: filterPrices.max,
    category: new Set<number>(),
    tags: new Set<number>(),
    sale: false,
    q: ''
  }
  public products$: Observable<Product[]> = this.filterStore.products$;
  public isEmpty$: Observable<boolean> = this.filterStore.isEmpty$;
  public loading$: Observable<boolean> = this.filterStore.loading$;
  public shownMobileFilter: boolean = false;
  public isAdminUsage: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private filterStore: FilterStore
  ) {}

  ngOnInit() {
    this.deCodeFilter();
    this.adminUsage();
    this.filterStore.filter(this.filter);
  }

  public onFilter(event: Filter): void {
    this.filter = this.validateFilter(event);
    this.enCodeFilter();
    this.filterStore.filter(event);
  }

  public enCodeFilter(): void {
    this.router.navigate([], {
      queryParams: {
        ...this.activatedRoute.snapshot.queryParams,
        ...this.filter,
        tags: [...this.filter.tags].join(','),
        category: [...this.filter.category].join(','),
      },
    })
  }

  public openMobileFilter(): void {
    this.shownMobileFilter = true;
  }

  public closeMobileFilter(): void {
    this.shownMobileFilter = false;
  }

  public closeOpener(): void {
    opener.postMessage(location.href, "*");
    window.close();
  }

  private deCodeFilter(): void {
    const params = this.activatedRoute.snapshot.queryParams as any;
    const tagsString = params?.tags as string;
    const categoriesString = params?.category as string
    const tagsArray = tagsString?.split(',')?.map(Number)?.filter((id) => !!id);
    const categoriesArray = categoriesString?.split(',')?.map(Number)?.filter((id) => !!id);
    const saleString = params.sale;

    this.filter = {
      minPrice: params.minPrice ? Number(params.minPrice) : this.filter.minPrice,
      maxPrice: params.maxPrice ? Number(params.maxPrice) : this.filter.maxPrice,
      tags: new Set(tagsArray),
      category: new Set(categoriesArray),
      sale: saleString === 'true',
      q: params.q || ''
    };
  }

  private validateFilter(filter: Filter): Filter {
    return {
      ...filter,
      tags: new Set([...this.filter.tags].filter(id => !!id)),
      category: new Set([...this.filter.category].filter(id => !!id)),
    }
  }

  private adminUsage(): void {
    this.activatedRoute.queryParams
      .subscribe(({ adminUsage }) => {
        this.isAdminUsage = !!adminUsage
      })
  }
}
