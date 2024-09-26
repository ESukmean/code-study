// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = false;
export const ssr = true;
export const csr = false;

type DataLoadType = { problems: [[Problem]], submit: { [key: number]: [Submit] } };
type Problem = {
	pkId: number;
	title: string;
	link: string;
	dueDate: string;
}
type Submit = {
	pkId: number;
	problemId: number;
	name: string;
	submitDate: string;
	code: string;
	codeConverted: string | null;
	codeLength: number;
	summary: string | null;
}

export type { DataLoadType, Problem }