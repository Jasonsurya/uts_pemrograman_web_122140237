import { Link } from 'react-router-dom';

export default function ShopPreview() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-2">Shop Preview</h2>
      <div className="grid grid-cols-2 gap-4">
        {/* Preview produk hardcoded atau ambil dari props */}
        <div className="bg-gray-800 p-4 rounded">Produk 1</div>
        <div className="bg-gray-800 p-4 rounded">Produk 2</div>
      </div>
      <Link to="/shop" className="block mt-4 text-red-500 hover:underline">See more →</Link>
    </section>
  );
}
