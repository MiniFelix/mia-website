import React, { useState } from "react";
import "./TextAreaSubmitMessage.scss";

const maxLength = 10;

interface TextAreaSubmitMessageProps {
  maxLength?: number;
  submitDisabled?: boolean;
  onSubmit: (val: string) => void;
}
const TextAreaSubmitMessage: React.FC<TextAreaSubmitMessageProps> = ({
  maxLength = 150,
  onSubmit,
  submitDisabled = false,
}) => {
  const [text, setText] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setText(event.target.value);
  }

  function handleOnSubmit() {
    onSubmit(text);
    setText("");
    return;
  }

  return (
    <div className="text-area-container">
      <textarea
        maxLength={maxLength}
        value={text}
        onChange={(event) => handleChange(event)}
      />

      <div className="controllers">
        <p>
          {text.length}/{maxLength}
        </p>
        <button disabled={submitDisabled} onClick={handleOnSubmit}>
          Send
        </button>
      </div>
    </div>
  );
};

export default TextAreaSubmitMessage;
