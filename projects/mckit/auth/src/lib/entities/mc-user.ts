export class MCUser {
  static STATUS_INACTIVE = 0;
  static STATUS_ACTIVE = 1;
  static STATUS_SUSPENDED = 2;

  public id?: number|string;
  public firstname: string = '';
  public lastname: string = '';
  public email: string = '';
  public photo?: string = '';
  public role: number = 0;
  public status: number = 0;
  public created_at: string = '';

  public token_type: string = 'bearer';
  public access_token: string = '';
}
