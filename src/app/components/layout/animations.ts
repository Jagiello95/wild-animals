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
  reversedVerticalSlideAnimation,
  verticalSlideAnimation,
} from 'src/app/animations';
import {
  horizontalSlideAnimation,
  reversedHorizontalSlideAnimation,
} from 'src/app/animations/horizontal-slide';

export const slideInAnimation = trigger('routeAnimations', [
  transition('1 => 2', horizontalSlideAnimation),
  transition('2 => 1', reversedHorizontalSlideAnimation),
  transition('* => 3', reversedVerticalSlideAnimation),
  transition('3 => *', verticalSlideAnimation),
]);
