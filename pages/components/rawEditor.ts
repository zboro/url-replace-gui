import { Component, OnInit } from "@angular/core";
import {readFileSync} from "fs";
import * as path from "path";


@Component({
    selector: "raw-editor",
    templateUrl: "components/rawEditor.html"
})
export class RawEditorComponent implements OnInit {

	configJson : String

	ngOnInit() {
		console.log("sadasd");
		console.log(readFileSync);
		this.configJson = readFileSync(path.join(process.env.HOME, ".proxyrc.json"), "utf-8");
	}

}
