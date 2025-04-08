import { CanActivateFn } from '@angular/router';

export const StudentGuard: CanActivateFn = (route, state) => {
  return true;
};
