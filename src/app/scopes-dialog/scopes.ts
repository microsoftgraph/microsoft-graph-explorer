/* tslint:disable */
import { IPermissionScope } from '../base';

export const PermissionScopes: IPermissionScope[] = [
  {
    name: 'AccessReview.Read.All',
    description: 'Read all access reviews that a user can access',
    longDescription: 'Allows the app to read access reviews, reviewers, decisions and settings that the signed-in user has access to in the organization',
    preview: true,
    admin: true,
  },
  {
    name: 'AccessReview.ReadWrite.All',
    description: 'Manage access reviews',
    longDescription: 'Allows the app to read, update, delete and perform actions on access reviews, reviewers, decisions and settings that the signed-in user has access to in the organization',
    preview: true,
    admin: true,
  },
  {
    name: 'Agreement.Read.All',
    description: 'Read all terms of use agreements',
    longDescription: 'Allows the app to read terms of use agreements on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'Agreement.ReadWrite.All',
    description: 'Read and write all terms of use agreements',
    longDescription: 'Allows the app to read and write terms of use agreements on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'EntitlementManagement.ReadWrite.All',
    description: 'Read and write entitlement management resources',
    longDescription: 'Allows the app to request access to and manage access packages and related entitlement management resources on behalf of the signed-in user',
    preview: true,
    admin: true,
  },
  {
    name: 'AgreementAcceptance.Read',
    description: 'Read user terms of use acceptance statuses',
    longDescription: 'Allows the app to read terms of use acceptance statuses on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'AgreementAcceptance.Read.All',
    description: 'Read terms of use acceptance statuses that a user can access',
    longDescription: 'Allows the app to read terms of use acceptance statuses on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'Analytics.Read',
    description: 'Read user analytics',
    longDescription: 'Allows the app to read analytics data such as time spent in activities such as email, meetings, chats and calls.',
    preview: true,
    admin: false,
  },
  {
    name: 'AppCatalog.ReadWrite.All',
    description: 'Read and write to all app catalogs',
    longDescription: 'Allows the app to create, read, update, and delete apps in the app catalogs.',
    preview: true,
    admin: true,
  },
  {
    name: 'ApprovalRequest.Read.AdminConsentRequest',
    description: 'Read admin consent approval requests',
    longDescription: 'Allows the app to read admin consent requests, business flows, and governance policy templates on your behalf.',
    preview: true,
    admin: true,
  },
  {
    name: 'ApprovalRequest.Read.CustomerLockbox',
    description: 'Read customer lockbox approval requests',
    longDescription: 'Allows the app to read customer lockbox requests, business flows and governance policy templates on your behalf.',
    preview: true,
    admin: true,
  },
  {
    name: 'ApprovalRequest.Read.EntitlementManagement',
    description: 'Read entitlement management approval requests',
    longDescription: 'Allows the app to read entitlement management requests, business flows, and governance policy templates on your behalf.',
    preview: true,
    admin: true,
  },
  {
    name: 'ApprovalRequest.Read.PriviligedAccess',
    description: 'Read privileged access approval requests',
    longDescription: 'Allows the app to read privileged access requests, business flows, and governance policy templates on your behalf.',
    preview: true,
    admin: true,
  },
  {
    name: 'ApprovalRequest.ReadWrite.AdminConsentRequest',
    description: 'Read and write admin consent approval requests',
    longDescription: 'Allows the app to read and write admin consent requests, business flows, and governance policy templates on your behalf.',
    preview: true,
    admin: true,
  },
  {
    name: 'ApprovalRequest.ReadWrite.CustomerLockbox',
    description: 'Read and write customer lockbox approval requests',
    longDescription: 'Allows the app to read and write customer lockbox requests, business flows and governance policy templates on your behalf.',
    preview: true,
    admin: true,
  },
  {
    name: 'ApprovalRequest.ReadWrite.EntitlementManagement',
    description: 'Read and write entitlement management approval requests',
    longDescription: 'Allows the app to read and write entitlement management requests, business flows, and governance policy templates on your behalf.',
    preview: true,
    admin: true,
  },
  {
    name: 'ApprovalRequest.ReadWrite.PriviligedAccess',
    description: 'Read and write privileged access approval requests',
    longDescription: 'Allows the app to read and write privileged access requests, business flows, and governance policy templates on your behalf.',
    preview: true,
    admin: true,
  },
  {
    name: 'Calendars.Read',
    description: 'Read user calendars',
    longDescription: 'Allows the app to read events in user calendars.',
    preview: false,
    admin: false,
  },
  {
    name: 'Calendars.Read.Shared',
    description: 'Read user and shared calendars',
    longDescription: 'Allows the app to read events in all calendars that the user can access, including delegate and shared calendars.',
    preview: false,
    admin: false,
  },
  {
    name: 'Calendars.ReadWrite',
    description: 'Have full access to user calendars',
    longDescription: 'Allows the app to create, read, update, and delete events in user calendars.',
    preview: false,
    admin: false,
  },
  {
    name: 'Calendars.ReadWrite.Shared',
    description: 'Read and write user and shared calendars',
    longDescription: 'Allows the app to create, read, update and delete events in all calendars the user has permissions to access. This includes delegate and shared calendars.',
    preview: false,
    admin: false,
  },
  {
    name: 'Chat.Read',
    description: 'Read chat messages',
    longDescription: 'Allows the app to read chat messages. ',
    preview: false,
    admin: false,
  },
  {
    name: 'Chat.ReadWrite',
    description: 'Read and write chat messages',
    longDescription: 'Allows the app to read and write chat messages ',
    preview: false,
    admin: false,
  },
  {
    name: 'Contacts.Read',
    description: 'Read user contacts',
    longDescription: 'Allows the app to read user contacts.',
    preview: false,
    admin: false,
  },
  {
    name: 'Contacts.Read.Shared',
    description: 'Read user and shared contacts',
    longDescription: 'Allows the app to read contacts that the user has permissions to access, including the user\'s own and shared contacts.',
    preview: false,
    admin: false,
  },
  {
    name: 'Contacts.ReadWrite',
    description: 'Have full access to user contacts',
    longDescription: 'Allows the app to create, read, update, and delete user contacts.',
    preview: false,
    admin: false,
  },
  {
    name: 'Contacts.ReadWrite.Shared',
    description: 'Read and write user and shared contacts',
    longDescription: 'Allows the app to create, read, update and delete contacts that the user has permissions to, including the user\'s own and shared contacts.',
    preview: false,
    admin: false,
  },
  {
    name: 'EntitlementManagement.ReadWrite.All',
    description: 'Read and write entitlement management resources',
    longDescription: 'Allows the app to request access to and manage access packages and related entitlement management resources on behalf of the signed-in user',
    preview: true,
    admin: true,
  },
  {
    name: 'Files.Read',
    description: 'Read user files and files shared with user',
    longDescription: 'Allows the app to read the signed-in user\'s files and files shared with the user.',
    preview: false,
    admin: false,
  },
  {
    name: 'Files.Read.All',
    description: 'Read all files that user can access',
    longDescription: 'Allows the app to read all files the signed-in user can access.',
    preview: false,
    admin: false,
  },
  {
    name: 'Files.Read.Selected',
    description: 'Read files that the user selects',
    longDescription: 'Allows the app to read files that the user selects. The app has access for several hours after the user selects a file.',
    preview: false,
    admin: false,
  },
  {
    name: 'Files.ReadWrite',
    description: 'Have full access to user files and files shared with user',
    longDescription: 'Allows the app to read, create, update and delete the signed-in user\'s files and files shared with the user.',
    preview: false,
    admin: false,
  },
  {
    name: 'Files.ReadWrite.All',
    description: 'Have full access to all files user can access',
    longDescription: 'Allows the app to read, create, update and delete all files the signed-in user can access.',
    preview: false,
    admin: false,
  },
  {
    name: 'Files.ReadWrite.AppFolder',
    description: 'Have full access to the application\'s folder',
    longDescription: 'Allows the app to read, create, update and delete files in the application\'s folder.',
    preview: false,
    admin: false,
  },
  {
    name: 'Files.ReadWrite.Selected',
    description: 'Read and write files that the user selects',
    longDescription: 'Allows the app to read and write files that the user selects. The app has access for several hours after the user selects a file.',
    preview: false,
    admin: false,
  },
  {
    name: 'Mail.Read',
    description: 'Read user mail',
    longDescription: 'Allows the app to read email in user mailboxes.',
    preview: false,
    admin: false,
  },
  {
    name: 'Mail.ReadBasic',
    description: 'Read user basic mail',
    longDescription: 'Allows the app to read email in the signed-in user\'s mailbox except body, previewBody, attachments and any extended properties.',
    preview: false,
    admin: false,
  },
  {
    name: 'Mail.Read.Shared',
    description: 'Read user and shared mail',
    longDescription: 'Allows the app to read mail that the user can access, including the user\'s own and shared mail.',
    preview: false,
    admin: false,
  },
  {
    name: 'Mail.ReadWrite',
    description: 'Read and write access to user mail',
    longDescription: 'Allows the app to create, read, update, and delete email in user mailboxes. Does not include permission to send mail.',
    preview: false,
    admin: false,
  },
  {
    name: 'Mail.ReadWrite.Shared',
    description: 'Read and write user and shared mail',
    longDescription: 'Allows the app to create, read, update, and delete mail that the user has permission to access, including the user\'s own and shared mail. Does not include permission to send mail.',
    preview: false,
    admin: false,
  },
  {
    name: 'Mail.Send',
    description: 'Send mail as a user',
    longDescription: 'Allows the app to send mail as users in the organization.',
    preview: false,
    admin: false,
  },
  {
    name: 'Mail.Send.Shared',
    description: 'Send mail on behalf of others',
    longDescription: 'Allows the app to send mail as the signed-in user, including sending on-behalf of others.',
    preview: false,
    admin: false,
  },
  {
    name: 'MailboxSettings.ReadWrite',
    description: 'Read and write user mailbox settings',
    longDescription: 'Allows the app to create, read, update, and delete user\'s mailbox settings. Does not include permission to send mail.',
    preview: false,
    admin: false,
  },
  {
    name: 'openid',
    description: 'Sign users in (preview)',
    longDescription: 'Allows users to sign in to the app with their work or school accounts and allows the app to see basic user profile information.',
    preview: false,
    admin: false,
  },
  {
    name: 'User.Read',
    description: 'Sign-in and read user profile',
    longDescription: 'Allows users to sign-in to the app, and allows the app to read the profile of signed-in users. The full profile includes all of the declared properties of the User entity. The app cannot read navigation properties, such as manager or direct reports. Also allows the app to read the following basic company information of the signed-in user (through the TenantDetail object): tenant ID, tenant display name, and verified domains.',
    preview: false,
    admin: false,
  },
  {
    name: 'User.ReadWrite',
    description: 'Read and write access to user profile',
    longDescription: 'Allows the app to read your profile. It also allows the app to update your profile information on your behalf.',
    preview: false,
    admin: false,
  },
  {
    name: 'User.ReadBasic.All',
    description: 'Read all user\'s basic profiles',
    longDescription: 'Allows the app to read the basic profile of all users in the organization on behalf of the signed-in user. The following properties comprise a user’s basic profile: display name, first and last name, photo, and email address. To read the groups that a user is a member of, the app will also require Group.Read.All or Group.ReadWrite.All.',
    preview: false,
    admin: false,
  },
  {
    name: 'Notes.Create',
    description: 'Create pages in users\' notebooks',
    longDescription: 'Allows the app to read the titles of notebooks and sections and create new pages, notebooks and sections on behalf of the signed-in user.',
    preview: false,
    admin: false,
  },
  {
    name: 'Notes.Read',
    description: 'Read user notebooks',
    longDescription: 'Allows the app to view the titles of OneNote notebooks and sections and to read all pages on behalf of the signed-in user. It cannot view password protected sections.',
    preview: true,
    admin: false,
  },
  {
    name: 'Notes.Read.All',
    description: 'Read all notebooks that the user can access',
    longDescription: 'Allows the app to read the contents of all notebooks and sections that the signed-in user can access. It cannot read password protected sections.',
    preview: false,
    admin: false,
  },
  {
    name: 'Notes.ReadWrite',
    description: 'Read and write user notebooks',
    longDescription: 'Allows the app to read the titles of notebooks and sections, read all pages, write all pages and create new pages on behalf of the signed-in user.  It cannot access password protected sections.',
    preview: false,
    admin: false,
  },
  {
    name: 'Notes.ReadWrite.All',
    description: 'Read and write notebooks that the user can access',
    longDescription: 'Allows the app to read and write the contents of all notebooks and sections that the signed-in user can access. It cannot access password protected sections.',
    preview: false,
    admin: false,
  },
  {
    name: 'Organization.Read.All',
    description: 'Read organization and related resources',
    longDescription: 'Allows application to read the organization and related resources, on behalf of the signed-in user.',
    preview: false,
    admin: true,
  },
  {
    name: 'Organization.ReadWrite.All',
    description: 'Have full access to organization and related resources',
    longDescription: 'Allows the application to read, create, update, and delete the organization and related resources, on behalf of the signed-in user.',
    preview: false,
    admin: true,
  },
  {
    name: 'OrgContact.Read.All',
    description: 'Read organization contacts',
    longDescription: 'Allows the app to read all organizational contacts on behalf of the signed-in user.  These contacts are managed by the organization and are different from the user\'s personal contacts.',
    preview: false,
    admin: true,
  },
  {
    name: 'Presence.Read',
    description: 'Read your Presence information',
    longDescription: 'Allows the app to read your presence information on your behalf. Presence information includes activity, availability, status note, calendar out-of-office message, timezone and location.',
    preview: true,
    admin: true,
  },
  {
    name: 'Presence.Read.All',
    description: 'Read presence information of all users in your organization',
    longDescription: 'Allows the app to read presence information of all users in the directory on your behalf. Presence information includes activity, availability, status note, calendar out-of-office message, timezone and location.',
    preview: true,
    admin: true,
  },
  {
    name: 'ProgramControl.Read.All',
    description: 'Read all programs that a user can access',
    longDescription: 'Allows the app to read programs and program controls that the signed-in user has access to in the organization',
    preview: true,
    admin: true,
  },
  {
    name: 'ProgramControl.ReadWrite.All',
    description: 'Manage programs that a user can access',
    longDescription: 'Allows the app to read, update, delete and perform actions on programs and program controls that the signed-in user has access to in the organization',
    preview: true,
    admin: true,
  },
  {
    name: 'SecurityEvents.Read.All',
    description: 'Read your organization’s security events',
    longDescription: 'Allows the app to read your organization’s security events on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'SecurityEvents.ReadWrite.All',
    description: 'Read and update your organization’s security events',
    longDescription: 'Allows the app to read your organization’s security events on behalf of the signed-in user. Also allows the app to update editable properties in security events on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'Sites.Read.All',
    description: 'Read items in all site collections',
    longDescription: 'Allows the application to read documents and list items in all site collections on behalf of the signed-in user.',
    preview: false,
    admin: false,
  },
  {
    name: 'Sites.ReadWrite.All',
    description: 'Read and write items in all site collections',
    longDescription: 'Allows the application to edit or delete documents and list items in all site collections on behalf of the signed-in user.',
    preview: false,
    admin: false,
  },
  {
    name: 'Sites.Manage.All',
    description: 'Create, edit, and delete items and lists in all site collections',
    longDescription: 'Allows the app to manage and create lists, documents, and list items in all site collections on behalf of the signed-in user.',
    preview: false,
    admin: false,
  }, {
    name: 'Sites.FullControl.All',
    description: 'Have full control of all site collections',
    longDescription: 'Allows the app to have full control to SharePoint sites in all site collections on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'Tasks.Read',
    description: 'Read user tasks',
    longDescription: 'Allows the app to read user tasks.',
    preview: true,
    admin: false,
  },
  {
    name: 'Tasks.Read.Shared',
    description: 'Read user and shared tasks',
    longDescription: 'Allows the app to read tasks a user has permissions to access, including their own and shared tasks.',
    preview: true,
    admin: false,
  },
  {
    name: 'Tasks.ReadWrite',
    description: 'Create, read, update and delete user tasks and plans (preview)',
    longDescription: 'Allows the app to create, read, update and delete tasks and plans (and tasks in them), that are assigned to or shared with the signed-in user.',
    preview: true,
    admin: false,
  },
  {
    name: 'Tasks.ReadWrite.Shared',
    description: 'Read and write user and shared tasks',
    longDescription: 'Allows the app to create, read, update, and delete tasks a user has permissions to, including their own and shared tasks.',
    preview: true,
    admin: false,
  },
  {
    name: 'Device.Read',
    preview: true,
    admin: false,
    description: '',
    longDescription: '',
  },
  {
    name: 'Device.Command',
    preview: true,
    admin: false,
    description: '',
    longDescription: '',
  },
  {
    name: 'Directory.AccessAsUser.All',
    description: 'Access directory as the signed-in user',
    longDescription: 'Allows the app to have the same access to information in the directory as the signed-in user.',
    preview: false,
    admin: true,
  },
  {
    name: 'Directory.Read.All',
    description: 'Read directory data',
    longDescription: 'Allows the app to read data in your organization\'s directory, such as users, groups and apps.',
    preview: false,
    admin: true,
  },
  {
    name: 'Directory.ReadWrite.All',
    description: 'Read and write directory data',
    longDescription: 'Allows the app to read and write data in your organization\'s directory, such as users, and groups. Does not allow user or group deletion. It does not allow the app to delete users or groups, or reset user passwords.',
    preview: false,
    admin: true,
  },
  {
    name: 'Group.Read.All',
    description: 'Read all groups',
    longDescription: 'Allows the app to list groups, and to read their properties and all group memberships on behalf of the signed-in user. Also allows the app to read calendar, conversations, files, and other group content for all groups the signed-in user can access.',
    preview: false,
    admin: true,
  },
  {
    name: 'Group.ReadWrite.All',
    description: 'Read and write all groups',
    longDescription: 'Allows the app to create groups and read all group properties and memberships on behalf of the signed-in user. Additionally allows group owners to manage their groups and allows group members to update group content.',
    preview: false,
    admin: true,
  },
  {
    name: 'User.Read.All',
    description: 'Read all user\'s full profiles',
    longDescription: 'Same as User.ReadBasic.All, except that it allows the app to read the full profile of all users in the organization and when reading navigation properties like manager and direct reports. The full profile includes all of the declared properties of the User entity. To read the groups that a user is a member of, the app will also require either Group.Read.All or Group.ReadWrite.All.',
    preview: false,
    admin: true,
  },
  {
    name: 'User.ReadWrite.All',
    description: 'Read and write all user\'s full profiles',
    longDescription: 'Allows the app to read and write the full set of profile properties, reports, and managers of other users in your organization, on behalf of the signed-in user.',
    preview: false,
    admin: true,
  },
  {
    name: 'People.Read',
    description: 'Read all users\' relevant people lists and search your directory',
    longDescription: 'Allows the app to read a scored list of relevant people of the signed-in user. The list includes local contacts, contacts from social networking, your organization\'s directory, and people from recent communications (such as email and Skype).',
    preview: false,
    admin: false,
  },
  {
    name: 'People.Read.All',
    description: 'Read all users\' relevant people lists and search the directory',
    longDescription: 'Allows the app to read a scored list of relevant people of the signed-in user or other users in the signed-in user\'s organization. The list can include local contacts, contacts from social networking, your organization\'s directory, and people from recent communications (such as email and Skype).',
    preview: false,
    admin: true,
  },
  {
    name: 'IdentityRiskEvent.Read.All',
    description: 'Read identity risk event information (preview)',
    longDescription: 'Allows the app to read identity risk event information for all users in your organization on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'IdentityRiskEvent.ReadWrite.All',
    description: 'Read and write identity risk event information (preview)',
    longDescription: 'Allows the app to read and write identity risk event information for all users in your organization on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'IdentityRiskyUser.Read.All',
    description: 'Read identity risky user information (preview)',
    longDescription: 'Allows the app to read identity risky user information for all users in your organization on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'IdentityRiskyUser.ReadWrite.All',
    description: 'Read and write identity risky user information (preview)',
    longDescription: 'Allows the app to read and write identity risky user information for all users in your organization on behalf of the signed-in user.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementServiceConfig.Read.All',
    description: 'Read Microsoft Intune configuration (preview)',
    longDescription: 'Allows the app to read Microsoft Intune service properties including device enrollment and third party service connection configuration.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementServiceConfig.ReadWrite.All',
    description: 'Read and write Microsoft Intune configuration (preview)',
    longDescription: 'Allows the app to read and write Microsoft Intune service properties including device enrollment and third party service connection configuration.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementConfiguration.Read.All',
    description: 'Read Microsoft Intune device configuration and policies (preview)',
    longDescription: 'Allows the app to read properties of Microsoft Intune-managed device configuration and device compliance policies and their assignment to groups.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementConfiguration.ReadWrite.All',
    description: 'Read and write Microsoft Intune device configuration and policies (preview)',
    longDescription: 'Allows the app to read and write properties of Microsoft Intune-managed device configuration and device compliance policies and their assignment to groups.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementApps.Read.All',
    description: 'Read Microsoft Intune apps (preview)',
    longDescription: 'Allows the app to read the properties, group assignments and status of apps, app configurations and app protection policies managed by Microsoft Intune.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementApps.ReadWrite.All',
    description: 'Read and write Microsoft Intune apps (preview)',
    longDescription: 'Allows the app to read and write the properties, group assignments and status of apps, app configurations and app protection policies managed by Microsoft Intune.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementRBAC.Read.All',
    description: 'Read Microsoft Intune RBAC settings (preview)',
    longDescription: 'Allows the app to read the properties relating to the Microsoft Intune Role-Based Access Control (RBAC) settings.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementRBAC.ReadWrite.All',
    description: 'Read and write Microsoft Intune RBAC settings (preview)',
    longDescription: 'Allows the app to read and write the properties relating to the Microsoft Intune Role-Based Access Control (RBAC) settings.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementManagedDevices.Read.All',
    description: 'Read Microsoft Intune devices (preview)',
    longDescription: 'Allows the app to read the properties of devices managed by Microsoft Intune.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementManagedDevices.ReadWrite.All',
    description: 'Read and write Microsoft Intune devices (preview)',
    longDescription: 'Allows the app to read and write the properties of devices managed by Microsoft Intune. Does not allow high impact operations such as remote wipe and password reset on the device’s owner.',
    preview: true,
    admin: true,
  },
  {
    name: 'DeviceManagementManagedDevices.PrivilegedOperations.All',
    description: 'Perform user-impacting remote actions on Microsoft Intune devices (preview)',
    longDescription: 'Allows the app to perform remote high impact actions such as wiping the device or resetting the passcode on devices managed by Microsoft Intune.',
    preview: true,
    admin: true
  },
  {
    name: 'Reports.Read.All',
    description: 'Read all usage reports',
    longDescription: 'Allows an app to read all service usage reports without a signed-in user. Services that provide usage reports include Office 365 and Azure Active Directory.',
    preview: true,
    admin: true
  },
  {
    name: 'IdentityProvider.Read.All',
    description: 'Read all identity providers',
    longDescription: 'Allows an app to read all Azure Active Directory (Azure AD) identity providers.',
    preview: true,
    admin: true
  },
  {
    name: 'IdentityProvider.ReadWrite.All',
    description: 'Read and write all identity providers',
    longDescription: 'Allows an app to read and write all Azure Active Directory (Azure AD) identity providers.',
    preview: true,
    admin: true
  },
  {
    name: 'EduRoster.ReadBasic',
    description: 'Read a limited subset of the organization\'s roster',
    longDescription: 'Allows the app to read a limited subset of the properties from the structure of schools and classes in an organization\'s roster and a limited subset of properties about users to be read on behalf of the user. Includes name, status, education role, email address and photo.',
    preview: true,
    admin: true
  },
  {
    name: 'EduAssignments.ReadBasic',
    description: 'Read assignments without grades',
    longDescription: 'Allows the app to read assignments without grades on behalf of the user.',
    preview: true,
    admin: true
  },
  {
    name: 'EduAssignments.Read',
    description: 'Read assignments including grades',
    longDescription: 'Allows the app to read assignments and their grades on behalf of the user.',
    preview: true,
    admin: true
  },
  {
    name: 'EduAssignments.ReadWriteBasic',
    description: 'Read and write assignments without grades',
    longDescription: 'Allows the app to read and write assignments without grades on behalf of the user.',
    preview: true,
    admin: true
  },
  {
    name: 'EduAssignments.ReadWrite',
    description: 'Read and write assignments including grades',
    longDescription: 'Allows the app to read and write assignments and their grades on behalf of the user.',
    preview: true,
    admin: true
  },
  {
    name: 'EduAdministration.Read',
    description: 'View all Microsoft education app settings',
    longDescription: 'Read the state and settings of all Microsoft education apps on behalf of the user.',
    preview: true,
    admin: true
  },
  {
    name: 'EduAdministration.ReadWrite',
    description: 'Manage all Microsoft education app settings',
    longDescription: 'Manage the state and settings of all Microsoft education apps on behalf of the user.',
    preview: true,
    admin: true
  },
  {
    name: 'Bookings.Read.All',
    description: 'Read bookings information',
    longDescription:
      'Allows the app to read bookings appointments, businesses, customers, services, and staff on your behalf.',
    preview: true,
    admin: false
  },
  {
    name: 'BookingsAppointment.ReadWrite.All',
    description: 'Read and write booking appointments',
    longDescription:
      'Allows the app to read and write bookings appointments and customers, and additionally allows read businesses information, services, and staff on your behalf.',
    preview: true,
    admin: false
  },
  {
    name: 'Bookings.ReadWrite.All',
    description: 'Read and write bookings information',
    longDescription:
      'Allows the app to read and write Bookings appointments, businesses, customers, services, and staff on your behalf. Does not allow create, delete and publish of booking businesses.',
    preview: true,
    admin: false
  },
  {
    name: 'Bookings.Manage.All',
    description: 'Manage bookings information',
    longDescription:
      'Allows the app to read, write and manage bookings appointments, businesses, customers, services, and staff on your behalf.',
    preview: true,
    admin: false
  },
  {
    name: 'UserActivity.ReadWrite.CreatedByApp',
    description: 'Read and write app activity to users\' activity feed',
    longDescription:
      'Allows the app to read and report the signed-in user\'s activity in the app',
    preview: false,
    admin: false
  },
  {
    name: 'Financials.ReadWrite.All',
    description: 'Read and write financials data',
    longDescription:
      'Allows the app to read and write financials data on your behalf',
    preview: false,
    admin: false
  },
  {
    name: 'AuditLog.Read.All',
    description: 'Read audit logs data',
    longDescription: 'Allows the app to read audit logs data on your behalf',
    preview: false,
    admin: false
  },
  {
    name: 'Notifications.ReadWrite.CreatedByApp',
    description: 'Deliver and manage your notifications for this app',
    longDescription:
      'Allows the app to deliver its notifications, on your behalf. Also allows the app to read, update, and delete your notification items for this app',
    preview: false,
    admin: false
  },
  {
    name: 'OnlineMeetings.ReadAll',
    description: 'Read Online Meeting details from the app.',
    longDescription:
      'Allows the app to read VTC associated online meeting details in your organization without a signed-in user',
    preview: false,
    admin: true
  },
  {
    name: 'OnlineMeetings.ReadWrite',
    description: 'Read and manage Online Meetings.',
    longDescription:
      'Allows an app to create, delete, and read online meetings on behalf of a signed-in user.',
    preview: false,
    admin: false
  },
  {
    name: 'PrivilegedAccess.ReadWrite.AzureResources',
    description: 'Read and write privileged access to Azure resources',
    longDescription:
      'Allows the app to read and write privileged access requests to Azure resources on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'PrivilegedAccess.ReadWrite.AzureAD',
    description: 'Read and write privileged access to Azure Active Directory',
    longDescription:
      'Allows the app to request and manage just in time elevation of users to Azure AD built-in administrative roles, on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'PrivilegedAccess.ReadWrite.AzureADGroup',
    description: 'Read and write privileged access to Azure AD Groups',
    longDescription:
      'Allows the app to request and manage just in time elevation of users to members or owners of Azure AD Groups, on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'Policy.Read.All',
    description: 'Read your organization\'s policies',
    longDescription:
      'Allows the app to read your organization\'s policies on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'Policy.Read.PermissionGrant',
    description: 'Read consent and permission grant policies',
    longDescription:
      'Allows the app to read policies related to consent and permission grants for applications, on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'Policy.ReadWrite.ConditionalAccess',
    description: 'Read and write your organization\'s conditional access policies',
    longDescription:
      'Allows the app to read and write your organization\'s conditional access policies on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'Policy.ReadWrite.PermissionGrant',
    description: 'Manage consent and permission grant policies',
    longDescription: 'Allows the app to manage policies related to consent and permission grants for applications, on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'Policy.ReadWrite.TrustFramework',
    description: 'Read and write your organization\'s trust framework policies',
    longDescription: 'Allows the app to read and write your organization\'s trust framework policies on behalf of the signed-in user.',
    preview: true,
    admin: true
  },
  {
    name: 'TrustFrameworkKeySet.Read.All',
    description: 'Read trust framework key sets',
    longDescription: 'Allows the app to read trust framework key set properties on behalf of the signed-in user.',
    preview: true,
    admin: true
  },
  {
    name: 'TrustFrameworkKeySet.ReadWrite.All',
    description: 'Read and write trust framework key sets',
    longDescription: 'Allows the app to read and write trust framework key set properties on behalf of the signed-in user.',
    preview: true,
    admin: true
  },
  {
    name: 'Place.Read.All',
    description: 'Allows the app to read company places.',
    longDescription: 'Allows the app to read company places (Conf Rooms and Room Lists) for calendar events and other applications.',
    preview: true,
    admin: true
  },
  {
    name: 'Place.ReadWrite.All',
    description: 'Allows the app to read and write company places.',
    longDescription: 'Allows the app to read and write company places (Conf Rooms and Room Lists) for calendar events and other applications.',
    preview: true,
    admin: true
  },
  {
    name: 'InformationProtectionPolicy.Read',
    description: 'Read user labels and label policies',
    longDescription: 'Allows an app to read Microsoft Information Protection sensitivity labels and label policy settings for which the user is in scope.',
    preview: true,
    admin: false
  },
  {
    name: 'InformationProtectionPolicy.Read.All',
    description: 'Read all published labels and label policies for an organization',
    longDescription: 'Allows an app to read published sensitivity labels and label policy settings for the entire organization or a specific user without a signed in user.',
    preview: true,
    admin: true
  },
  {
    name: 'Whiteboards.Read',
    description: 'Read user whiteboards',
    longDescription: 'Allows the app to read all whiteboards you have access to, on your behalf.',
    preview: true,
    admin: false
  },
  {
    name: 'Whiteboards.ReadWrite',
    description: 'Manage user whiteboards',
    longDescription: 'Allows the app to read and modify all whiteboards you have access to, on your behalf.',
    preview: true,
    admin: false
  },
  {
    name: 'WorkforceIntegration.Read.All',
    description: 'Read the workforce integrations configured in the tenant',
    longDescription: 'Allows an app to read workforce integrations configured in the tenant on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'WorkforceIntegration.ReadWrite.All',
    description: 'Read and write the workforce integrations configured in the tenant',
    longDescription: 'Allows an app to read and write workforce integrations configured in the tenant on your behalf.',
    preview: true,
    admin: true
  },
  {
    name: 'UserNotification.ReadWrite.CreatedByApp',
    description: 'Deliver and manage user notifications',
    longDescription: 'Allows the app to deliver its notifications on behalf of signed-in users. Also allows the app to read, update, and delete the user\'s notification items.',
    preview: false,
    admin: false
  },
  {
    name: 'ExternalItem.Read.All',
    description: 'Search file and UDT connectors data',
    longDescription: 'Allows the app to search from the file and UDT connectors data',
    preview: true,
    admin: false
  },
  {
    name: 'IdentityUserFlow.Read.All',
    description: 'Read all identity user flows',
    longDescription: 'Allows the app to read your organization\'s user flows, on behalf of the signed-in user.',
    preview: true,
    admin: true
  },
  {
    name: 'IdentityUserFlow.ReadWrite.All',
    description: 'Read and write all identity user flows',
    longDescription: 'Allows the app to read or write your organization\'s user flows, on behalf of the signed-in user.',
    preview: true,
    admin: true
  },
  {
    name: 'Schedule.Read.All',
    description: 'Read user schedule items',
    longDescription: 'Allows the app to read schedule, schedule groups, shifts and associated entities in the Teams/Shifts application on behalf of the signed-in user.',
    preview: true,
    admin: true
  },
  {
    name: 'Schedule.ReadWrite.All',
    description: 'Read and write user schedule items',
    longDescription: 'Allows the app to manage schedule, schedule groups, shifts and associated entities in the Teams/Shifts application on behalf of the signed-in user.',
    preview: true,
    admin: true
  },
  {
    name: 'Subscription.Read.All',
    description: 'Read all webhook subscriptions',
    longDescription: 'Allows the app to read all webhook subscriptions on behalf of the signed-in user.',
    preview: true,
    admin: true
  },
  {
    name: 'UserAuthenticationMethod.Read',
    description: 'Read user authentication methods',
    longDescription: 'Allows the app to read the signed-in user\'s authentication methods, including phone numbers and Authenticator app settings. This does not allow the app to see secret information like the signed-in user\'s passwords, or to sign-in or otherwise use the signed-in user\'s authentication methods.',
    preview: true,
    admin: true
  },
  {
    name: 'UserAuthenticationMethod.Read.All',
    description: 'Read all users\' authentication methods',
    longDescription: 'Allows the app to read authentication methods of all users in your organization that the signed-in user has access to. Authentication methods include things like a user\'s phone numbers and Authenticator app settings. This does not allow the app to see secret information like passwords, or to sign-in or otherwise use the authentication methods.',
    preview: true,
    admin: true
  },
  {
    name: 'UserAuthenticationMethod.ReadWrite',
    description: 'Read and write user authentication methods',
    longDescription: 'Allows the app to read and write the signed-in user\'s authentication methods, including phone numbers and Authenticator app settings. This does not allow the app to see secret information like the signed-in user\'s passwords, or to sign-in or otherwise use the signed-in user\'s authentication methods.',
    preview: true,
    admin: true
  },
  {
    name: 'UserAuthenticationMethod.ReadWrite.All',
    description: 'Read and write all users\' authentication methods',
    longDescription: 'Allows the app to read and write authentication methods of all users in your organization that the signed-in user has access to. Authentication methods include things like a user\'s phone numbers and Authenticator app settings. This does not allow the app to see secret information like passwords, or to sign-in or otherwise use the authentication methods.',
    preview: true,
    admin: true
  },
  {
    name: 'Policy.ReadWrite.AuthenticationFlows',
    description: 'Read and write authentication flow policies',
    longDescription: 'Allows the app to read and write authentication flow policies that determine which authentication flows are enabled in the tenant and other authentication-flow-related tasks.',
    preview: true,
    admin: true
  }
];
