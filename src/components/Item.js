import Swal from 'sweetalert2';

export default function Item({ item, onDeleteItem, onToggleItem }) {
  const handleDelete = async () => {
    const result = await Swal.fire({
      title: 'Delete Item',
      text: `Are you sure you want to remove "${item.description}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#6c5ce7',
      cancelButtonColor: '#e74c3c',
      confirmButtonText: 'Yes, remove it!',
      background: '#f7f9fc',
    });

    if (result.isConfirmed) {
      onDeleteItem(item.id);
      Swal.fire({
        title: 'Deleted!',
        text: `${item.description} has been removed.`,
        icon: 'success',
        confirmButtonColor: '#6c5ce7',
        timer: 1500,
        background: '#f7f9fc',
        showConfirmButton: false
      });
    }
  };

  const handleToggle = async () => {
    onToggleItem(item.id);
    const toast = Swal.mixin({
      toast: true,
      position: 'bottom-end',
      showConfirmButton: false,
      timer: 2000,
      background: '#f7f9fc',
    });

    toast.fire({
      icon: item.packed ? 'success' : 'info',
      title: item.packed ? 
        `${item.description} marked as packed! 🎉` : 
        `${item.description} marked as unpacked 📦`
    });
  };

  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={handleToggle}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={handleDelete}>❌</button>
    </li>
  );
}
