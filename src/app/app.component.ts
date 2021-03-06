import { Component } from "@angular/core";
import data from "./data.json";

@Component({
    selector: "app-root",
    template: `<style>
            *,
            *::before,
            *::after {
                margin: 0;

                font-weight: 400;
                font-family: sans-serif;
            }

            .table {
                position: relative;
            }

            .element {
                position: absolute;

                display: grid;
                place-items: center;

                cursor: pointer;
            }

            .element > div {
                display: grid;
                place-items: center;
            }

            .element > div > .symbol {
                font-size: 1.8rem;

                margin-bottom: 0.25rem;
            }

            .element > div > .name {
                font-size: 0.75rem;
            }

            .info {
                height: 512px;
                max-height: 512px;

                overflow-y: scroll;
            }
        </style>

        <div class="app">
            <h1>Periodic Table of Elements</h1>

            <div
                class="table"
                style="
            width: {{ size * 18 }}rem;
            height: {{ size * 10 }}rem;
        "
            >
                <div
                    *ngFor="let element of data.elements; index as i"
                    (click)="showElement(data.elements[i])"
                    class="element"
                    style="
                background-color: #{{ element.cpkhex }};
                color: {{ pickTextColor(element.cpkhex | nullishString: '') }};
                width: {{ size }}rem;
                height: {{ size }}rem;
                top: {{ (element.ypos - 1) * size * 16 }}px;
                left: {{ (element.xpos - 1) * size * 16 }}px;
            "
                >
                    <div>
                        <h1 class="symbol">{{ element.symbol }}</h1>
                        <h2 class="name">{{ element.name }}</h2>
                    </div>
                </div>
            </div>

            <div class="info">
                <div *ngIf="current">
                    <h1>{{ current.name }}</h1>

                    <p>{{ current.summary }}</p>
                </div>
            </div>
        </div>`,
})
export class AppComponent {
    public readonly size = 5.5;
    public readonly data = data;
    public current: typeof data["elements"][number] | undefined;

    public pickTextColor(color: string) {
        const rgb = parseInt(color.slice(1), 16);

        const [r, g, b] = [(rgb >> 16) & 0xff, (rgb >> 8) & 0xff, (rgb >> 0) & 0xff];

        const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

        return luminance < 127 ? "white" : "black";
    }

    public showElement(element: typeof data["elements"][number]) {
        this.current = element;
    }
}
