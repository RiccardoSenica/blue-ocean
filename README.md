# Blue Ocean Strategy Analysis Tool

A comprehensive web application for visualizing and analyzing business strategies using the Blue Ocean Strategy framework. This tool helps strategists and business analysts create, validate, and visualize market-creating strategies through an interactive interface.

## Features

### 💹 Strategy Canvas

- Interactive line chart visualization
- Factor management with market vs. idea comparison
- Notes and annotations for each factor
- Drag-and-drop factor reordering

### 🎯 Four Actions Framework

- Organize strategic factors into Eliminate/Reduce/Raise/Create
- Link factors with strategy canvas
- Notes per action category
- Color-coded sections for clarity

### 🛣️ Six Paths Framework

- Analysis across alternative industries
- Strategic group evaluation
- Buyer chain exploration
- Complementary products/services assessment
- Functional/emotional appeal analysis
- Time trend tracking

### 📊 Buyer Utility Map

- Interactive grid visualization
- Toggle opportunities
- Notes per cell
- Six stages × six utility levers

### 💰 Price Corridor

- Target price setting
- Competitor price tracking
- Visual price band analysis
- Three-tier market segmentation

### ✅ Strategy Validation

- Non-customer analysis
- Strategic sequence validation
- Implementation notes
- Progress tracking

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS + shadcn/ui
- **Storage**: Redis
- **Charts**: Recharts
- **Utilities**: Lodash

## Getting Started

1. Clone the repository

```bash
git clone https://github.com/riccardosenica/blue-ocean.git
cd blue-ocean
```

2. Install dependencies

```bash
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

4. Update the following variables in `.env.local`:

```
KV_REST_API_URL=your_kv_url
KV_REST_API_TOKEN=your_kv_token
```

5. Run the development server

```bash
yarn dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## State Management

The application uses React Context for state management with the following structure:

- Strategy Canvas data
- Four Actions framework entries
- Six Paths analysis
- Utility Map toggles and notes
- Price Corridor data
- Validation checkpoints

## Storage

- Primary storage in browser's localStorage
- Backup functionality to Redis
- Automatic state persistence
- Import/Export capabilities

## Development

### Available Scripts

- `yarn dev`: Start development server
- `yarn build`: Build for production
- `yarn start`: Start production server
- `yarn lint`: Run ESLint
- `yarn typecheck`: Run TypeScript compiler

## Acknowledgments

- Blue Ocean Strategy by W. Chan Kim and Renée Mauborgne
