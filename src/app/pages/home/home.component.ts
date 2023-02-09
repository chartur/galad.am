import { Component, OnInit } from '@angular/core';
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private meta: Meta, private title: Title) {
  }

  ngOnInit(): void {
    this.setMetaData();
  }

  private setMetaData(): void {
    this.title.setTitle('Testing site');

    this.meta.updateTag({
      property: "description",
      content: "This is test site"
    })
  }
}
