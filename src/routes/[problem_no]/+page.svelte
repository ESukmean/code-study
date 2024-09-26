<script>
	export let data;
</script>

<svelte:head>
	<title>코드 제출 - {data.problem.title}</title>
</svelte:head>

<div class="uk-container uk-margin-medium-top">
	<div class="uk-section uk-section-primary uk-padding-small">
		<div class="uk-padding-large">
			<h1>{data.problem.title}</h1>
			<h3>
				<a href={data.problem.link} target="_blank">{data.problem.link}</a><br /><small
					>{data.problem.dueDate}</small
				>
			</h3>
		</div>
	</div>
	<form class="uk-margin-small-top uk-card uk-card-default uk-card-body" method="POST">
		<legend class="uk-card-title">코드 정보</legend>

		<div class="uk-margin">
			<input
				name="name"
				class="uk-input"
				type="text"
				placeholder="제출자 이름"
				aria-label="Input"
				maxlength="10"
				value={data.name}
			/>
		</div>

		<div class="uk-margin">
			<textarea name="code" class="uk-textarea" rows="10" placeholder="코드" aria-label="Textarea"
			></textarea>
		</div>

		<button class="uk-button uk-button-primary">제출</button>
	</form>
</div>
