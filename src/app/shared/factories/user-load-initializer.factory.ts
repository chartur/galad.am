import { AuthService } from "@services/auth.service";
import { catchError, EMPTY, filter, switchMap, take } from "rxjs";
import { AuthStore } from "@stores/auth.store";

export const userLoadInitializerFactory = (authService: AuthService, authStore: AuthStore) => {
  return () => authStore.token$.pipe(
    take(1),
    filter(token => !!token),
    switchMap((token) => authService.verifyUser().pipe(
      catchError(e => {
        authStore.logoutAction()
        return EMPTY
      })
    ))
  );
}
