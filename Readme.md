# My Expo App

A modern React Native application built with Expo and styled with NativeWind (Tailwind CSS for React Native).

## 🚀 Features

- **Expo Router**: File-based routing system
- **NativeWind**: Tailwind CSS styling for React Native
- **TypeScript**: Type-safe development
- **Cross-platform**: iOS, Android, and Web support
- **Modern Development**: ESLint, Prettier, and hot reloading

## 📱 Tech Stack

- **Framework**: [Expo](https://expo.dev/) v53
- **Language**: TypeScript + JavaScript (JSX)
- **Styling**: [NativeWind](https://www.nativewind.dev/) (Tailwind CSS)
- **Navigation**: [Expo Router](https://expo.github.io/router/)
- **Code Quality**: ESLint + Prettier

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd my-expo-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

## 📄 Available Scripts

- `npm start` - Start the Expo development server
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run web` - Run in web browser
- `npm run lint` - Run ESLint and Prettier checks
- `npm run format` - Format code with ESLint and Prettier
- `npm run prebuild` - Generate native code

## 📁 Project Structure

```
my-expo-app/
├── app/                    # App routes (Expo Router)
│   ├── index.jsx          # Home screen
│   └── home/
│       └── index.jsx      # Home route
├── components/            # Reusable components
│   ├── Container.tsx
│   ├── EditScreenInfo.tsx
│   └── ScreenContent.tsx
├── assets/               # Static assets
│   ├── icon.png
│   ├── splash.png
│   └── ...
├── global.css           # Global Tailwind styles
├── tailwind.config.js   # Tailwind configuration
├── babel.config.js      # Babel configuration
├── metro.config.js      # Metro bundler configuration
└── package.json         # Dependencies and scripts
```

## 🎨 NativeWind Setup

This project uses NativeWind for styling, which allows you to use Tailwind CSS classes in React Native components.

### Configuration Files:

- **`tailwind.config.js`**: Tailwind CSS configuration
- **`babel.config.js`**: Includes NativeWind babel preset
- **`metro.config.js`**: Metro bundler with NativeWind integration
- **`global.css`**: Global Tailwind styles
- **`nativewind-env.d.ts`**: TypeScript declarations for NativeWind

### Usage Example:

```jsx
import { View, Text } from "react-native";

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-2xl font-bold">Hello NativeWind!</Text>
    </View>
  );
}
```

## 🔧 Development

### Adding New Screens

1. Create a new file in the `app/` directory
2. Export a React component as default
3. The file path becomes the route (thanks to Expo Router)

Example:

```jsx
// app/profile.jsx
import { View, Text } from "react-native";

export default function Profile() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl">Profile Screen</Text>
    </View>
  );
}
```

### Styling with NativeWind

Use Tailwind CSS classes directly in your `className` prop:

```jsx
<View className="bg-gray-100 p-4 rounded-lg shadow-md">
  <Text className="text-lg font-semibold text-gray-800">
    Styled with NativeWind
  </Text>
</View>
```

## 📱 Platform Support

- **iOS**: Compatible with iOS 13.0+
- **Android**: Compatible with Android 6.0+ (API level 23)
- **Web**: Runs in modern web browsers

## 🚀 Building for Production

### Android

```bash
npm run prebuild
npx expo run:android --variant release
```

### iOS

```bash
npm run prebuild
npx expo run:ios --configuration Release
```

### Web

```bash
npm run web
```

## 🔍 Troubleshooting

### NativeWind Styles Not Working?

1. Make sure you've imported `global.css` in your root component:

   ```jsx
   import "../global.css";
   ```

2. Restart the Metro bundler:

   ```bash
   npm start -- --reset-cache
   ```

3. Check that your `tailwind.config.js` includes the correct content paths

### Common Issues

- **Metro bundler cache**: Run `npm start -- --reset-cache`
- **Node modules**: Delete `node_modules` and run `npm install`
- **Expo cache**: Run `npx expo start --clear`

## 📚 Resources

- [Expo Documentation](https://docs.expo.dev/)
- [NativeWind Documentation](https://www.nativewind.dev/)
- [Expo Router Documentation](https://expo.github.io/router/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using [Expo](https://expo.dev/) and [NativeWind](https://www.nativewind.dev/)
