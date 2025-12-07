export default function FaqTabs({ categories, selected, setSelected }) {
  return (
    <div className="flex flex-wrap gap-3 justify-center mb-8">
      {["All", ...categories].map((cat) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition 
          ${
            selected === cat
              ? "bg-primary text-white shadow-md"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
