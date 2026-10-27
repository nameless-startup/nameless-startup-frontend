import { Blog } from "./gilan";
import { places } from "./places";

export const blogs: Blog[] = [
  {
    id: "1",
    title: "۱۰ تجربه آرام در گیلان که نباید از دست بدهید",
    excerpt:
      "از قدم زدن در بازار تا یک فنجان چای؛ ده پیشنهاد برای آرام‌تر دیدن و عمیق‌تر تجربه کردن گیلان.",
    image: "https://picsum.photos/seed/gilan-blog-1/800/440",
    author: "امینا رضایی",
    date: "۱۵ آبان ۱۴۰۳",
    readTime: "۴ دقیقه خواندن",
    category: "راهنمای سفر",
  },
  {
    id: "2",
    title: "بهترین غذاهای سنتی گیلانی برای امتحان",
    excerpt:
      "از میرزاقاسمی تا باقلاقاتق؛ راهی برای آشنایی با طعم‌ها و فرهنگ سفره گیلانی.",
    image: "https://picsum.photos/seed/gilan-blog-2/800/440",
    author: "مهرانی احمدی",
    date: "۱۰ آبان ۱۴۰۳",
    readTime: "۲ دقیقه خواندن",
    category: "غذا و فرهنگ",
  },
  {
    id: "3",
    title: "راهنمای یک گردش آرام در ماسوله",
    excerpt:
      "پیشنهادهایی برای برنامه‌ریزی، قدم زدن و تجربه یک بازدید مسئولانه در ماسوله.",
    image: "https://picsum.photos/seed/gilan-blog-3/800/440",
    author: "سارا حسینی",
    date: "۵ آبان ۱۴۰۳",
    readTime: "۲ دقیقه خواندن",
    category: "راهنمای مقصد",
  },
  ...places.map((place): Blog => ({
    id: `place-${place.id}`,
    title: `راهنمای بازدید از ${place.name}`,
    excerpt: place.description,
    image: place.image,
    author: "تحریریه گیلانه",
    date: "۵ آبان ۱۴۰۵",
    readTime: "۲ دقیقه خواندن",
    category: "راهنمای مقصد",
  })),
];
