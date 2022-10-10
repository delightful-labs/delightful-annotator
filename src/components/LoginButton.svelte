<script>
	import { session } from '../stores';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';

	//const SOLID_IDENTITY_PROVIDER = 'https://login.inrupt.com/';
	const SOLID_IDENTITY_PROVIDER = 'https://solidcommunity.net/';

	const login = async () => {
		if (!$session.info.isLoggedIn) {
			await $session.login({
				oidcIssuer: SOLID_IDENTITY_PROVIDER,
				clientName: 'Inrupt tutorial client app',
				redirectUrl: $page.url.href
			});
		}
	};

	async function handleRedirectAfterLogin() {
		await $session.handleIncomingRedirect({ restorePreviousSession: true });
		$session = $session;
	}

	$: if (browser) {
		handleRedirectAfterLogin();
	}
</script>

<p>{$session.info.isLoggedIn}</p>

{#if $session.info.isLoggedIn}
	<button on:click={() => $session.logout()}>Logout</button>
{:else}
	<button on:click={() => login()}>Login</button>
{/if}
