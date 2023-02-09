import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

interface OurFeatureItem {
  title: string;
  content: string;
  icon: string
}

@Component({
  selector: 'app-our-features',
  templateUrl: './our-features.component.html',
  styleUrls: ['./our-features.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class OurFeaturesComponent {
  public features: OurFeatureItem[] = [
    { title: "our-features.shipping.title", content: "our-features.shipping.content", icon: `<i class="bi bi-truck"></i>` },
    { title: "our-features.support.title", content: "our-features.support.content", icon: `<i class="bi bi-headset"></i>` },
    { title: "our-features.package.title", content: "our-features.support.content", icon: `<i class="bi bi-box2-heart"></i>` },
    { title: "our-features.quality.title", content: "our-features.quality.content", icon: `<i class="bi bi-patch-check"></i>` },
  ]
}
