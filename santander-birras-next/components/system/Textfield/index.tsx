import React, { ChangeEvent, forwardRef } from "react";
import styles from "./Textfield.module.scss";

export interface TextfieldProperties {
  text?: string | number;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const Textfield = forwardRef(
  (
    { text, placeholder, onChange }: TextfieldProperties,
    ref: React.LegacyRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        className={styles.textfield}
        value={text}
        placeholder={placeholder}
        onChange={onChange}
      />
    );
  }
);

export default Textfield;
