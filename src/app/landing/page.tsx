'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { 
    ThemeProvider, createTheme, CssBaseline, 
    AppBar, Toolbar, Typography, Button, Container, 
    Box, Grid, Card, CardContent, 
    Stack, Chip
} from '@mui/material';
import { Zap } from 'lucide-react';

// Vibrant Pop-Art Theme Configuration
const buildoTheme = createTheme({
  palette: {
    primary: {
      main: '#FF006E', // Hot pink
    },
    secondary: {
      main: '#CCFF00', // Lime green
    },
    background: {
      default: '#F5F5DC',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#000000',
      secondary: '#4A4A4A',
    },
  },
  typography: {
    fontFamily: '"Arial Black", "Arial", sans-serif',
    h1: { fontWeight: 900, fontSize: '4.5rem', letterSpacing: '-0.05em', color: '#000000' },
    h2: { fontWeight: 900, fontSize: '3.5rem', letterSpacing: '-0.05em', color: '#FF006E' },
    h5: { fontWeight: 700, lineHeight: 1.8, color: '#000000', fontSize: '1.2rem' },
    button: { textTransform: 'uppercase', fontWeight: 900, letterSpacing: '0.1em' },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '12px 32px',
          boxShadow: 'none',
          border: '3px solid #000000',
          borderRadius: 0,
          '&:hover': {
            boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.3)',
            transform: 'translate(-2px, -2px)',
          },
        },
      },
    },
  }
});

const FEATURES = [
    { title: 'Smart Deploy', description: 'AI-powered deployment automation across any cloud' },
    { title: 'Real-time Monitoring', description: 'Track deployments with instant feedback and alerts' },
    { title: 'Multi-Cloud Support', description: 'Seamlessly manage AWS, Azure, GCP, and more' },
    { title: 'Cost Optimization', description: 'Intelligent resource allocation to reduce expenses' },
];

// Responsive Icon Component
function ResponsiveZap({ isMobile }) {
    return <Zap size={isMobile ? 16 : 20} color="#000000" />;
}

// Grid pattern background component
function GridPattern() {
    return (
        <Box sx={{ 
            position: 'absolute', 
            width: '100%', 
            height: '100%', 
            overflow: 'hidden', 
            pointerEvents: 'none',
            backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.08) 75%, rgba(0, 0, 0, 0.08) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0, 0, 0, 0.08) 25%, rgba(0, 0, 0, 0.08) 26%, transparent 27%, transparent 74%, rgba(0, 0, 0, 0.08) 75%, rgba(0, 0, 0, 0.08) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '40px 40px'
        }} />
    );
}

