import { Button } from '@mui/material';
import { styled } from "@mui/system";

const RoundedButton = styled(Button, {
  name: 'IconButton',
  slot: "custom-styled"
}) ({
  backgroundColor: '#090F27',
  borderRadius: '50%',
  color: "#A5B0D6",
  minWidth: '40px',
  minHeight: '40px',
  padding: '5px',
  fontSize: '1.25rem',
  boxShadow: 'none',
  ['@media (max-width:780px)'] : {
    minWidth: "36px",
    minHeight: "36px",
  }
})

const RoundedIconButton = ({icon, ...props}) => {
  return (
    <RoundedButton variant='contained' {...props}>
      {icon}
    </RoundedButton>
  )
}

export default RoundedIconButton;