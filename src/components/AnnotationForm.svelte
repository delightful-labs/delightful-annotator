<script>
	import Form from 'svelte-json-schema-to-form/package/Form.svelte';

	const schema = {
		title: 'Annotation',
		type: 'object',
		properties: {
			motivatedBy: {
				title: 'Motivated By',
				type: 'string',
				enum: [
					'assessing',
					'bookmarking',
					'classifying',
					'commenting',
					'describing',
					'editing',
					'highlighting',
					'identifying',
					'linking',
					'moderating',
					'questioning',
					'replying',
					'tagging'
				],
				component: 'select'
			},
			bodyValue: {
				title: 'Body Text',
				type: 'string'
			},
			hasTarget: {
				title: 'Target',
				type: 'string'
			}
		}
	};

	const changeHandler = () => {};

	const data = {};
</script>

<Form {schema} {data} {changeHandler} />
