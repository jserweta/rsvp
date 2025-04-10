import { cn } from '@/lib/utils/cn';

export default function Header({
  title,
  subTitle,
  className,
}: {
  title?: string;
  subTitle?: string;
  className?: string;
}) {
  return (
    <div className={cn('mb-10 mt-10 flex flex-col gap-5', className)}>
      {title && <h2 className="font-amandine text-5xl font-[500]">{title}</h2>}
      {subTitle && <p>{subTitle}</p>}
    </div>
  );
}
