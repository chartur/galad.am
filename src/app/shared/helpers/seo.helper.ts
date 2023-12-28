import {Injectable} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {appUrl} from "@environment/environment.development";

@Injectable({
  providedIn: "root"
})
export class SeoHelper {
  private tags = {
    descriptions: ['description', 'og:description'],
    keywords: ['keywords'],
    images: ['og:image'],
    titles: ['og:title'],
    urls: ['og:url']
  }

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) {}

  public setTitle(title: string): SeoHelper {
    this.title.setTitle(title);
    this.tags.titles.forEach(tag => {
      this.meta.updateTag({
        property: tag,
        content: title
      });
    });
    return this;
  }

  public setDescription(description: string): SeoHelper {
    this.tags.descriptions.forEach(tag => {
      this.meta.updateTag({
        property: tag,
        content: description
      });
    });
    return this;
  }

  public setKeywords(keywords: string): SeoHelper {
    this.tags.keywords.forEach(tag => {
      this.meta.updateTag({
        property: tag,
        content: keywords
      });
    });
    return this;
  }

  public setUrl(): SeoHelper {
    this.tags.urls.forEach(tag => {
      this.meta.updateTag({
        property: tag,
        content: `${appUrl}${this.router.url}`
      })
    });
    return this;
  }

  public setImage(path: string): SeoHelper {
    this.tags.images.forEach(tag => {
      this.meta.updateTag({
        property: tag,
        content: path
      })
    });
    return this;
  }
}
