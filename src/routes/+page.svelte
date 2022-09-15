<script>
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
	import { SCHEMA_INRUPT, RDF, AS } from '@inrupt/vocab-common-rdf';
	import { session } from '../stores';
	import LoginButton from '../components/LoginButton.svelte';

	/**
	 * @type {string[]|undefined}
	 */
	let pods;

	$: console.log($session);

	$: if ($session.info && $session.info.webId) {
		const test = async () => {
			pods = await getPodUrlAll($session.info.webId, { fetch: fetch });
		};
		test();
	}
</script>

<LoginButton />

<form>
	<select disabled={!pods}>
		{#if pods}
			{#each pods as pod}
				<option>{pod}</option>
			{/each}
		{:else}
			<option>Loading</option>
		{/if}
	</select>
</form>
