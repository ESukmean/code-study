<script>
	/** @type {import('./+page.ts').DataLoadType} */
	export let data;
	import { browser } from '$app/environment';

	import looking from '$lib/images/looking.jpg';
	import looking2 from '$lib/images/looking2.jpeg';
	import looking3 from '$lib/images/looking3.jpg';
	import looking4 from '$lib/images/looking4.jpg';
	import looking5 from '$lib/images/looking5.png';
	import looking6 from '$lib/images/looking6.jpg';
	import looking7 from '$lib/images/looking7.png';
	import looking8 from '$lib/images/looking8.jpg';
	import looking9 from '$lib/images/looking9.jpg';
	import looking10 from '$lib/images/looking10.jpg';
	import looking11 from '$lib/images/looking11.jpg';
	import looking12 from '$lib/images/looking12.jpg';
	import looking13 from '$lib/images/looking13.jpg';

	$: if (browser) {
		if (typeof UIkit != undefined) UIkit.update(document.body, 'update');
	}

	function looking_img() {
		let no = Math.floor(Math.random() * 13);

		const imgs = [
			looking,
			looking2,
			looking3,
			looking4,
			looking5,
			looking6,
			looking7,
			looking8,
			looking9,
			looking10,
			looking11,
			looking12,
			looking13
		];

		return imgs[no];
	}
</script>

<svelte:head>
	<title>코테 스터디 업로드</title>
</svelte:head>

<div class="uk-container uk-margin-medium-top">
	<div class="uk-grid" uk-grid>
		<div class="uk-width-1-5@m">
			<div class="uk-card uk-card-default uk-card-body" uk-sticky="media: @m">
				<ul class="uk-nav uk-nav-default">
					<li class="uk-nav-header">문제 목록</li>
					<li class="uk-nav-divider"></li>
					{#each data.problems as problems}
						<li class="uk-parent">
							<a href="#problem-{problems[0].dueDate}"
								>{problems[0].dueDate
									.replace('T', ' ')
									.substring(0, problems[0].dueDate.length - 3)}</a
							>
							{#if problems[0].dueDate == data.problems[0][0].dueDate}
							<ul class="uk-nav-sub">
								{#each problems as problem}
									<li>
										<a href="#problem-{problem.pkId}"
											><span class="uk-badge"
												>{problem.pkId in data.submit
													? [...new Set(data.submit[problem.pkId].map((s) => s.name))].length
													: 0}</span
											>{problem.title}</a
										>
									</li>
								{/each}
							</ul>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="uk-width-4-5@m">
			{#each data.problems as problems}
				<div class="uk-card uk-card-default uk-card-body uk-margin-medium-bottom">
					<h2 class="uk-h2 uk-heading-bullet" id="problem-{problems[0].dueDate}">
						{problems[0].dueDate.replace('T', ' ')} <small>({problems.length}문제)</small>
					</h2>
					<dl class="uk-description-list uk-description-list-divider">
						{#each problems as problem}
							<dt id="problem-{problem.pkId}" class="uk-margin-medium-top">
								<h2>
									<a class="uk-link-heading" href="#problem-{problem.pkId}">{problem.title}</a>
								</h2>
								{#if problem.pkId in data.submit}
									<a class="uk-button uk-button-danger" href="/{problem.pkId}"
										>코드 제출 ({[...new Set(data.submit[problem.pkId].map((s) => s.name))].length +
											1}등)</a
									>
								{:else}
									<a class="uk-button uk-button-danger" href="/{problem.pkId}">첫번째로 코드 제출</a
									>
								{/if}
								<a
									class="uk-button uk-button-primary"
									href={problem.link}
									target="_blank"
									rel="noreferrer"
									referrerpolicy="no-referrer">문제 바로가기</a
								>
								<p class="uk-text-meta">
									{#if problem.pkId in data.submit}
										제출: {[...new Set(data.submit[problem.pkId].map((s) => s.name))].join(' · ')}
									{/if}
								</p>
							</dt>
							<dd class="uk-margin-medium-top uk-margin-medium-bottom">
								{#if problem.pkId in data.submit}
									{#each data.submit[problem.pkId].sort((a, b) => {
										return b.pkId - a.pkId;
									}) as s}
										<div uk-alert class="uk-alert-success uk-text-emphasis">
											<h3 class="uk-heading-bullet">
												{s.name}<br /><small>{s.submitDate.replace('T', ' ')}</small>
											</h3>
											{#if s.summary == null}
												<p class="uk-text-meta">코드 요약 진행중입니다...</p>
											{:else}
												<p class="uk-margin-medium-bottom" style="white-space: pre-wrap">
													{s.summary.trim()}
												</p>
											{/if}
										</div>
										<div>
											<ul uk-tab>
												<li class="uk-active"><a href="">코드 미리보기 방지</a></li>
												<li>
													<a href=""
														>제출한 코드 ({s.code.trim().split(/\r\n|\r|\n/).length}줄 · {s.code.trim()
															.length}자)</a
													>
												</li>
												<li>
													{#if s.codeConverted != null && problem.dueDate == data.problems[0][0].dueDate}
														<a
															>Python 변환 코드 ({s.codeConverted.trim().split(/\r\n|\r|\n/)
																.length}줄 · {s.codeConverted.trim().length}자)</a
														>
													{/if}
												</li>
											</ul>
											<div class="uk-switcher uk-margin-large-bottom">
												<div>
													<div class="uk-section uk-section-secondary">
														<img
															src={looking_img()}
															class="uk-align-center"
															style="max-width:min(70%, 420px); max-height: 250px"
														/>
													</div>
												</div>
												<div><pre><code>{s.code.trim()}</code></pre></div>
												{#if s.codeConverted != null && problem.dueDate == data.problems[0][0].dueDate}
													<div><pre><code>{s.codeConverted.trim()}</code></pre></div>
												{/if}
											</div>
										</div>
									{/each}
								{/if}
							</dd>
						{/each}
					</dl>
				</div>
			{/each}
		</div>
	</div>
</div>
