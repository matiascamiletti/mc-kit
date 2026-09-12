import { MCPermission } from './mc-permission.entity';
import { MCRole } from './mc-role.entity';

export class MCUser {
  static STATUS_INACTIVE = 0;
  static STATUS_ACTIVE = 1;
  static STATUS_SUSPENDED = 2;

  public id?: number | string;
  public firstname: string = '';
  public lastname: string = '';
  public email: string = '';
  public photo?: string = '';
  public role_id: number | string = 0;
  public role: number | string = 0;
  public status: number = 0;
  public created_at: string = '';
  public extra: any;

  public token_type: string = 'bearer';
  public access_token: string = '';

  public roles?: (string | number | MCRole)[];
  public permissions?: (string | MCPermission)[];
}
