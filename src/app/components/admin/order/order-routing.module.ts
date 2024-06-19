import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NotfoundComponent } from "../../notfound/notfound.component";
import { ApproveComponent } from "./approve/approve.component";
import { OrderComponent } from "./order.component";
import { DisapproveComponent } from "./disapprove/disapprove.component";
import { NotApproveYetComponent } from "./not-approve-yet/not-approve-yet.component";
import { InTransitComponent } from "./in-transit/in-transit.component";
import { DeliveredComponent } from "./delivered/delivered.component";
import { CompletedComponent } from "./completed/completed.component";

const routes: Routes =[
    {path:'',component:OrderComponent,children:[
        {path: '', redirectTo: 'approve', pathMatch: 'full'},
        {path:'approve',component:ApproveComponent},
        {path:'not-approve-yet',component:NotApproveYetComponent},
        {path:'disapprove',component:DisapproveComponent},
        {path:'in-transit',component:InTransitComponent},
        {path:'delivered',component:DeliveredComponent},
        {path:'completed',component:CompletedComponent},
    ]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class OrderRoutingModule { }