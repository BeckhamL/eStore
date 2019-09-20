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
  MatStepperModule
 } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpModule } from '@angular/http';

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

// Services
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';

// Misc
import { FlashMessagesModule } from 'angular2-flash-messages';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { DatePipe } from '@angular/common';

const appRoutes: Routes = [
  {path:"", component: HomeComponent},
  {path:"register", component: RegisterComponent},
  {path:"login", component: LoginComponent},
  {path:"dashboard", component: DashboardComponent, canActivate: [AuthGuard]},
  {path:"profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path:"newPosting", component: NewPostingComponent, canActivate: [AuthGuard]},
  {path:"editPost", component: EditPostComponent, canActivate: [AuthGuard]},
  {path:"analytics", component: AnalyticsComponent, canActivate: [AuthGuard]}
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
    AnalyticsComponent
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
    BrowserAnimationsModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ValidateService, AuthService, AuthGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
