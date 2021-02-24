import {animate, style, transition, trigger, AnimationTriggerMetadata} from '@angular/animations';

export const fadeTransition: AnimationTriggerMetadata = trigger('fadeTransition', [
    transition(':enter', [
        style({ opacity: 0 }),
        animate('.4s ease', style({ opacity: 1 }))
    ]),
    transition(':leave', [
        style({ opacity: 1 }),
        animate('.4s ease', style({ opacity: 0 }))
    ])
]);
