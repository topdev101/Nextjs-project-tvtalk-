import React from "react";
import { CardHeader, Avatar } from "@mui/material";
import {
  CardWrapper,
  FollowButton,
  NotificationMessageText,
} from "./NotificationCard.styled";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from "@mui/material/useMediaQuery";

import dayjs from "dayjs";
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

const FOLLOW = "Follow" // ToDo: replace with notifiable_type for show Follow button

const NotificationCard = (props) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const { children } = props;
  const { actor, message, created_at, notifiable_type } = children;
  const { username, image } = actor;

  const time = dayjs(created_at).calendar(null, {
    sameDay: "[Today at] h:mm A", // The same day ( Today at 2:30 AM )
    nextDay: "[Tomorrow at] h:mm A", // The next day ( Tomorrow at 2:30 AM )
    nextWeek: "dddd [at] h:mm A", // The next week ( Sunday at 2:30 AM )
    lastDay: "[Yesterday at] h:mm A", // The day before ( Yesterday at 2:30 AM )
    lastWeek: "[Last] dddd [at] h:mm A", // Last week ( Last Monday at 2:30 AM )
    sameElse: "DD.MM.YYYY", // Everything else ( 17/10/2011 )
  });

  return (
    <CardWrapper>
      <CardHeader
        sx={ isMobile ? { paddingX: '10px', paddingY: '15px' } : { padding: 2.5 } }
        avatar={
          <Avatar
            sx={isMobile ? { width: 55, height: 55 } : { width: 60, height: 60 }}
            aria-label={`avatar-${username}`}
            src={image}
            alt={`${username}_avatar`}
          />
        }
        action={notifiable_type === FOLLOW ? <FollowButton /> : ""}
        title={
          <NotificationMessageText>
            <b>{username}</b> {message.replace(username, "")}
          </NotificationMessageText>
        }
        subheader={time}
        classes={{ action: `align-self-center${ isMobile ? ' mr-0' : '' }` }}
        subheaderTypographyProps={{
          fontWeight: 400,
          fontSize: isMobile ? 12 : 16,
          color: "#636D92",
        }}
      />
    </CardWrapper>
  );
};

export default NotificationCard;
