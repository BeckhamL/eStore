import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { TermsComponent } from './components/terms/terms.component';

// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { StoreResolverService } from './resolves/store-resolver.service';

// Misc
import { FlashMessagesModule } from 'angular2-flash-messages';

// Guards
import { AuthGuard } from './guards/auth.guard';

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
    FavouriteItemsComponent,
    TermsComponent
  ],
  imports: [
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
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
  providers: [ValidateService, AuthService, AuthGuard, DatePipe, UserService, PostService, StoreResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
