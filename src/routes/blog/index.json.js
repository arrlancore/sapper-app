import getPost from './_posts.js';

const contents = async (pageNumber) =>  {
	const posts = await getPost(pageNumber)
	const count = posts.articlesCount
	const data = posts.articles.map(post => {
		return {
			title: post.title,
			slug: post.slug
		};
	})
	return JSON.stringify([data, count])
}

export async function get(req, res) {
	const {page} = req.query
	res.writeHead(200, {
		'Content-Type': 'application/json'
	});
	const content = await contents(page)
	res.end(content);
}