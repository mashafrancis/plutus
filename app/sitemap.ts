export default async function sitemap() {
	const routes = ['', '/uses'].map((route) => ({
		url: `https://plutus.francismasha.com${route}`,
		lastModified: new Date().toISOString().split('T')[0],
	}));

	return [...routes];
}
