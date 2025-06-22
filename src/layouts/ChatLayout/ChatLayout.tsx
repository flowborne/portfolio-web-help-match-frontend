import { Box } from '@mui/material'
import { AllChatWrapper } from '~components/AllChatsWrapper/AllChatsWrapper'
import { FormContainer } from '~components/FormContainer/FormContainer'


export const ChatLayout = () => {
  return (
    <Box >
      <Box sx={{marginBottom:'100px'}}>  </Box>
      <FormContainer>
      <AllChatWrapper/>
      </FormContainer>
    </Box>
  )
}
