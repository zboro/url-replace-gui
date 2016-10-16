import { Component, OnInit } from "@angular/core";
import {readFileSync, writeFileSync} from "fs";
import * as path from "path";


@Component({
    selector: "raw-editor",
    templateUrl: "components/rawEditor.html"
})
export class RawEditorComponent implements OnInit {

    configJson: string;

    private configPath: string = path.join(process.env.HOME, ".proxyrc.json");

    ngOnInit() {
        this.reloadConfig();
    }

    reloadConfig() {
        this.configJson = readFileSync(this.configPath, "utf-8");
    }

    saveConfig() {
        writeFileSync(this.configPath, this.configJson, "utf-8");
    }
}
