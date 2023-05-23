import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Box, Stack } from '@mui/material';
import { ToolBar } from './styled';
import { useResponsive } from '../../../hooks/useResponsive';
import NotificationsPopover from './NotificationsPopover';
import ChatPopover from './ChatPopover';

export default function SearchAppBar({ onToggleNav }) {
  const { tab } = useResponsive();

  return (
    <AppBar elevation={0} color="inherit" position="relative">
      <ToolBar sx={{ justifyContent: 'space-between' }}>
        {tab && (
          <IconButton size="large" edge="start" color="inherit" onClick={onToggleNav}>
            <MenuIcon />
          </IconButton>
        )}

        <Box flexGrow={1} />

        <Stack direction="row" spacing={2}>
          <ChatPopover />
          <NotificationsPopover />
        </Stack>
      </ToolBar>
    </AppBar>
  );
}
