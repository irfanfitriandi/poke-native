# PokeNative - Pokédex App for React Native

A modern Pokémon encyclopedia built with React Native and Expo, featuring smooth animations and a clean interface.

## PokeNative App Screenshots

Check out some cool screenshots of the app!

<div >
  <img src="https://github.com/user-attachments/assets/47cc57ec-e4e3-4764-98de-337ada98b585" width="auto" height="350" />
  <img src="https://github.com/user-attachments/assets/7c9e9e32-a1d7-4426-a3f0-eab34a8a63a5" width="auto" height="350" />
  <img src="https://github.com/user-attachments/assets/bfbe5da4-c4a9-4d18-a280-4c012b8103cb" width="auto" height="350" />
  <img src="https://github.com/user-attachments/assets/a96e1dc2-abd9-4257-a758-979b9f173b2a" width="auto" height="350" />
  <img src="https://github.com/user-attachments/assets/7d2e9549-e430-4aaf-a35f-7f9620ecb4f9" width="auto" height="350" />
  <img src="https://github.com/user-attachments/assets/cf28f82d-9c91-4d64-8cee-f8e4bfd79137" width="auto" height="350" />
  <img src="https://github.com/user-attachments/assets/ad9fff12-a826-4ef3-bf7a-24420aecd885" width="auto" height="350" />
  <img src="https://github.com/user-attachments/assets/cd3d9e64-1469-4453-8a11-2655ec258fe9" width="auto" height="350" />
</div>

## 📦 Download

Grab the latest release of the app here:
➡️ [Download PokeNative APK](https://drive.google.com/file/d/1AYfGcV5lFJ57DnXNDNLUgljQwPwionTc/view)

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

### ⚔️ Compare Screen
- **Side-by-Side Comparison** - Compare two Pokémon side by side in a single view  
- **Search Pokémon on Each Side** - Independently search and select Pokémon for the left and right panels  
- **Previous/Next Pokémon Navigation** - Easily switch to the previous or next Pokémon (by ID) on either side  
- **Stat Comparison Chart** - View overlapping radar chart or bar graph to directly compare stats  
- **Type & Abilities Overview** - Quickly contrast their types and abilities to strategize better  

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
