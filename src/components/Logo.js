import Swal from 'sweetalert2';

export default function Logo({ tripName, onTripNameChange }) {
  async function handleClick() {
    const result = await Swal.fire({
      title: 'Change Trip Name',
      input: 'text',
      inputValue: tripName,
      inputLabel: 'Enter your new trip name',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#6c5ce7',
      background: '#f7f9fc',
      inputValidator: (value) => {
        if (!value) {
          return 'Please enter a trip name!';
        }
      }
    });

    if (result.isConfirmed && result.value) {
      onTripNameChange(result.value);
      Swal.fire({
        icon: 'success',
        title: 'Trip name updated!',
        text: `Your trip is now called "${result.value}"`,
        confirmButtonColor: '#6c5ce7',
        timer: 2000,
        background: '#f7f9fc',
      });
    }
  }

  return (
    <h1 onClick={handleClick} style={{ cursor: "pointer" }}>
      🌴 {tripName} 🎒
    </h1>
  );
}