export interface Post {
    image: { name: string; url: string };
    title: string;
    description: string;
    categories: PostCategory[];
    author: { name: string; picture: { formats: { large: { url: string } } } };
    published_at: Date;
    slug: string;
}

export interface PostCategory {
    id: number;
    name: string;
    slug: string;
}
