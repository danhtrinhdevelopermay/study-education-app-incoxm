
import React from "react";
import { Stack, router } from "expo-router";
import { ScrollView, StyleSheet, View, Text, Pressable } from "react-native";
import { IconCircle } from "@/components/IconCircle";
import { IconSymbol } from "@/components/IconSymbol";
import { Button } from "@/components/button";

export default function ProfileScreen() {
  const achievements = [
    { title: "Math Master", emoji: "🏆", description: "Completed 50 math problems" },
    { title: "Science Explorer", emoji: "🔬", description: "Finished 10 science lessons" },
    { title: "Speed Reader", emoji: "⚡", description: "Read 5 articles in one day" },
    { title: "Quiz Champion", emoji: "🎯", description: "Scored 100% on 3 quizzes" },
  ];

  const stats = [
    { label: "Study Streak", value: "12 days", icon: "flame" },
    { label: "Total Points", value: "2,450", icon: "star" },
    { label: "Lessons Completed", value: "87", icon: "checkmark.circle" },
    { label: "Time Studied", value: "45h 30m", icon: "clock" },
  ];

  return (
    <>
      <Stack.Screen
        options={{
          title: "Profile",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={styles.backButton}>
              <IconSymbol name="chevron.left" color="#007AFF" />
            </Pressable>
          ),
        }}
      />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <IconCircle
            emoji="👨‍🎓"
            backgroundColor="#007AFF20"
            size={80}
          />
          <Text style={styles.userName}>Alex Johnson</Text>
          <Text style={styles.userLevel}>Level 8 Scholar</Text>
          
          <View style={styles.levelProgress}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: '65%' }]} />
            </View>
            <Text style={styles.progressText}>650 / 1000 XP to Level 9</Text>
          </View>
        </View>

        <View style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <View key={index} style={styles.statCard}>
              <IconSymbol name={stat.icon as any} color="#007AFF" size={24} />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <IconCircle
                emoji={achievement.emoji}
                backgroundColor="#FFD70020"
                size={40}
              />
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <Pressable style={styles.settingItem} onPress={() => console.log('Notifications')}>
            <IconSymbol name="bell" color="#666" size={20} />
            <Text style={styles.settingText}>Notifications</Text>
            <IconSymbol name="chevron.right" color="#ccc" size={16} />
          </Pressable>
          
          <Pressable style={styles.settingItem} onPress={() => console.log('Study Goals')}>
            <IconSymbol name="target" color="#666" size={20} />
            <Text style={styles.settingText}>Study Goals</Text>
            <IconSymbol name="chevron.right" color="#ccc" size={16} />
          </Pressable>
          
          <Pressable style={styles.settingItem} onPress={() => console.log('Privacy')}>
            <IconSymbol name="lock" color="#666" size={20} />
            <Text style={styles.settingText}>Privacy</Text>
            <IconSymbol name="chevron.right" color="#ccc" size={16} />
          </Pressable>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            variant="outline"
            onPress={() => console.log('Sign out')}
            style={styles.signOutButton}
          >
            Sign Out
          </Button>
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
  profileHeader: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: 'white',
    marginBottom: 20,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 4,
  },
  userLevel: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 20,
  },
  levelProgress: {
    width: '100%',
    alignItems: 'center',
  },
  progressBar: {
    width: '80%',
    height: 8,
    backgroundColor: '#e5e5e5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#007AFF',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  achievementContent: {
    flex: 1,
    marginLeft: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingText: {
    flex: 1,
    fontSize: 16,
    color: '#1a1a1a',
    marginLeft: 12,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  signOutButton: {
    borderColor: '#FF3B30',
  },
});
