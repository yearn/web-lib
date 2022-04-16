import {LinearClient} from '@linear/sdk';
import axios from 'axios';
import type {NextApiRequest, NextApiResponse} from 'next';

async function	withLinear(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const	client = new LinearClient({accessToken: process.env.LINEAR_OAUTH_TOKEN});
	const	feedbackType = req.body.feedbackType === 'issue' ? '❗️' : req.body.feedbackType === 'idea' ? '💡' : '💭';
	await client.issueCreate({
		teamId: process.env.LINEAR_TEAM_ID as string,
		title: `${feedbackType} - [${process.env.LINEAR_PROJECT_NAME}] ${req.body.message.slice(0, 20)} ${req.body.message.length > 20 ? '...' : ''}`,
		description: `${req.body.message}\n\nFrom page: ${req.headers.referer}`
	});
	res.status(200).end();
}

async function	withGithub(req: NextApiRequest, res: NextApiResponse): Promise<void> {
	const	feedbackType = req.body.feedbackType === 'issue' ? 'Issue' : req.body.feedbackType === 'idea' ? 'Idea' : 'Other';
	await axios.post(`https://api.github.com/repos/${process.env.GITHUB_PROJECT_OWNER}/${process.env.GITHUB_PROJECT_REPO}/issues`, {
		owner: process.env.GITHUB_PROJECT_OWNER,
		repo: process.env.GITHUB_PROJECT_REPO,
		title: `${feedbackType} - ${req.body.message.slice(0, 30)} ${req.body.message.length > 30 ? '...' : ''}`,
		body: `${req.body.message}\n\nFrom page: ${req.headers.referer}`,
		assignees: [],
		labels: [
			req.body.feedbackType === 'issue' ? 'bug' : req.body.feedbackType === 'idea' ? 'idea' : 'other'
		]
	}, {headers: {'Authorization': process.env.GITHUB_AUTH_TOKEN as string}});

	res.status(200).end();
}

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
	if (!process.env.USE_FEEDBACKS) {
		res.status(200).end();
		return;
	}
	if (process.env.FEEBACKS_TYPE === 'github')
		return (withGithub(req, res));
	return (withLinear(req, res));
}
