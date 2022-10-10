<script>
	import { session } from '../stores';
	import LoginButton from '../components/LoginButton.svelte';
	//import * as rdf from 'rdflib';
	import { browser } from '$app/environment';
	import { AnnotationFactory } from '../ldo/Annotation.ldoFactory';
	import AnnotationForm from '../components/AnnotationForm.svelte';

	//import { getPodUrlAll } from '@inrupt/solid-client';

	$: console.log($session);

	/**
	 * @type {string[]|undefined}
	 */
	let pods;

	let myReadingList;

	const SELECTED_POD = 'https://mjamesderocher.solidcommunity.net/';

	const privateResource = 'https://mjamesderocher.solidcommunity.net/annotations/';

	//This works. Just commented out for now because will want to use it elsewhere.
	//$: if ($session.info.isLoggedIn && browser) fetchDoc();

	// const getMyPods = async function () {
	// 	const mypods = await getPodUrlAll($session.info.webId, { fetch: $session.fetch });
	// 	console.log(mypods);
	// };

	//$: if ($session.info.isLoggedIn && browser) getMyPods();

	const createDoc = async () => {
		const doc = await $session.fetch(privateResource, {
			method: 'PUT'
		});
		console.log(doc);
	};

	const fetchDoc = async () => {
		const doc = await $session.fetch(privateResource, {
			headers: { Accept: 'application/ld+json' }
		});
		if (doc.ok) {
			// if HTTP-status is 200-299
			// get the response body (the method explained below)
			console.log('here');
			let json = await doc.json();
			console.log(json);
		} else {
			if (doc.status === 404) {
				console.log('not here');
				createDoc();
			}
			//alert('HTTP-Error: ' + doc.status);
		}
	};

	/**
	 * @param {any} data
	 */
	const handleSubmit = (data) => {
		const formData = Object.fromEntries(new FormData(data.target));
		formData.type = 'Annotation';
		const test = AnnotationFactory.fromJson(formData);
		console.log(test.bodyValue);
	};
</script>

<LoginButton />

<form on:submit|preventDefault={(e) => handleSubmit(e)}>
	<!--<select disabled={!pods} name="pod">
		{#if pods}
			{#each pods as pod}
				<option>{pod}</option>
			{/each}
		{:else}
			<option>Loading</option>
		{/if}
	</select>-->
	<AnnotationForm />
	<input type="submit" value="Save" />
</form>
