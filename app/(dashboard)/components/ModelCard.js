// components/ModelCard.js
import { Card, CardContent, Typography, Stack, Divider } from '@mui/material';
import ModalityChips from './ModalityChips';

export default function ModelCard({ model }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{model.modelName || model.modelId}</Typography>
        <Typography variant="caption" color="text.secondary">
          {model.providerName}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography variant="subtitle2" gutterBottom>Input</Typography>
        <ModalityChips modalities={model.inputModalities} />

        <Typography variant="subtitle2" sx={{ mt: 1 }} gutterBottom>Output</Typography>
        <ModalityChips modalities={model.outputModalities} />
      </CardContent>
    </Card>
  );
}
