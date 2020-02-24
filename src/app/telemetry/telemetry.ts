import { ApplicationInsights, SeverityLevel } from '@microsoft/applicationinsights-web';

interface ITelemetry {
  initialize(): void;
  trackEvent(eventName: string, payload: any): void;
  trackException(error: Error, severityLevel: any): void;
}

class Telemetry implements ITelemetry {
  private appInsights: ApplicationInsights;
  private instrumentationKey: string;

  constructor() {
    this.instrumentationKey = (window as any).InstrumentationKey || '';
    const { mscc } = (window as any);

    const config = {
      instrumentationKey: this.instrumentationKey,
      disableExceptionTracking: true,
      disableTelemetry: mscc.hasConsent() ? false : true,
    };

    this.appInsights = new ApplicationInsights({ config });
  }

  public initialize() {
    if (this.instrumentationKey) {
      this.appInsights.loadAppInsights();
      this.appInsights.trackPageView();
    }
  }

  public trackEvent(eventName: string, payload: any) {
    if (!this.validateEventName(eventName)) {
      throw new Error('Invalid telemetry event name');
    }

    this.appInsights.trackEvent({ name: eventName }, payload);
  }

  public trackException(error: Error, severityLevel: SeverityLevel) {
    this.appInsights.trackException({ error, severityLevel });
  }

  // A valid event name ends with the word EVENT
  private validateEventName(eventName: string): boolean {
    const listOfWords = eventName.split('_');
    const lastIndex = listOfWords.length - 1;
    const lastWord = listOfWords[lastIndex];
    return lastWord === 'EVENT';
  }
}

export const telemetry = new Telemetry();
