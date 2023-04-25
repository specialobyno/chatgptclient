import MessageFormUI from "@/components/customMessageForms/MessageFormUI"
import { useState } from "react"
import { MessageObject } from "react-chat-engine-advanced"
import { MessageFormInputs } from "@/components/customMessageForms/StandardMessageForm"
import { usePostAiCodeMutation } from "@/state/api"


const AiCode: React.FC<MessageFormInputs> = ({ props, activeChat }) => {
    const [message, setMessage] = useState("")
    const [attachment, setAttachment] = useState<"" | File>("")
    const [triggerCode] = usePostAiCodeMutation()
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
      triggerCode(form)
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

export default AiCode