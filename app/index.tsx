import * as Location from "expo-location";
import { LocationSubscription } from "expo-location";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

type UserLocation = {
  latitude: number;
  longitude: number;
};

export default function Index() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);

  useEffect(() => {
    let subscription: LocationSubscription | null = null;

    const startWatching = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== Location.PermissionStatus.GRANTED) {
        alert("Please enable location permissions.");
        return;
      }

      subscription = await Location.watchPositionAsync({}, (location) => {
        console.log("Foreground location update: ", location);
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      });

      console.log("Foreground location watching started");
    };

    startWatching();

    // Cleanup watcher on unmount
    return () => {
      console.log("Stopping foreground location watching");
      subscription?.remove();
    };
  }, [setUserLocation]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>
        User Location:{" "}
        {userLocation
          ? `${userLocation.latitude}, ${userLocation.longitude}`
          : "Unknown"}
      </Text>
    </View>
  );
}
