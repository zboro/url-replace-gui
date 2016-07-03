import { bootstrap }    from '@angular/platform-browser-dynamic';
import { AppComponent } from './components/app';
import { disableDeprecatedForms, provideForms } from '@angular/forms';

bootstrap(AppComponent, [
    disableDeprecatedForms(),
    provideForms()
]);
