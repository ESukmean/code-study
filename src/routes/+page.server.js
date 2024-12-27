var problems = undefined;
async function loadAndPrefetchProblem() {
	problems = await fetch('http://code-study-api.kr-1-ts.esukmean.com/problem/').then((f) => f.json());

	return problems;
}
async function loadSubmit() {
	let list = await fetch(`http://code-study-api.kr-1-ts.esukmean.com/problem/submitted`).then((f) =>
		f.json()
	);
	let toReturn = {};
	for (const p of list) {
		if (p.problemId in toReturn == false) toReturn[p.problemId] = [];

		toReturn[p.problemId].push(p);
	}

	return toReturn;
}

export async function load() {
	return {
		problems: await loadAndPrefetchProblem(),
		submit: await loadSubmit()
	};
}
