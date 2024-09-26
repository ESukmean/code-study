import { fail, redirect } from '@sveltejs/kit';

async function loadProblemInfo(pno) {
	return await fetch(`http://code-study-api/problem/${pno}`).then((f) => f.json());
}

export async function load({ params, cookies }) {
	return {
		problem: await loadProblemInfo(params.problem_no),
		name: cookies.get('name')
	};
}

export const actions = {
	default: async ({ params, request, cookies }) => {
		const problem_no = params.problem_no;
		const data = await request.formData();

		const name = data.get('name').trim();
		const code = data.get('code').trim();

		cookies.set('name', name, { path: '/', expires: new Date(2025, 12, 30, 0, 0, 0) });

		const details = { name, code };
		let formBody = [];
		for (var property in details) {
			var encodedKey = encodeURIComponent(property);
			var encodedValue = encodeURIComponent(details[property]);
			formBody.push(encodedKey + '=' + encodedValue);
		}

		await fetch(`http://code-study-api/problem/${problem_no}/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: formBody.join('&')
		}).then((resp) => resp.text());

		redirect(302, `/#problem-${problem_no}`);
	}
};
