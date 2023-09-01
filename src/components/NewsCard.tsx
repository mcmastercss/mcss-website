import type { Thumbnail } from "../payload-types";
import defaultImage from "../assets/images/default.jpg";

export type Title = string;

type Props = {
  title: string;
  body: string;
  href: string;
  thumbnail: Thumbnail | string | undefined;
};

const handleThumbnail = (thumbnail: Thumbnail | string | undefined): string => {
  if (!thumbnail) {
    return defaultImage.src;
  }
  if (typeof thumbnail === "string") {
    return thumbnail;
  }

  const nonNullThumbnail = thumbnail as Thumbnail;
  return nonNullThumbnail?.url !== undefined ? import.meta.env.PAYLOAD_URL + nonNullThumbnail.url : defaultImage.src;
};

const NewsCard = ({ title, body, href, thumbnail }: Props) => {
  return (
    <div className="z-0 mb-5 flex w-[25rem] snap-start flex-col rounded-md bg-[#275AE0] px-6 py-8 text-slate-50 shadow-lg">
      <img
        className="mb-3 aspect-video rounded-md object-cover"
        src={handleThumbnail(thumbnail)}
        alt=""
      />
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="py-4 text-sm">{body}</p>
      <a href={href} className="w-fit text-lg font-bold hover:text-neutral-200">
        Read More
      </a>
    </div>
  );
};

export default NewsCard;
