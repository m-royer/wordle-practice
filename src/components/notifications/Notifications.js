
export const Notifications = (props) => {
    let message = props.notification ?? ""

    return (
      <div className={"alert " + ((message.length > 0) ? "show" : "")}>{message}</div>
    )
}