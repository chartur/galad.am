import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthStore} from "@stores/auth.store";
import {tap} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);
  return authStore.isLoggedIn$.pipe(
    tap(state => {
      if (!state) {
        router.navigate(['/']);
        return;
      }
    })
  );
};
