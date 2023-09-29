import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
} from '@angular/animations';
import {
  accordionAnimation,
  reversedVerticalSlideAnimation,
  rotateCarouselToRight,
  rotateCubeToLeft,
  rotateCubeToRight,
  rotateCubeToTop,
  rotateRoomToLeft,
  scaleDownScaleDown,
  verticalSlideAnimation,
} from 'src/app/animations';
import {
  flyInAnimation,
  reversedFlyInAnimation,
} from 'src/app/animations/fly-in';
import {
  horizontalSlideAnimation,
  reversedHorizontalSlideAnimation,
} from 'src/app/animations/horizontal-slide';

export const slideInAnimation = trigger('routeAnimations', [
  transition('0 => 1', horizontalSlideAnimation),
  transition('1 => 0', reversedHorizontalSlideAnimation),
  transition('0 => 2', reversedHorizontalSlideAnimation),
  transition('2 => 0', horizontalSlideAnimation),
  transition('* => 1', horizontalSlideAnimation),
  transition('* => 2', reversedHorizontalSlideAnimation),
  transition('1 => 2', horizontalSlideAnimation),
  transition('2 => 1', reversedHorizontalSlideAnimation),
  transition('* => 3', reversedVerticalSlideAnimation),
  transition('3 => *', verticalSlideAnimation),
]);
