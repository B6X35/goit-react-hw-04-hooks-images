import { useEffect } from "react";
import { createPortal } from "react-dom";
import style from "./Modal.module.css";
import PropTypes from "prop-types";

const modalRoot = document.querySelector("#modal-root");

function Modal({ closeModal, children }) {
  useEffect(() => {
    window.addEventListener("keydown", close);

    return () => window.removeEventListener("keydown", close);
  }, []);

  const close = (e) => {
    if (e.code === "Escape") {
      return closeModal();
    }
    const { currentTarget, target } = e;
    if (currentTarget === target) {
      closeModal();
    }
  };

  return createPortal(
    <div onClick={closeModal} className={style.overlay}>
      <div className={style.modal}>{children}</div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propType = {
  closeModal: PropTypes.func.isRequired,
};
