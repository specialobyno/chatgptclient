import { useState } from "react"
import { ChatObject, MessageFormProps, MessageObject } from "react-chat-engine-advanced"
import MessageFormUI from "@/components/customMessageForms/MessageFormUI"

export interface MessageFormInputs {
  props: MessageFormProps
  activeChat: ChatObject | undefined
}
const StandardMessageForm: React.FC<MessageFormInputs> = ({ props, activeChat }) => {
  const [message, setMessage] = useState("")
  const [attachment, setAttachment] = useState<"" | File>("")
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setMessage(e.target.value)
  const handleSubmit = async () => {
    if (!activeChat || !props || !props.onSubmit) return
    const date = new Date()
      .toISOString()
      .replace("T", " ")
      .replace("Z", `${Math.random() * 1000}+00`)
    const at = attachment ? [{ blob: attachment, file: attachment.name, created: date, id: activeChat.id }] : []
    const form: MessageObject = {
      attachments: at,
      created: date,
      sender_username: props.username ?? "",
      text: message,
      id: activeChat?.id,
      custom_json: {},
    }
    props.onSubmit(form)
    setMessage("")
    setAttachment("")
  }
  return (
    <MessageFormUI
      setAttachment={setAttachment}
      message={message}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default StandardMessageForm
