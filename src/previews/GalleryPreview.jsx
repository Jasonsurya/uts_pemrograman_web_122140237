import { Link } from 'react-router-dom';

export default function GalleryPreview() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Gallery Preview</h2>
      <div className="grid grid-cols-3 gap-4">
        {/* Preview gambar atau video */}
        <div className="bg-gray-800 h-32 rounded">Gambar 1</div>
        <div className="bg-gray-800 h-32 rounded">Gambar 2</div>
        <div className="bg-gray-800 h-32 rounded">Gambar 3</div>
      </div>
      <Link to="/gallery" className="block mt-4 text-red-500 hover:underline">See more →</Link>
    </section>
  );
}
