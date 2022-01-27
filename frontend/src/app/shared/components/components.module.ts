import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { IonicModule } from "@ionic/angular";
import { IndexPageRoutingModule } from "src/app/main/index/index-routing.module";
import { EditModalComponent } from "./edit-modal/edit-modal.component";
import { HeaderComponent } from "./header/header.component";
import { SpinnerComponent } from "./spinner/spinner.component";

@NgModule({
    declarations:[HeaderComponent, SpinnerComponent, EditModalComponent],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        IndexPageRoutingModule,
        RouterModule],
    exports: [HeaderComponent, SpinnerComponent, EditModalComponent]

})
export class ComponentsModule{}