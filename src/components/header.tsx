export default function Header({
  title,
  subTitle,
}: {
  title?: string;
  subTitle?: string;
}) {
  return (
    <div className="mb-10 mt-10 flex flex-col gap-5">
      {title && <h2 className="font-amandine text-5xl font-[500]">{title}</h2>}
      {subTitle && <p>{subTitle}</p>}
    </div>
  );
}
