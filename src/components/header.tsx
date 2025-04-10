export default function Header({
  title,
  subTitle,
  center,
}: {
  title?: string;
  subTitle?: string;
  center?: boolean;
}) {
  return (
    <div
      className={`mb-10 mt-10 flex flex-col gap-5 ${center ? 'items-center' : ''}`}
    >
      {title && <h2 className="font-amandine text-5xl font-[500]">{title}</h2>}
      {subTitle && <p>{subTitle}</p>}
    </div>
  );
}
