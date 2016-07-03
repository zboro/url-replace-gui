import { Component } from '@angular/core';
import { RawEditorComponent } from "./rawEditor";

@Component({
    selector: "my-app",
    directives: [RawEditorComponent],
    templateUrl: "./components/app.html"
})
export class AppComponent { }
