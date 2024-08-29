import {Inject, Injectable, PLATFORM_ID} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
import {Router} from "@angular/router";
import {appUrl} from "@environment/environment";
import {isPlatformBrowser} from "@angular/common";

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
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
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
        name: tag,
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

  public setFavicon(path: string): SeoHelper {
    if(isPlatformBrowser(this.platformId)) {
      document.getElementById('favicon-link').setAttribute('href', path);
    }
    return this;
  }

  public getFacebookShareUrl(): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${appUrl}${this.router.url}`;
  }
}
