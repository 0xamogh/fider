import React, { useState } from "react"
import { Post } from "@fider/models"
import { Button, List, ListItem } from "@fider/components"
import { actions } from "@fider/services"
import { useFider } from "@fider/hooks"
import IconVolumeOn from "@fider/assets/images/heroicons-volume-on.svg"
import IconVolumeOff from "@fider/assets/images/heroicons-volume-off.svg"

interface NotificationsPanelProps {
  post: Post
  subscribed: boolean
}

export const NotificationsPanel = (props: NotificationsPanelProps) => {
  const fider = useFider()
  const [subscribed, setSubscribed] = useState(props.subscribed)

  const subscribeOrUnsubscribe = async () => {
    const action = subscribed ? actions.unsubscribe : actions.subscribe

    const response = await action(props.post.number)
    if (response.ok) {
      setSubscribed(!subscribed)
    }
  }

  if (!fider.session.isAuthenticated) {
    return null
  }

  const button = subscribed ? (
    <Button className="w-full" onClick={subscribeOrUnsubscribe}>
      <IconVolumeOff /> <span>Unsubscribe</span>
    </Button>
  ) : (
    <Button className="w-full" onClick={subscribeOrUnsubscribe}>
      <IconVolumeOn /> <span>Subscribe</span>
    </Button>
  )

  const text = subscribed ? (
    <span className="text-muted">You’re receiving notifications about activity on this post.</span>
  ) : (
    <span className="text-muted">You&apos;ll not receive any notification about this post.</span>
  )

  return (
    <>
      <span className="text-category">Notifications</span>
      <List>
        <ListItem>
          {button}
          {text}
        </ListItem>
      </List>
    </>
  )
}
