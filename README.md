# watchPositionAsync issue

1. Start a fresh instance: `npx create-expo-app@latest`
2. Install dev client: `npx expo install expo-dev-client`
3. Reset: `npm run reset-project`
4. Install expo-location: `npx expo install expo-location`
5. Add this to your app.json:

```json
[
  "expo-location",
  {
    "locationWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
  }
]
```

6. Clean: `npx expo prebuild --clean`
7. Run the app: `npx expo run:ios`
