import { SeverityLevel } from '@microsoft/applicationinsights-web';

export default interface ITelemetry {
  initialize(): void;
  trackEvent(eventName: string, payload: any): void;
  trackException(error: Error, severityLevel: SeverityLevel): void;
}
