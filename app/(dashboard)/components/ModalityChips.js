// components/ModalityChips.js
import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import LinkIcon from '@mui/icons-material/Link';
const iconMap = {
  TEXT: <TextSnippetIcon />,
  IMAGE: <PhotoLibraryIcon />,
  VIDEO: <VideoLibraryIcon />,
  EMBEDDING: <LinkIcon />
};

export default function ModalityChips({ modalities }) {
  if (!Array.isArray(modalities) || modalities.length === 0) return null;

  return (
    <React.Fragment>
      {modalities.map((modality, index) => (
        <Chip
          key={`${modality}-${index}`}
          icon={iconMap[modality] || null}
          label={modality}
          size="small"
        />
      ))}
    </React.Fragment>
  );
}
