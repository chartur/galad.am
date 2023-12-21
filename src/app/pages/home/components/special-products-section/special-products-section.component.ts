import {Component, OnDestroy, OnInit} from '@angular/core';
import { SpecialSectionsStore } from "@stores/special-sections.store";
import {filter, Observable, Subscription} from "rxjs";
import { SpecialSection } from "@interfaces/special-section";

@Component({
  selector: 'app-special-products-section',
  templateUrl: './special-products-section.component.html',
  styleUrls: ['./special-products-section.component.scss']
})
export class SpecialProductsSectionComponent implements OnInit, OnDestroy {
  public readonly sections$: Observable<SpecialSection[]> = this.specialSectionsStore.sections$;
  public subscription: Subscription = new Subscription();

  constructor(
    private specialSectionsStore: SpecialSectionsStore
  ) {
  }

  ngOnInit() {
    this.subscription.add(
      this.specialSectionsStore.loaded$.pipe(
        filter(state => !state)
      ).subscribe(() => {
        this.specialSectionsStore.loadCategories();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
