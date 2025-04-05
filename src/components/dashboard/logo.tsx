import { IoIosPaperPlane } from 'react-icons/io';

export default function Logo() {
  return (
    <div className={`flex flex-row items-center gap-3 leading-none text-white`}>
      <IoIosPaperPlane className="h-12 w-12" />
      <p className="text-[44px]">Rsvp</p>
    </div>
  );
}
