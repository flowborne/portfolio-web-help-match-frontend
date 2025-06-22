import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Avatar,
  CircularProgress,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSocketContext } from '~contexts/socket-context';
import { getChatHistory, ChatMessage } from '~services/chatService';
import { useHTTP } from '~hooks/http.hook';
import { useUserContext } from '~contexts/user-context';
import { getUserDataById } from '~services/authorizationService';
import { styles } from './Chat.styles';
import { useTranslation } from 'react-i18next';

interface ChatProps {
  roomId: string;
  chatName: string;
  interlocutorId: string;
}

export const Chat: React.FC<ChatProps> = ({ roomId, chatName, interlocutorId }) => {
  const { socket, sendMessage } = useSocketContext();
  const { request, loading } = useHTTP();
  const { t } = useTranslation();
  const { userData } = useUserContext();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [avatar, setAvatar] = useState('');
  const endRef = useRef<HTMLDivElement>(null);

  const myId = userData.userId;
  const myAvatar = userData.avatarUrl;

  useEffect(() => {
    if (!interlocutorId) return;
    getUserDataById(request, interlocutorId)
      .then(d => setAvatar((d as any).avatarUrl || ''))
      .catch(console.error);
  }, [request, interlocutorId]);

  useEffect(() => {
    getChatHistory(request, roomId)
      .then(setMessages)
      .catch(console.error);
  }, [request, roomId]);

  useEffect(() => {
    const handler = (msg: ChatMessage & { chatRoomId?: string }) => {
      const rid = (msg as any).roomId || msg.chatRoomId;
      if (rid !== roomId) return;
      setMessages(prev => {
        if (prev.some(m => m._id === msg._id)) return prev;
        return [...prev, msg];
      });
    };
    socket?.on('new_message', handler);
    return () => { socket?.off('new_message', handler); };
  }, [socket, roomId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    sendMessage(roomId, text);
    setInput('');
  };

  if (loading) {
    return (
      <Box sx={styles.loading}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={styles.container}>
      <Box sx={{ display:'flex', alignItems:'center', ...styles.header }}>
        {avatar && <Avatar src={avatar} sx={{ width:32, height:32, mr:1 }} />}
        <Typography variant="h6">{chatName}</Typography>
      </Box>

      <Box sx={styles.messagesWrapper}>
        {messages.map(msg => {
          const sid   = typeof msg.senderId === 'object'
            ? (msg.senderId as any)._id
            : msg.senderId;
          const isMe  = sid === myId;
          const img   = isMe ? myAvatar : avatar;
          const init  = isMe
            ? myId.charAt(0).toUpperCase()
            : (msg.senderId as any).userName.charAt(0).toUpperCase() || '';

          return (
            <Box
              key={msg._id}
              display="flex"
              flexDirection={isMe ? 'row-reverse' : 'row'}
              alignItems="center"
              mb={2}
            >
              <Avatar
                src={img || undefined}
                sx={{ ...styles.avatar, bgcolor: img ? 'transparent' : undefined }}
              >
                {!img && init}
              </Avatar>
              <Box maxWidth="60%">
                <Box sx={{
                  ...styles.bubble,
                  borderRadius: isMe ? '16px 16px 0 16px' : '16px 16px 16px 0',
                  bgcolor: isMe ? 'primary.main' : 'grey.200',
                  color: isMe ? 'primary.contrastText' : 'text.primary'
                }}>
                  <Typography component="span" variant="body2" sx={{ wordBreak:'break-word' }}>
                    {msg.content}
                  </Typography>
                  <Typography component="span" variant="caption" sx={styles.timestamp}>
                    {new Date(msg.createdAt).toLocaleTimeString([], {
                      hour:'2-digit', minute:'2-digit'
                    })}
                  </Typography>
                </Box>
              </Box>
            </Box>
          );
        })}
        <div ref={endRef} />
      </Box>

      <Box sx={styles.inputWrapper}>
        <TextField
          fullWidth
          size="small"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          placeholder={t('typeMessage')}
        />
        <IconButton color="primary" onClick={handleSend}>
          <SendIcon/>
        </IconButton>
      </Box>
    </Box>
  );
};
