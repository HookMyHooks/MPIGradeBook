import { CanActivateFn } from '@angular/router';

export const TeacherGuard: CanActivateFn = (route, state) => {
  return true;
};
