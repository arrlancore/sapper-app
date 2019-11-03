// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.
const fetch = require('node-fetch');

const getPost = async (page) => {
	const getPagination = (number = 1) => {
		const limit = 10;
		const offset = (number * limit) - limit
		return {limit, offset}
	}
	const pagination = getPagination(page)
	const get = await fetch(`https://conduit.productionready.io/api/articles?limit=${pagination.limit}&offset=${pagination.offset}`)
	const response = await get.json()
	return response
}

export const getSinglePost = async (slug) => {
	const get = await fetch(`https://conduit.productionready.io/api/articles/${slug}`)
	const response = await get.json()
	return response
}

export default getPost
