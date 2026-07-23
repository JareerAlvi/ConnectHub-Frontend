import { useState } from "react";
import "./SmsInput.css";
import { IoSend,IoMic  } from "react-icons/io5";
export default function SmsInput({
    onSend
}) {

    const [text, setText] = useState("");
const send = () => {

    if (!text.trim()) return;

    onSend(text);

    setText("");

};


    return (

        <div className="sms-input">

            <input
                type="text"
                placeholder="Type a message..."
                value={text}
                onChange={(e) =>
                    setText(e.target.value)
                }
            />
{

text.trim()

?

<button
    className="send-btn"
    onClick={send}
    onKeyDown={(e) => {

    if (e.key === "Enter") {

        send();

    }

}}
>

    <IoSend size={26}/>

</button>

:

<button
    className="mic-btn"
>

    <IoMic size={24}/>

</button>

}

        </div>

    );

}