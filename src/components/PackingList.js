import { useState } from "react";
import Swal from 'sweetalert2';
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onToggleItem,
  onClearList,
  onSortItems,
}) {
  const [sortBy, setSortBy] = useState("input");
  const [showCategory, setShowCategory] = useState("all");

  let filteredItems;
  if (showCategory === "all") {
    filteredItems = items;
  } else if (showCategory === "packed") {
    filteredItems = items.filter((item) => item.packed);
  } else if (showCategory === "unpacked") {
    filteredItems = items.filter((item) => !item.packed);
  }

  function handleSort(value) {
    setSortBy(value);
    onSortItems(value);
  }

  return (
    <div className="list">
      <div className="actions">
        <select value={showCategory} onChange={(e) => setShowCategory(e.target.value)}>
          <option value="all">All items</option>
          <option value="packed">Packed items</option>
          <option value="unpacked">Unpacked items</option>
        </select>
        <select value={sortBy} onChange={(e) => handleSort(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={async () => {
          const result = await Swal.fire({
            title: 'Clear Packing List',
            text: 'Are you sure you want to delete all items?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#6c5ce7',
            cancelButtonColor: '#e74c3c',
            confirmButtonText: 'Yes, clear it!',
            background: '#f7f9fc',
          });
          
          if (result.isConfirmed) {
            onClearList();
            Swal.fire({
              title: 'Cleared!',
              text: 'Your packing list has been cleared.',
              icon: 'success',
              confirmButtonColor: '#6c5ce7',
              timer: 2000,
              background: '#f7f9fc',
            });
          }
        }}>Clear list</button>
      </div>

      <ul>
        {filteredItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
            key={item.id}
          />
        ))}
      </ul>
    </div>
  );
}
