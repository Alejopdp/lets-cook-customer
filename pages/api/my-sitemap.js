const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const { getPosts } = require("../../helpers/serverRequests/blog/index");

const generateSitemap = async (req, res) => {
    const postRes = await getPosts();
    // console.log("Post: ", posts);

    // An array with your links
    const links = postRes.data.map((post) => ({ url: `/blogs/recetas/${post.slug}`, changefreq: "daily", priority: 0.5 }));

    // Create a stream to write to
    const stream = new SitemapStream({ hostname: `${process.env.NEXT_PUBLIC_DOMAIN}` });

    // Return a promise that resolves with your XML string
    const xmlString = await streamToPromise(Readable.from(links).pipe(stream)).then((data) => data.toString());

    res.end(xmlString);
};

export default generateSitemap;
