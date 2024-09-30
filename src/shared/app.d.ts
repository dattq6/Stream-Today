
interface IArticleLink {
  api: {
    news: {
      href: string;
    }
  }
  web: {
    href: string
  }
}

interface IArticleImage {
  name: string;
  width: number;
  height: number;
  alt: string;
  caption: string;
  url: string;
}

interface ICategory { }

interface IArticle {
  docId: string;
  images: Array<IArticleImage>;
  description: string;
  published: string;
  type: string;
  premium: boolean;
  links: Array<IArticleLink>;
  lastModified: string;
  categories: Array<ICategory>;
  headline: string;
}