import { Token } from "./base";
import { AppComponent } from "./app.component";

/**
 * For more information on Tokens, see the Token interface definition
 * in base.ts. This is an unordered list of all tokens that can supply
 * values for POST body templates and URL endpoints for both the demo
 * tenant and authenticated users. The demoTenantValue and
 * authenticatedUserValue fields are checked first, and then the
 * defaultValue fields.
 */

export const Tokens: Token[] = [
  {
    placeholder: "group-id",
    demoTenantValue: "02bd9fd6-8f93-4758-87c3-1fb73740a315",
  },
  {
    placeholder: "drive-item-id",
    demoTenantValue: "01BYE5RZZ5OJSCSRM6BZDY7ZEFZ3NJ2QAY",
  },
  {
    placeholder: "section-id",
    demoTenantValue: "1-fb22b2f1-379f-4da4-bf7b-be5dcca7b99a",
  },
  {
    placeholder: "notebook-id",
    demoTenantValue: "1-fb22b2f1-379f-4da4-bf7b-be5dcca7b99a",
  },
  {
    placeholder: "group-id-with-plan",
    demoTenantValue: "1e770bc2-3c5f-487f-871f-16fbdf1c8ed8",
  },
  {
    placeholder: "plan-id",
    demoTenantValue: "CONGZUWfGUu4msTgNP66e2UAAySi",
  },
  {
    placeholder: "{bucket-id}",
    demoTenantValue: "1m6FwcAAZ0eW5J1Abe7ndWUAJ1ca",
  },
  {
    placeholder: "{bucket-name}",
    demoTenantValue: "New Bucket",
  },
  {
    placeholder: "task-id",
    demoTenantValue: "oIx3zN98jEmVOM-4mUJzSGUANeje",
  },
  {
    placeholder: "task-title",
    defaultValue: "New Task",
  },
  {
    placeholder: "extension-id",
    demoTenantValue: "com.contoso.roamingSettings",
  },
  {
    placeholder: "host-name",
    demoTenantValue: "M365x214355.sharepoint.com",
  },
  {
    placeholder: "server-relative-path",
    demoTenantValue: "sites/contoso/Departments/SM/MarketingDocuments",
  },
  {
    placeholder: "group-id-for-teams",
    demoTenantValue: "02bd9fd6-8f93-4758-87c3-1fb73740a315",
  },
  {
    placeholder: "channel-id",
    demoTenantValue: "d0bba23c-2fc8-4139-9112-5a43a54cc30e",
  },
  {
    placeholder: "today",
    defaultValueFn: () => {
      return (new Date()).toISOString()
    }
  },
  {
    placeholder: "coworker-mail",
    demoTenantValue: "meganb@M365x214355.onmicrosoft.com",
    authenticatedUserValueFn: () => {
      return AppComponent.explorerValues.authentication.user.emailAddress;
    }    
  },
  {
    placeholder: "next-week",
    defaultValueFn: () => {
      let today = new Date();
      let nextWeek = new Date();
      nextWeek.setDate(today.getDate()+7);
      return nextWeek.toISOString()
    }
  },
  {
    placeholder: "user-mail",
    demoTenantValue: "MiriamG@M365x214355.onmicrosoft.com",
    authenticatedUserValueFn: () => {
      return AppComponent.explorerValues.authentication.user.emailAddress;
    }
  },
  {
    placeholder: "domain",
    defaultValueFn: () => {
      return "contoso.com"
    },
    authenticatedUserValueFn: () => {
      return AppComponent.explorerValues.authentication.user.emailAddress.split("@")[1];
    }
  },
  {
    placeholder: "list-id",
    defaultValue: "d7689e2b-941a-4cd3-bb24-55cddee54294",
  },
  {
    placeholder: "list-title",
    defaultValue: "Contoso Home",
  }
]