export default function LandingPage() {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    return (
        <ThemeProvider theme={buildoTheme}>
            <CssBaseline />
            <Box sx={{ minHeight: '100vh', bgcolor: '#F5F5DC' }}>
                
                {/* ─── APPBAR ─── */}
                <AppBar position="fixed" sx={{ 
                    bgcolor: '#FFFFFF', 
                    color: '#000000',
                    border: { xs: '2px solid #000000', md: '3px solid #000000' },
                    borderRadius: 0,
                    boxShadow: 'none',
                    zIndex: 1200
                }}>
                    <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1.5, sm: 2, lg: 4 }, py: { xs: 0.8, md: 1.5 }, minHeight: { xs: 56, md: 64 } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none', color: '#000000' }} component={Link} href="/">
                            <Box sx={{ 
                                bgcolor: '#CCFF00', 
                                border: { xs: '2px solid #000000', md: '3px solid #000000' },
                                px: { xs: 1, md: 2 },
                                py: { xs: 0.5, md: 1 },
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                fontWeight: 900,
                                fontSize: { xs: '0.85rem', sm: '1rem', md: '1.2rem' }
                            }}>
                                <ResponsiveZap isMobile={isMobile} />
                                <span style={{ display: isMobile ? 'none' : 'inline' }}>BUILDO</span>
                            </Box>
                        </Box>
                        
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: { md: 2, lg: 4 } }}>
                            {['HOME', 'ABOUT', 'FEATURES', 'HOW IT WORKS', 'CONTACT'].map(l => (
                                <Typography key={l} sx={{ fontSize: { md: '0.75rem', lg: '0.85rem' }, fontWeight: 900, cursor: 'pointer', '&:hover': { color: '#FF006E' } }}>{l}</Typography>
                            ))}
                        </Box>

                        <Stack direction="row" spacing={{ xs: 0.5, md: 1.5 }}>
                            <Button 
                                sx={{ 
                                    bgcolor: '#FF006E', 
                                    color: '#FFFFFF',
                                    fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
                                    py: { xs: 0.6, md: 1 },
                                    px: { xs: 1, md: 2.5 },
                                    fontWeight: 900,
                                    border: { xs: '2px solid #000000', md: '3px solid #000000' },
                                    minWidth: 'auto',
                                    '&:hover': { bgcolor: '#FF0060' }
                                }} 
                                component={Link} 
                                href="/login"
                            >
                                {isMobile ? 'Log' : 'Login'}
                            </Button>
                            <Button 
                                sx={{ 
                                    bgcolor: '#CCFF00', 
                                    color: '#000000',
                                    fontSize: { xs: '0.65rem', sm: '0.75rem', md: '0.85rem' },
                                    py: { xs: 0.6, md: 1 },
                                    px: { xs: 1, md: 2.5 },
                                    fontWeight: 900,
                                    border: { xs: '2px solid #000000', md: '3px solid #000000' },
                                    minWidth: 'auto'
                                }} 
                                component={Link} 
                                href="/register"
                            >
                                {isMobile ? 'Admin' : 'Admin'}
                            </Button>
                        </Stack>
                    </Toolbar>
                </AppBar>

                {/* ─── HERO ─── */}
                <Box sx={{ 
                    pt: 15, 
                    pb: 12, 
                    bgcolor: '#F5F5DC',
                    position: 'relative',
                    overflow: 'hidden',
                    textAlign: 'center'
                }}>
                    <GridPattern />
                    
                    {/* Decorative Top-Left Lime Square */}
                    <Box sx={{ 
                        position: 'absolute', 
                        top: { xs: 30, md: 60 },
                        left: { xs: 10, md: 40 },
                        width: { xs: 60, md: 100 },
                        height: { xs: 60, md: 100 },
                        bgcolor: '#CCFF00', 
                        border: '3px solid #000000',
                        transform: 'rotate(-20deg)',
                        opacity: 0.85,
                        boxShadow: '6px 6px 0px rgba(0,0,0,0.3)',
                        zIndex: 0
                    }} />
                    
                    {/* Decorative Top-Right Cyan Square */}
                    <Box sx={{ 
                        position: 'absolute', 
                        top: { xs: 80, md: 120 },
                        right: { xs: 10, md: 60 },
                        width: { xs: 70, md: 110 },
                        height: { xs: 70, md: 110 },
                        bgcolor: '#00D9FF', 
                        border: '3px solid #000000',
                        transform: 'rotate(25deg)',
                        opacity: 0.9,
                        boxShadow: '6px 6px 0px rgba(0,0,0,0.3)',
                        zIndex: 0
                    }} />
                    
                    {/* Decorative Bottom-Right Pink Square */}
                    <Box sx={{ 
                        position: 'absolute', 
                        bottom: { xs: 40, md: 80 },
                        right: { xs: 20, md: 80 },
                        width: { xs: 80, md: 120 },
                        height: { xs: 80, md: 120 },
                        bgcolor: '#FF006E', 
                        border: '3px solid #000000',
                        transform: 'rotate(-25deg)',
                        opacity: 0.85,
                        boxShadow: '6px 6px 0px rgba(0,0,0,0.3)',
                        zIndex: 0
                    }} />
                    
                    <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                        {/* Tagline Box */}
                        <Box sx={{ 
                            display: 'inline-block',
                            border: '3px solid #FF006E',
                            px: 4,
                            py: 1.5,
                            mb: 6,
                            bgcolor: '#FFFFFF',
                            fontWeight: 900,
                            fontSize: '1rem',
                            letterSpacing: '0.05em'
                        }}>
                            🚀 #1 DEPLOYMENT ENGINE FOR DEVELOPERS
                        </Box>

                        {/* Main Headline */}
                        <Typography sx={{ 
                            fontSize: '6.5rem', 
                            fontWeight: 900,
                            color: '#000000',
                            mb: 2,
                            letterSpacing: '-0.05em',
                            lineHeight: 1.2
                        }}>
                            BUILDO
                        </Typography>

                        {/* Sub Headline */}
                        <Box sx={{ mb: 6 }}>
                            <Typography sx={{ 
                                fontSize: '4.2rem', 
                                fontWeight: 900,
                                color: '#7209B7',
                                mb: 1,
                                letterSpacing: '-0.05em'
                            }}>
                                THE SMART
                            </Typography>
                            <Typography sx={{ 
                                fontSize: '4.2rem', 
                                fontWeight: 900,
                                color: '#7209B7',
                                letterSpacing: '-0.05em'
                            }}>
                                DEPLOYMENT EDGE
                            </Typography>
                        </Box>

                        {/* Description */}
                        <Typography sx={{ 
                            fontSize: '1.1rem', 
                            mb: 8,
                            maxWidth: 700,
                            mx: 'auto',
                            fontWeight: 600,
                            color: '#4A4A4A'
                        }}>
                            AI-powered CI/CD automation for the Indian tech ecosystem. Identify deployment patterns, manage infrastructure, and deploy with institutional-grade intelligence and scale.
                        </Typography>

                        {/* CTA Button */}
                        <Button 
                            sx={{ 
                                bgcolor: '#CCFF00', 
                                color: '#000000',
                                fontSize: '1rem',
                                py: 2,
                                px: 6,
                                border: '3px solid #000000'
                            }}
                            component={Link}
                            href="/register"
                        >
                            Learn More
                        </Button>
                    </Container>
                </Box>

                {/* ─── FEATURES ─── */}
                <Box sx={{ py: 12, bgcolor: '#FFFFFF', borderTop: '3px solid #000000', borderBottom: '3px solid #000000' }}>
                    <Container maxWidth="lg">
                        <Typography sx={{ 
                            fontSize: '2.5rem', 
                            fontWeight: 900,
                            mb: 8,
                            textAlign: 'center',
                            color: '#7209B7'
                        }}>
                            WHY CHOOSE BUILDO?
                        </Typography>
                        
                        <Grid container spacing={6}>
                            {FEATURES.map((feature, i) => (
                                <Grid item xs={12} sm={6} md={3} key={i}>
                                    <Card sx={{ 
                                        p: 4,
                                        border: '3px solid #000000',
                                        bgcolor: i % 2 === 0 ? '#CCFF00' : '#00D9FF',
                                        height: '100%',
                                        '&:hover': { transform: 'translateY(-8px)' }
                                    }}>
                                        <Typography sx={{ 
                                            fontWeight: 900,
                                            fontSize: '1.3rem',
                                            mb: 3,
                                            color: '#000000'
                                        }}>
                                            {feature.title}
                                        </Typography>
                                        <Typography sx={{ 
                                            fontWeight: 600,
                                            color: '#000000'
                                        }}>
                                            {feature.description}
                                        </Typography>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* ─── HOW IT WORKS ─── */}
                <Box sx={{ py: 12, bgcolor: '#F5F5DC' }}>
                    <Container maxWidth="lg">
                        <Typography sx={{ 
                            fontSize: '4rem', 
                            fontWeight: 900,
                            mb: 10,
                            textAlign: 'center',
                            color: '#FF006E',
                            letterSpacing: '-0.05em',
                            lineHeight: 1.1
                        }}>
                            HOW IT WORKS
                        </Typography>

                        <Grid container spacing={4}>
                            {[
                                { step: '01', title: 'Connect', desc: 'Link your repositories and cloud accounts' },
                                { step: '02', title: 'Configure', desc: 'Set deployment rules and automation flows' },
                                { step: '03', title: 'Deploy', desc: 'Launch with one click across environments' },
                                { step: '04', title: 'Monitor', desc: 'Real-time insights and performance metrics' },
                            ].map((item, i) => (
                                <Grid item xs={12} md={3} key={i}>
                                    <Box sx={{ 
                                        textAlign: 'center',
                                        p: 4,
                                        border: '3px solid #000000',
                                        bgcolor: '#FFFFFF'
                                    }}>
                                        <Typography sx={{ 
                                            fontSize: '3.5rem',
                                            fontWeight: 900,
                                            color: '#FF006E',
                                            mb: 2,
                                            letterSpacing: '-0.05em'
                                        }}>
                                            {item.step}
                                        </Typography>
                                        <Typography sx={{ 
                                            fontSize: '1.8rem',
                                            fontWeight: 900,
                                            mb: 2,
                                            color: '#000000',
                                            letterSpacing: '-0.02em'
                                        }}>
                                            {item.title}
                                        </Typography>
                                        <Typography sx={{ 
                                            fontWeight: 700,
                                            color: '#000000',
                                            fontSize: '1rem'
                                        }}>
                                            {item.desc}
                                        </Typography>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* ─── DEPLOYMENT GUIDE ─── */}
                <Box sx={{ py: 12, bgcolor: '#FFFFFF', borderTop: '3px solid #000000', borderBottom: '3px solid #000000' }}>
                    <Container maxWidth="lg">
                        <Typography sx={{ 
                            fontSize: '4rem', 
                            fontWeight: 900,
                            mb: 12,
                            textAlign: 'center',
                            color: '#000000',
                            letterSpacing: '-0.05em',
                            lineHeight: 1.1
                        }}>
                            WHAT CAN YOU DEPLOY?
                        </Typography>

                        <Grid container spacing={5} sx={{ mb: 12 }}>
                            {[
                                { 
                                    num: '01', 
                                    title: 'DOCKER CONTAINERS',
                                    items: ['Node.js Apps', 'Python Services', 'Go Microservices', 'Custom Images'],
                                    bgcolor: '#CCFF00'
                                },
                                { 
                                    num: '02', 
                                    title: 'BUILD PROJECTS',
                                    items: ['Full-Stack Apps', 'Static Sites', 'APIs & Backends', 'Mobile Services'],
                                    bgcolor: '#7209B7',
                                    color: '#FFFFFF',
                                    titleColor: '#CCFF00'
                                },
                                { 
                                    num: '03', 
                                    title: 'INFRASTRUCTURE',
                                    items: ['Kubernetes Clusters', 'Load Balancers', 'Databases', 'Storage'],
                                    bgcolor: '#FFD60A',
                                    titleColor: '#000000'
                                },
                            ].map((section, i) => (
                                <Grid item xs={12} md={4} key={i}>
                                    <Box sx={{ 
                                        p: 5,
                                        border: '3px solid #000000',
                                        bgcolor: section.bgcolor,
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        position: 'relative'
                                    }}>
                                        <Typography sx={{ 
                                            fontSize: '3.5rem',
                                            fontWeight: 900,
                                            color: section.titleColor || '#000000',
                                            opacity: 0.2,
                                            position: 'absolute',
                                            top: 20,
                                            right: 30,
                                            letterSpacing: '-0.05em'
                                        }}>
                                            {section.num}
                                        </Typography>
                                        
                                        <Typography sx={{ 
                                            fontSize: '1.8rem',
                                            fontWeight: 900,
                                            mb: 4,
                                            color: section.titleColor || '#000000',
                                            letterSpacing: '-0.02em'
                                        }}>
                                            {section.title}
                                        </Typography>

                                        <Stack spacing={2}>
                                            {section.items.map((item, idx) => (
                                                <Box key={idx} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                                    <Box sx={{ width: 8, height: 8, bgcolor: section.titleColor || '#000000', borderRadius: '50%' }} />
                                                    <Typography sx={{ 
                                                        fontWeight: 700,
                                                        color: section.color || '#000000',
                                                        fontSize: '0.95rem'
                                                    }}>
                                                        {item}
                                                    </Typography>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>


                        {/* What Gets Deployed Info */}
                        <Box sx={{ 
                            p: 6,
                            border: '3px solid #000000',
                            bgcolor: '#F5F5DC',
                            mt: 8
                        }}>
                            <Typography sx={{ 
                                fontSize: '2rem',
                                fontWeight: 900,
                                mb: 4,
                                color: '#000000'
                            }}>
                                📦 WHAT EXACTLY GETS DEPLOYED?
                            </Typography>
                            <Grid container spacing={4}>
                                {[
                                    {
                                        title: 'Container Images',
                                        items: ['Optimized Docker images', 'Minimal image sizes', 'Security scanned', 'Cached layers']
                                    },
                                    {
                                        title: 'Environment Config',
                                        items: ['Env variables', 'Secrets management', 'Runtime settings', 'Resource limits']
                                    },
                                    {
                                        title: 'Infrastructure',
                                        items: ['Auto-scaling policies', 'Load balancers', 'Health checks', 'Network config']
                                    },
                                    {
                                        title: 'Monitoring & Logs',
                                        items: ['Real-time logs', 'Performance metrics', 'Error tracking', 'Alert rules']
                                    },
                                ].map((section, idx) => (
                                    <Grid item xs={12} sm={6} md={3} key={idx}>
                                        <Box>
                                            <Typography sx={{ 
                                                fontWeight: 900,
                                                fontSize: '1.1rem',
                                                mb: 3,
                                                color: '#FF006E'
                                            }}>
                                                {section.title}
                                            </Typography>
                                            <Stack spacing={2}>
                                                {section.items.map((item, i) => (
                                                    <Box key={i} sx={{ display: 'flex', gap: 2 }}>
                                                        <Typography sx={{ color: '#7209B7', fontWeight: 900 }}>✓</Typography>
                                                        <Typography sx={{ fontWeight: 600, color: '#000000' }}>
                                                            {item}
                                                        </Typography>
                                                    </Box>
                                                ))}
                                            </Stack>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Container>
                </Box>

                {/* ─── CTA SECTION ─── */}
                <Box sx={{ 
                    py: { xs: 10, md: 15 }, 
                    textAlign: 'center', 
                    bgcolor: '#7209B7',
                    borderTop: { xs: '2px solid #000000', md: '3px solid #000000' },
                    borderBottom: { xs: '2px solid #000000', md: '3px solid #000000' },
                    px: { xs: 2, sm: 3 }
                }}>
                    <Container maxWidth="md">
                        <Typography sx={{ 
                            fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }, 
                            fontWeight: 900,
                            mb: 4,
                            color: '#CCFF00',
                            letterSpacing: '-0.05em'
                        }}>
                            Ready to Deploy Smart?
                        </Typography>
                        <Typography sx={{ 
                            fontSize: { xs: '0.95rem', md: '1.3rem' },
                            mb: 8,
                            color: '#FFFFFF',
                            fontWeight: 700
                        }}>
                            Join thousands of developers using Buildo for faster, smarter deployments
                        </Typography>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 2, md: 3 }} justifyContent="center">
                            <Button 
                                sx={{ 
                                    bgcolor: '#CCFF00', 
                                    color: '#000000',
                                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                                    fontWeight: 900,
                                    py: { xs: 1.2, md: 2 },
                                    px: { xs: 3, md: 6 }
                                }}
                                component={Link}
                                href="/register"
                            >
                                Start Free Trial
                            </Button>
                            <Button 
                                sx={{ 
                                    bgcolor: '#FFFFFF', 
                                    color: '#7209B7',
                                    fontSize: { xs: '0.9rem', md: '1.1rem' },
                                    fontWeight: 900,
                                    py: { xs: 1.2, md: 2 },
                                    px: { xs: 3, md: 6 }
                                }}
                            >
                                Book a Demo
                            </Button>
                        </Stack>
                    </Container>
                </Box>

                {/* ─── FOOTER ─── */}
                <Box sx={{ 
                    py: { xs: 4, md: 6 }, 
                    bgcolor: '#000000',
                    color: '#FFFFFF',
                    borderTop: { xs: '2px solid #CCFF00', md: '4px solid #CCFF00' },
                    px: { xs: 2, sm: 3 }
                }}>
                    <Container maxWidth="lg">
                        <Grid container spacing={{ xs: 3, md: 4 }} sx={{ mb: 4 }}>
                            {/* Left Section - Logo & Description */}
                            <Grid item xs={12} md={3}>
                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ 
                                        bgcolor: '#CCFF00', 
                                        border: { xs: '2px solid #000000', md: '3px solid #000000' },
                                        px: 2, 
                                        py: 1,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: 1,
                                        fontWeight: 900,
                                        color: '#000000',
                                        mb: 2
                                    }}>
                                        <Zap size={18} color="#000000" />
                                        BUILDO
                                    </Box>
                                </Box>
                                <Typography sx={{ 
                                    fontWeight: 600, 
                                    color: '#CCCCCC', 
                                    mb: 2, 
                                    fontSize: { xs: '0.9rem', md: '0.95rem' },
                                    lineHeight: 1.6
                                }}>
                                    AI-powered CI/CD deployment engine for modern developers. Build, ship, and scale applications across any cloud with intelligence and speed.
                                </Typography>
                                
                                {/* Social Icons */}
                                <Stack direction="row" spacing={1.5}>
                                    <Box sx={{
                                        width: 44,
                                        height: 44,
                                        bgcolor: '#FFFFFF',
                                        border: '2px solid #000000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: '#000000',
                                        fontWeight: 900,
                                        fontSize: '1.2rem',
                                        '&:hover': { bgcolor: '#CCFF00' }
                                    }}>
                                        in
                                    </Box>
                                    <Box sx={{
                                        width: 44,
                                        height: 44,
                                        bgcolor: '#FFFFFF',
                                        border: '2px solid #000000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: '#000000',
                                        fontWeight: 900,
                                        fontSize: '1.2rem',
                                        '&:hover': { bgcolor: '#CCFF00' }
                                    }}>
                                        ◆
                                    </Box>
                                    <Box sx={{
                                        width: 44,
                                        height: 44,
                                        bgcolor: '#FFFFFF',
                                        border: '2px solid #000000',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        color: '#000000',
                                        fontWeight: 900,
                                        fontSize: '1.2rem',
                                        '&:hover': { bgcolor: '#CCFF00' }
                                    }}>
                                        ✉
                                    </Box>
                                </Stack>
                            </Grid>

                            {/* Platform Column */}
                            <Grid item xs={6} sm={3} md={2.25}>
                                <Typography sx={{ 
                                    fontWeight: 900,
                                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                                    mb: 2,
                                    color: '#CCFF00',
                                    letterSpacing: '0.1em',
                                    paddingBottom: 1.5,
                                    borderBottom: '2px solid #CCFF00'
                                }}>
                                    PLATFORM
                                </Typography>
                                <Stack spacing={2}>
                                    {['Dashboard', 'Deployments', 'Analytics', 'Settings'].map(l => (
                                        <Typography 
                                            key={l} 
                                            sx={{ 
                                                fontSize: { xs: '0.8rem', md: '0.9rem' },
                                                fontWeight: 600,
                                                color: '#CCCCCC', 
                                                cursor: 'pointer', 
                                                transition: 'all 0.2s',
                                                '&:hover': { color: '#CCFF00', paddingLeft: 1 } 
                                            }}
                                        >
                                            {l}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Grid>

                            {/* Services Column */}
                            <Grid item xs={6} sm={3} md={2.25}>
                                <Typography sx={{ 
                                    fontWeight: 900,
                                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                                    mb: 2,
                                    color: '#CCFF00',
                                    letterSpacing: '0.1em',
                                    paddingBottom: 1.5,
                                    borderBottom: '2px solid #CCFF00'
                                }}>
                                    SERVICES
                                </Typography>
                                <Stack spacing={2}>
                                    {['CI/CD Pipeline', 'Docker Support', 'K8s Clusters', 'Cloud Deploy'].map(l => (
                                        <Typography 
                                            key={l} 
                                            sx={{ 
                                                fontSize: { xs: '0.8rem', md: '0.9rem' },
                                                fontWeight: 600,
                                                color: '#CCCCCC', 
                                                cursor: 'pointer', 
                                                transition: 'all 0.2s',
                                                '&:hover': { color: '#CCFF00', paddingLeft: 1 } 
                                            }}
                                        >
                                            {l}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Grid>

                            {/* Company Column */}
                            <Grid item xs={6} sm={3} md={2.25}>
                                <Typography sx={{ 
                                    fontWeight: 900,
                                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                                    mb: 2,
                                    color: '#CCFF00',
                                    letterSpacing: '0.1em',
                                    paddingBottom: 1.5,
                                    borderBottom: '2px solid #CCFF00'
                                }}>
                                    COMPANY
                                </Typography>
                                <Stack spacing={2}>
                                    {['About Us', 'Blog', 'Careers', 'Contact'].map(l => (
                                        <Typography 
                                            key={l} 
                                            sx={{ 
                                                fontSize: { xs: '0.8rem', md: '0.9rem' },
                                                fontWeight: 600,
                                                color: '#CCCCCC', 
                                                cursor: 'pointer', 
                                                transition: 'all 0.2s',
                                                '&:hover': { color: '#CCFF00', paddingLeft: 1 } 
                                            }}
                                        >
                                            {l}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Grid>

                            {/* Legal Column */}
                            <Grid item xs={6} sm={3} md={2.25}>
                                <Typography sx={{ 
                                    fontWeight: 900,
                                    fontSize: { xs: '0.85rem', md: '0.95rem' },
                                    mb: 2,
                                    color: '#CCFF00',
                                    letterSpacing: '0.1em',
                                    paddingBottom: 1.5,
                                    borderBottom: '2px solid #CCFF00'
                                }}>
                                    LEGAL
                                </Typography>
                                <Stack spacing={2}>
                                    {['Privacy Policy', 'Terms of Service', 'Security', 'License'].map(l => (
                                        <Typography 
                                            key={l} 
                                            sx={{ 
                                                fontSize: { xs: '0.8rem', md: '0.9rem' },
                                                fontWeight: 600,
                                                color: '#CCCCCC', 
                                                cursor: 'pointer', 
                                                transition: 'all 0.2s',
                                                '&:hover': { color: '#CCFF00', paddingLeft: 1 } 
                                            }}
                                        >
                                            {l}
                                        </Typography>
                                    ))}
                                </Stack>
                            </Grid>
                        </Grid>

                        {/* Bottom Section - Copyright & Credit */}
                        <Box sx={{
                            borderTop: '1px solid #444444',
                            pt: 3,
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            justifyContent: 'space-between',
                            alignItems: { xs: 'flex-start', md: 'center' },
                            gap: { xs: 2, md: 0 }
                        }}>
                            <Typography sx={{
                                fontSize: { xs: '0.75rem', md: '0.85rem' },
                                fontWeight: 600,
                                color: '#777777',
                                letterSpacing: '0.05em'
                            }}>
                                © 2026 BUILDO. ALL RIGHTS RESERVED.
                            </Typography>
                            
                            <Typography sx={{
                                fontSize: { xs: '0.8rem', md: '0.9rem' },
                                fontWeight: 700,
                                color: '#CCFF00'
                            }}>
                                BUILD BY BUILDO WITH 💚
                            </Typography>
                        </Box>

                        {/* Risk Disclaimer */}
                        <Typography sx={{
                            fontSize: { xs: '0.7rem', md: '0.75rem' },
                            fontWeight: 500,
                            color: '#666666',
                            mt: 2,
                            textAlign: 'center',
                            lineHeight: 1.6
                        }}>
                            ⚠️ Deployment involves risk. This platform provides intelligent automation for informational purposes only and does not constitute technical advice.
                        </Typography>
                    </Container>
                </Box>

            </Box>
        </ThemeProvider>
    );
}
