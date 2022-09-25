<script>
	import { session } from '../stores';
	import LoginButton from '../components/LoginButton.svelte';
	//import * as rdf from 'rdflib';
	import { PathFactory } from 'ldflex';
	import ComunicaEngine from '../ComunicaEngine';
	import dataFactory from '@rdfjs/data-model';
	import { browser } from '$app/environment';
	import { LinkedDataObject } from 'ldo';
	import { AnnotationFactory } from '../ldo/Annotation.ldoFactory';
	import process from 'process';

	const emptyProfile = AnnotationFactory.new('https://example.com/profile1');

	emptyProfile.bodyValue = 'Test';

	console.log(emptyProfile.bodyValue);

	let fetcher;

	$: console.log(fetcher);

	$: if (browser) {
		window.process = process;
	}

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

	const ruben = path.create({
		subject: dataFactory.namedNode('https://ruben.verborgh.org/profile/#me')
	});

	$: if (browser) {
		//showPerson(ruben);
	}

	const validate = async (id) => {
		const ses = await $session.clientAuthentication.validateCurrentSession(id);
	};

	$: if ($session && browser) {
		//validate($session.info.sessionId);
	}

	/**
	 * @type {string[]|undefined}
	 */
	let pods;

	let myReadingList;

	const SELECTED_POD = 'https://storage.inrupt.com/5be41694-87b5-4cf5-b4f5-9b503cf3215c/';

	const addFetcher = async () => {
		const privateResource =
			'https://storage.inrupt.com/5be41694-87b5-4cf5-b4f5-9b503cf3215c/getting-started/readingList/myList';
		window.solidFetcher = $session.fetch;
		fetcher = rdf.fetcher(store);
		try {
			await fetcher.load(privateResource).then((a) => console.log(a));
		} catch (e) {
			console.error(e);
		}
	};

	$: if ($session.info.isLoggedIn && browser) {
		//addFetcher();
	}

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
