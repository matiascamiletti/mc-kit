export class MCMessage {
  /**
   * Severity level of the message.
   * @defaultValue 'info'
   * @group Props
   */
  severity: 'success' | 'info' | 'warn' | 'error' | 'secondary' | 'contrast' | undefined | null;
  /**
   * Text content.
   * @group Props
   */
  text: string | undefined;
}
