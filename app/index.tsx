import * as Location from "expo-location";
import { LocationSubscription } from "expo-location";
import { useState } from "react";
import { Button, Text, View } from "react-native";

type UserLocation = {
  latitude: number;
  longitude: number;
};

export default function Index() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [subscription, setSubscription] = useState<LocationSubscription | null>(
    null
  );
  const [isWatching, setIsWatching] = useState(false);

  const startWatching = async () => {
    if (subscription) {
      console.log("Already watching location");
      return;
    }

    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== Location.PermissionStatus.GRANTED) {
      alert("Please enable location permissions.");
      return;
    }

    const newSubscription = await Location.watchPositionAsync(
      {},
      (location) => {
        console.log("Foreground location update: ", {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    );

    setSubscription(newSubscription);
    setIsWatching(true);
    console.log("Foreground location watching started");
  };

  const stopWatching = () => {
    if (subscription) {
      console.log("Stopping foreground location watching");
      subscription.remove();
      setSubscription(null);
      setIsWatching(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <Text style={{ marginBottom: 20, textAlign: "center" }}>
        User Location:{" "}
        {userLocation
          ? `${userLocation.latitude}, ${userLocation.longitude}`
          : "Unknown"}
      </Text>

      <View style={{ flexDirection: "row", gap: 10 }}>
        <Button
          title="Start Watching"
          onPress={startWatching}
          disabled={isWatching}
        />
        <Button
          title="Stop Watching"
          onPress={stopWatching}
          disabled={!isWatching}
        />
      </View>

      <Text style={{ marginTop: 20, fontSize: 12, opacity: 0.6 }}>
        Status: {isWatching ? "Watching" : "Not watching"}
      </Text>
    </View>
  );
}
