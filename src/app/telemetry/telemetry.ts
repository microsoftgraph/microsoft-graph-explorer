import { ApplicationInsights, SeverityLevel } from '@microsoft/applicationinsights-web';

interface ITelemetry {
  initialize(): void;
  trackEvent(eventName: string, payload: any): void;
  trackException(error: Error, severityLevel: any): void;
}

class Telemetry implements ITelemetry {
  private appInsights: ApplicationInsights;

  constructor() {
    const config = {
      instrumentationKey: (window as any).InstrumentationKey,
      disableExceptionTracking: true,
    };

    this.appInsights = new ApplicationInsights({ config });
  }

  public initialize() {
    this.appInsights.loadAppInsights();
    this.appInsights.trackPageView();
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
