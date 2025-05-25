import { useState, useEffect } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

export default function App() {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem("packingList");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  
  const [tripName, setTripName] = useState(() => {
    return localStorage.getItem("tripName") || "My Vacation";
  });

  useEffect(() => {
    localStorage.setItem("packingList", JSON.stringify(items));
    localStorage.setItem("tripName", tripName);
  }, [items, tripName]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearList() {
    setItems([]);
  }

  function handleTripNameChange(newName) {
    setTripName(newName);
  }

  function handleSortItems(sortBy) {
    const sortedItems = [...items];
    
    switch (sortBy) {
      case "input":
        break;
      case "description":
        sortedItems.sort((a, b) => a.description.localeCompare(b.description));
        break;
      case "packed":
        sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
        break;
      default:
        break;
    }
    
    setItems(sortedItems);
  }

  return (
    <div className="app">
      <Logo tripName={tripName} onTripNameChange={handleTripNameChange} />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList}
        onSortItems={handleSortItems}
      />
      <Stats items={items} />
    </div>
  );
}
