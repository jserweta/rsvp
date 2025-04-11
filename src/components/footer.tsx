import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="p-5">
      <p className="text-center">
        Created by{' '}
        <Link
          href="https://www.jakubserweta.pl/"
          className="underline"
          target="_blank"
        >
          Jakub Serweta
        </Link>{' '}
        © 2025
      </p>
    </footer>
  );
}
