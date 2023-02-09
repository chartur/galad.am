import { Component } from '@angular/core';
import { categories } from "../../../../constants/categories";

@Component({
  selector: 'app-categories-section',
  templateUrl: './categories-section.component.html',
  styleUrls: ['./categories-section.component.scss']
})
export class CategoriesSectionComponent {
  public categories = categories;
}
