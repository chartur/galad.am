import {ChangeDetectionStrategy, Component, Input} from "@angular/core";
import {ProductReview} from "@interfaces/product-review";
import {publicPath} from "@environment/environment";

@Component({
  selector: 'app-review-item',
  templateUrl: './review-item.component.html',
  styleUrls: [
    './review-item.component.scss'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReviewItemComponent {
  @Input() set review(review: ProductReview) {
    this.data = review;
    this.hasUserImage = !!review.userImage;
    if (this.hasUserImage) {
      this.userImageUrl = this.data.userImage;
      if (review.userImage.startsWith('/public')) {
        this.userImageUrl = publicPath(review.userImage);
      }
      this.userImageUrl = `url('${this.userImageUrl}')`;
    }
    this.usernamePlaceholder = this.data.userFullName.split(" ")
      .map(namePart => namePart[0].toUpperCase())
      .join("");
  }
  public data: ProductReview;
  public hasUserImage: boolean;
  public userImageUrl: string;
  public usernamePlaceholder: string = "";
}
