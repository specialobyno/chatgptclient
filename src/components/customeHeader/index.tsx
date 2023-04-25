import { ChatBubbleLeftRightIcon, PhoneIcon } from "@heroicons/react/24/solid"
import { ChatHeaderProps } from "react-chat-engine-advanced"

interface Chat {
  chat: ChatHeaderProps
}

const CustomHeader: React.FC<Chat> = ({ chat: { title, description } }) => {

  return (
    <div className="chat-header">
      <div className="flexbetween">
        <ChatBubbleLeftRightIcon className="icon-chat" />
        <h3 className="header-text">{title} </h3>
      </div>
      <div className="flexbetween">
        <PhoneIcon className="icon-phone" />
        {description === "⬅️ ⬅️ ⬅️" ? (
            <p className="header-text">No chat selected</p>
        ) : (
            <p className="header-text"> {description} </p>
        )}
        
      </div>
    </div>
  )
}

export default CustomHeader
