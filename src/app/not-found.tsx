import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container-custom py-16">
      <div className="text-center max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Страница не найдена
        </h2>
        <p className="text-gray-600 mb-8">
          К сожалению, запрошенная страница не существует.
        </p>
        <Link
          href="/"
          className="btn-primary"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
