import { Injectable } from '@angular/core';
import { User } from "@interfaces/user";
import { ComponentStore, OnStoreInit, tapResponse } from "@ngrx/component-store";
import { AuthService } from "@services/auth.service";
import { Observable, skip, switchMap, takeUntil, tap } from "rxjs";
import { SignInRequestDto } from "@dto/request/sign-in-request.dto";
import { ToastrService } from "ngx-toastr";
import { AuthResponseDto } from "@dto/response/auth-response.dto";
import { SystemMessages } from "@constants/system-messages";
import { Router } from "@angular/router";
import {LocalStorageService} from "@services/local-storage.service";
import {SignUpRequestDto} from "@dto/request/sign-up-request.dto";

interface AuthState {
  user: User | null,
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
}

@Injectable({
  providedIn: 'root'
})
export class AuthStore extends ComponentStore<AuthState> implements OnStoreInit {
  public readonly user$: Observable<User | null> = this.select(state => state.user);
  public readonly isLoggedIn$: Observable<boolean> = this.select(state => state.isLoggedIn);
  public readonly token$: Observable<string | null> = this.select(state => state.token);
  public readonly loading$: Observable<boolean> = this.select(state => state.loading);

  private signInReducer = this.updater((state, data: AuthResponseDto) => ({
    ...state,
    isLoggedIn: true,
    user: data.user,
    token: data.token,
    loading: false,
  }))
  private setLoadingStateReducer = this.updater((state, payload: boolean) => ({
    ...state,
    loading: payload
  }))
  private logoutReducer = this.updater(() => initialState)
  private updatePersonalSettingsFailureReducer = this.updater((state, error: unknown) => ({
    ...state,
      loading: false,
      error,
  }));

  private authSuccessAction = this.effect<void>(trigger$ => {
    return trigger$.pipe(
      tap(() => {
        this.toastrService.success(SystemMessages.auth.SIGN_IN_SUCCESS)
        this.router.navigate(["portal"])
      })
    )
  })
  private authFailureAction = this.effect((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap((err: any) => {
        this.toastrService.error(err?.error?.message || SystemMessages.genericErrorMessages.WRONG)
      })
    )
  })
  private logoutSuccessAction = this.effect<void>((trigger$: Observable<void>) => {
    return trigger$.pipe(
      tap((err: any) => {
        this.toastrService.success(SystemMessages.auth.LOGOUT_SUCCESS);
        this.router.navigate(["sign-in"])
      })
    )
  })
  private logoutFailureAction = this.effect<any>((trigger$: Observable<any>) => {
    return trigger$.pipe(
      tap((err: any) => {
        this.toastrService.error(SystemMessages.genericErrorMessages.WRONG)
      })
    )
  })

  public signIn = this.effect((body$: Observable<SignInRequestDto>) => {
    return body$.pipe(
      tap(() => this.setLoadingStateReducer(true)),
      switchMap((body) => this.authService.signIn(body)
        .pipe(
          tapResponse(
            (response) => {
              this.signInReducer(response);
              this.authSuccessAction();
            },
            (e) => {
              this.authFailureAction(e);
            }
          ),
        )
      )
    )
  });

  public signUp = this.effect((body$: Observable<SignUpRequestDto>) => {
    return body$.pipe(
      tap(() => this.setLoadingStateReducer(true)),
      switchMap((body) => this.authService.signUp(body)
        .pipe(
          tapResponse(
            (response) => {
              this.signInReducer(response);
              this.authSuccessAction();
            },
            (e) => {
              this.authFailureAction(e);
            }
          ),
        )
      )
    )
  })

  public logout = this.effect((body$: Observable<void>) => {
    return body$.pipe(
      tapResponse(
        () => {
          this.logoutReducer()
          this.logoutSuccessAction()
        },
        (e) => {
          this.logoutFailureAction(e);
        }
      ),
    )
  })

  public updatePersonalSettings = this.effect((body$: Observable<FormData>) => {
    return body$.pipe(
      tap(() => this.setLoadingStateReducer(true)),
      switchMap((body) => this.authService.updatePersonalSettings(body).pipe(
        tapResponse(
          (response) => {
            this.signInReducer(response)
          },
          (e: unknown) => {
            this.authFailureAction(e);
          },
        )
      ))
    )
  })

  constructor(
    private authService: AuthService,
    private toastrService: ToastrService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    super(initialState)
  }

  private initFromLocalStorage(): void {
    const authState = this.localStorageService.get<AuthState>("auth") || initialState;
    this.setState(authState);
  }

  private onUpdate(): void {
    this.state$
      .pipe(
        skip(1),
        takeUntil(this.destroy$)
      )
      .subscribe(state => {
        this.localStorageService.set("auth", state);
      })
  }

  ngrxOnStoreInit() {
    this.initFromLocalStorage();
    this.onUpdate();
  }
}
