import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { ShareModule } from "../../ShareModule/PaginationShare.module";
import { CommonModule } from "@angular/common";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { ApproveComponent } from "./approve/approve.component";
import { OrderComponent } from "./order.component";
import { OrderRoutingModule } from "./order-routing.module";
import { NotApproveYetComponent } from "./not-approve-yet/not-approve-yet.component";
import { DisapproveComponent } from "./disapprove/disapprove.component";
import { DeliveredComponent } from "./delivered/delivered.component";
import { CompletedComponent } from "./completed/completed.component";
import { InTransitComponent } from "./in-transit/in-transit.component";

@NgModule({
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations:[
        OrderComponent,
        ApproveComponent,
        NotApproveYetComponent,
        DisapproveComponent,
        DeliveredComponent,
        CompletedComponent,
        InTransitComponent
    ],
    imports:[
        OrderRoutingModule,
        CommonModule,
        FontAwesomeModule,
        ShareModule
    ],
})
export class OrderModule{}