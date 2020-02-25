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
      this.appInsights.addTelemetryInitializer(this.filterFunction);
      this.appInsights.trackPageView();
    }
  }

  public trackEvent(eventName: string, payload: any) {
    this.appInsights.trackEvent({ name: eventName }, payload);
  }

  public trackException(error: Error, severityLevel: SeverityLevel) {
    this.appInsights.trackException({ error, severityLevel });
  }

  private filterFunction(envelope: any): boolean {
    envelope.baseData.name = 'Graph Explorer V3';

    const uri = envelope.baseData.uri;
    if (uri) {
      const startOfFragment = uri.indexOf('#');
      const sanitisedUri = uri.substring(0, startOfFragment);
      envelope.baseData.uri = sanitisedUri;
    }

    return true;
  }
}

export const telemetry = new Telemetry();
