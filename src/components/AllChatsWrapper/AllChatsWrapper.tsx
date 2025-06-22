import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Avatar,
  CircularProgress,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
} from '@mui/material';
import { useSocketContext } from '~contexts/socket-context';
import { Chat } from '~components/Chat/Chat';
import { useHTTP } from '~hooks/http.hook';
import { getChatRooms } from '~services/chatService';
import { useUserContext } from '~contexts/user-context';
import { styles } from './AllChatsWrapper.styles';
import { useTranslation } from 'react-i18next';
import { getProduct } from '~services/productService';

interface RoomData {
  roomId: string;
  productId: string;
  participants: string[];
  chatName: string;
  unreadCount: number;
  avatarUrl?: string;
}

export const AllChatWrapper: React.FC = () => {
  const { joinRoom, leaveRoom } = useSocketContext();
  const { request, loading, error } = useHTTP();
  const { t } = useTranslation();
  const { userData } = useUserContext();
  const currentUserId = userData.userId;

  const [rooms, setRooms] = useState<RoomData[]>([]);
  const [filter, setFilter] = useState<string>('');
  const [activeRoom, setActiveRoom] = useState<RoomData | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getChatRooms(request);
        const roomsWithAvatars = await Promise.all(
          data.map(async r => {
            let avatarUrl = '';
            try {
              const prod = await getProduct(request, r.productId) as { task: { images: string[] } };
              avatarUrl = prod.task.images?.[0] || '';
            } catch {}
            return { ...r, avatarUrl } as RoomData;
          })
        );
        setRooms(roomsWithAvatars);
        setActiveRoom(roomsWithAvatars[0] || null);
      } catch {
        setRooms([]);
        setActiveRoom(null);
      }
    })();
  }, [request]);

  useEffect(() => {
    if (!activeRoom) return;
    joinRoom(activeRoom.roomId);
    return () => {
      leaveRoom(activeRoom.roomId);
    };
  }, [activeRoom, joinRoom, leaveRoom]);

  if (loading) {
    return (
      <Box sx={styles.loadingContainer}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    const msg = typeof error === 'string' ? error : (error as Error).message;
    return (
      <Box sx={styles.errorContainer}>
        Error: {msg}
      </Box>
    );
  }

  return (
    <Box sx={styles.root}>
      <Box sx={styles.sidebar}>
        <Box sx={styles.searchWrapper}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            placeholder={t('chatSearch')}
            value={filter}
            onChange={e => setFilter(e.target.value)}
            InputProps={{ sx: { backgroundColor: '#fff', borderRadius: '8px' } }}
          />
        </Box>
        <List sx={styles.list}>
          {rooms
            .filter(r => r.chatName.toLowerCase().includes(filter.toLowerCase()))
            .map(r => {
              const isActive = r.roomId === activeRoom?.roomId;
              return (
                <ListItemButton
                  key={r.roomId}
                  sx={isActive ? styles.chatItemActive : styles.chatItemInactive}
                  onClick={() => setActiveRoom(r)}
                >
                  <ListItemAvatar>
                    <Avatar src={r.avatarUrl || undefined} sx={styles.avatar}>
                      {!r.avatarUrl && r.chatName.charAt(0).toUpperCase()}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={r.chatName}
                    sx={styles.username}
                  />
                </ListItemButton>
              );
            })}
        </List>
      </Box>
      <Box sx={styles.chatWrapper}>
        {activeRoom ? (
          <Chat
            roomId={activeRoom.roomId}
            chatName={activeRoom.chatName}
            interlocutorId={
              activeRoom.participants.find(p => p !== currentUserId) || ''
            }
          />
        ) : (
          <Box sx={styles.emptyState} />
        )}
      </Box>
    </Box>
  );
};
