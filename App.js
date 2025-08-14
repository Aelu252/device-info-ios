import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, ScrollView, StyleSheet } from "react-native";
import DeviceInfo from "react-native-device-info";

export default function App() {
  const [info, setInfo] = useState({});

  useEffect(() => {
    async function fetchInfo() {
      const uuid = await DeviceInfo.getUniqueId();
      const model = await DeviceInfo.getModel();
      const osVersion = await DeviceInfo.getSystemVersion();
      const totalStorage = await DeviceInfo.getTotalDiskCapacity();
      const freeStorage = await DeviceInfo.getFreeDiskStorage();
      const battery = await DeviceInfo.getBatteryLevel();

      setInfo({
        uuid,
        model,
        osVersion,
        totalStorage: (totalStorage / (1024 ** 3)).toFixed(2) + " GB",
        freeStorage: (freeStorage / (1024 ** 3)).toFixed(2) + " GB",
        battery: Math.round(battery * 100) + "%"
      });
    }

    fetchInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>iPhone 情報</Text>
        {Object.entries(info).map(([key, value]) => (
          <Text key={key} style={styles.item}>
            {key}: {value}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  item: { fontSize: 16, marginVertical: 4 }
});
