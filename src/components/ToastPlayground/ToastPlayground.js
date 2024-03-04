import React from "react";

import Button from "../Button";
import Toast from "../Toast";
import ToastShelf from "../ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [showToast, setShowToast] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [selectedVariant, setSelectedVariant] = React.useState("notice");
  const [toasts, setToasts] = React.useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const onAddToast = (event) => {
    event.preventDefault();

    setToasts((prevToasts) => [
      ...prevToasts,
      { message, variant: selectedVariant, id: crypto.randomUUID() },
    ]);
    setMessage("");
    setSelectedVariant("notice");
  };

  const removeToast = (id) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      {showToast && (
        <Toast variant={selectedVariant} onClose={() => setShowToast(false)}>
          {message}
        </Toast>
      )}

      <ToastShelf toasts={toasts} onRemoveToast={removeToast} />

      <form onSubmit={onAddToast} className={styles.controlsWrapper}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              className={styles.messageInput}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => {
              return (
                <label htmlFor={`variant-${variant}`} key={variant}>
                  <input
                    type="radio"
                    name="variant"
                    value={variant}
                    id={`variant-${variant}`}
                    checked={selectedVariant === variant}
                    onChange={(event) => {
                      setSelectedVariant(event.target.value);
                    }}
                  />
                  {variant}
                </label>
              );
            })}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
