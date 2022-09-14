<script>
	import {
		Session,
		handleIncomingRedirect,
		getDefaultSession
	} from '@inrupt/solid-client-authn-browser';
	import {
		addUrl,
		addStringNoLocale,
		createSolidDataset,
		createThing,
		getPodUrlAll,
		getSolidDataset,
		getThingAll,
		getStringNoLocale,
		removeThing,
		saveSolidDatasetAt,
		setThing
	} from '@inrupt/solid-client';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { writable } from 'svelte/store';
	import { SCHEMA_INRUPT, RDF, AS } from '@inrupt/vocab-common-rdf';

	const SOLID_IDENTITY_PROVIDER = 'https://login.inrupt.com/';

	let session = new Session();
	let isLoggedIn = false;

	let myStore = writable(session);

	/**
	 * @type {string[]}
	 */
	let pods = [];

	$: console.log(session);

	session.onSessionRestore((e) => console.log('e'));

	// 1a. Start Login Process. Call session.login() function.
	const login = async () => {
		if (!session.info.isLoggedIn) {
			await session.login({
				oidcIssuer: SOLID_IDENTITY_PROVIDER,
				clientName: 'Inrupt tutorial client app',
				redirectUrl: $page.url.href
			});
		}
	};

	// 1b. Login Redirect. Call session.handleIncomingRedirect() function.
	// When redirected after login, finish the process by retrieving session information.
	async function handleRedirectAfterLogin() {
		console.log(session);
		await session.handleIncomingRedirect({ restorePreviousSession: true });
		isLoggedIn = session.info.isLoggedIn;
		$myStore = $myStore;
		if (session.info.webId) {
			pods = await getPodUrlAll(session.info.webId, { fetch: fetch });
		}
	}

	// The example has the login redirect back to the index.html.
	// This calls the function to process login information.
	// If the function is called when not part of the login redirect, the function is a no-op.
	$: if (browser) {
		handleRedirectAfterLogin();
	}
</script>

<p>{$myStore.info.isLoggedIn}</p>

{#if isLoggedIn}
	<button on:click={() => session.logout()}>Logout</button>
{:else}
	<button on:click={() => login()}>Login</button>
{/if}

<form>
	<select>
		{#each pods as pod}
			<option>{pod}</option>
		{/each}
	</select>
</form>
