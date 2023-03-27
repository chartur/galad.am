import { Component, OnInit } from '@angular/core';
import { SpecialSectionsStore } from "@stores/special-sections.store";
import { Observable } from "rxjs";
import { SpecialSection } from "@interfaces/special-section";

@Component({
  selector: 'app-special-products-section',
  templateUrl: './special-products-section.component.html',
  styleUrls: ['./special-products-section.component.scss']
})
export class SpecialProductsSectionComponent implements OnInit {
  public readonly sections$: Observable<SpecialSection[]> = this.specialSectionsStore.sections$;

  constructor(
    private specialSectionsStore: SpecialSectionsStore
  ) {
  }

  ngOnInit() {
    this.specialSectionsStore.loadCategories();
  }
}
