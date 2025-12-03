export function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 mt-16">
      <div className="container-custom py-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} Гид по Сочи и Красной Поляне
          </p>
          <p className="text-sm text-gray-500">
            Создано для путешественников ❤️
          </p>
        </div>
      </div>
    </footer>
  );
}
