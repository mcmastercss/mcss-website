export type Title = string;

type Props = {
  title: string;
  body: string;
  href: string;
  thumbnailURL: string;
};

const NewsCard = ({ title, body, href, thumbnailURL }: Props) => {
  return (
    <div className="z-0 mb-5 flex w-[25rem] snap-start flex-col rounded-md bg-[#275AE0] px-6 py-8 text-slate-50 shadow-lg">
      <img
        className="mb-3 aspect-video rounded-md object-cover"
        src={thumbnailURL}
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
