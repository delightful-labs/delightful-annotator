<script>
	import { session } from '../stores';
	import LoginButton from '../components/LoginButton.svelte';
	//import * as rdf from 'rdflib';
	import { PathFactory } from 'ldflex';
	import ComunicaEngine from '../ComunicaEngine';
	import dataFactory from '@rdfjs/data-model';
	import { browser } from '$app/environment';
	import { AnnotationFactory } from '../ldo/Annotation.ldoFactory';

	const emptyProfile = AnnotationFactory.new('https://example.com/profile1');

	$: console.log($session);

	const context = {
		'@context': {
			'@vocab': 'http://xmlns.com/foaf/0.1/',
			friends: 'knows',
			label: 'http://www.w3.org/2000/01/rdf-schema#label',
			rbn: 'https://ruben.verborgh.org/profile/#'
		}
	};
	// The query engine and its source
	const queryEngine = new ComunicaEngine('https://ruben.verborgh.org/profile/');
	// The object that can create new paths
	const path = new PathFactory({ context, queryEngine });

	/**
	 * @type {string[]|undefined}
	 */
	let pods;

	let myReadingList;

	const SELECTED_POD = 'https://storage.inrupt.com/5be41694-87b5-4cf5-b4f5-9b503cf3215c/';

	const privateResource =
		'https://storage.inrupt.com/5be41694-87b5-4cf5-b4f5-9b503cf3215c/getting-started/readingList/myList';

	$: if ($session.info.isLoggedIn && browser) fetchDoc();

	const fetchDoc = async () => {
		console.log('getting');
		const doc = await $session.fetch($session.info.webId, {
			headers: { Accept: 'application/ld+json' }
		});
		if (doc.ok) {
			// if HTTP-status is 200-299
			// get the response body (the method explained below)
			let json = await doc.json();
			console.log(json);
			// const fact = await AnnotationFactory.parse('https://example.com/aang', json, {
			// 	format: 'Turtle',
			// 	baseIRI: 'https://example.com/'
			// });
			// console.log(fact.$dataset());
		} else {
			alert('HTTP-Error: ' + doc.status);
		}
	};

	const handleSubmit = (data) => {
		const formData = Object.fromEntries(new FormData(data.target));
		console.log(formData);
	};
</script>

<LoginButton />

<form on:submit|preventDefault={(e) => handleSubmit(e)}>
	<select disabled={!pods} name="pod">
		{#if pods}
			{#each pods as pod}
				<option>{pod}</option>
			{/each}
		{:else}
			<option>Loading</option>
		{/if}
	</select>
	<input type="text" name="text" />
	<input type="submit" value="Save" />
	Test
</form>
