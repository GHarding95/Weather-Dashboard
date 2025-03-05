# Weather Dashboard

A modern, responsive weather dashboard built with Next.js and TypeScript. Users can search for cities, view current weather conditions, and track multiple locations simultaneously. The dashboard provides real-time weather data with a clean, intuitive interface.

## Features

- Search and add multiple cities
- Real-time weather data display
- Responsive grid layout
- Toast notifications for user feedback
- Persistent state management
- Clean, modern UI with Tailwind CSS

## Tech Stack
- Next.js 15
- React 19
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Axios
- React Hot Toast
- Jest + React Testing Library
- ESLint
- VS Code

## Key Features

- Mobile-first responsive design
- Real-time weather data fetching
- State management with Redux Toolkit
- Type-safe development with TypeScript
- Modern UI components with Tailwind CSS
- User-friendly notifications
- Testing setup with Jest

## Getting Started

1. Clone the repository
2. Install dependencies with npm install
3. Create a `.env.local` file in the root directory and add your weather API key:
   WEATHER_API_KEY=your_api_key_here
4. Start the development server with npm run dev
5. Open http://localhost:3000 in your browser to see the application

## Testing

Run the test suite with npm test

## Technologies Used

- Next.js 14
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Jest
- React Testing Library

## Project Structure

src/
├── app/                    # Next.js app directory
├── components/            # React components
│   ├── CityCard.tsx      # Weather card component
│   ├── SearchBar.tsx     # City search component
│   └── __tests__/        # Component tests
├── hooks/                # Custom React hooks
├── store/               # Redux store and slices
└── types/               # TypeScript type definitions

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request
