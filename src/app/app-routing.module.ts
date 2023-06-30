import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthorizePageComponent } from './authorize-page/authorize-page.component';


@NgModule({
    imports: [RouterModule.forRoot([
        {
            path: "",
            redirectTo: "main",
            pathMatch: "full"
        },
        { path: "login", component: AuthorizePageComponent },
    ])],
    exports: [RouterModule]
})
export class AppRoutingModule { }
