import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { 
  MatToolbarModule, 
  MatMenuModule, 
  MatGridListModule, 
  MatButtonModule, 
  MatFormFieldModule, 
  MatCardModule, 
  MatInputModule,
  MatOptionModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatSliderModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatBadgeModule,
  MatIconModule,
  MatTabsModule,
  MatListModule,
  MatLineModule,
  MatStepperModule,
  MatDividerModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';
import { DatePipe } from '@angular/common';

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NewPostingComponent } from './components/new-posting/new-posting.component';
import { EditPostComponent } from './components/edit-post/edit-post.component';
import { AnalyticsComponent } from './components/analytics/analytics.component';
import { FooterComponent } from './components/footer/footer.component';
import { StoreComponent } from './components/store/store.component';
import { CartComponent } from './components/cart/cart.component';
import { CartItemsComponent } from './components/cart-items/cart-items.component';
import { FavouriteItemsComponent } from './components/favourite-items/favourite-items.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';

// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PaymentService } from './services/payment.service';
import { PostService } from './services/post.service';

// Misc
import { FlashMessagesModule } from 'angular2-flash-messages';

// Guards
import { AuthGuard } from './guards/auth.guard';


const appRoutes: Routes = [
  {path:"", component: HomeComponent},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path:"newPosting", component: NewPostingComponent, canActivate: [AuthGuard]},
  {path:"editPost", component: EditPostComponent, canActivate: [AuthGuard]},
  {path:"analytics", component: AnalyticsComponent, canActivate: [AuthGuard]},
  {path:"store", component: StoreComponent},
  {path:"cart", component: CartComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    NewPostingComponent,
    EditPostComponent,
    SearchFilterComponent,
    AnalyticsComponent,
    FooterComponent,
    StoreComponent,
    CartComponent,
    CartItemsComponent,
    FavouriteItemsComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    MatToolbarModule,
    MatMenuModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatSliderModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatBadgeModule,
    MatIconModule,
    MatTabsModule,
    MatStepperModule,
    MatListModule,
    MatLineModule,
    MatDividerModule,
    BrowserAnimationsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, DatePipe, UserService, PaymentService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
