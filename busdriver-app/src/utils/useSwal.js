import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

// Couleurs et styles alignés à ton thème (bleu pastel, coins arrondis, ombre douce...)
const THEME_OPTIONS = {
  customClass: {
    popup: 'swal2-theme-popup',
    confirmButton: 'swal2-theme-confirm',
    cancelButton: 'swal2-theme-cancel',
    title: 'swal2-theme-title',
    content: 'swal2-theme-content',
  },
  buttonsStyling: false,
  background: 'rgba(255,255,255,0.98)',
};

// Utilisation: import swal from '../utils/useSwal'; puis swal.fire({ ... })
const swal = {
  fire: (options) => MySwal.fire({ ...THEME_OPTIONS, ...options }),
  ...MySwal
};
export default swal;

// Ajoute ce CSS dans ton App.css ou index.css :
// .swal2-theme-popup {
//   border-radius: 22px !important;
//   box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
//   border: 1px solid #e7f4ff !important;
//   padding: 1.5rem 2rem !important;
// }
// .swal2-theme-title {
//   color: #343434 !important;
//   font-size: 1.25rem !important;
//   font-weight: 600 !important;
//   letter-spacing: -0.008em !important;
// }
// .swal2-theme-content {
//   color: #343434 !important;
// }
// .swal2-theme-confirm {
//   background: linear-gradient(90deg,#a2b3f5,#7bb6fa) !important;
//   color: #fff !important;
//   border-radius: 10px !important;
//   font-weight: 600 !important;
//   font-size: 1rem !important;
//   padding: 0.5rem 1.5rem !important;
//   box-shadow: none !important;
//   margin: 0 0.5rem !important;
// }
// .swal2-theme-cancel {
//   background: #e3e7f5 !important;
//   color: #343434 !important;
//   border-radius: 10px !important;
//   font-weight: 600 !important;
//   font-size: 1rem !important;
//   padding: 0.5rem 1.5rem !important;
//   box-shadow: none !important;
//   margin: 0 0.5rem !important;
// }
