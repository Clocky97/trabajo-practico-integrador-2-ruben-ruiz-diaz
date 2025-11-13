export default function Loading({ label = "Cargando..." }) {
  return (
    <div className="w-full flex flex-col items-center justify-center py-10">
      {/* Spiner */}
      <div className="h-8 w-8 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mb-3" />

   
      <p className="text-gray-700 text-sm">{label}</p>
    </div>
  );
}