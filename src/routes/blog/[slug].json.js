import getPost, {getSinglePost} from './_posts.js';


export async function get(req, res, next) {
	const { slug } = req.params;
	const data = await getSinglePost(slug)
	const {article} = data || {}
	if (article) {
		res.writeHead(200, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify(article));
	} else {
		res.writeHead(404, {
			'Content-Type': 'application/json'
		});

		res.end(JSON.stringify({
			message: `Not found`
		}));
	}
}
