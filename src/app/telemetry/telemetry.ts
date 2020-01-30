const { appInsights, SeverityLevel } = (window as any);

interface ITelemetry {
  initialize(): void;
  trackEvent(eventName: string, payload: any): void;
  trackException(error: Error, severityLevel: any): void;
}

class Telemetry implements ITelemetry {
  private appInsights: any;
  private config: any;

  constructor() {
    const config = {
      instrumentationKey: (window as any).InstrumentationKey,
      disableExceptionTracking: true,
    };

    appInsights.config = config;
    this.appInsights = appInsights;
  }

  public initialize() {
    this.appInsights = appInsights;
  }

  public trackEvent(eventName: string, payload: any) {
    if (!this.valid(eventName)) {
      throw new Error('Invalid telemetry event name');
    }

    this.appInsights.trackEvent({ name: eventName }, payload);
  }

  public trackException(error: Error, severityLevel: any) {
    this.appInsights.trackException({ error, severityLevel });
  }

  // A valid event name ends with the word EVENT
  private valid(eventName: string): boolean {
    const listOfWords = eventName.split('_');
    const lastIndex = listOfWords.length - 1;
    const lastWord = listOfWords[lastIndex];
    return lastWord === 'EVENT';
  }
}

export const telemetry = new Telemetry();
