import { CommonModule } from "@angular/common";
import {
  Component,
  Injector,
  runInInjectionContext,
  signal,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { Loginservice } from "../../../../core/services/Auth/login";
import { toSignal } from "@angular/core/rxjs-interop";
import { Loginform } from "../../../../core/interfaces/Auth/login";
import { tap } from "rxjs";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-login",
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: "./login.html",
  styleUrl: "./login.css",
})
export class Login {
  constructor(
    private _Loginservice: Loginservice,
    private _injector: Injector,
    private _Router: Router
  ) {}
  banSpinner = signal(false);
  errorMsg = signal("");

  loginForm: FormGroup = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", [
      Validators.required,
      Validators.pattern(/^[A-Z][a-z0-9]{6,10}$/),
    ]),
  });

  loginNowSubmit() {
    if (this.loginForm.valid) {
      this.banSpinner.set(true);
      runInInjectionContext(this._injector, () => {
        const respont = toSignal(
          this._Loginservice.loginNow(this.loginForm.value as Loginform).pipe(
            tap({
              next: (res) => {
                this.banSpinner.set(false);
                localStorage.setItem("user-token", res.token);
                this._Loginservice.UserDataAfterDecoded.next(res.token);
                this._Router.navigate(["/home"]);
                //console.log(res);
              },
              error: (err) => {
                this.banSpinner.set(false);
                console.log(err);
                this.errorMsg.set(err.error.message);
                //console.log(this.errorMsg());
              },
            })
          )
        );
      });
    }
  }
}
