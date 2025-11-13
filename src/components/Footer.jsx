export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full bg-white border-t py-4">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-600">
        © {year} — Alumno: Ruben Ruiz Diaz
      </div>
    </footer>
  );
}
