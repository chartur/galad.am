import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SignInRequestDto } from "@dto/request/sign-in-request.dto";
import { AuthResponseDto } from "@dto/response/auth-response.dto";
import { endpoints } from "@environment/environment";
import { Observable } from "rxjs";
import {SignUpRequestDto} from "@dto/request/sign-up-request.dto";
import {User} from "@interfaces/user";
import {PasswordSettingsRequestDto} from "@dto/request/password-settings-request.dto";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
  ) {}

  public signIn(body: SignInRequestDto): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(endpoints.auth.signIn, body);
  }

  public signUp(body: SignUpRequestDto): Observable<AuthResponseDto> {
    return this.httpClient.post<AuthResponseDto>(endpoints.auth.signUp, body);
  }

  public verifyUser(): Observable<AuthResponseDto> {
    return this.httpClient.get<AuthResponseDto>(endpoints.auth.getUser);
  }

  public updatePersonalSettings(body: FormData): Observable<AuthResponseDto> {
    return this.httpClient.patch<AuthResponseDto>(endpoints.profile.updatePersonalSettings, body);
  }

  public updatePasswordSettings(body: PasswordSettingsRequestDto): Observable<AuthResponseDto> {
    return this.httpClient.patch<AuthResponseDto>(endpoints.profile.updatePasswordSettings, body);
  }
}
