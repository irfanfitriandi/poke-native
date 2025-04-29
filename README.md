# PokeNative - Pokédex App for React Native

A modern Pokémon encyclopedia built with React Native and Expo, featuring smooth animations and a clean interface.

## PokeNative App Screenshots

Check out some cool screenshots of the app!

<div >
  <img src="https://github.com/user-attachments/assets/d19f06de-4b39-47aa-8a2b-bcee6481230d" width="auto" height="450" />
  <img src="https://github.com/user-attachments/assets/87ba583a-99c7-4563-951a-3da209373d78" width="auto" height="450" />
  <img src="https://github.com/user-attachments/assets/172b1a04-b904-4e4f-bbd1-e46dac1f1cd8" width="auto" height="450" />
  <img src="https://github.com/user-attachments/assets/0a8d60a3-23d6-432c-97a7-dee1296e6bea" width="auto" height="450" />
  <img src="https://github.com/user-attachments/assets/63d91cc0-81ca-4270-b48b-7c3fbb63861a" width="auto" height="450" />
</div>

## 📦 Download

Grab the latest release of the app here:
➡️ [Download PokeNative APK](https://drive.google.com/file/d/104P_vieh8bTbZdIRCNrzZhAnkf1h4q9B)

## Features

### 🏠 Main Screen
- **Dynamic Search** - Instant search with debounced input
- **Sorting** - Sort your Pokémon by ID or name
- **Type Filtering** - Select dropdown for Pokémon types
- **Infinite Scroll** - Paginated loading of Pokémon entries

### 🔍 Detail Screen
- **Animated Sprites** - Smooth sprite transitions using Reanimated
- **Type Badges** - Color-coded type badges—because every Pokémon deserves its own flair
- **Stat Chart** - See the numbers that make your Pokémon legendary with a sweet stat visualization
- **Tap Pokémon** - Give it a tap to hear your Pokémon’s voice—yes, really!
- **Physical Specs** - Get all the deets—height, weight, and ability for each Pokémon

## Technologies Used

- React Native
- Expo
- TypeScript
- React Navigation
- Custom animations and transitions

## Project Structure

```
poke-native/
├── app/                  # Main app screens and routing
│   ├── _layout.tsx       # Root layout configuration
│   ├── index.tsx         # Main entry screen
│   └── pokemon/          # Pokémon detail screens
├── assets/               # Static assets
│   ├── fonts/            # Custom fonts (Space Mono)
│   └── images/           # App icons and UI images
├── components/           # Reusable UI components
│   ├── animation/        # Animation components
│   ├── layout/           # Layout components
│   ├── pokemon/          # Pokémon-specific components
│   └── shared/           # Generic shared components
├── constants/            # Design system constants
├── hooks/                # Custom React hooks
├── libs/                 # Utility functions and types
└── scripts/              # Development scripts
```

## Development

The project includes several quality-of-life features for developers:

- TypeScript support with strict type checking
- Custom hooks for theme management
- Helper functions for common operations

## Getting Started

1.  Install the Expo CLI:

    ```bash
    npm install -g expo-cli
    ```

2.  Clone the repository:

    ```bash
    git clone https://github.com/your-username/poke-native.git
    ```

3.  Navigate to the project directory:

    ```bash
    cd poke-native
    ```

4.  Install dependencies:

    ```bash
    npm install
    ```

5.  Start the app:

    ```bash
    npm start
    ```

## Running the app

You can run the app on a physical device or an emulator.

### On a physical device

1.  Install the Expo Go app on your device.
2.  Scan the QR code displayed in the terminal with the Expo Go app.

### On an emulator

1.  Install an Android emulator or an iOS simulator.
2.  Press `a` to run the app on Android or `i` to run the app on iOS.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
