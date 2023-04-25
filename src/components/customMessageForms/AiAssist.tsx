import MessageFormUI from "@/components/customMessageForms/MessageFormUI"
import { KeyboardEvent, useEffect, useState } from "react"
import { MessageObject } from "react-chat-engine-advanced"
import { MessageFormInputs } from "@/components/customMessageForms/StandardMessageForm"
import { usePostAiAssistMutation } from "@/state/api"



const AiAssist: React.FC<MessageFormInputs> = ({ props, activeChat }) => {


    const [message, setMessage] = useState("")
    const [appendText, setAppendText] = useState("")
    const [fireDebounce, setFireDebounce] = useState(true)
    const [attachment, setAttachment] = useState<"" | File>("")
    const [triggerAssist, resultAssist] = usePostAiAssistMutation()
    function useDebounce(value: string, delay: number){
      const [debouncedValue, setDebouncedValue] = useState(value)
      useEffect(() => {
        if(fireDebounce){
          const handler = setTimeout(() => {
            setDebouncedValue(value)
          }, delay)
      
          return () => {
            clearTimeout(handler)
          }
        }

      }, [value, delay])
    
      return debouncedValue
    }
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
      triggerAssist(form)
      setMessage("")
      setAttachment("")
    }
    const debouncedValue = useDebounce(message, 1000)

    useEffect(() => {
      if(debouncedValue){
        const form = {text: message}
        triggerAssist(form)
      }
    }, [debouncedValue]) // eslint-disable-line

    const handleKeyDown =(e: KeyboardEvent<HTMLInputElement>) => {
      if(e.code === "Tab" || e.code === "Enter"){
        e.preventDefault()
        setFireDebounce(false)
        setMessage(`${message} ${appendText}`)
      } else {
        if(!fireDebounce) setFireDebounce(true)
      }
      setAppendText("")
    }
    useEffect(() => {
      if(resultAssist.data?.text) {
        setAppendText(resultAssist.data.text)
      }
    }, [resultAssist])
  return (
    <MessageFormUI
    setAttachment={setAttachment}
    message={message}
    handleChange={handleChange}
    handleSubmit={handleSubmit}
    appendText={appendText}
    handleKeyDown={handleKeyDown}
  />
  )
}

export default AiAssist