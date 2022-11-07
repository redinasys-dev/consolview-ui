import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { CustomLoaderComponent } from "./custom-loader/custom-loader.component";

@NgModule({
	exports: [
		CommonModule,
		CustomLoaderComponent
	],
	imports: [
		RouterModule,
		CommonModule,
	],
	declarations: [
		CustomLoaderComponent
	],
	providers: []
})
export class SharedModule {
}
