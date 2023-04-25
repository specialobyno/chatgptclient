import { PaperAirplaneIcon, PaperClipIcon, XMarkIcon } from "@heroicons/react/24/solid"
import { KeyboardEvent, useState } from "react"

import Dropzone from "react-dropzone"

interface Props {
  setAttachment:React.Dispatch<React.SetStateAction<"" | File>>
  message: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleSubmit: () => void
  appendText?: string
  handleKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void
}

const MessageFormUI: React.FC<Props> = ({ setAttachment, message, handleChange, handleSubmit, appendText, handleKeyDown }) => {
  const [preview, setPreview] = useState("")
  return (
    <div className="message-form-container">
      {preview && (
        <div className="message-form-preview">
          <img
            src={preview}
            alt="Preview"
            onLoad={() => URL.revokeObjectURL(preview)}
            className="message-form-preview-image"
          />
          <XMarkIcon
            className="message-form-icon-x"
            onClick={() => {
              setPreview("")
              setAttachment("")
            }}
          />
        </div>
      )}
      <div className="message-form">
        <div className="message-form-input-container">
          <input
            className="message-form-input"
            type="text"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Send a Message..."
          />
          {
            appendText && (
              <input 
              type="text" 
              className="message-form-assist"
              disabled={true}
              value={`${message} ${appendText}`}
              />
            )
          }
          {/* <textarea
          style={{ height: 30, maxWidth: 100, overflow: 'text-wrap' }}
          cols={1}
          className="message-form-input"
          rows={3}
            onChange={handleChange}
            placeholder="Send a Message..."
          >
            {message}
        </textarea> */}
        </div>
        <div className="message-form-icons">
          <Dropzone
            accept={{
              "image/jpg": [".png", ".jpg", ".jpeg", ".gif", ".pdf", ".docx", ".mp3", ".mp4", ".ogg", ".zip"],
            }}
            multiple={false}
            noClick={true}
            onDrop={(acceptedFiles) => {
              setAttachment(acceptedFiles[0])
              setPreview(URL.createObjectURL(acceptedFiles[0]))
            }}
          >
            {({ getRootProps, getInputProps, open }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <PaperClipIcon className="message-form-icon-clip" onClick={open} />
              </div>
            )}
          </Dropzone>
          <hr className="vertical-line" />
          <PaperAirplaneIcon
            className="message-form-icon-airplane"
            onClick={() => {
              if (!preview && !message) return
              setPreview("")
              handleSubmit()
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default MessageFormUI
