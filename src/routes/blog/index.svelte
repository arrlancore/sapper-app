<script context="module">

		export async function preload({ params, query }) {
			const page = query.page || 1
            console.log("TCL: preload -> query", query)
			const data = await this.fetch(`blog.json?page=${page}`)
			const response = await data.json()
			const [posts, articleCount] = response
			const POST_PER_PAGE = 10
			const currentPage = query.page || page
			const paging = () => Array.from({ length: Math.ceil(articleCount / POST_PER_PAGE) }).map((_, idx) => {
				const pageNumber = idx + 1
				const className = pageNumber == currentPage ? 'active' : ''
				return { pageNumber, className }
			})
			return {posts, paging: paging() }
		}
</script>

<script>
	export let posts;
	export let paging;
</script>

<style>
	ul {
		margin: 0 0 1em 0;
		line-height: 1.5;
	}
	.pagination-post {
		display: block;
	}
	.pagination-post > li {
		background: #eee;
		display: inline-block;
		padding: 5px;
		margin: 2px;
		min-width: 20px;
		text-align: center;
		border-radius: 4px;
	}
	.pagination-post .active {
		background: goldenrod;
	}
</style>

<svelte:head>
	<title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>

<ul>
	{#each posts as post}
		<!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
		<li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>
	{/each}
</ul>

<ul class="pagination-post">
	{#each paging as page}
		<li class={page.className}><a rel='prefetch' href='blog?page={page.pageNumber}'>{page.pageNumber}</a></li>
	{/each}
</ul>