import { type Metadata } from "next";
import { allJtmovies } from "content-collections";
import Link from "next/link";
import count from 'word-count'
import { config } from "@/lib/config";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: `电影十三张 | ${config.site.title}`,
  description: `电影评论和思考 - ${config.site.title}`,
  keywords: `${config.site.title}, 电影, 电影评论, 电影十三张, 影评`,
};

export default function JtmoviePage() {
  const movies = allJtmovies.sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">电影十三张</h1>
        <p className="text-gray-600">记录电影中的光影时刻，分享观影心得和思考</p>
      </div>

      <div className="space-y-8">
        {movies.map((movie: any) => (
          <article
            key={movie.slug}
            className=""
          >
            <Link href={`/jtmovie/${movie.slug}`}>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold underline underline-offset-4">
                    {movie.title}
                  </h2>
                  <span className="text-sm text-gray-500">
                    {formatDate(movie.date)} · {count(movie.content)} 字
                  </span>
                </div>
                <p className="text-gray-600 line-clamp-2">
                  {movie.summary}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}