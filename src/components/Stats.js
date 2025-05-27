export default function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>
          Start planning your adventure! Add items to your packing list 🚀
        </em>
      </footer>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);
  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <footer className="stats">
      <div>
        <em>
          {percentage === 100 ? (
            "🎉 You're all packed and ready for your adventure! ✈️"
          ) : (
            <>
              🎒 Progress: {numPacked}/{numItems} items packed ({percentage}%)
              <br />
              📦 Total items to pack: {totalQuantity}
              {percentage >= 80 && percentage < 100 ? (
                <>
                  <br />
                  Almost there! Just a few more items to pack! 🎯
                </>
              ) : null}
            </>
          )}
        </em>
      </div>
    </footer>
  );
}
