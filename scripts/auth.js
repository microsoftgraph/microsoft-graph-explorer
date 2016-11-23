hello.init({
	msft: {
		name: 'Azure Active Directory',	
		oauth: {
			version: 2,
			auth: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
			grant: 'https://login.microsoftonline.com/common/oauth2/v2.0/token'
		},
		scope_delim: ' ',

		// Don't even try submitting via form.
		// This means no POST operations in <=IE9
		form: false
	}
});