import { Paper, Typography, Box, alpha, useTheme, Palette } from '@mui/material';

// allowed MUI colors
type MuiColor = 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ElementType;
    color: MuiColor; 
}

export default function StatCard({ title, value, icon: Icon, color }: StatCardProps) {
    const theme = useTheme();

    return (
        <Paper elevation={0} sx={{ 
            p: 3, 
            display: 'flex', 
            alignItems: 'center',
            border: '1px solid #E2E8F0',
            borderRadius: 4 
        }}>
            <Box sx={{ 
                bgcolor: alpha(theme.palette[color].main, 0.2), 
                p: 1.5, 
                borderRadius: 3, 
                mr: 2, 
                display: 'flex' 
            }}>
                <Icon sx={{ color: theme.palette[color].main }} />
            </Box>
            <Box>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                    {title}
                </Typography>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#0F172A' }}>
                    {value}
                </Typography>
            </Box>
        </Paper>
    );
}
