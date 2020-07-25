import Swal from 'sweetalert2';

// type is 'success' or 'error'
export const showAlert = (type, msg) => {
  Swal.fire({
    position: 'top',
    icon: type,
    title: msg,
    background: '#fff',
    showConfirmButton: false,
    timer: 1500,
  });
};
