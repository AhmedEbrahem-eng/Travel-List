import { useState } from "react";
import Swal from 'sweetalert2';

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      Swal.fire({
        title: 'Oops!',
        text: 'Please enter an item description',
        icon: 'warning',
        confirmButtonColor: '#6c5ce7',
        background: '#f7f9fc',
        timer: 2000,
        showConfirmButton: false
      });
      return;
    }

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    const toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      background: '#f7f9fc',
    });

    toast.fire({
      icon: 'success',
      title: `Added ${quantity} ${description}${quantity > 1 ? 's' : ''} to your list! 🎒`
    });

    setDescription("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
