# Bloom & Grow

A comprehensive flower farm management application designed for both new and experienced flower farmers.

## Features

### 🌱 **Garden at a Glance**
- Dashboard overview with quick stats
- Weather conditions and planting alerts
- Weekly task management
- Season progress tracking

### ⚙️ **Garden Setup**
- Garden type selection (raised beds, containers, rows)
- Flower variety preferences
- Revenue goal setting
- Climate zone integration

### 📋 **Planning**
- Visual bed layout with drag-and-drop
- Flower placement and spacing calculations
- Photo uploads for bed documentation
- Planning summary and analytics

### 🔧 **Prepping**
- Bed preparation task management
- Soil preparation guides
- Timing recommendations
- Progress tracking by bed

### 🌸 **Planting**
- Planting activity logging
- Weather condition monitoring
- Planting calendar and reminders
- Growth status tracking

### ✂️ **Cutting**
- Harvest logging by variety and quality
- Bouquet recipe calculator
- Pricing suggestions (wholesale/retail)
- Inventory management

### 💰 **Selling**
- Sales tracking by venue (farmers market, CSA, florist, events)
- Customer management
- Payment method tracking
- Revenue analytics
- Square/Stripe integration ready

## Design System

The app features an elegant, calming design inspired by luxury wedding websites and editorial photography:

- **Midnight Blue** (#2E3A59): Navigation, headings, primary text
- **Champagne** (#FFF8F0): Page backgrounds, content cards
- **Blush** (#E8CFC7): Accent elements, buttons, highlights
- **Warm Gold** (#C6A87D): Luxury touches and premium elements

## Technology Stack

- **React** + **TypeScript** for type-safe component development
- **Tailwind CSS** for utility-first styling
- **React Router** for navigation
- **Lucide React** for consistent iconography
- **Vite** for fast development and building

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navigation and layout components
│   └── ui/              # Reusable UI components
├── pages/               # Main application pages
├── types/               # TypeScript type definitions
└── index.css           # Global styles and Tailwind imports
```

## Usage

The application is accessible at `http://localhost:5173/` when running in development mode.

Navigate through the seven main sections:

1. **Garden at a Glance** - Overview dashboard
2. **Garden Setup** - Initial garden configuration  
3. **Planning** - Visual bed layout and flower planning
4. **Prepping** - Bed preparation task management
5. **Planting** - Planting activity tracking
6. **Cutting** - Harvest logging and bouquet planning  
7. **Selling** - Sales tracking and revenue management

## Future Enhancements

- Climate/hardiness zone API integration
- Advanced profitability analytics
- Mobile app version
- Inventory management system
- Customer relationship management
- Weather API integration
- Print-friendly planning sheets

## Contributing

This project is designed to address real pain points in flower farming operations, from planning and preparation to sales and profitability tracking.