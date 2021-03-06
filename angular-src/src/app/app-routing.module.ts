import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewPostingComponent } from './components/new-posting/new-posting.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';
import { TermsComponent } from './components/terms/terms.component';

// Guards
import { AuthGuard } from '../app/guards/auth.guard';

// Resolves
import { StoreResolverService } from './resolves/store-resolver.service';
import { MemberFavouritesService } from './resolves/member-favourites.service';

const appRoutes: Routes = [
  {path:"", component: HomeComponent},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard], resolve: { data: MemberFavouritesService}},
  {path:"newPosting", component: NewPostingComponent, canActivate: [AuthGuard]},
  {path:"editPost", component: EditPostComponent, canActivate: [AuthGuard]},
  {path:"analytics", component: AnalyticsComponent, canActivate: [AuthGuard]},
  {path:"store", component: StoreComponent, resolve: { data: StoreResolverService}},
  {path:"cart", component: CartComponent, canActivate: [AuthGuard]},
  {path:"terms", component: TermsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
