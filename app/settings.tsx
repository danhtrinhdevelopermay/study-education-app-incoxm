
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable, Switch } from "react-native";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";

export default function SettingsScreen() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSync, setAutoSync] = useState(true);

  const settingSections = [
    {
      title: "Study Preferences",
      items: [
        {
          icon: "bell",
          title: "Push Notifications",
          subtitle: "Get reminders for study sessions",
          type: "toggle",
          value: notifications,
          onToggle: setNotifications,
        },
        {
          icon: "speaker.wave.2",
          title: "Sound Effects",
          subtitle: "Play sounds for interactions",
          type: "toggle",
          value: soundEffects,
          onToggle: setSoundEffects,
        },
        {
          icon: "arrow.clockwise",
          title: "Auto Sync",
          subtitle: "Sync progress across devices",
          type: "toggle",
          value: autoSync,
          onToggle: setAutoSync,
        },
      ],
    },
    {
      title: "Appearance",
      items: [
        {
          icon: "moon",
          title: "Dark Mode",
          subtitle: "Use dark theme",
          type: "toggle",
          value: darkMode,
          onToggle: setDarkMode,
        },
      ],
    },
    {
      title: "Study Goals",
      items: [
        {
          icon: "target",
          title: "Daily Goal",
          subtitle: "30 minutes per day",
          type: "navigation",
          onPress: () => console.log('Daily Goal'),
        },
        {
          icon: "calendar",
          title: "Study Schedule",
          subtitle: "Set your study times",
          type: "navigation",
          onPress: () => console.log('Study Schedule'),
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          icon: "person.circle",
          title: "Edit Profile",
          subtitle: "Update your information",
          type: "navigation",
          onPress: () => router.push('/profile'),
        },
        {
          icon: "shield",
          title: "Privacy",
          subtitle: "Manage your privacy settings",
          type: "navigation",
          onPress: () => console.log('Privacy'),
        },
        {
          icon: "questionmark.circle",
          title: "Help & Support",
          subtitle: "Get help and contact support",
          type: "navigation",
          onPress: () => console.log('Help'),
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, index: number) => (
    <View key={index} style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <View style={styles.iconContainer}>
          <IconSymbol name={item.icon} color="#007AFF" size={20} />
        </View>
        <View style={styles.settingContent}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      
      {item.type === 'toggle' ? (
        <Switch
          value={item.value}
          onValueChange={item.onToggle}
          trackColor={{ false: '#e5e5e5', true: '#007AFF40' }}
          thumbColor={item.value ? '#007AFF' : '#f4f3f4'}
        />
      ) : (
        <Pressable onPress={item.onPress} style={styles.navigationButton}>
          <IconSymbol name="chevron.right" color="#ccc" size={16} />
        </Pressable>
      )}
    </View>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {settingSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => renderSettingItem(item, itemIndex))}
            </View>
          </View>
        ))}

        <View style={styles.dangerSection}>
          <Button
            variant="outline"
            onPress={() => console.log('Reset Progress')}
            style={styles.dangerButton}
            textStyle={styles.dangerButtonText}
          >
            Reset All Progress
          </Button>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Study Hub v1.0.0</Text>
          <Text style={styles.footerText}>Made with ❤️ for learners</Text>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  backButton: {
    padding: 6,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    marginLeft: 20,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  sectionContent: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#007AFF10',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  navigationButton: {
    padding: 4,
  },
  dangerSection: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  dangerButton: {
    borderColor: '#FF3B30',
  },
  dangerButtonText: {
    color: '#FF3B30',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});
