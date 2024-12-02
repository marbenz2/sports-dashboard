import { NavLink } from "react-router";

export default function HomeCard({
  image,
  title,
  link,
}: {
  image: string;
  title: string;
  link: string;
}) {
  return (
    <NavLink to={link} className="group">
      <div className="overflow-x-auto card w-full p-6 shadow-xl items-center group-hover:shadow-2xl group-hover:-translate-y-1 transition-all">
        <img src={image} alt={title} className="aspect-square size-64" />
        <h2 className="text-2xl group-hover:text-primary transition-colors">
          {title}
        </h2>
      </div>
    </NavLink>
  );
}
