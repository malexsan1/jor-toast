import React from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf";
import { useToastContext } from "../ToastProvider";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

const defaultFormState = {
  message: "",
  variant: "notice",
};

function ToastPlayground() {
  const [formState, setFormState] = React.useState(defaultFormState);
  const { addToast } = useToastContext();

  const handleFormChange = (fieldName) => (event) => {
    setFormState((prevState) => ({
      ...prevState,
      [fieldName]: event.target.value,
    }));
  };

  const onAddToast = (event) => {
    event.preventDefault();

    addToast(formState);
    setFormState(defaultFormState);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

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
              value={formState.message}
              onChange={handleFormChange("message")}
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
                    onChange={handleFormChange("variant")}
                    checked={formState.variant === variant}
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
