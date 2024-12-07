import { createPortal } from "react-dom";
import { useRef, useEffect, useContext } from "react";
import UserProgressContext from "../../store/UserProgressContext";

export default function Modal({ children, open, className = "" }) {
  const dialog = useRef();
  const UserProgressContxt = useContext(UserProgressContext);

  useEffect(() => {
    const modal = dialog.current;

    if (modal) {
      console.log("Modal component found:", modal);
      if (open) {
        try {
          console.log("Opening modal...");
          modal.showModal();
        } catch (error) {
          console.error("Error showing modal:", error);
        }
      } else {
        console.log("Closing modal...");
        modal.close();
      }
    } else {
      console.warn("Dialog ref is not set.");
    }

    // Cleanup function
    return () => {
      if (modal && modal.open) {
        console.log("Cleaning up: Closing modal...");
        modal.close();
      }
    };
  }, [open]);

  // Ensure the modal root exists in the DOM
  const modalRoot = document.getElementById("modal");
  if (!modalRoot) {
    console.error("Modal root element (#modal) not found in the DOM.");
    return null;
  }

  console.log("Rendering modal to modal root.");
  return createPortal(
    <dialog ref={dialog} className={`modal ${className}`}>
      {children}
    </dialog>,
    modalRoot
  );
}
